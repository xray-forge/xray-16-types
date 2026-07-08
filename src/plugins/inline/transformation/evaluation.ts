import * as ts from "typescript";
import * as lua from "typescript-to-lua";

import {
  getContainingVariableStatement,
  getEngineConstantPath,
  hasInlineTag,
  isModuleLevelConst,
  isReadonlyModuleConstProperty,
  unwrapInitializer,
} from "./ast";
import {
  FOLDABLE_NAMESPACE_CONSTANTS,
  isNumericFoldedValue,
  type TFoldedBinaryOperator,
  type TFoldedValue,
  type TInlineValue,
} from "./constants";

const TREE_BINARY_OPERATORS: Partial<Record<ts.SyntaxKind, TFoldedBinaryOperator>> = {
  [ts.SyntaxKind.PlusToken]: "+",
  [ts.SyntaxKind.MinusToken]: "-",
  [ts.SyntaxKind.AsteriskToken]: "*",
  [ts.SyntaxKind.SlashToken]: "/",
  [ts.SyntaxKind.AsteriskAsteriskToken]: "**",
};

const TREE_LUA_OPERATORS: Record<TFoldedBinaryOperator, lua.BinaryOperator> = {
  "+": lua.SyntaxKind.AdditionOperator,
  "-": lua.SyntaxKind.SubtractionOperator,
  "*": lua.SyntaxKind.MultiplicationOperator,
  "/": lua.SyntaxKind.DivisionOperator,
  "**": lua.SyntaxKind.PowerOperator,
};

/**
 * Create a Lua expression for the provided folded value.
 * Literals become Lua literals; expression trees with engine references become global access
 * expressions and arithmetic over them.
 *
 * @param value - Folded value to create expression for.
 * @param node - Original TypeScript node.
 * @returns Lua expression.
 */
export function createFoldedExpression(value: TFoldedValue, node: ts.Node): lua.Expression {
  if (typeof value === "string") {
    return lua.createStringLiteral(value, node);
  }

  if (typeof value === "boolean") {
    return lua.createBooleanLiteral(value, node);
  }

  if (typeof value === "number") {
    return value < 0
      ? lua.createUnaryExpression(
          lua.createNumericLiteral(Math.abs(value), node),
          lua.SyntaxKind.NegationOperator,
          node
        )
      : lua.createNumericLiteral(value, node);
  }

  switch (value.kind) {
    case "engine-ref": {
      let expression: lua.Expression = lua.createIdentifier(value.path[0]);

      for (const member of value.path.slice(1)) {
        expression = lua.createTableIndexExpression(expression, lua.createStringLiteral(member), node);
      }

      return expression;
    }

    case "binary":
      return lua.createBinaryExpression(
        createFoldedExpression(value.left, node),
        createFoldedExpression(value.right, node),
        TREE_LUA_OPERATORS[value.operator],
        node
      );

    case "negate":
      return lua.createUnaryExpression(
        createFoldedExpression(value.operand, node),
        lua.SyntaxKind.NegationOperator,
        node
      );
  }
}

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
    const key: TFoldedValue | null = evaluateConstantExpression(checker, node.argumentExpression, new Set());

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
 * Expression trees are rejected because Lua '..' coercion differs from JS string conversion.
 *
 * @param value - Folded value to convert.
 * @returns String representation or null.
 */
