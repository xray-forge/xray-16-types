import * as ts from "typescript";
import * as lua from "typescript-to-lua";
import { type Plugin } from "typescript-to-lua";

import { createErrorDiagnosticFactory } from "./utils/diagnostics";

const INLINE_TAG: string = "inline";

type TInlineValue = string | number | boolean;

/**
 * Numeric namespace constants that are identical IEEE 754 doubles in build environment and LuaJIT runtime.
 * Covers both TS 'Math' and lua 'math' namespaces, function calls are intentionally not supported
 * since libm implementations may differ between build machine and game runtime.
 */
const FOLDABLE_NAMESPACE_CONSTANTS: Record<string, Record<string, number>> = {
  Math: {
    E: Math.E,
    LN10: Math.LN10,
    LN2: Math.LN2,
    LOG10E: Math.LOG10E,
    LOG2E: Math.LOG2E,
    PI: Math.PI,
    SQRT1_2: Math.SQRT1_2,
    SQRT2: Math.SQRT2,
  },
  math: {
    pi: Math.PI,
  },
};

const createUnsupportedDeclarationError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' is supported only for enums and module-level 'const' declarations.`
);

const createNotModuleLevelError = createErrorDiagnosticFactory(
  `'@${INLINE_TAG}' declarations must be module-level statements.`
);

const createNotConstError = createErrorDiagnosticFactory(`'@${INLINE_TAG}' declarations must use 'const' keyword.`);

const createNotAsConstObjectError = createErrorDiagnosticFactory(
  (name: string) => `'@${INLINE_TAG}' object '${name}' must use 'as const' assertion.`
);

const createNotLiteralConstantError = createErrorDiagnosticFactory(
  (name: string) =>
    `'@${INLINE_TAG}' constant '${name}' must have a compile-time constant value, ` +
    "use a literal or an expression computable on build time."
);

const createNotLiteralPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' must have a compile-time constant value, ` +
    "use a literal or an expression computable on build time."
);

const createForeignPropertyError = createErrorDiagnosticFactory(
  (object: string, property: string) =>
    `'@${INLINE_TAG}' object '${object}' property '${property}' is declared outside of '@${INLINE_TAG}' statements, ` +
    `mark the source declaration with '@${INLINE_TAG}' too.`
);

const createNotConstantEnumMemberError = createErrorDiagnosticFactory(
  (name: string) => `'@${INLINE_TAG}' enum member '${name}' must have a compile-time constant value.`
);

/**
 * Check whether node is annotated with `@inline` JSDoc tag.
 *
 * @param node - Node to check tags for.
 * @returns Whether the node has `@inline` JSDoc tag.
 */
function hasInlineTag(node: ts.Node): boolean {
  return ts.getJSDocTags(node).some((it) => it.tagName.text === INLINE_TAG);
}

/**
 * Find variable statement containing provided declaration node, if any.
 *
 * @param node - Declaration node to walk up from.
 * @returns Containing variable statement or null.
 */
function getContainingVariableStatement(node: ts.Node): ts.VariableStatement | null {
  let current: ts.Node | undefined = node;

  while (current !== undefined && !ts.isSourceFile(current)) {
    if (ts.isVariableStatement(current)) {
      return current;
    }

    current = current.parent;
  }

  return null;
}

/**
 * Unwrap initializer expression from as/satisfies/parenthesized wrappers.
 *
 * @param expression - Initializer expression to unwrap.
 * @returns Unwrapped expression or null.
 */
function unwrapInitializer(expression?: ts.Expression): ts.Expression | null {
  let current: ts.Expression | null = expression ?? null;

  while (
    current !== null &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isTypeAssertionExpression(current))
  ) {
    current = current.expression;
  }

  return current;
}

/**
 * Get literal value of symbol declared type, if it is a unit type.
 * Uses declared type instead of flow-narrowed type so mutable narrowed values are never inlined.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to get declared literal value for.
 * @returns Literal value or null.
 */
