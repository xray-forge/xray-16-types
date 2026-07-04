/**
 * JSDoc tag marking declarations as whitelisted for compile-time inlining.
 */
export const INLINE_TAG: string = "inline";

/**
 * JSDoc tag marking declarations for compile-time inlining and erasure from emitted output.
 * Includes `@inline` behavior and requires every value reference to be erasable.
 */
export const VIRTUAL_TAG: string = "virtual";

/**
 * Value types that can be inlined as Lua literals.
 */
export type TInlineValue = string | number | boolean;

/**
 * Reference to a runtime-constant engine value like 'stalker_ids.action_dying'.
 * Emitted as a global access expression instead of a baked literal, so values stay correct
 * even when engine builds diverge from the literal types declared in typings.
 */
export interface IEngineReference {
  kind: "engine-ref";
  path: Array<string>;
  isNumeric: boolean;
}

/**
 * Binary numeric expression mixing engine references with other folded values.
 */
export interface IFoldedBinary {
  kind: "binary";
  operator: TFoldedBinaryOperator;
  left: TFoldedValue;
  right: TFoldedValue;
}

/**
 * Numeric negation of a folded expression.
 */
export interface IFoldedNegation {
  kind: "negate";
  operand: TFoldedValue;
}

/**
 * Operators allowed in folded expression trees - restricted to those where emitted Lua matches
 * tstl lowering exactly. '%', bitwise operators and string concatenation are rejected for trees.
 */
export type TFoldedBinaryOperator = "+" | "-" | "*" | "/" | "**";

/**
 * Expression parts of folded values that cannot be computed to plain literals at build time.
 */
export type TFoldedExpression = IEngineReference | IFoldedBinary | IFoldedNegation;

/**
 * Result of build-time folding - either a plain literal or an expression tree with engine references.
 */
export type TFoldedValue = TInlineValue | TFoldedExpression;

/**
 * Check whether folded value is an expression tree rather than a plain literal.
 *
 * @param value - Folded value to check.
 * @returns Whether value is an expression tree.
 */
export function isFoldedExpression(value: TFoldedValue): value is TFoldedExpression {
  return typeof value === "object";
}

/**
 * Check whether folded value is numeric - a number literal or a numeric expression tree.
 *
 * @param value - Folded value to check.
 * @returns Whether value is numeric.
 */
export function isNumericFoldedValue(value: TFoldedValue): boolean {
  if (typeof value === "number") {
    return true;
  }

  if (typeof value === "object") {
    return value.kind === "engine-ref" ? value.isNumeric : true;
  }

  return false;
}

/**
 * Numeric namespace constants with identical IEEE 754 double values in the build environment and LuaJIT runtime.
 * Covers both TS 'Math' and Lua 'math' namespaces. Function calls are intentionally not supported because
 * libm implementations may differ between build machine and game runtime.
 */
export const FOLDABLE_NAMESPACE_CONSTANTS: Record<string, Record<string, number>> = {
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
