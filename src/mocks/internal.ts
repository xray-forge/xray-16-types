/**
 * Internal constants and utility types for the jest Lua runtime mocks.
 *
 * These mirror the small set of engine values the fixtures used to depend on, inlined here so the runtime
 * ships without reaching back into any consumer package. They are intentionally not re-exported from the
 * module barrel.
 */

/**
 * Maximum unsigned 32-bit integer, used to decide integer vs float pushes into the Lua VM.
 */
export const MAX_U32: 4_294_967_295 = 4_294_967_295 as const;

/**
 * Lua `nil` string representation.
 */
export const NIL: "nil" = "nil" as const;

export type TIndex = number;

export type AnyObject = Record<string, any>;

export type AnyArgs = Array<any>;

export type Nillable<T> = T | undefined | null;

export type LuaArray<T> = LuaTable<TIndex, T>;
