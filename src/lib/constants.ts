/**
 * Shared compile-time constants.
 *
 * All are tagged `@inline`: the `inline` plugin folds their usages into literals in the emitted Lua (no runtime
 * table), while jest/node get the real values from the compiled `lib.js`.
 */

/**
 * Lua `nil` string representation.
 *
 * @inline
 */
export const NIL: "nil" = "nil" as const;

/**
 * Lua `true` string representation.
 *
 * @inline
 */
export const TRUE: "true" = "true" as const;

/**
 * Lua `false` string representation.
 *
 * @inline
 */
export const FALSE: "false" = "false" as const;

/**
 * Maximum unsigned 32-bit integer.
 *
 * @inline
 */
export const MAX_U32: 4_294_967_295 = 4_294_967_295 as const;

/**
 * Maximum signed 32-bit integer.
 *
 * @inline
 */
export const MAX_I32: 2_147_483_647 = 2_147_483_647 as const;

/**
 * Minimum signed 32-bit integer.
 *
 * @inline
 */
export const MIN_I32: -2_147_483_648 = -2_147_483_648 as const;

/**
 * Maximum unsigned 16-bit integer.
 *
 * @inline
 */
export const MAX_U16: 65_535 = 65_535 as const;

/**
 * Maximum signed 16-bit integer.
 *
 * @inline
 */
export const MAX_I16: 32_767 = 32_767 as const;

/**
 * Maximum unsigned 8-bit integer.
 *
 * @inline
 */
export const MAX_U8: 255 = 255 as const;

/**
 * Maximum signed 8-bit integer.
 *
 * @inline
 */
export const MAX_I8: 127 = 127 as const;

/**
 * Minimum signed 8-bit integer.
 *
 * @inline
 */
export const MIN_I8: -128 = -128 as const;