export function toFoldedString(value: TFoldedValue | null): string | null {
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
 * When an operand is an expression tree with engine references, the result is a tree as well.
 * Trees only allow numeric operands and operators where emitted Lua matches TSTL lowering exactly:
 * '%', bitwise operators and string concatenation with trees are rejected.
 *
 * @param operator - Binary operator kind.
 * @param left - Folded left operand.
 * @param right - Folded right operand.
 * @returns Folded value, or null when the operation is not safe to fold.
 */
export function foldBinaryExpression(
  operator: ts.SyntaxKind,
  left: TFoldedValue,
  right: TFoldedValue
): TFoldedValue | null {
  if (typeof left === "object" || typeof right === "object") {
    const treeOperator: TFoldedBinaryOperator | undefined = TREE_BINARY_OPERATORS[operator];

    if (treeOperator === undefined || !isNumericFoldedValue(left) || !isNumericFoldedValue(right)) {
      return null;
    }

    return { kind: "binary", operator: treeOperator, left, right };
  }

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
 * references to enum members / module-level const scalars / `as const` object properties,
 * whitelisted namespace constants like 'math.pi' and runtime-constant engine references
 * like 'stalker_ids.action_dying' (emitted as expressions instead of baked literals).
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
): TFoldedValue | null {
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
    const operand: TFoldedValue | null = evaluateConstantExpression(checker, node.operand, seen);

    if (operand === null) {
      return null;
    }

    switch (node.operator) {
      case ts.SyntaxKind.MinusToken:
        if (typeof operand === "number") {
          return toFiniteNumber(-operand);
        }

        return typeof operand === "object" && isNumericFoldedValue(operand) ? { kind: "negate", operand } : null;

      case ts.SyntaxKind.PlusToken:
        return typeof operand === "number" || (typeof operand === "object" && isNumericFoldedValue(operand))
          ? operand
          : null;

      case ts.SyntaxKind.TildeToken:
        return typeof operand === "number" ? ~operand : null;

      case ts.SyntaxKind.ExclamationToken:
        return typeof operand === "boolean" ? !operand : null;

      default:
        return null;
    }
  }

  if (ts.isBinaryExpression(node)) {
    const left: TFoldedValue | null = evaluateConstantExpression(checker, node.left, seen);

    if (left === null) {
      return null;
    }

    const right: TFoldedValue | null = evaluateConstantExpression(checker, node.right, seen);

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
 * Fold an enum member to a constant value.
 * TypeScript computes literal values of constant members; members initialized with engine references
 * fold to expression trees instead.
 *
 * @param checker - Program type checker.
 * @param declaration - Enum member declaration to fold.
 * @param seen - Set of declarations on current resolution path.
 * @returns Folded constant value, or null when the member is not computable at build time.
 */
function getEnumMemberValue(
  checker: ts.TypeChecker,
  declaration: ts.EnumMember,
  seen: Set<ts.Declaration>
): TFoldedValue | null {
  const value: string | number | undefined = checker.getConstantValue(declaration);

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (declaration.initializer === undefined || seen.has(declaration)) {
    return null;
  }

  seen.add(declaration);

  try {
    return evaluateConstantExpression(checker, declaration.initializer, seen);
  } finally {
    seen.delete(declaration);
  }
}

/**
 * Check whether an enum member is computable at build time - either constant for TypeScript
 * or initialized with an expression that folds to a literal or an engine reference tree.
 *
 * @param checker - Program type checker.
 * @param member - Enum member to check.
 * @returns Whether the member is computable at build time.
 */
export function isComputableEnumMember(checker: ts.TypeChecker, member: ts.EnumMember): boolean {
  return getEnumMemberValue(checker, member, new Set()) !== null;
}

/**
 * Resolve a referenced symbol to a compile-time constant value when the reference is safe to fold.
 * Safe references are enum members, module-level const scalars, readonly `as const` object properties
 * and `static readonly` engine members from ambient 'xray16' typings - values that cannot legally
 * change at runtime. Tags are not required on referenced declarations.
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
): TFoldedValue | null {
  const resolved: ts.Symbol = (symbol.flags & ts.SymbolFlags.Alias) !== 0 ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration: ts.Declaration | undefined = resolved.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  if (ts.isEnumMember(declaration)) {
    return getEnumMemberValue(checker, declaration, seen);
  }

  if (ts.isPropertyDeclaration(declaration)) {
    const path: Array<string> | null = getEngineConstantPath(declaration);

    if (path === null) {
      return null;
    }

    const type: ts.Type = checker.getTypeOfSymbolAtLocation(resolved, declaration);

    return {
      kind: "engine-ref",
      path,
      isNumeric: type.isNumberLiteral() || (type.flags & ts.TypeFlags.NumberLike) !== 0,
    };
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
 * Initializers are folded first so engine references are substituted as expressions - the declared
 * literal type fast path would silently bake possibly stale values claimed by typings.
 * Declared unit types are only used for initializer-less declarations like ambient constants.
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
): TFoldedValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
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

    return getDeclaredLiteralValue(checker, symbol);
  } finally {
    seen.delete(declaration);
  }
}

/**
 * Get the inlineable value for a symbol resolved from an access expression or identifier.
 * Only symbols declared inside tagged enums or variable statements produce values.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to resolve inline value for.
 * @returns Folded value, or null when the symbol is not tagged for inlining.
 */
export function tryGetInlineValue(checker: ts.TypeChecker, symbol: ts.Symbol): TFoldedValue | null {
  const declaration: ts.Declaration | undefined = symbol.valueDeclaration;

  if (declaration === undefined) {
    return null;
  }

  if (ts.isEnumMember(declaration)) {
    if (!hasInlineTag(declaration.parent)) {
      return null;
    }

    return getEnumMemberValue(checker, declaration, new Set());
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
