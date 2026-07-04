import { isIdentifier, SyntaxKind } from "typescript";
import * as lua from "typescript-to-lua";
import { type Plugin } from "typescript-to-lua";

import { createErrorDiagnosticFactory } from "../utils/diagnostics";

const FROM_CAST_METHODS: Array<string> = ["$fromObject", "$fromArray", "$fromLuaArray", "$fromLuaTable"];
const NIL_CHECK_METHODS: Map<string, lua.BinaryOperator> = new Map([
  ["$isNil", lua.SyntaxKind.EqualityOperator],
  ["$isNotNil", lua.SyntaxKind.InequalityOperator],
]);

/**
 * Push generic error to notify about usage issue.
 */
const createInvalidFunctionCallError = createErrorDiagnosticFactory((name?: string) => {
  return `Invalid transformer call, expected function to have exactly 1 argument.`;
});

/**
 * Plugin for transformation of casting methods.
 * Simplifies TS/Lua testing and interoperation.
 */
export const plugin: Plugin = {
  visitors: {
    [SyntaxKind.CallExpression]: (node, context) => {
      if (isIdentifier(node.expression) && FROM_CAST_METHODS.includes(node.expression.text)) {
        if (node.arguments.length !== 1) {
          context.diagnostics.push(createInvalidFunctionCallError(node));
        }

        return context.transformExpression(node.arguments[0]);
      }

      if (isIdentifier(node.expression) && NIL_CHECK_METHODS.has(node.expression.text)) {
        if (node.arguments.length !== 1) {
          context.diagnostics.push(createInvalidFunctionCallError(node));

          return context.superTransformExpression(node);
        }

        return lua.createBinaryExpression(
          context.transformExpression(node.arguments[0]),
          lua.createNilLiteral(node),
          NIL_CHECK_METHODS.get(node.expression.text) as lua.BinaryOperator,
          node
        );
      }

      return context.superTransformExpression(node);
    },
  },
};
