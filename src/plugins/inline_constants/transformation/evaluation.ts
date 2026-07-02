import * as ts from "typescript";

import {
  getContainingVariableStatement,
  hasInlineTag,
  isModuleLevelConst,
  isReadonlyModuleConstProperty,
  unwrapInitializer,
} from "./ast";
import { FOLDABLE_NAMESPACE_CONSTANTS, type TInlineValue } from "./constants";

/**
 * Resolve the member symbol for a property or element access expression.
 * When direct symbol resolution fails, element access is resolved through the object type. This supports
 * literal keys and keys that fold to constants at build time, such as 'table[misc.device_pda]'.
 *
 * @param checker - Program type checker.
 * @param node - Access expression to resolve symbol for.
 * @returns Resolved member symbol or null.
 */
export function resolveMemberSymbol(
  checker: ts.TypeChecker,
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression
): ts.Symbol | null {
  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

  if (symbol !== undefined) {
    return symbol;
  }

  if (ts.isElementAccessExpression(node)) {
    const key: TInlineValue | null = evaluateConstantExpression(checker, node.argumentExpression, new Set());

    if (typeof key === "string" || typeof key === "number") {
      return checker.getTypeAtLocation(node.expression).getProperty(String(key)) ?? null;
    }
  }

  return null;
}

/**
 * Get literal value of symbol declared type, if it is a unit type.
 * Uses declared type instead of flow-narrowed type so mutable narrowed values are never inlined.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to get declared literal value for.
 * @returns Literal value, or null when the declared type is not a unit type.
 */
export function getDeclaredLiteralValue(checker: ts.TypeChecker, symbol: ts.Symbol): TInlineValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  const type: ts.Type = checker.getTypeOfSymbolAtLocation(symbol, declaration);

  if (type.isStringLiteral()) {
    return type.value;
  }

  if (type.isNumberLiteral()) {
    return type.value;
  }

  if ((type.flags & ts.TypeFlags.BooleanLiteral) !== 0) {
    return checker.typeToString(type) === "true";
  }

  return null;
}

/**
 * Convert a folded value to a string for concatenation contexts.
 * Non-integer numbers are rejected because JS 'String()' and LuaJIT 'tostring' format them differently
 * (17 significant digits vs '%.14g'), so folding would change runtime-visible output.
 *
 * @param value - Folded value to convert.
 * @returns String representation or null.
 */
export function toFoldedString(value: TInlineValue | null): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" && Number.isInteger(value) && Math.abs(value) < 1e14) {
    return String(value);
  }

  return null;
}

/**
 * Guard folded numeric results against NaN and Infinity, which cannot be emitted as Lua literals.
 *
 * @param value - Folded numeric value.
 * @returns Finite number, or null when the value cannot be emitted as a Lua literal.
 */
export function toFiniteNumber(value: number): number | null {
  return Number.isFinite(value) ? value : null;
}

/**
 * Fold a binary expression with constant operands using JavaScript semantics.
 * JavaScript semantics are the correct target because TSTL preserves them at runtime,
 * including '%' behavior for negative operands.
 *
 * @param operator - Binary operator kind.
 * @param left - Folded left operand.
 * @param right - Folded right operand.
 * @returns Folded value, or null when the operation is not safe to fold.
 */
export function foldBinaryExpression(
  operator: ts.SyntaxKind,
  left: TInlineValue,
  right: TInlineValue
): TInlineValue | null {
  if (operator === ts.SyntaxKind.PlusToken) {
    if (typeof left === "number" && typeof right === "number") {
      return toFiniteNumber(left + right);
    }

    const leftString: string | null = toFoldedString(left);
    const rightString: string | null = toFoldedString(right);

    return leftString !== null && rightString !== null ? leftString + rightString : null;
  }

  if (typeof left !== "number" || typeof right !== "number") {
    return null;
  }

  switch (operator) {
    case ts.SyntaxKind.MinusToken:
      return toFiniteNumber(left - right);

    case ts.SyntaxKind.AsteriskToken:
      return toFiniteNumber(left * right);

    case ts.SyntaxKind.SlashToken:
      return toFiniteNumber(left / right);

    case ts.SyntaxKind.PercentToken:
      return toFiniteNumber(left % right);

    case ts.SyntaxKind.AsteriskAsteriskToken:
      return toFiniteNumber(left ** right);

    case ts.SyntaxKind.AmpersandToken:
      return left & right;

    case ts.SyntaxKind.BarToken:
      return left | right;

    case ts.SyntaxKind.CaretToken:
      return left ^ right;

    case ts.SyntaxKind.LessThanLessThanToken:
      return left << right;

    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      return left >> right;

    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
      return left >>> right;

    default:
      return null;
  }
}

/**
 * Evaluate an expression to a compile-time constant value when possible.
 * Supports literals, unary/binary arithmetic, string concatenation, template literals,
 * references to enum members / module-level const scalars / `as const` object properties
 * and whitelisted namespace constants like 'math.pi'.
 *
 * @param checker - Program type checker.
 * @param expression - Expression to evaluate.
 * @param seen - Set of declarations on current resolution path, guards from circular references.
 * @returns Folded constant value, or null when the expression is not safe to fold.
 */
