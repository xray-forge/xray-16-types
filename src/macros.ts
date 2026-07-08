/**
 * Runtime module for the `macros` build plugin.
 *
 * Consumer source imports these from `xray16/macros`; the `macros` plugin strips the import and folds
 * the usages at build time (identifiers to literals, calls to nil-checks / unwrapped casts). The runtime
 * implementations here exist so the same code runs unmodified under jest/node without hand-written mocks.
 */

type Nillable<T> = T | null | undefined;

/**
 * Current source file name.
 *
 * Replaced with a compile-time literal by the `macros` plugin. At runtime it is a stub, since a shared
 * module cannot know the importing file.
 */
export const $filename: string = "$filename";

/**
 * Current source directory name.
 *
 * Replaced with a compile-time literal by the `macros` plugin. At runtime it is a stub, since a shared
 * module cannot know the importing file.
 */
export const $dirname: string = "$dirname";

/**
 * Force compile-time inlining of the wrapped call or constant expression.
 *
 * The `inline` plugin splices the target function body or folds the constant at this call site even when
 * the target declaration carries no inlining tag, and fails the build when the target cannot be inlined.
 * At runtime the helper returns the provided value unchanged.
 *
 * @param value - Call or constant expression to inline.
 * @returns Same value.
 */
export function $inline<T>(value: T): T {
  return value;
}

/**
 * Suppress compile-time inlining of the wrapped call or reference.
 *
 * The `inline` plugin emits a direct runtime call or reference for the wrapped target even when its
 * declaration is tagged for inlining. Virtual declarations are erased from emitted output and cannot be
 * referenced directly, so suppressing them fails the build. At runtime the helper returns the provided
 * value unchanged.
 *
 * @param value - Call or reference to keep as a runtime access.
 * @returns Same value.
 */
export function $noInline<T>(value: T): T {
  return value;
}

/**
 * Check whether a value is nil-compatible in Lua and Jest runtimes.
 *
 * @param value - Value to check.
 * @returns Whether value is `null` or `undefined`.
 */
export function $isNil(value: unknown): value is Nillable<never> {
  return value === undefined || value === null;
}

/**
 * Check whether a value is not nil-compatible in Lua and Jest runtimes.
 *
 * @param value - Value to check.
 * @returns Whether value is neither `null` nor `undefined`.
 */
export function $isNotNil<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

/**
 * Treat a TypeScript array as a Lua array.
 *
 * The plugin removes this call and emits its argument (arrays are Lua tables in the game). At runtime it
 * builds a `LuaTable` with 1-based keys via the environment's `LuaTable` runtime, so consumers can use the
 * result through the `LuaTable` API under jest/node.
 *
 * @param array - TypeScript array.
 * @returns Same values as a Lua array.
 */
export function $fromArray<T>(array: Array<T>): LuaTable<number, T> {
  const table: LuaTable<number, T> = new LuaTable();

  array.forEach((value, index) => table.set(index + 1, value));

  return table;
}

/**
 * Treat a Lua array as a TypeScript array.
 *
 * The plugin removes this call and emits its argument. At runtime it reads the 1-based `LuaTable` entries
 * back into a TypeScript array.
 *
 * @param array - Lua array.
 * @returns Same values as a TypeScript array.
 */
export function $fromLuaArray<T>(array: LuaTable<number, T>): Array<T> {
  const result: Array<T> = [];

  for (const [index, value] of array) {
    result[index - 1] = value;
  }

  return result;
}

/**
 * Treat a TypeScript object as a Lua table.
 *
 * The plugin removes this call and emits its argument. At runtime it builds a `LuaTable` via the
 * environment's `LuaTable` runtime; numeric-string keys become numeric keys to match Lua semantics.
 *
 * @param object - TypeScript object.
 * @returns Same entries as a Lua table.
 */
export function $fromObject<K extends string | number, T>(object: Record<K, T>): LuaTable<K, T>;
export function $fromObject<D>(object: D): LuaTable<keyof D, D[keyof D]>;
export function $fromObject(object: any): any {
  const table: LuaTable<string | number, unknown> = new LuaTable();

  for (const [key, value] of Object.entries(object as Record<string, unknown>)) {
    const numeric: number = Number.parseInt(key, 10);

    table.set(Number.isNaN(numeric) ? key : numeric, value);
  }

  return table;
}

/**
 * Treat a Lua table as a TypeScript object.
 *
 * The plugin removes this call and emits its argument. At runtime it reads the `LuaTable` entries back
 * into a plain TypeScript object.
 *
 * @param object - Lua table.
 * @returns Same entries as a TypeScript object.
 */
export function $fromLuaTable<K extends string | number, T>(object: LuaTable<K, T>): Record<K, T>;
export function $fromLuaTable<D>(object: LuaTable<keyof D, D[keyof D]>): D;
export function $fromLuaTable(object: any): any {
  const record: Record<string, unknown> = {};

  for (const [key, value] of object as LuaTable<string | number, unknown>) {
    record[key as string] = value;
  }

  return record;
}
