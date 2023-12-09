declare module "xray16" {
  /**
   * Implementation of streaming ini file container.
   * Allows reading / writing field in file by section/field.
   *
   * Supports custom extension with section overriding and custom `#include` statements.
   *
   * @source C++ class ini_file
   * @customConstructor ini_file
   * @group xr_ini
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

    /**
     * @param section - ini file section
     * @param field - ini section field
     * @returns if quoted, parsed string data inside quotes including spaces, else is same data as with r_string
     */
    public r_string_wb(section: string, field: string): string;

    /**
     * @param section - ini file section
     * @param field - ini section field
     * @returns raw string from ltx file without spaces in it
     */
    public r_string(section: string, field: string): string;

    /**
     * Check if line exists in the file by section and field.
     *
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
     * Get file name and path of ini file.
     *
     * @example `f:\applications\steam\steamapps\common\stalker call of pripyat\gamedata\configs\misc\task_manager.ltx`
     *
     * @returns full path to ini file
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

    /**
     * Iterate over ini file sections.
     * Calls provided callback for each ini section in file.
     *
     * @param cb - callback to call on each ini file section, where name is section name
     */
    public section_for_each(cb: (this: void, name: string) => void): void;
  }

  /**
   * Create ini file instance based on provided string content.
   *
   * @group xr_ini
   * @param content - string value to be read as ini file
   * @returns new ini file instance based on provided content
   */
  export function create_ini_file(this: void, content: string): ini_file;

  /**
   * @group xr_ini
   */
  export function game_ini(this: void): ini_file;

  /**
   * @group xr_ini
   */
  export function system_ini(this: void): ini_file;

  /**
   * @group xr_ini
   */
  export function reload_system_ini(this: void): ini_file;
}
