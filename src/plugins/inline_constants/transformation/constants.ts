/**
 * JSDoc tag marking declarations as whitelisted for compile-time inlining.
 */
export const INLINE_TAG: string = "inline";

/**
 * Value types that can be inlined as lua literals.
 */
export type TInlineValue = string | number | boolean;

/**
 * Numeric namespace constants that are identical IEEE 754 doubles in build environment and LuaJIT runtime.
 * Covers both TS 'Math' and lua 'math' namespaces, function calls are intentionally not supported
 * since libm implementations may differ between build machine and game runtime.
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
