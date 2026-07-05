/**
 * Ambient global type definitions for open-xray Lua standard library extensions.
 *
 * These are extra methods open-xray adds to the base `table` and `string` libraries. They are ambient
 * globals, so reference this file from a consumer instead of importing it, e.g. add
 * `"xray16/typedefs/extensions"` to the `types` array of your tsconfig or use
 * `/// <reference types="xray16/typedefs/extensions" />`.
 */

/**
 * Extension methods for table.
 */
declare namespace table {
  /**
   * Get random value from table.
   * Provided by lua extensions lib in open-xray.
   *
   * @returns Random value from table.
   */
  function random<K extends AnyNotNil, V>(list: LuaTable<K, V> | LuaMap<K, V>): LuaMultiReturn<[K, V]>;

  /**
   * Get table size.
   * Provided by lua extensions lib in open-xray.
   *
   * @returns Table size.
   */
  function size<V>(list: Array<V>): number;
  function size<V extends string = string>(list: Record<V, unknown>): number;
  function size<K extends AnyNotNil, V>(list: LuaTable<K, V>): number;
  function size<K extends AnyNotNil, V>(list: LuaMap<K, V>): number;

  /**
   * Get table keys.
   * Provided by lua extensions lib in open-xray.
   *
   * @returns List of keys in an unordered way.
   */
  function keys<K extends AnyNotNil, V>(list: LuaTable<K, V>): LuaTable<number, K>;

  /**
   * Get table values.
   * Provided by lua extensions lib in open-xray.
   *
   * @returns List of values in an unordered way.
   */
  function values<K extends AnyNotNil, V>(list: LuaTable<K, V>): LuaTable<number, V>;
}

/**
 * Extension methods for string.
 */
declare namespace string {
  /**
   * Trim all spaces from both sides of string.
   */
  function trim(value: string): string;

  /**
   * Trim spaces from left side of string.
   */
  function trim_l(value: string): string;

  /**
   * Trim spaces from right side of string.
   */
  function trim_r(value: string): string;

  /**
   * Trim everything separated by spaces from first text entry.
   */
  function trim_w(value: string): string;
}
