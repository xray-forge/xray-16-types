/**
 * Ambient global type definitions for the marshal library added in open-xray.
 * See https://github.com/richardhundt/lua-marshal.
 *
 * These are ambient globals, so reference this file from a consumer instead of importing it, e.g. add
 * `"xray16/typedefs/marshal"` to the `types` array of your tsconfig or use
 * `/// <reference types="xray16/typedefs/marshal" />`.
 */

/**
 * Marshal LUA library.
 */
declare namespace marshal {
  /**
   * Deep clone a value (deep for tables and functions).
   */
  function clone<T extends LuaTable | Record<any, any>>(table: T): T;

  /**
   * Deserializes a byte stream to a value.
   */
  function decode<T extends LuaTable | Record<any, any> | Array<unknown>>(serialized: string, constants?: Partial<T>): T;

  /**
   * Serialize a value to a byte stream.
   */
  function encode<T extends LuaTable | Record<any, any>>(table: T, constants?: Partial<T>): string;
}