export function evaluateConstantExpression(
  checker: ts.TypeChecker,
  expression: ts.Expression,
  seen: Set<ts.Declaration>
): TInlineValue | null {
  const node: ts.Expression | null = unwrapInitializer(expression);

  if (node === null) {
    return null;
  }

  if (ts.isStringLiteralLike(node)) {
    return node.text;
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand: TInlineValue | null = evaluateConstantExpression(checker, node.operand, seen);

    if (operand === null) {
      return null;
    }

    switch (node.operator) {
      case ts.SyntaxKind.MinusToken:
        return typeof operand === "number" ? toFiniteNumber(-operand) : null;

      case ts.SyntaxKind.PlusToken:
        return typeof operand === "number" ? operand : null;

      case ts.SyntaxKind.TildeToken:
        return typeof operand === "number" ? ~operand : null;

      case ts.SyntaxKind.ExclamationToken:
        return typeof operand === "boolean" ? !operand : null;

      default:
        return null;
    }
  }

  if (ts.isBinaryExpression(node)) {
    const left: TInlineValue | null = evaluateConstantExpression(checker, node.left, seen);

    if (left === null) {
      return null;
    }

    const right: TInlineValue | null = evaluateConstantExpression(checker, node.right, seen);

    if (right === null) {
      return null;
    }

    return foldBinaryExpression(node.operatorToken.kind, left, right);
  }

  if (ts.isTemplateExpression(node)) {
    let result: string = node.head.text;

    for (const span of node.templateSpans) {
      const substitution: string | null = toFoldedString(evaluateConstantExpression(checker, span.expression, seen));

      if (substitution === null) {
        return null;
      }

      result += substitution + span.literal.text;
    }

    return result;
  }

  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
    const namespaceConstant: number | undefined = FOLDABLE_NAMESPACE_CONSTANTS[node.expression.text]?.[node.name.text];

    if (namespaceConstant !== undefined) {
      return namespaceConstant;
    }
  }

  if (ts.isIdentifier(node)) {
    const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

    return symbol === undefined ? null : resolveConstantSymbol(checker, symbol, seen);
  }

  if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
    const symbol: ts.Symbol | null = resolveMemberSymbol(checker, node);

    return symbol === null ? null : resolveConstantSymbol(checker, symbol, seen);
  }

  return null;
}

/**
 * Resolve a referenced symbol to a compile-time constant value when the reference is safe to fold.
 * Safe references are enum members, module-level const scalars and readonly `as const` object properties -
 * values that cannot legally change at runtime. Tags are not required on referenced declarations.
 *
 * @param checker - Program type checker.
 * @param symbol - Referenced symbol to resolve.
 * @param seen - Set of declarations on current resolution path.
 * @returns Folded constant value, or null when the symbol is not safe to fold.
 */
export function resolveConstantSymbol(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  seen: Set<ts.Declaration>
): TInlineValue | null {
  const resolved: ts.Symbol = (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration: ts.Declaration | undefined = resolved.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  if (ts.isEnumMember(declaration)) {
    const value: string | number | undefined = checker.getConstantValue(declaration);

    return typeof value === "string" || typeof value === "number" ? value : null;
  }

  if (ts.isVariableDeclaration(declaration)) {
    const statement: ts.VariableStatement | null = getContainingVariableStatement(declaration);

    if (statement === null || !isModuleLevelConst(statement)) {
      return null;
    }

    return getComputedDeclarationValue(checker, resolved, seen);
  }

  if (ts.isPropertyAssignment(declaration) || ts.isShorthandPropertyAssignment(declaration)) {
    return isReadonlyModuleConstProperty(declaration) ? getComputedDeclarationValue(checker, resolved, seen) : null;
  }

  return null;
}

/**
 * Get the constant value of a declaration.
 * Declared unit types are used first, with initializer folding as a fallback.
 * Safety and tagging requirements are checked by callers.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to get value for.
 * @param seen - Set of declarations on current resolution path.
 * @returns Constant value, or null when the declaration cannot be folded.
 */
export function getComputedDeclarationValue(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  seen: Set<ts.Declaration>
): TInlineValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  const declared: TInlineValue | null = getDeclaredLiteralValue(checker, symbol);

  if (declared !== null) {
    return declared;
  }

  if (seen.has(declaration)) {
    return null;
  }

  seen.add(declaration);

  try {
    if (
      (ts.isVariableDeclaration(declaration) || ts.isPropertyAssignment(declaration)) &&
      declaration.initializer !== undefined
    ) {
      return evaluateConstantExpression(checker, declaration.initializer, seen);
    }

    if (ts.isShorthandPropertyAssignment(declaration)) {
      const valueSymbol: ts.Symbol | undefined = checker.getShorthandAssignmentValueSymbol(declaration);

      return valueSymbol === undefined ? null : resolveConstantSymbol(checker, valueSymbol, seen);
    }

    return null;
  } finally {
    seen.delete(declaration);
  }
}

/**
 * Get the inlineable literal value for a symbol resolved from an access expression or identifier.
 * Only symbols declared inside tagged enums or variable statements produce values.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to resolve inline value for.
 * @returns Literal value, or null when the symbol is not tagged for inlining.
 */
export function tryGetInlineValue(checker: ts.TypeChecker, symbol: ts.Symbol): TInlineValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  if (ts.isEnumMember(declaration)) {
    if (!hasInlineTag(declaration.parent)) {
      return null;
    }

    const value: string | number | undefined = checker.getConstantValue(declaration);

    return typeof value === "string" || typeof value === "number" ? value : null;
  }

  if (
    ts.isPropertyAssignment(declaration) ||
    ts.isShorthandPropertyAssignment(declaration) ||
    ts.isVariableDeclaration(declaration)
  ) {
    const statement: ts.VariableStatement | null = getContainingVariableStatement(declaration);

    if (statement === null || !hasInlineTag(statement)) {
      return null;
    }

    return getComputedDeclarationValue(checker, symbol, new Set());
  }

  return null;
}
