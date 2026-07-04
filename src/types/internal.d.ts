/**
 * Internal helper for engine APIs that accept Lua nil values.
 */
export type Nillable<T> = T | null | undefined;

export type Nullable<T> = T | null;
