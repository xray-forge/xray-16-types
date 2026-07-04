/**
 * Ambient global type definitions for the LuaFileSystem library available in open-xray builds.
 * See https://lunarmodules.github.io/luafilesystem/index.html.
 *
 * These are ambient globals, so reference this file from a consumer instead of importing it, e.g. add
 * `"xray16/typedefs/lfs"` to the `types` array of your tsconfig or use
 * `/// <reference types="xray16/typedefs/lfs" />`.
 */

/**
 * LuaFileSystem LUA library.
 */
declare namespace lfs {
  function lock(filehandle: unknown): void;
  function touch(path: string): void;
  function currentdir(): string;
  function lock_dir(path: string): void;
  function mkdir(path: string): void;
  function symlinkattributes(): void;
  function chdir(path: string): void;
  function unlock(path: string): void;
  function dir(path: string): LuaMultiReturn<[LuaIterable<string, unknown>, { next: () => string | null }]>;
  function rmdir(path: string): void;
  function link(old: string, next: string): void;
  function attributes(filepath: string): LuaTable | null;
  function setmode(): void;
}
