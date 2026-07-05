/**
 * Ambient declarations for LuaFileSystem in OpenXRay builds.
 *
 * See https://lunarmodules.github.io/luafilesystem/index.html.
 *
 * These declarations are not modules. Add `"xray16/typedefs/lfs"` to `compilerOptions.types`, or use
 * `/// <reference types="xray16/typedefs/lfs" />`.
 *
 * @noSelfInFile
 */

/**
 * LuaFileSystem global namespace.
 */
declare namespace lfs {
  /**
   * Lock a file handle.
   */
  function lock(filehandle: unknown): void;

  /**
   * Update a file timestamp or create an empty file.
   */
  function touch(path: string): void;

  /**
   * Get the current working directory.
   */
  function currentdir(): string;

  /**
   * Lock a directory path.
   */
  function lock_dir(path: string): void;

  /**
   * Create a directory.
   */
  function mkdir(path: string): void;

  /**
   * Read attributes for a symbolic link.
   */
  function symlinkattributes(): void;

  /**
   * Change the current working directory.
   */
  function chdir(path: string): void;

  /**
   * Unlock a file or directory path.
   */
  function unlock(path: string): void;

  /**
   * Iterate directory entries.
   */
  function dir(path: string): LuaMultiReturn<[LuaIterable<string, unknown>, { next: () => string | null }]>;

  /**
   * Remove an empty directory.
   */
  function rmdir(path: string): void;

  /**
   * Create a link from `old` to `next`.
   */
  function link(old: string, next: string): void;

  /**
   * Read file attributes.
   */
  function attributes(filepath: string): LuaTable | null;

  /**
   * Set file translation mode.
   */
  function setmode(): void;
}
