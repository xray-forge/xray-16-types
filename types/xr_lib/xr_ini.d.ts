declare module "xray16" {
   /**
    * LTX/INI file reader and writer.
    *
    * Use it to read config sections and fields from game data, or to create small script-owned config files.
    * Engine configs support section inheritance and `#include` statements.
    *
    * @source C++ class ini_file
    * @customConstructor ini_file
    * @group xr_ini
    * @remarks
    * Most typed read methods use the engine's strict config readers. Check `section_exist` and `line_exist` first when
    * missing data is valid for your script.
    */
  export class ini_file {
    /**
     * Create an empty ini file.
     */
    public constructor();

    /**
     * Open an ini file from the game config path.
     *
     * @remarks
     * This constructor resolves `path` below `$game_config$`.
     *
     * @param path - File name or path relative to `$game_config$`.
     */
    public constructor(path: string);

    /**
     * Open an ini file from a filesystem alias and relative path.
     *
     * @param initial - Filesystem alias, for example `$game_config$`.
     * @param path - File name or path relative to the alias.
     */
    public constructor(initial: string, path: string);

    /**
     * @remarks
     * Missing sections are an engine assertion path. The recoverable branch returns `0`.
     *
     * @param section - Target section to check lines count.
     * @returns Count of lines for provided section.
     */
    public line_count(section: string): u32;

    /**
     * @returns Number of sections in this file.
     */
    public section_count(): u32;

    /**
     * Remove ini file section field.
     *
     * @param section - Target section to modify.
     * @param field - Target section field to remove.
     */
    public remove_line(section: string, field: string): void;

    /**
     * Read a boolean value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed boolean value.
     */
    public r_bool(section: string, field: string): boolean;

    /**
     * Check whether a section exists.
     *
     * @param section - Section name.
     * @returns Whether the section exists.
     */
    public section_exist(section: string | null): boolean;

    /**
     * Read a floating-point value.
     *
     * @throws If the section or field does not exist.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed number.
     */
    public r_float(section: string, field: string): f32;

    /**
     * Read a class identifier value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed class identifier.
     */
    public r_clsid(section: string, field: string): i32;

    /**
     * Read a signed 32-bit integer.
     *
     * @throws If the section or field does not exist.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed integer.
     */
    public r_s32(section: string, field: string): i32;

    /**
     * Read text line from ini config file.
     *
     * @remarks
     * Returns `false` for an out-of-range line index. A missing section is a hard engine error.
     *
     * @throws If the section does not exist.
     *
     * @param section - Section name.
     * @param line_number - Zero-based line index inside the section.
     * @param key - Placeholder for Lua out parameter.
     * @param value - Placeholder for Lua out parameter.
     * @returns Success flag, key, and value.
     */
    public r_line<T extends string = string, P extends string = string>(
      section: string,
      line_number: i32,
      key: string,
      value: string
    ): LuaMultiReturn<[boolean, T, P]>;

    /**
     * Read a token value using a token list.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param list - Token list used for lookup.
     * @returns Token id.
     */
    public r_token(section: string, field: string, list: token_list): i32;

    /**
     * Read a 3D vector.
     *
     * @throws If the section or field does not exist.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed vector.
     */
    public r_vector(section: string, field: string): vector;

    /**
     * Read an unsigned 32-bit integer.
     *
     * @throws If the section or field does not exist.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed integer.
     */
    public r_u32(section: string, field: string): u32;

    /**
     * Read a quoted string value.
     *
     * @remarks
     * Uses the same engine reader as `r_string_wb`; quoted values may keep spaces.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @returns Parsed string.
     */
    public r_string_wq(section: string, field: string): string;

    /**
     * @remarks
     * Reads a string with blanks preserved by the engine parser.
     *
     * @param section - Ini file section.
     * @param field - Ini section field.
     * @returns If quoted, parsed string data inside quotes including spaces, else is same data as with r_string.
     */
    public r_string_wb(section: string, field: string): string;

    /**
     * @throws If the section or field does not exist.
     *
     * @param section - Ini file section.
     * @param field - Ini section field.
     * @returns Raw string from ltx file without spaces in it.
     */
    public r_string(section: string, field: string): string;

    /**
     * Check if line exists in the file by section and field.
     *
     * @param section - Target section to check.
     * @param field - Section field to check.
     * @returns Whether line exists.
     */
    public line_exist(section: string | null, field: string): boolean;

    /**
     * Write a 2D vector value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param vector - Value to write.
     * @param comment - Optional line comment.
     */
    public w_fvector2(section: string, field: string, vector: vector2, comment?: string): void;

    /**
     * Write a 3D vector value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param vector - Value to write.
     * @param comment - Optional line comment.
     */
    public w_fvector3(section: string, field: string, vector: vector, comment?: string): void;

    /**
     * Write a 4D vector value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param vector - Value to write.
     * @param comment - Optional line comment.
     */
    public w_fvector4(section: string, field: string, vector: never, comment?: string): void; // Struct _vector4<float>

    /**
     * Write a floating-point color value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param color - Value to write.
     * @param comment - Optional line comment.
     */
    public w_fcolor(section: string, field: string, color: fcolor, comment?: string): void;

    /**
     * Write a packed color value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param color - Value to write.
     * @param comment - Optional line comment.
     */
    public w_color(section: string, field: string, color: u32, comment?: string): void;

    /**
     * Write a boolean value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_bool(section: string, field: string, value: boolean, comment?: string): void;

    /**
     * Write a signed 8-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_s8(section: string, field: string, value: u8, comment?: string): void;

    /**
     * Write an unsigned 8-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_u8(section: string, field: string, value: u8, comment?: string): void;

    /**
     * Write a signed 16-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_s16(section: string, field: string, value: i16, comment?: string): void;

    /**
     * Write an unsigned 16-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_u16(section: string, field: string, value: u16, comment?: string): void;

    /**
     * Write a signed 32-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_s32(section: string, field: string, value: i32, comment?: string): void;

    /**
     * Write an unsigned 32-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_u32(section: string, field: string, value: u32, comment?: string): void;

    /**
     * Write a signed 64-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_s64(section: string, field: string, value: i64, comment?: string): void;

    /**
     * Write an unsigned 64-bit integer.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_u64(section: string, field: string, value: u64, comment?: string): void;

    /**
     * Write a floating-point number.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_float(section: string, field: string, value: f32, comment?: string): void;

    /**
     * Write a string value.
     *
     * @param section - Section name.
     * @param field - Field name.
     * @param value - Value to write.
     * @param comment - Optional line comment.
     */
    public w_string(section: string, field: string, value: string, comment?: string): void;

    /**
     * Get file name and path of ini file.
     *
     * @example `f:\applications\steam\steamapps\common\stalker call of pripyat\gamedata\configs\misc\task_manager.ltx`
     *
     * @returns Full path to ini file.
     */
    public fname(): string;

    /**
     * Switch the file into readonly or writable mode.
     *
     * @param is_readonly - Whether writes should be disabled.
     */
    public set_readonly(is_readonly: boolean): void;

    /**
     * Enable or disable section override name handling.
     *
     * @param override - Whether override names should be used.
     */
    public set_override_names(override: boolean): void;

    /**
     * Save this ini file to a path.
     *
     * @throws If `path` is missing.
     *
     * @param path - Destination path.
     * @returns Whether saving succeeded.
     */
    public save_as(path: string): boolean;

    /**
     * Adjust saving on file closing/destructor calls.
     *
     * @remarks
     * Intended for script-created or script-owned ini files. Be careful using it on engine-owned singletons returned
     * by `game_ini` or `system_ini`.
     *
     * @param should_save - Whether ini file should be saved when destructor is called.
     */
    public save_at_end(should_save: boolean): void;

    /**
     * Iterate over ini file sections.
     * Calls provided callback for each ini section in file.
     *
     * @param cb - Callback to call on each ini file section, where name is section name.
     */
    public section_for_each(cb: (this: void, name: string) => void): void;
  }

  /**
   * Create ini file instance based on provided string content.
   *
   * @group xr_ini
   *
   * @remarks
   * Parses the string through an in-memory reader using `$game_config$` as the base include path.
   *
   * @param content - String value to be read as ini file.
   * @returns New ini file instance based on provided content.
   */
  export function create_ini_file(this: void, content: string): ini_file;

  /**
   * Get the loaded game ini.
   *
   * @group xr_ini
   *
   * @remarks
   * Returns the engine-owned `pGameIni` singleton.
   *
   * @returns Current game ini file.
   */
  export function game_ini(this: void): ini_file;

  /**
   * Get the loaded system ini.
   *
   * @group xr_ini
   *
   * @remarks
   * Returns the engine-owned `pSettings` singleton.
   *
   * @returns Current system ini file.
   */
  export function system_ini(this: void): ini_file;

  /**
   * Reload and return the system ini.
   *
   * @group xr_ini
   *
   * @remarks
   * Destroys the current `pSettings` instance and reloads `system.ltx` from `$game_config$`. Avoid keeping old
   * `system_ini()` references across this call.
   *
   * @returns Reloaded system ini file.
   */
  export function reload_system_ini(this: void): ini_file;
}
