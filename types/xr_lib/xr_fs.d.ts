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

    public append_path(a: string, b: string, c: string, d: number): unknown /* FS_Path */;

    public dir_delete(fs: FS, a: string, b: string, c: number): void;

    public dir_delete(fs: FS, a: string, c: number): void;

    public exist(folderAlias: string, filename: string, fs_type: TXR_fs_type): i32 | null;

    public exist(folderAlias: string, filename: string): i32 | null;

    public exist(path: string): i32 | null;

    public file_copy(a: string, b: string): void;

    public file_length(a: string): i32;

    public file_list_open(a: string, b: string, c: u32): FS_file_list;

    public file_list_open(a: string, b: u32): FS_file_list;

    public file_list_open_ex(a: string, b: u32, c: string): FS_file_list_ex;

    public file_rename(a: string, b: string, c: boolean): void;

    public get_file_age(a: string): u32;

    public get_file_age_str(fs: FS, a: string): u32;

    public path_exist(a: string): boolean;

    public r_close(reader: reader): void;

    public r_open(a: string): reader;

    public r_open(a: string, b: string): reader;

    public update_path(alias: string, addition: string): string;

    public w_close(writer: unknown /* IWriter */): void;

    public rescan_path(path: string): void;

    /**
     * Not registered in LUA, will throw.
     */
    public get_path(alias: string): unknown;

    public file_delete(a: string, b: string): void;

    public file_delete(fs: string): void;

    public w_open(a: string, b: string): unknown /* IWriter */;

    public w_open(a: string): unknown /* IWriter */;
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
