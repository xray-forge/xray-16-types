import type { Nillable, Nullable } from "./internal";

declare global {
  /**
   * Current source file name injected at transpile time.
   *
   * @group xrf_plugin
   */
  const $filename: string;

  /**
   * Current source directory name injected at transpile time.
   *
   * @group xrf_plugin
   */
  const $dirname: string;

  /**
   * Check whether a value is nil-compatible in Lua and Jest runtimes.
   *
   * @group xrf_plugin
   *
   * @param value - Value to check.
   * @returns Whether value is `null` or `undefined`.
   */
  function $isNil(value: unknown): value is Nillable<never>;

  /**
   * Check whether a value is not nil-compatible in Lua and Jest runtimes.
   *
   * @group xrf_plugin
   *
   * @param value - Value to check.
   * @returns Whether value is neither `null` nor `undefined`.
   */
  function $isNotNil<T>(value: T): value is NonNullable<T>;

  /**
   * Treat a TypeScript array as a Lua array.
   *
   * The transformer removes this call and emits its argument.
   *
   * @group xrf_plugin
   *
   * @param array - TypeScript array.
   * @returns Same value typed as a Lua array.
   */
  function $fromArray<T>(array: Array<T>): LuaTable<number, T>;

  /**
   * Treat a Lua array as a TypeScript array.
   *
   * The transformer removes this call and emits its argument.
   *
   * @group xrf_plugin
   *
   * @param array - Lua array.
   * @returns Same value typed as a TypeScript array.
   */
  function $fromLuaArray<T>(array: LuaTable<number, T>): Array<T>;

  /**
   * Treat a TypeScript object as a Lua table.
   *
   * The transformer removes this call and emits its argument.
   *
   * @group xrf_plugin
   *
   * @param object - TypeScript object.
   * @returns Same value typed as a Lua table.
   */
  function $fromObject<K extends string | number, T>(object: Record<K, T>): LuaTable<K, T>;

  /**
   * Treat a TypeScript object as a Lua table.
   *
   * The transformer removes this call and emits its argument.
   *
   * @group xrf_plugin
   *
   * @param object - TypeScript object.
   * @returns Same value typed as a Lua table.
   */
  function $fromObject<D>(object: D): LuaTable<keyof D, D[keyof D]>;

  /**
   * Treat a Lua table as a TypeScript object.
   *
   * The transformer removes this call and emits its argument.
   *
   * @group xrf_plugin
   *
   * @param object - Lua table.
   * @returns Same value typed as a TypeScript object.
   */
  function $fromLuaTable<K extends string | number, T>(object: LuaTable<K, T>): Record<K, T>;

  /**
   * Treat a Lua table as a TypeScript object.
   *
   * The transformer removes this call and emits its argument.
   *
   * @group xrf_plugin
   *
   * @param object - Lua table.
   * @returns Same value typed as a TypeScript object.
   */
  function $fromLuaTable<D>(object: LuaTable<keyof D, D[keyof D]>): D;
}

export {};
