/**
 * Ambient declarations for the OpenXRay `marshal` library.
 *
 * See https://github.com/richardhundt/lua-marshal.
 *
 * These declarations are not modules. Add `"xray16/typedefs/marshal"` to `compilerOptions.types`, or use
 * `/// <reference types="xray16/typedefs/marshal" />`.
 *
 * @noSelfInFile
 */

/**
 * Marshal serialization global namespace.
 */
declare namespace marshal {
  /**
   * Deep-clone a table-like value.
   */
  function clone<T extends LuaTable | Record<any, any>>(table: T): T;

  /**
   * Decode a byte stream into a table-like value.
   */
  function decode<T extends LuaTable | Record<any, any> | Array<unknown>>(serialized: string, constants?: Partial<T>): T;

  /**
   * Encode a table-like value into a byte stream.
   */
  function encode<T extends LuaTable | Record<any, any>>(table: T, constants?: Partial<T>): string;
}
