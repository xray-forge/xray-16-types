declare module "xray16" {
  /**
   * File list returned by the engine filesystem.
   *
   * @source C++ class FS_file_list
   * @customConstructor FS_file_list
   * @group xr_fs
   *
   * @remarks
   * This wraps a native list allocated by the filesystem. Call `Free` when you are done and do not use the list after
   * freeing it.
   */
  export class FS_file_list {
    /**
     * Release the native file list.
     */
    public Free(): void;

    /**
     * Get file item by index.
     *
     * @remarks
     * The binding does not clamp the index. Use `Size` before indexing.
     *
     * @param index - Zero-based item index.
     * @returns File item.
     */
    public GetAt(index: u32): FS_item;

    /**
     * Get number of items in the list.
     *
     * @returns Item count.
     */
    public Size(): u32;
  }

  /**
   * Sortable file list returned by extended filesystem queries.
   *
   * @source C++ class FS_file_list_ex
   * @customConstructor FS_file_list_ex
   * @group xr_fs
   *
   * @remarks
   * Extended lists copy file entries into script-owned storage and force a rescan of the queried path when created.
   */
  export class FS_file_list_ex {
    /**
     * Sort the list with an `FS_sort_by_*` mode.
     *
     * @remarks
     * Unknown sort modes are ignored.
     *
     * @param mode - Sort mode.
     */
    public Sort(mode: u32): void;

    /**
     * Get file item by index.
     *
     * @remarks
     * The binding does not clamp the index. Use `Size` before indexing.
     *
     * @param index - Zero-based item index.
     * @returns File item.
     */
    public GetAt(index: u32): FS_item;

    /**
     * Get number of items in the list.
     *
     * @returns Item count.
     */
    public Size(): u32;
  }

  /**
   * File item from an engine file list.
   *
   * @source C++ class FS_item
   * @customConstructor FS_item
   * @group xr_fs
   */
  export class FS_item {
    /**
     * Get modification time as display text.
     *
     * @returns Modification time text.
     */
    public Modif(): string;

    /**
     * Get full file name.
     *
     * @returns Full file name.
     */
    public NameFull(): string;

    /**
     * Get short file name.
     *
     * @returns Short file name.
     */
    public NameShort(): string;

    /**
     * Get numeric-only modification time text.
     *
     * @returns Modification time digits.
     */
    public ModifDigitOnly(): string;

    /**
     * Get file size.
     *
     * @returns File size in bytes.
     */
    public Size(): u32;
  }

  /**
   * File descriptor exposed by the filesystem.
   *
   * @source C++ class fs_file
   * @customConstructor fs_file
   * @group xr_fs
   */
  export class fs_file {
    /**
     * Modification timestamp.
     */
    public modif: u32;

    /**
     * File name.
     */
    public name: string;

    /**
     * Native file pointer.
     */
    public ptr: u32;

    /**
     * Compressed file size.
     */
    public size_compressed: u32;

    /**
     * Real file size.
     */
    public size_real: u32;
  }

  /**
   * Result of an `FS.exist` query that checks virtual and/or external files.
   *
   * @source C++ class FileStatus
   * @customConstructor FileStatus
   * @group xr_fs
   *
   * @remarks
   * The object can be used as a boolean in Lua. `External` means the file was found outside registered virtual archives.
   */
  export class FileStatus {
    /**
     * Whether the file exists.
     */
    public readonly Exists: boolean;

    /**
     * Whether the match came from the external filesystem.
     */
    public readonly External: boolean;

    /**
     * Engine-created file status.
     */
    private constructor();
  }

  /**
   * Registered filesystem path alias descriptor.
   *
   * @source C++ class FS_Path
   * @customConstructor FS_Path
   * @group xr_fs
   *
   * @remarks
   * Returned by filesystem alias lookups. The object is owned by the engine filesystem. Missing aliases assert in
   * the single-argument `get_path` binding instead of returning `null`.
   */
  export class FS_Path {
    /**
     * Resolved full path.
     */
    public readonly m_Path: string;

    /**
     * Root path used by this alias.
     */
    public readonly m_Root: string;

    /**
     * Relative path segment added to the root.
     */
    public readonly m_Add: string;

    /**
     * Default extension used by this alias.
     */
    public readonly m_DefExt: string;

    /**
     * File dialog filter caption.
     */
    public readonly m_FilterCaption: string;

    /**
     * Engine-created path descriptor.
     */
    private constructor();
  }

  /**
   * Opaque filesystem writer handle.
   *
   * @source C++ class IWriter
   * @customConstructor IWriter
   * @group xr_fs
   *
   * @remarks
   * Returned by {@link FS.w_open}. The writer class is not registered with script-callable write methods in this
   * binding, so scripts normally only pass it back to {@link FS.w_close}. Writer creation can return `null` when
   * native writer setup fails.
   */
  export class IWriter {
    /**
     * Engine-created writer handle.
     */
    private constructor();
  }

  /**
   * Engine filesystem facade.
   *
   * Path aliases such as `$game_config$` and `$logs$` are resolved by this object.
   *
   * @source C++ class FS
   * @customConstructor FS
   * @group xr_fs
   *
   * @remarks
   * Mutating methods operate on real files or engine path aliases. Prefer `exist`, `path_exist`, and `update_path`
   * before destructive operations.
   */
  export class FS {
    /**
     * Clamp listed paths by extension.
     */
    public static FS_ClampExt: 4;

    /**
     * List files.
     */
    public static FS_ListFiles: 1;

    /**
     * List folders.
     */
    public static FS_ListFolders: 2;

    /**
     * Do not recurse into subfolders.
     */
    public static FS_RootOnly: 8;

    /**
     * Sort by modification time, newest first.
     */
    public static FS_sort_by_modif_down: 5;

    /**
     * Sort by modification time, oldest first.
     */
    public static FS_sort_by_modif_up: 4;

    /**
     * Sort by name descending.
     */
    public static FS_sort_by_name_down: 1;

    /**
     * Sort by name ascending.
     */
    public static FS_sort_by_name_up: 0;

    /**
     * Sort by size descending.
     */
    public static FS_sort_by_size_down: 3;

    /**
     * Sort by size ascending.
     */
    public static FS_sort_by_size_up: 2;

    /**
     * Search virtual registered files only.
     */
    public static FSType_Virtual: 1;

    /**
     * Search external files only.
     */
    public static FSType_External: 2;

    /**
     * Search virtual and external files.
     */
    public static FSType_Any: 3;

    /**
     * Delete a directory below a path alias.
     *
     * @param path - Path alias or root path.
     * @param filename - Directory name.
     * @param remove_files - Whether files inside should be removed.
     */
    public dir_delete(path: string, filename: string, remove_files: boolean): void;

    /**
     * Delete a directory.
     *
     * @param path - Directory path.
     * @param remove_files - Whether files inside should be removed.
     */
    public dir_delete(path: string, remove_files: boolean): void;

    /**
     * Open a file list below a path alias and folder.
     *
     * @param alias - Filesystem path alias.
     * @param folder - Folder inside the alias.
     * @param flags - Listing flags.
     * @returns File list.
     */
    public file_list_open(alias: string, folder: string, flags: u32): FS_file_list;

    /**
     * Open a file list for a resolved path or alias.
     *
     * @param path - Path or path alias.
     * @param flags - Listing flags.
     * @returns File list.
     */
    public file_list_open(path: string, flags: u32): FS_file_list;

    /**
     * Open a sortable filtered file list.
     *
     * @remarks
     * Forces the path to be rescanned before collecting matching entries.
     *
     * @param path - Path or path alias.
     * @param flags - Listing flags.
     * @param mask - File mask.
     * @returns Sortable file list.
     */
    public file_list_open_ex(path: string, flags: u32, mask: string): FS_file_list_ex;

    /**
     * Copy a file.
     *
     * @param source - Source file path.
     * @param destination - Destination file path.
     */
    public file_copy(source: string, destination: string): void;

    /**
     * Get file length.
     *
     * @param path - File path.
     * @returns File length in bytes, or engine error value.
     */
    public file_length(path: string): i32;

    /**
     * Rename or move a file.
     *
     * @param path - Source file path.
     * @param destination - Destination file path.
     * @param overwrite - Whether an existing destination may be overwritten.
     */
    public file_rename(path: string, destination: string, overwrite: boolean): void;

    /**
     * Get file modification timestamp.
     *
     * @param path - File path.
     * @returns Modification timestamp.
     */
    public get_file_age(path: string): u32;

    /**
     * Get file modification timestamp as packed display value.
     *
     * @param path - File path.
     * @returns Modification timestamp value.
     */
    public get_file_age_str(path: string): u32;

    /**
     * Delete a file below a path alias.
     *
     * @param path - Path alias or root path.
     * @param filename - File name.
     */
    public file_delete(path: string, filename: string): void;

    /**
     * Delete a file.
     *
     * @param path - File path.
     */
    public file_delete(path: string): void;

    /**
     * Check whether a file exists below a path alias.
     *
     * @remarks
     * This overload checks virtual and/or external files and returns a status object.
     *
     * @param alias - Filesystem path alias.
     * @param filename - File name.
     * @param fs_type - Filesystem source to search.
     * @returns File status.
     */
    public exist(alias: string, filename: string, fs_type: TXR_fs_type): FileStatus | null;

    /**
     * Check whether a file exists below a path alias.
     *
     * @remarks
     * This overload resolves `alias` and `filename`, then returns a registered file descriptor when found.
     *
     * @param alias - Filesystem path alias.
     * @param filename - File name.
     * @returns File descriptor pointer or `null`.
     */
    public exist(alias: string, filename: string): i32 | null;

    /**
     * Check whether a file exists.
     *
     * @remarks
     * This overload returns a registered file descriptor when found.
     *
     * @param path - File path.
     * @returns File descriptor pointer or `null`.
     */
    public exist(path: string): i32 | null;

    /**
     * Check whether a file exists.
     *
     * @remarks
     * This overload checks virtual and/or external files and returns a status object.
     *
     * @param path - File path.
     * @param fs_type - Filesystem source to search.
     * @returns File status.
     */
    public exist(path: string, fs_type: TXR_fs_type): FileStatus | null;

    /**
     * Add a path alias.
     *
     * @remarks
     * Native code asserts if `root` is invalid or `alias` is already registered. On success it returns a path
     * descriptor.
     *
     * @param alias - Alias name.
     * @param root - Root path.
     * @param path - Relative path.
     * @param recursive - Whether subfolders should be scanned.
     * @returns Native filesystem path descriptor.
     */
    public append_path(alias: string, root: string, path: string, recursive: boolean): FS_Path;

    /**
     * Check whether a path alias exists.
     *
     * @param path - Path alias.
     * @returns Whether the path exists.
     */
    public path_exist(path: string): boolean;

    /**
     * Resolve path alias and suffix into a real path.
     *
     * @remarks
     * Non-Windows builds normalize path separators before returning the string.
     *
     * @param alias - Filesystem path alias.
     * @param add - Relative path to append.
     * @returns Resolved path.
     */
    public update_path(alias: string, add: string): string;

    /**
     * Rescan a path alias.
     *
     * @since OpenXRay 2015-07-07, 6e703b4c
     *
     * @remarks
     * Marks the alias as needing a rescan. The next filesystem check refreshes cached entries.
     *
     * @param path - Path alias.
     */
    public rescan_path(path: string): void;

    /**
     * Get native path descriptor for an alias.
     *
     * @remarks
     * Native code asserts when the alias is missing. Use {@link FS.path_exist} before calling when the alias is
     * optional.
     *
     * @param alias - Filesystem path alias.
     * @returns Native filesystem path descriptor.
     */
    public get_path(alias: string): FS_Path;

    /**
     * Close a binary reader.
     *
     * @param reader - Reader returned by `r_open`.
     */
    public r_close(reader: reader): void;

    /**
     * Open a binary reader.
     *
     * @param path - File path.
     * @returns Binary reader.
     */
    public r_open(path: string): reader;

    /**
     * Open a binary reader below a path alias.
     *
     * @param alias - Filesystem path alias.
     * @param path - Relative file path.
     * @returns Binary reader.
     */
    public r_open(alias: string, path: string): reader;

    /**
     * Close a binary writer.
     *
     * @param writer - Writer returned by `w_open`.
     */
    public w_close(writer: IWriter | null): void;

    /**
     * Open a binary writer below a path alias.
     *
     * @remarks
     * Can return `null` when native writer setup fails.
     *
     * @param path - Filesystem path alias.
     * @param filename - Relative file path.
     * @returns Binary writer, or `null`.
     */
    public w_open(path: string, filename: string): IWriter | null;

    /**
     * Open a binary writer.
     *
     * @remarks
     * Can return `null` when native writer setup fails.
     *
     * @param path - File path.
     * @returns Binary writer, or `null`.
     */
    public w_open(path: string): IWriter | null;
  }

  /**
   * Filesystem enum value accepted by filesystem queries.
   *
   * @group xr_fs
   */
  export type TXR_fs_type = typeof FS.FSType_Virtual | typeof FS.FSType_External | typeof FS.FSType_Any;

  /**
   * Get the global filesystem facade.
   *
   * @group xr_fs
   *
   * @returns Filesystem facade.
   */
  export function getFS(this: void): FS;

  /**
   * Get operating system active username.
   *
   * @group xr_fs
   *
   * @returns Username string.
   */
  export function user_name(this: void): string;
}
