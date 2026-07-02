import * as ts from "typescript";

import { INLINE_TAG, VIRTUAL_TAG } from "./constants";

/**
 * Check whether a node has the provided JSDoc tag.
 *
 * @param node - Node to check tags for.
 * @param tag - Tag name to look for.
 * @returns Whether the node has the JSDoc tag.
 */
function hasJsDocTag(node: ts.Node, tag: string): boolean {
  return ts.getJSDocTags(node).some((it) => it.tagName.text === tag);
}

/**
 * Check whether a node is whitelisted for inlining.
 * Both `@inline` and `@virtual` enable inlining; `@virtual` adds erasure rules elsewhere.
 *
 * @param node - Node to check tags for.
 * @returns Whether the node is whitelisted for inlining.
 */
export function hasInlineTag(node: ts.Node): boolean {
  return hasJsDocTag(node, INLINE_TAG) || hasJsDocTag(node, VIRTUAL_TAG);
}

/**
 * Check whether a node has the `@virtual` JSDoc tag.
 *
 * @param node - Node to check tags for.
 * @returns Whether the node has `@virtual` JSDoc tag.
 */
export function hasVirtualTag(node: ts.Node): boolean {
  return hasJsDocTag(node, VIRTUAL_TAG);
}

/**
 * Find the variable statement that contains the provided declaration node.
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
 * Unwrap an initializer expression from `as`, `satisfies`, and parenthesized wrappers.
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
 * @returns Whether the statement is a module-level const.
 */
export function isModuleLevelConst(statement: ts.VariableStatement): boolean {
  return ts.isSourceFile(statement.parent) && (statement.declarationList.flags & ts.NodeFlags.Const) !== 0;
}

/**
 * Check whether an expression is wrapped in an `as const` assertion, possibly through parens/satisfies wrappers.
 *
 * @param expression - Expression to check.
 * @returns Whether the expression has an `as const` assertion.
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
 * Check whether a property is declared inside an `as const` object literal assigned to a module-level const.
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
 * Check whether an identifier is used in a value position where it can be replaced with a literal.
 *
 * @param node - Identifier node to check.
 * @returns Whether the identifier is a replaceable value usage.
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
