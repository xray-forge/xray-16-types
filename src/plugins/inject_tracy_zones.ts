import {
  Expression,
  factory,
  isArrowFunction,
  isCallExpression,
  isMethodDeclaration,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isStringLiteral,
  SyntaxKind,
} from "typescript";
import { Plugin } from "typescript-to-lua";

import { IS_TRACY_ZONES_INJECTION_ENABLED } from "./utils/environment";
import { transformArrowFunctionWithInjectedZones, transformWithInjectedZones } from "./utils/tracy";
import { getIdentifierText } from "./utils/ast";

/**
 * Plugin that injects FILE_NAME in compile-time.
 */
const plugin: Plugin = {
  visitors: {
    [SyntaxKind.FunctionDeclaration]: (node, context) => {
      return context.superTransformStatements(
        IS_TRACY_ZONES_INJECTION_ENABLED ? transformWithInjectedZones(node) : node
      );
    },
    [SyntaxKind.ClassDeclaration]: (node, context) => {
      if (IS_TRACY_ZONES_INJECTION_ENABLED) {
        const name: string = node.name ? node.name.getText() : null;

        return context.superTransformStatements(
          factory.updateClassDeclaration(
            node,
            node.modifiers,
            node.name,
            node.typeParameters,
            node.heritageClauses,
            node.members.map((it) => {
              if (isMethodDeclaration(it)) {
                return transformWithInjectedZones(it, name);
              }

              return it;
            })
          )
        );
      }

      return context.superTransformStatements(node);
    },
    [SyntaxKind.ExpressionStatement]: (statement, context) => {
      if (IS_TRACY_ZONES_INJECTION_ENABLED) {
        const expression: Expression = statement.expression;

        if (
          isCallExpression(expression) &&
          expression.expression?.kind === SyntaxKind.Identifier &&
          expression.expression.getText() === "extern" &&
          expression.arguments.length === 2
        ) {
          const first: Expression = expression.arguments[0];
          const second: Expression = expression.arguments[1];

          if (!isStringLiteral(first)) {
            return context.transformStatements(statement);
          }

          if (isObjectLiteralExpression(second)) {
            return context.superTransformStatements(
              factory.updateExpressionStatement(
                statement,
                factory.updateCallExpression(expression, expression.expression, expression.typeArguments, [
                  first,
                  factory.updateObjectLiteralExpression(
                    second,
                    second.properties.map((it) => {
                      if (isPropertyAssignment(it) && isArrowFunction(it.initializer)) {
                        return factory.updatePropertyAssignment(
                          it,
                          it.name,
                          transformArrowFunctionWithInjectedZones(
                            it.initializer,
                            `${getIdentifierText(first)}.${it.name.getText()}`
                          )
                        );
                      }

                      return it;
                    })
                  ),
                ])
              )
            );
          } else if (isArrowFunction(second)) {
            return context.superTransformStatements(
              factory.updateExpressionStatement(
                statement,
                factory.updateCallExpression(expression, expression.expression, expression.typeArguments, [
                  first,
                  transformArrowFunctionWithInjectedZones(second, getIdentifierText(first)),
                ])
              )
            );
          }
        }
      }

      return context.superTransformStatements(statement);
    },
  },
};

export default plugin;
