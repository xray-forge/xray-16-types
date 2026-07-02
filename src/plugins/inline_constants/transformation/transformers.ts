import * as ts from "typescript";
import * as lua from "typescript-to-lua";

import { isValueUsagePosition, resolveMemberSymbol } from "./ast";
import { type TInlineValue } from "./constants";
import { tryGetInlineValue } from "./evaluation";

/**
 * Create lua literal expression for provided constant value.
 *
 * @param value - Constant value to create literal for.
 * @param node - Original typescript node.
 * @returns Lua literal expression.
 */
export function createLiteralExpression(value: TInlineValue, node: ts.Node): lua.Expression {
  if (typeof value === "string") {
    return lua.createStringLiteral(value, node);
  }

  if (typeof value === "boolean") {
    return lua.createBooleanLiteral(value, node);
  }

  return value < 0
    ? lua.createUnaryExpression(lua.createNumericLiteral(Math.abs(value), node), lua.SyntaxKind.NegationOperator, node)
    : lua.createNumericLiteral(value, node);
}

/**
 * Transform property/element access expressions, inline literal values of `@inline` tagged declarations.
 *
 * @param node - Access expression node to transform.
 * @param context - Transformation context.
 * @returns Lua literal when access resolves to a tagged constant, default transformation otherwise.
 */
export function transformAccessExpression(
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  context: lua.TransformationContext
): lua.Expression {
  const symbol: ts.Symbol | null = resolveMemberSymbol(context.checker, node);
  const value: TInlineValue | null = symbol === null ? null : tryGetInlineValue(context.checker, symbol);

  return value === null ? context.superTransformExpression(node) : createLiteralExpression(value, node);
}

/**
 * Transform identifier expressions, inline literal values of `@inline` tagged scalar constants.
 *
 * @param node - Identifier node to transform.
 * @param context - Transformation context.
 * @returns Lua literal when identifier resolves to a tagged constant, default transformation otherwise.
 */
export function transformIdentifierExpression(node: ts.Identifier, context: lua.TransformationContext): lua.Expression {
  if (isValueUsagePosition(node)) {
    let symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(node);

    if (symbol !== undefined && (symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      symbol = context.checker.getAliasedSymbol(symbol);
    }

    if (symbol?.valueDeclaration !== undefined && ts.isVariableDeclaration(symbol.valueDeclaration)) {
      const value: TInlineValue | null = tryGetInlineValue(context.checker, symbol);

      if (value !== null) {
        return createLiteralExpression(value, node);
      }
    }
  }

  return context.superTransformExpression(node);
}
