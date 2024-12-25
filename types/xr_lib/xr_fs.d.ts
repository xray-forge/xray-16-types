declare module "xray16" {
  /**
   * @source C++ class FS_file_list
   * @customConstructor FS_file_list
   * @group xr_fs
   */
  export class FS_file_list {
    public Free(): void;

    public GetAt(number: u32): FS_item;

    public Size(): u32;
  }

  /**
   * @source C++ class FS_file_list_ex
   * @customConstructor FS_file_list_ex
   * @group xr_fs
   */
  export class FS_file_list_ex {
    public Sort(number: u32): void;

    public GetAt(index: u32): FS_item;

    public Size(): u32;
  }

  /**
   * @source C++ class FS_item
   * @customConstructor FS_item
   * @group xr_fs
   */
  export class FS_item {
    public Modif(): string;

    public NameFull(): string;

    public NameShort(): string;

    public ModifDigitOnly(): string;

    public Size(): u32;
  }

  /**
   * @source C++ class fs_file
   * @customConstructor fs_file
   * @group xr_fs
   */
  export class fs_file {
    public modif: u32;
    public name: string;
    public ptr: u32;
    public size_compressed: u32;
    public size_real: u32;
  }

  /**
   * @source C++ class FS
   * @customConstructor FS
   * @group xr_fs
   */
  export class FS {
    public static FS_ClampExt: 4;
    public static FS_ListFiles: 1;
    public static FS_ListFolders: 2;
    public static FS_RootOnly: 8;
    public static FS_sort_by_modif_down: 5;
    public static FS_sort_by_modif_up: 4;
    public static FS_sort_by_name_down: 1;
    public static FS_sort_by_name_up: 0;
    public static FS_sort_by_size_down: 3;
    public static FS_sort_by_size_up: 2;

    public dir_delete(path: string, filename: string, remove_files: boolean): void;

    public dir_delete(path: string, remove_files: boolean): void;

    public file_list_open(alias: string, folder: string, flags: u32): FS_file_list;

    public file_list_open(path: string, flags: u32): FS_file_list;

    public file_list_open_ex(path: string, flags: u32, mask: string): FS_file_list_ex;

    public file_copy(source: string, destination: string): void;

    public file_length(path: string): i32;

    public file_rename(path: string, destination: string, overwrite: boolean): void;

    public get_file_age(path: string): u32;

    public get_file_age_str(path: string): u32;

    public file_delete(path: string, filename: string): void;

    public file_delete(path: string): void;

    public exist(alias: string, filename: string, fs_type: TXR_fs_type): i32 | null;

    public exist(alias: string, filename: string): i32 | null;

    public exist(path: string): i32 | null;

    public append_path(alias: string, root: string, path: string, recursive: boolean): unknown /* FS_Path */;

    public path_exist(path: string): boolean;

    public update_path(alias: string, add: string): string;

    public rescan_path(path: string): void;

    /**
     * Not registered in LUA, will throw.
     */
    public get_path(alias: string): unknown;

    public r_close(reader: reader): void;

    public r_open(path: string): reader;

    public r_open(alias: string, path: string): reader;

    public w_close(writer: unknown /* IWriter */): void;

    public w_open(path: string, filename: string): unknown /* IWriter */;

    public w_open(path: string): unknown /* IWriter */;
  }

  /**
   * @group xr_fs
   */
  export type TXR_fs_type = EnumeratedStaticsValues<typeof FS>;

  /**
   * @group xr_fs
   */
  export function getFS(this: void): FS;

  /**
   * Get operating system active username.
   *
   * @group xr_fs
   * @returns username string
   */
  export function user_name(this: void): string;
}
