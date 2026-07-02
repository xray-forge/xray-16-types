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
