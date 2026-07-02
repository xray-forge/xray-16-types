import * as ts from "typescript";

import { INLINE_TAG } from "./constants";

/**
 * Check whether node is annotated with `@inline` JSDoc tag.
 *
 * @param node - Node to check tags for.
 * @returns Whether the node has `@inline` JSDoc tag.
 */
export function hasInlineTag(node: ts.Node): boolean {
  return ts.getJSDocTags(node).some((it) => it.tagName.text === INLINE_TAG);
}

/**
 * Find variable statement containing provided declaration node, if any.
 *
 * @param node - Declaration node to walk up from.
 * @returns Containing variable statement or null.
 */
export function getContainingVariableStatement(node: ts.Node): ts.VariableStatement | null {
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
export function unwrapInitializer(expression?: ts.Expression): ts.Expression | null {
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
 * Check whether variable statement is a module-level `const` declaration.
 *
 * @param statement - Variable statement to check.
 * @returns Whether statement is module-level const.
 */
export function isModuleLevelConst(statement: ts.VariableStatement): boolean {
  return ts.isSourceFile(statement.parent) && (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
}

/**
 * Check whether expression is wrapped with `as const` assertion, possibly through parens/satisfies wrappers.
 *
 * @param expression - Expression to check.
 * @returns Whether expression has `as const` assertion.
 */
export function hasAsConstAssertion(expression?: ts.Expression): boolean {
  let current: ts.Expression | undefined = expression;

  while (current !== undefined) {
    if (
      ts.isAsExpression(current) &&
      ts.isTypeReferenceNode(current.type) &&
      current.type.typeName.getText() === "const"
    ) {
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
export function isReadonlyModuleConstProperty(
  declaration: ts.PropertyAssignment | ts.ShorthandPropertyAssignment
): boolean {
  let sawAsConst: boolean = false;
  let current: ts.Node = declaration.parent;

  while (current !== undefined && !ts.isVariableDeclaration(current)) {
    if (
      ts.isAsExpression(current) &&
      ts.isTypeReferenceNode(current.type) &&
      current.type.typeName.getText() === "const"
    ) {
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
 * Check whether identifier node is used in a value position where it can be replaced with a literal.
 *
 * @param node - Identifier node to check.
 * @returns Whether identifier is a replace-able value usage.
 */
export function isValueUsagePosition(node: ts.Identifier): boolean {
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
 * Resolve member symbol for property/element access expression.
 * Element access with literal key is resolved through object type when direct symbol resolution fails.
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

  if (
    ts.isElementAccessExpression(node) &&
    (ts.isStringLiteralLike(node.argumentExpression) || ts.isNumericLiteral(node.argumentExpression))
  ) {
    return checker.getTypeAtLocation(node.expression).getProperty(node.argumentExpression.text) ?? null;
  }

  return null;
}