function getDeclaredLiteralValue(checker: ts.TypeChecker, symbol: ts.Symbol): TInlineValue | null {
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
 * Check whether variable statement is a module-level `const` declaration.
 *
 * @param statement - Variable statement to check.
 * @returns Whether statement is module-level const.
 */
function isModuleLevelConst(statement: ts.VariableStatement): boolean {
  return ts.isSourceFile(statement.parent) && (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
}

/**
 * Check whether expression is wrapped with `as const` assertion, possibly through parens/satisfies wrappers.
 *
 * @param expression - Expression to check.
 * @returns Whether expression has `as const` assertion.
 */
function hasAsConstAssertion(expression?: ts.Expression): boolean {
  let current: ts.Expression | undefined = expression;

  while (current !== undefined) {
    if (ts.isAsExpression(current) && ts.isTypeReferenceNode(current.type) && current.type.typeName.getText() === "const") {
      return true;
    }

    if (ts.isAsExpression(current) || ts.isParenthesizedExpression(current) || ts.isSatisfiesExpression(current)) {
      current = current.expression;
    } else {
      return false;
    }
  }

  return false;
}

/**
 * Check whether property is declared inside an `as const` object literal assigned to a module-level const.
 * Such properties are readonly and cannot be legally reassigned, so their values are stable at runtime.
 *
 * @param declaration - Property declaration to check.
 * @returns Whether property value is safe to fold.
 */
function isReadonlyModuleConstProperty(
  declaration: ts.PropertyAssignment | ts.ShorthandPropertyAssignment
): boolean {
  let sawAsConst: boolean = false;
  let current: ts.Node = declaration.parent;

  while (current !== undefined && !ts.isVariableDeclaration(current)) {
    if (ts.isAsExpression(current) && ts.isTypeReferenceNode(current.type) && current.type.typeName.getText() === "const") {
      sawAsConst = true;
    }

    if (
      !ts.isObjectLiteralExpression(current) &&
      !ts.isPropertyAssignment(current) &&
      !ts.isAsExpression(current) &&
      !ts.isParenthesizedExpression(current) &&
      !ts.isSatisfiesExpression(current)
    ) {
      return false;
    }

    current = current.parent;
  }

  if (current === undefined || !sawAsConst) {
    return false;
  }

  const statement: ts.VariableStatement | null = getContainingVariableStatement(current);

  return statement !== null && isModuleLevelConst(statement);
}

/**
 * Convert folded value to string for concatenation contexts.
 * Non-integer numbers are rejected - JS 'String()' and LuaJIT 'tostring' format them differently
 * (17 significant digits vs '%.14g'), so folding would change runtime-visible output.
 *
 * @param value - Folded value to convert.
 * @returns String representation or null.
 */
function toFoldedString(value: TInlineValue | null): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" && Number.isInteger(value) && Math.abs(value) < 1e14) {
    return String(value);
  }

  return null;
}

/**
 * Guard folded numeric results against NaN / Infinity that cannot be emitted as lua literals.
 *
 * @param value - Folded numeric value.
 * @returns Finite number or null.
 */
function toFiniteNumber(value: number): number | null {
  return Number.isFinite(value) ? value : null;
}

/**
 * Fold binary expression of constant operands with JS semantics.
 * JS semantics are the correct target since tstl preserves them at runtime (e.g. '%' on negative operands).
 *
 * @param operator - Binary operator kind.
 * @param left - Folded left operand.
 * @param right - Folded right operand.
 * @returns Folded value or null.
 */
