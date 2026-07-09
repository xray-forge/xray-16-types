import * as path from "path";

import {
  type Expression,
  factory,
  isArrowFunction,
  isCallExpression,
  isMethodDeclaration,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isStringLiteral,
  SyntaxKind,
} from "typescript";
import { type Plugin } from "typescript-to-lua";
import { transformSourceFileNode } from "typescript-to-lua/dist/transformation/visitors/sourceFile";

import { getIdentifierText } from "../utils/ast";
import { isTracyZonesInjectionEnabled } from "../utils/environment";

import {
  createTraceZoneBeginNExpression,
  createTraceZoneEndExpression,
  transformArrowFunctionWithInjectedZones,
  transformWithInjectedZones,
} from "./utils/tracy";

/**
 * Configuration for the tracy zones plugin, provided verbatim from the tsconfig `luaPlugins` entry.
 */
export interface IInjectTracyZonesPluginConfig {
  /**
   * Inject Tracy profiling zones into files, functions and methods.
   * When unset, falls back to the `XR_INJECT_TRACY_ZONES` env variable / `--inject-tracy-zones` CLI flag.
   */
  enabled?: boolean;
}

/**
 * Create a plugin that injects Tracy profiling zones into the emitted Lua.
 *
 * @param config - Whether zone injection is enabled.
 * @returns Configured TypeScriptToLua plugin.
 */
export function createPlugin(config: IInjectTracyZonesPluginConfig = {}): Plugin {
  const isEnabled = (): boolean => config.enabled ?? isTracyZonesInjectionEnabled();

  return {
    visitors: {
      [SyntaxKind.SourceFile]: (node, context) => {
        if (isEnabled()) {
          let filename: string = node.fileName ? path.basename(node.fileName) : "unknown";

          if (filename.endsWith(".ts")) {
            filename = filename.slice(0, -3) + ".script";
          }

          if (filename.startsWith("index.")) {
            filename = `${path.basename(path.dirname(node.fileName))}@${filename}`;
          }

          return transformSourceFileNode(
            factory.updateSourceFile(
              node,
              [
                createTraceZoneBeginNExpression(`lua::file::${filename}`),
                ...node.statements,
                createTraceZoneEndExpression(),
              ],
              node.isDeclarationFile,
              node.referencedFiles,
              node.typeReferenceDirectives,
              node.hasNoDefaultLib,
              node.libReferenceDirectives
            ),
            context
          );
        }

        return transformSourceFileNode(node, context);
      },
      [SyntaxKind.FunctionDeclaration]: (node, context) => {
        return context.superTransformStatements(isEnabled() ? transformWithInjectedZones(node, context.checker) : node);
      },
      [SyntaxKind.ClassDeclaration]: (node, context) => {
        if (isEnabled()) {
          const name: string | undefined = node.name ? node.name.getText() : undefined;

          return context.superTransformStatements(
            factory.updateClassDeclaration(
              node,
              node.modifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              node.members.map((it) => {
                if (isMethodDeclaration(it)) {
                  return transformWithInjectedZones(it, context.checker, name);
                }

                return it;
              })
            )
          );
        }

        return context.superTransformStatements(node);
      },
      [SyntaxKind.ExpressionStatement]: (statement, context) => {
        if (isEnabled()) {
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
                              context.checker,
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
                    transformArrowFunctionWithInjectedZones(second, context.checker, getIdentifierText(first)),
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
}
