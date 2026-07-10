import * as ts from "typescript";

import { INLINE_MACRO, NO_INLINE_MACRO } from "./constants";

/**
 * Call-site override requested through the `$inline` / `$noInline` macros.
 */
export type TInlineOverrideKind = "force" | "suppress";

/**
 * Get the override kind of a `$inline` / `$noInline` macro call.
 * Matching is name-based, following the `xray16/macros` helper convention.
 *
 * @param node - Node to check.
 * @returns Override kind, or null when the node is not an override macro call.
 */
export function getOverrideMacroKind(node: ts.Node): TInlineOverrideKind | null {
  if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) {
    return null;
  }

  if (node.expression.text === INLINE_MACRO) {
    return "force";
  }

  return node.expression.text === NO_INLINE_MACRO ? "suppress" : null;
}

/**
 * Check whether a node is the direct argument of a `$noInline` macro call, so inlining of the node
 * itself must be suppressed. Nested expressions (call arguments, access bases) are not affected.
 *
 * @param node - Node to check.
 * @returns Whether the node is a suppressed inline target.
 */
export function isNoInlineArgument(node: ts.Node): boolean {
  const parent: ts.Node | undefined = node.parent;

  return (
    parent !== undefined &&
    getOverrideMacroKind(parent) === "suppress" &&
    (parent as ts.CallExpression).arguments[0] === node
  );
}

/**
 * Check whether a node is the direct argument of a `$inline` macro call.
 *
 * @param node - Node to check.
 * @returns Whether the node is a forced inline target.
 */
export function isInlineArgument(node: ts.Node): boolean {
  const parent: ts.Node | undefined = node.parent;

  return (
    parent !== undefined &&
    getOverrideMacroKind(parent) === "force" &&
    (parent as ts.CallExpression).arguments[0] === node
  );
}

/**
 * Walk up through wrapping `$inline` / `$noInline` macro calls to the outermost wrapper.
 * Used to decide statement position for calls written as `$inline(voidCall());`.
 *
 * @param node - Expression to walk up from.
 * @returns The outermost wrapping macro call, or the node itself when not wrapped.
 */
export function getOverrideWrapperTop(node: ts.Expression): ts.Expression {
  let current: ts.Expression = node;

  while (
    current.parent !== undefined &&
    getOverrideMacroKind(current.parent) !== null &&
    (current.parent as ts.CallExpression).arguments[0] === current
  ) {
    current = current.parent as ts.CallExpression;
  }

  return current;
}
