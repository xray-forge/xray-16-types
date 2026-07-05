/**
 * Ambient declarations for OpenXRay Lua standard-library extensions.
 *
 * These globals extend the base `table` and `string` libraries. They are not modules.
 * Add `"xray16/typedefs/extensions"` to `compilerOptions.types`, or use
 * `/// <reference types="xray16/typedefs/extensions" />`.
 *
 * @noSelfInFile
 */

/**
 * OpenXRay `table` helpers.
 */
declare namespace table {
  /**
   * Pick a random key/value pair from a Lua table.
   *
   * @returns Selected key and value.
   */
  function random<K extends AnyNotNil, V>(list: LuaTable<K, V> | LuaMap<K, V>): LuaMultiReturn<[K, V]>;

  /**
   * Count entries in an array, record, Lua table, or Lua map.
   *
   * @returns Number of entries.
   */
  function size<V>(list: Array<V>): number;
  function size<V extends string = string>(list: Record<V, unknown>): number;
  function size<K extends AnyNotNil, V>(list: LuaTable<K, V>): number;
  function size<K extends AnyNotNil, V>(list: LuaMap<K, V>): number;

  /**
   * Collect table keys.
   *
   * @returns Unordered Lua table of keys.
   */
  function keys<K extends AnyNotNil, V>(list: LuaTable<K, V>): LuaTable<number, K>;

  /**
   * Collect table values.
   *
   * @returns Unordered Lua table of values.
   */
  function values<K extends AnyNotNil, V>(list: LuaTable<K, V>): LuaTable<number, V>;
}

/**
 * OpenXRay `string` helpers.
 */
declare namespace string {
  /**
   * Trim whitespace from both ends.
   */
  function trim(value: string): string;

  /**
   * Trim whitespace from the left side.
   */
  function trim_l(value: string): string;

  /**
   * Trim whitespace from the right side.
   */
  function trim_r(value: string): string;

  /**
   * Return the first whitespace-separated word.
   */
  function trim_w(value: string): string;
}
