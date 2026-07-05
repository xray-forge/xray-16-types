/**
 * Ambient declarations for LuaJIT globals available in the X-Ray runtime.
 *
 * Use this file for Lua standard-library members that TypeScriptToLua typings do not expose.
 * These declarations are not modules. Add `"xray16/typedefs/luajit"` to `compilerOptions.types`, or use
 * `/// <reference types="xray16/typedefs/luajit" />`.
 *
 * @noSelfInFile
 */

/**
 * Lua `table` helpers available in the X-Ray LuaJIT runtime.
 */
declare namespace table {
  /**
   * Join table values into a string.
   */
  function concat<K extends AnyNotNil, V>(list: LuaTable<K, V>, separator: string): string;

  /**
   * Append a value to an array-like table.
   */
  function insert<K extends AnyNotNil, V>(list: LuaTable<K, V>, value: V): void;

  /**
   * Append a value to a JavaScript array used in tests or tooling.
   */
  function insert<V>(list: Array<V>, value: V): void;

  /**
   * Sort an array-like Lua table in place.
   */
  function sort<K extends AnyNotNil, V>(list: LuaTable<K, V>, cb: (left: V, right: V) => boolean): void;

  /**
   * Remove an item by numeric index.
   */
  function remove(list: LuaTable<any>, index: number): void;
}

/**
 * Lua `string` helpers available in the X-Ray LuaJIT runtime.
 */
declare namespace string {
  /**
   * Iterate matches for a pattern.
   */
  function gfind(this: void, s: string | number, pattern: unknown, init?: number, plain?: boolean): LuaIterable<string>;
}

/**
 * Lua `math` helpers available in the X-Ray LuaJIT runtime.
 */
declare namespace math {
  /**
   * Return the remainder of a division.
   */
  function mod(target: number, module: number): number;

  /**
   * Return the arc tangent of `first / second`, using both signs to choose the quadrant.
   */
  function atan2(first: number, second: number): number;
}

/**
 * Iterate numeric keys and non-null values in a Lua table.
 */
declare function ipairs<T>(table: LuaTable<number, T>): LuaIterable<LuaMultiReturn<[number, NonNullable<T>]>>;