function foldBinaryExpression(operator: ts.SyntaxKind, left: TInlineValue, right: TInlineValue): TInlineValue | null {
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
 * Evaluate expression to a compile-time constant value when possible.
 * Supports literals, unary/binary arithmetic, string concatenation, template literals,
 * references to enum members / module-level const scalars / `as const` object properties
 * and whitelisted namespace constants like 'math.pi'.
 *
 * @param checker - Program type checker.
 * @param expression - Expression to evaluate.
 * @param seen - Set of declarations on current resolution path, guards from circular references.
 * @returns Folded constant value or null.
 */
function evaluateConstantExpression(
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
 * Resolve referenced symbol to a compile-time constant value when the reference is safe to fold.
 * Safe references are enum members, module-level const scalars and readonly `as const` object properties -
 * values that cannot legally change at runtime. Tags are not required on referenced declarations.
 *
 * @param checker - Program type checker.
 * @param symbol - Referenced symbol to resolve.
 * @param seen - Set of declarations on current resolution path.
 * @returns Folded constant value or null.
 */
function resolveConstantSymbol(checker: ts.TypeChecker, symbol: ts.Symbol, seen: Set<ts.Declaration>): TInlineValue | null {
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
 * Get constant value of a declaration - declared unit type first, initializer folding as fallback.
 * Safety and tagging requirements are checked by callers.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to get value for.
 * @param seen - Set of declarations on current resolution path.
 * @returns Constant value or null.
 */
function getComputedDeclarationValue(
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
 * Get inline-able literal value for a symbol resolved from an access expression or identifier.
 * Only symbols declared inside `@inline` tagged enums / variable statements produce values.
 *
 * @param checker - Program type checker.
 * @param symbol - Symbol to resolve inline value for.
 * @returns Literal value or null.
 */
function tryGetInlineValue(checker: ts.TypeChecker, symbol: ts.Symbol): TInlineValue | null {
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

/**
 * Resolve member symbol for property/element access expression.
 * Element access with literal key is resolved through object type when direct symbol resolution fails.
 *
 * @param checker - Program type checker.
 * @param node - Access expression to resolve symbol for.
 * @returns Resolved member symbol or null.
 */
function resolveMemberSymbol(
  checker: ts.TypeChecker,
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression
): ts.Symbol | null {
  const symbol: ts.Symbol | undefined = checker.getSymbolAtLocation(node);

  if (symbol !== undefined) {
    return symbol;
  }

  if (
    ts.isElementAccessExpression(node) &&
    (ts.isStringLiteralLike(node.argumentExpression) || ts.isNumericLiteral(node.argumentExpression))
  ) {
    return checker.getTypeAtLocation(node.expression).getProperty(node.argumentExpression.text) ?? null;
  }

  return null;
}

/**
 * Create lua literal expression for provided constant value.
 *
 * @param value - Constant value to create literal for.
 * @param node - Original typescript node.
 * @returns Lua literal expression.
 */
function createLiteralExpression(value: TInlineValue, node: ts.Node): lua.Expression {
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
 * Check whether identifier node is used in a value position where it can be replaced with a literal.
 *
 * @param node - Identifier node to check.
 * @returns Whether identifier is a replace-able value usage.
 */
function isValueUsagePosition(node: ts.Identifier): boolean {
  const parent: ts.Node | undefined = node.parent;

  if (parent === undefined || ts.isPartOfTypeNode(node)) {
    return false;
  }

  if (ts.isPropertyAccessExpression(parent)) {
    return parent.expression === node;
  }

  if (
    ts.isPropertyAssignment(parent) ||
    ts.isBindingElement(parent) ||
    ts.isParameter(parent) ||
    ts.isEnumMember(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isVariableDeclaration(parent)
  ) {
    return parent.initializer === node;
  }

  if (
    ts.isShorthandPropertyAssignment(parent) ||
    ts.isImportSpecifier(parent) ||
    ts.isImportClause(parent) ||
    ts.isNamespaceImport(parent) ||
    ts.isExportSpecifier(parent) ||
    ts.isNamespaceExport(parent) ||
    ts.isImportEqualsDeclaration(parent) ||
    ts.isQualifiedName(parent) ||
    ts.isLabeledStatement(parent) ||
    ts.isBreakOrContinueStatement(parent)
  ) {
    return false;
  }

  if (
    ts.isFunctionDeclaration(parent) ||
    ts.isFunctionExpression(parent) ||
    ts.isClassDeclaration(parent) ||
    ts.isClassExpression(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isModuleDeclaration(parent) ||
    ts.isEnumDeclaration(parent) ||
    ts.isInterfaceDeclaration(parent) ||
    ts.isTypeAliasDeclaration(parent)
  ) {
    return parent.name !== node;
  }

  return true;
}

/**
 * Validate `@inline` tagged variable statement and push diagnostics for not supported shapes.
 * Tagged statements must be module-level `const` declarations with literal scalars or flat `as const` object literals.
 *
 * @param statement - Tagged variable statement to validate.
 * @param context - Transformation context.
 */
function validateVariableStatement(statement: ts.VariableStatement, context: lua.TransformationContext): void {
  if (!ts.isSourceFile(statement.parent)) {
    context.diagnostics.push(createNotModuleLevelError(statement));
  }

  if ((statement.declarationList.flags & ts.NodeFlags.Const) === 0) {
    context.diagnostics.push(createNotConstError(statement));

    return;
  }

  for (const declaration of statement.declarationList.declarations) {
    const name: string = declaration.name.getText();
    const initializer: ts.Expression | null = unwrapInitializer(declaration.initializer);

    if (initializer !== null && ts.isObjectLiteralExpression(initializer)) {
      if (!hasAsConstAssertion(declaration.initializer)) {
        context.diagnostics.push(createNotAsConstObjectError(declaration, name));
        continue;
      }

      const type: ts.Type = context.checker.getTypeAtLocation(declaration);

      for (const property of type.getProperties()) {
        const propertyDeclaration: ts.Declaration | undefined = property.valueDeclaration;
        const sourceStatement: ts.VariableStatement | null =
          propertyDeclaration === undefined ? null : getContainingVariableStatement(propertyDeclaration);

        if (sourceStatement !== statement && (sourceStatement === null || !hasInlineTag(sourceStatement))) {
          context.diagnostics.push(createForeignPropertyError(propertyDeclaration ?? declaration, name, property.name));
        } else if (getComputedDeclarationValue(context.checker, property, new Set()) === null) {
          context.diagnostics.push(
            createNotLiteralPropertyError(propertyDeclaration ?? declaration, name, property.name)
          );
        }
      }
    } else {
      const symbol: ts.Symbol | undefined = context.checker.getSymbolAtLocation(declaration.name);

      if (symbol === undefined || getComputedDeclarationValue(context.checker, symbol, new Set()) === null) {
        context.diagnostics.push(createNotLiteralConstantError(declaration, name));
      }
    }
  }
}

/**
 * Transform property/element access expressions, inline literal values of `@inline` tagged declarations.
 *
 * @param node - Access expression node to transform.
 * @param context - Transformation context.
 * @returns Lua literal when access resolves to a tagged constant, default transformation otherwise.
 */
function transformAccessExpression(
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  context: lua.TransformationContext
): lua.Expression {
  const symbol: ts.Symbol | null = resolveMemberSymbol(context.checker, node);
  const value: TInlineValue | null = symbol === null ? null : tryGetInlineValue(context.checker, symbol);

  return value === null ? context.superTransformExpression(node) : createLiteralExpression(value, node);
}

/**
 * Plugin that inlines compile-time constant values of `@inline` JSDoc tagged declarations.
 *
 * Supported targets are enums, module-level `as const` object literals and module-level scalar constants.
 * Values may be literals or expressions foldable on build time - arithmetic, string concatenation,
 * template literals and references to other constant declarations (enum members, const scalars,
 * `as const` object properties, whitelisted constants like 'math.pi').
 * Tagged declarations act as an explicit whitelist - member accesses are replaced with literal values in place,
 * while original tables are still emitted, so iteration / reverse mapping / whole-object usages keep working.
 * Tagged declarations that cannot be inlined produce build errors instead of silently emitting property lookups.
 */
const plugin: Plugin = {
  beforeTransform(program: ts.Program): Array<ts.Diagnostic> | void {
    // Force binder to assign node parents before any 'getJSDocTags' call,
    // otherwise empty results are computed for parent-less nodes and cached on them forever.
    program.getTypeChecker();

    const diagnostics: Array<ts.Diagnostic> = [];

    for (const sourceFile of program.getSourceFiles()) {
      if (sourceFile.isDeclarationFile) {
        continue;
      }

      for (const statement of sourceFile.statements) {
        if (hasInlineTag(statement) && !ts.isVariableStatement(statement) && !ts.isEnumDeclaration(statement)) {
          diagnostics.push(createUnsupportedDeclarationError(statement));
        }
      }
    }

    if (diagnostics.length > 0) {
      return diagnostics;
    }
  },
  visitors: {
    [ts.SyntaxKind.PropertyAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.ElementAccessExpression]: transformAccessExpression,
    [ts.SyntaxKind.Identifier]: (node, context) => {
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
    },
    [ts.SyntaxKind.VariableStatement]: (statement, context) => {
      if (hasInlineTag(statement)) {
        validateVariableStatement(statement, context);
      }

      return context.superTransformStatements(statement);
    },
    [ts.SyntaxKind.EnumDeclaration]: (node, context) => {
      if (hasInlineTag(node)) {
        for (const member of node.members) {
          if (context.checker.getConstantValue(member) === undefined) {
            context.diagnostics.push(createNotConstantEnumMemberError(member, member.name.getText()));
          }
        }
      }

      return context.superTransformStatements(node);
    },
  },
};

export default plugin;
