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
   * @source C++ class CSavedGameWrapper
   * @customConstructor CSavedGameWrapper
   * @group xr_fs
   */
  export class CSavedGameWrapper extends EngineBinding {
    public constructor(name: string);

    public level_name(): string;
    public level_id(): u8;
    public game_time(): CTime;
    public actor_health(): f32;
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
   * @source C++ class ini_file
   * @customConstructor ini_file
   * @group xr_fs
   */
  export class ini_file {
    public constructor();
    /**
     * Create ini file representation based on file name.
     * Full path is limited to 520 chars.
     *
     * @param path - file name and relative path to gamedata configs folder
     */
    public constructor(path: string);
    /**
     * Create ini file representation based on file name.
     * Full path is limited to 520 chars.
     *
     * @param initial - base to count relative path from, `$game_data$` is an example
     * @param path - file name and relative path from initial entrypoint
     */
    public constructor(initial: string, path: string);

    /**
     * @param section - target section to check lines count
     * @returns count of lines for provided section
     */
    public line_count(section: string): u32;

    /**
     * @returns sections count for ini file
     */
    public section_count(): u32;

    /**
     * Remove ini file section field.
     *
     * @param section - target section to modify
     * @param field - target section field to remove
     */
    public remove_line(section: string, field: string): void;

    public r_bool(section: string, field: string): boolean;
    public section_exist(section: string | null): boolean;
    public r_float(section: string, field: string): f32;
    public r_clsid(section: string, field: string): i32;
    public r_s32(section: string, field: string): i32;

    /**
     * Read text line from ini config file.
     *
     * @returns tuple with three elements, where first is success status, second is key, third is value.
     */
    public r_line<T extends string = string, P extends string = string>(
      section: string,
      line_number: i32,
      c: string,
      d: string
    ): LuaMultiReturn<[boolean, T, P]>;
    public r_token(section: string, field: string, list: token_list): i32;
    public r_vector(section: string, field: string): vector;
    public r_u32(section: string, field: string): u32;
    public r_string_wq(section: string, field: string): string;
    public r_string(section: string, field: string): string;

    /**
     * @param section - target section to check
     * @param field - section field to check
     * @returns whether line exists
     */
    public line_exist(section: string | null, field: string): boolean;

    public w_fvector2(section: string, field: string, vector: vector2, comment?: string): void;
    public w_fvector3(section: string, field: string, vector: vector, comment?: string): void;
    public w_fvector4(section: string, field: string, vector: never, comment?: string): void; // struct _vector4<float>
    public w_fcolor(section: string, field: string, color: fcolor, comment?: string): void;
    public w_color(section: string, field: string, color: u32, comment?: string): void;

    public w_bool(section: string, field: string, bool: boolean, comment?: string): void;
    public w_s8(section: string, field: string, uchar: u8, comment?: string): void;
    public w_u8(section: string, field: string, uchar: u8, comment?: string): void;
    public w_s16(section: string, field: string, sshort: i16, comment?: string): void;
    public w_u16(section: string, field: string, ushort: u16, comment?: string): void;
    public w_s32(section: string, field: string, sint: i32, comment?: string): void;
    public w_u32(section: string, field: string, uint: u32, comment?: string): void;
    public w_s64(section: string, field: string, sint: i64, comment?: string): void;
    public w_u64(section: string, field: string, uint: u64, comment?: string): void;
    public w_float(section: string, field: string, float: f32, comment?: string): void;
    public w_string(section: string, field: string, string: string, comment?: string): void;

    /**
     * Get file name of ini file.
     */
    public fname(): string;
    public set_readonly(is_readonly: boolean): void;
    public set_override_names(override: boolean): void;
    public save_as(path: string): boolean;

    /**
     * Adjust saving on file closing/destructor calls.
     *
     * @param should_save - whether ini file should be saved when destructor is called
     */
    public save_at_end(should_save: boolean): void;
    public section_for_each(cb: (name: string) => void): void;
  }

  /**
   * @source C++ class net_packet
   * @customConstructor net_packet
   * @group xr_fs
   */
  export class net_packet {
    public r_advance(value: u32): void;
    public r_angle16(value: f32): void;
    public r_angle8(value: f32): void;
    public r_begin(value: u16): u32;
    public r_bool(): boolean;
    public r_clientID(): ClientID;
    public r_dir(vector: vector): void;
    public r_elapsed(): u32;
    public r_eof(): boolean;
    public r_float(): f32;
    public r_float(value: f32): f32;
    public r_float_q16(value1: f32, value2: f32, value3: f32): f32;
    public r_float_q8(value1: f32, value2: f32, value3: f32): f32;
    public r_matrix(matrix: matrix): matrix;
    public r_s16(): i16;
    public r_s16(value: u16): u16;
    public r_s32(): i32;
    public r_s32(value: i32): i32;
    public r_s64(): i64;
    public r_s64(value: i64): i64;
    public r_s8(): i8;
    public r_s8(value: i8): i8;
    public r_sdir(vector: vector): void;
    public r_seek(value: u32): void;
    public r_stringZ<T extends string>(): T;
    public r_tell(): u32;
    public r_u16(): u16;
    public r_u16(value: u16): u16;
    public r_u32(): u32;
    public r_u32(value: u32): u32;
    public r_u64(): u64;
    public r_u64(value: u64): u64;
    public r_u8(): u8;
    public r_u8(value: u8): u8;
    public r_vec3(vector: vector): void;
    public w_angle16(value: f32): void;
    public w_angle8(value: f32): void;
    public w_begin(value: u16): void;
    public w_bool(value: boolean): void;
    public w_chunk_close16(value: u32): void;
    public w_chunk_close8(value: u32): void;
    public w_chunk_open16(value: u32): void;
    public w_chunk_open8(value: u32): void;
    public w_clientID(ClientID: ClientID): void;
    public w_dir(vector: vector): void;
    public w_float(value: f32): void;
    public w_float_q16(value1: f32, value2: f32, value3: f32): void;
    public w_float_q8(value1: f32, value2: f32, value3: f32): void;
    public w_matrix(matrix: matrix): void;
    public w_s16(value: i16): void;
    public w_s32(value: i32): void;
    public w_s64(value: i64): void;
    public w_sdir(vector: vector): void;
    public w_stringZ(value: string | null): void;
    public w_tell(): u32;
    public w_u16(value: u16): void;
    public w_u32(value: u32): void;
    public w_u64(value: u64): void;
    public w_u8(value: u8): void;
    public w_vec3(vector: vector): void;
  }

  /**
   * @source C++ class reader
   * @customConstructor reader
   * @group xr_fs
   */
  export class reader {
    public r_advance(value: u64): void;
    public r_elapsed(): i64;
    public r_eof(): boolean;
    public r_sdir(vector: vector): void;
    public r_seek(value: u64): void;
    public r_tell(): u64;

    public r_dir(vector: vector): void;
    public r_vec3(vector: vector): void;
    public r_angle16(): f32;
    public r_angle8(): f32;

    public r_bool(): boolean;
    public r_stringZ<T extends string>(): T;

    public r_float<T extends f32>(value?: T): T;
    public r_float_q16<T extends f32>(value1: T, value2: T): T;
    public r_float_q8<T extends f32>(value1: T, value2: T): T;

    public r_s16<T extends i16 = i16>(value?: T): T;
    public r_s32<T extends i32 = i32>(value?: T): T;
    public r_s64<T extends i64 = i64>(value?: T): T;
    public r_s8<T extends i8 = i8>(value?: T): T;

    public r_u16<T extends u16 = u16>(value?: T): T;
    public r_u32<T extends u32 = u32>(value?: T): T;
    public r_u64<T extends u64 = u64>(value?: T): T;
    public r_u8<T extends u8 = u8>(value?: T): T;
  }

  /**
   * @group xr_fs
   */
  export type TXR_net_processor = reader | net_packet;
}
