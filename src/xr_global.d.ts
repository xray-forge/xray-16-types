declare module "xray16" {
  /**
   * @source namespace global
   * @group xr_global
   */

  /**
   * @group xr_global
   */
  export function GetFontDI(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontGraffiti19Russian(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontGraffiti32Russian(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontGraffiti50Russian(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontLetterica18Russian(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontLetterica25(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontMedium(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetFontSmall(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetTextureInfo(this: void, char: string, char2: string, tex_info: TEX_INFO): boolean;

  /**
   * @group xr_global
   */
  export function GetTextureName(this: void, char: string): string;

  /**
   * @group xr_global
   */
  export function IsGameTypeSingle(this: void): boolean;

  /**
   * @group xr_global
   */
  export function app_ready(this: void): boolean;

  /**
   * @group xr_global
   */
  export function bit_and(this: void, left: i32, right: i32): i32;

  /**
   * @group xr_global
   */
  export function buy_condition(this: void, a: f32, b: f32): void;

  /**
   * @group xr_global
   */
  export function buy_condition(this: void, a: unknown, b: string): void;

  /**
   * @group xr_global
   */
  export function cast_planner(this: void, base_action: action_base): action_planner;

  /**
   * @group xr_global
   */
  export function command_line(this: void): string;

  /**
   * Create ini file instance based on provided string content.
   *
   * @group xr_global
   * @param content - string value to be read as ini file
   * @returns new ini file instance based on provided content
   */
  export function create_ini_file(this: void, content: string): ini_file;

  /**
   * @group xr_global
   */
  export function game_ini(this: void): ini_file;

  /**
   * @group xr_global
   */
  export function device(this: void): render_device;

  /**
   * @group xr_global
   */
  export function dik_to_bind(this: void, keycode: i32): i32;

  /**
   * @group xr_global
   */
  export function game_graph(this: void): CGameGraph;

  /**
   * @group xr_global
   */
  export function xrRender_test_r2_hw(this: void): boolean;

  /**
   * @group xr_global
   */
  export function getFS(this: void): FS;

  /**
   * Get console object reference.
   * Allows flushing logs / executing commands / getting global engine variables.
   *
   * @group xr_global
   * @returns console object reference
   */
  export function get_console(this: void): CConsole;

  /**
   * @group xr_global
   */
  export function get_hud(this: void): CUIGameCustom;

  /**
   * @group xr_global
   */
  export function render_get_dx_level(this: void): number;

  /**
   * @group xr_global
   */
  export function sell_condition(this: void, a: number, b: number): void;

  /**
   * @group xr_global
   */
  export function sell_condition(this: void, a: unknown, b: string): void;

  /**
   * @group xr_global
   */
  export function valid_saved_game(this: void, filename: string): boolean;

  /**
   * @group xr_global
   */
  export function renderer_allow_override(this: void): boolean;

  /**
   * @group xr_global
   */
  export function GetTextureRect(this: void, str: string): Frect;

  /**
   * @group xr_global
   */
  export function GetCursorPosition(this: void): vector2;

  /**
   * @group xr_global
   */
  export function SetCursorPosition(this: void, vector: vector2): void;

  /**
   * Check whether dynamic music setting is enabled.
   * Dynamic music starts playing different kind of ambient sounds in actor combat.
   *
   * @group xr_global
   * @returns is dynamic music allowed in game settings.
   */
  export function IsDynamicMusic(this: void): boolean;

  /**
   * @group xr_global
   */
  export function GetFontLetterica16Russian(this: void): CGameFont;

  /**
   * Log formatted message in game console and log file.
   * Resulting message looks like "[LUA]  %s", where message is provided text parameter.
   *
   * Note: text length is limited and supplying too long value will crash the game. todo: check exact limit.
   *
   * @group xr_global
   * @param text - string to print
   */
  export function log(this: void, text: string): void;

  /**
   * @group xr_global
   */
  export function error_log(this: void, text: string): void;

  /**
   * @group xr_global
   */
  export function print_stack(this: void): void;

  /**
   * @group xr_global
   */
  export function show_condition(this: void, file: ini_file, str: string): void;

  /**
   * Whether auto-save on important checkpoints option is turned on.
   *
   * @group xr_global
   */
  export function IsImportantSave(this: void): boolean;

  /**
   * @group xr_global
   */
  export function FitInRect(this: void, window: CUIWindow, rect: Frect, a: number, b: number): boolean;

  /**
   * @group xr_global
   */
  export function reload_system_ini(this: void): ini_file;

  /**
   * @group xr_global
   */
  export function system_ini(this: void): ini_file;

  /**
   * @group xr_global
   */
  export function alife(this: void): alife_simulator;

  /**
   * @group xr_global
   */
  export function set_start_position(position: vector): void;

  /**
   * @group xr_global
   */
  export function set_start_game_vertex_id(gvid: i32): void;

  /**
   * @group xr_global
   */
  export function flush(this: void): void;

  /**
   * @group xr_global
   */
  export function is_enough_address_space_available(this: void): boolean;

  /**
   * @group xr_global
   */
  export function class_names(this: void, lua_state: unknown /* lua_State*/): object;

  /**
   * @group xr_global
   */
  export function class_info(this: void, arg: unknown /* luabind::argument */): class_info_data;
  /**
   * @group xr_global
   * @returns is dev editor tool enabled currently used.
   */
  export function editor(this: void): boolean;

  /**
   * @group xr_global
   */
  export function bit_or(this: void, first: i32, second: i32): i32;

  /**
   * @group xr_global
   */
  export function GetFontGraffiti22Russian(this: void): CGameFont;

  /**
   * @group xr_global
   */
  export function GetDefaultUIPath(this: void): string;

  /**
   * @group xr_global
   */
  export function GetDefaultUIPathWithDelimiter(this: void): string;

  /**
   * @group xr_global
   */
  export function GetUIPath(this: void): string;

  /**
   * @group xr_global
   */
  export function GetUIPathWithDelimiter(this: void): string;

  /**
   * @group xr_global
   */
  export function GetUIStyleManager(this: void): UIStyleManager;

  /**
   * Prefetch provided script before executing next lines.
   *
   * @group xr_global
   */
  export function prefetch(this: void, path: string): void;

  /**
   * Get absolute time in millis from executable start.
   * Returns time in milliseconds.
   *
   * @group xr_global
   * @returns 'ms' from game executable start.
   * @example 0, 1000, 60000
   */
  export function time_global(this: void): u32;

  /**
   * @group xr_global
   */
  export function time_global_async(this: void): u32;

  /**
   * @group xr_global
   */
  export function verify_if_thread_is_running(this: void): void;

  /**
   * @group xr_global
   */
  export function script_server_object_version(this: void): u16;

  /**
   * @group xr_global
   */
  export function bit_not(this: void, value: i32): i32;

  /**
   * @group xr_global
   */
  export function ef_storage(this: void): cef_storage;

  /**
   * @group xr_global
   */
  export function GetARGB(this: void, a: u16, r: u16, g: u16, b: u16): i32;

  /**
   * Get operating system active user name.
   *
   * @group xr_global
   * @returns username string
   */
  export function user_name(this: void): string;

  /**
   * @group xr_global
   */
  export function bit_xor(this: void, left: i32, right: i32): i32;

  /**
   * @source namespace level
   * @group xr_global
   */
  export interface IXR_level {
    add_call(this: void, cb1: () => boolean, cb2: () => boolean): void;
    add_call(this: void, object: object, cb1: () => boolean, cb2: () => boolean): void;
    add_call(this: void, object: object, str1: string, str2: string): void;
    add_cam_effector(this: void, effect: string, id: i32, is_cyclic: boolean, callback: string): void;
    add_cam_effector2(this: void, effect: string, id: i32, is_cyclic: boolean, callback: string, camera_fov: f32): void;
    add_complex_effector(this: void, section: string, id: i32): void;
    add_dialog_to_render(this: void, window: CUIDialogWnd): void;
    add_pp_effector(this: void, fn: string, id: i32, is_cyclic: boolean): void;

    /**
     * Move time forward based on provided parameters.
     *
     * @param days - days to move forward
     * @param hours - hours to move forward
     * @param minutes - minutes to move forward
     */
    change_game_time(this: void, days: u32, hours: u32, minutes: u32): void;
    check_object(this: void, object: game_object): void;
    client_spawn_manager(this: void): client_spawn_manager;
    debug_actor(this: void): game_object;
    debug_object(this: void, str: string): game_object;
    disable_input(this: void): void;
    enable_input(this: void): void;
    environment(this: void): unknown /* XR_CEnvironment */;

    /**
     * @returns current game state ID.
     */
    game_id(this: void): TXR_EGameID;

    get_active_cam(this: void): u8;
    get_bounding_volume(this: void): Fbox;
    get_game_difficulty(this: void): TXR_game_difficulty;
    get_snd_volume(this: void): f32;
    /**
     * Get object target distance aimed by crosshair.
     */
    get_target_dist(this: void): f32;
    get_target_element(this: void): u32;
    /**
     * Get object target aimed by crosshair.
     */
    get_target_obj(this: void): game_object | null;
    get_time_days(this: void): u32;
    get_time_factor(this: void): f32;
    get_time_hours(this: void): u32;
    get_time_minutes(this: void): u32;
    get_weather(this: void): string;
    get_wfx_time(this: void): f32;
    hide_indicators(this: void): void;
    hide_indicators_safe(this: void): void;
    high_cover_in_direction(this: void, num: u32, vector: vector): f32;
    is_wfx_playing(this: void): boolean;
    iterate_online_objects(this: void, cb: (object: game_object) => void | boolean): void;
    iterate_sounds(this: void, str: string, num: u32, cb: () => void): void;
    iterate_sounds(this: void, str: string, num: u32, object: object, cb: () => void): void;
    low_cover_in_direction(this: void, num: u32, vector: vector): f32;
    main_input_receiver(this: void): CUIDialogWnd;
    map_add_object_spot(this: void, id: u16, selector: string, hint: string): void;
    map_add_object_spot_ser(this: void, id: u16, str1: string, str2: string): void;
    map_change_spot_hint(this: void, num: u16, selector: string, hint: string): void;
    map_has_object_spot(this: void, object_id: u16, selector: string): number;
    map_remove_object_spot(this: void, id: u16, selector: string): void;
    name<T extends string = string>(this: void): T;
    object_by_id(this: void, object_id: u16): game_object | null;
    patrol_path_exists(this: void, path_name: string): boolean;
    physics_world(this: void): physics_world;
    prefetch_sound(this: void, str: string): void;
    /**
     * @returns whether game level is loaded
     */
    present(this: void): boolean;
    /**
     * @returns intensity of rain, 0 if no rain active
     */
    rain_factor(this: void): f32;
    remove_call(this: void, cb1: () => boolean, cb2: () => void): void;
    remove_call(this: void, object: object, cb1: () => boolean, cb2: () => void): void;
    remove_call(this: void, object: object, str1: string, str2: string): void;
    remove_calls_for_object(this: void, object: object): void;
    remove_cam_effector(this: void, id: i32): void;
    remove_complex_effector(this: void, id: i32): void;
    remove_dialog_to_render(this: void, window: CUIDialogWnd): void;
    remove_pp_effector(this: void, id: i32): void;
    send(net_packet: net_packet, bool1: boolean, bool2: boolean, bool3: boolean, bool4: boolean): void;
    set_active_cam(this: void, id: u8): void;
    set_game_difficulty(this: void, difficulty: unknown /* enum ESingleGameDifficulty */): void;
    set_pp_effector_factor(this: void, id: i32, f: f32, f_sp?: f32): void;
    set_snd_volume(this: void, num: f32): void;
    set_time_factor(this: void, factor: f32): void;
    set_weather(this: void, weather_name: string, is_forced: boolean): void;
    set_weather_fx(this: void, str: string): boolean;
    show_indicators(this: void): void;
    show_weapon(this: void, val: boolean): void;
    spawn_item(this: void, str: string, vector: vector, uint: u32, ushort: u16, bool: boolean): void;
    spawn_phantom(this: void, vector: vector): void;
    start_stop_menu(this: void, dialog: CUIDialogWnd, bool: boolean): void;
    start_weather_fx_from_time(this: void, str: string, num: f32): boolean;
    stop_weather_fx(this: void): void;
    vertex_id(this: void, vector: vector): u32;
    vertex_in_direction(this: void, num1: u32, vector: vector, num2: f32): u32;
    vertex_position(this: void, id: u32): vector;
    ray_pick(
      this: void,
      vec: vector,
      vec2: vector,
      fl: f32,
      enumc: unknown,
      rqres: unknown,
      gobj: game_object
    ): boolean;
  }

  /**
   * @source namespace main_menu
   * @group xr_global
   */
  export interface IXR_main_menu {
    /**
     * @returns main game menu c++ controller singleton
     */
    get_main_menu(this: void): CMainMenu;
  }

  /**
   * @source namespace relation_registry
   * @group xr_global
   */
  export interface IXR_relation_registry {
    /**
     * Change relation from community to object by `delta_goodwill`.
     */
    change_community_goodwill(this: void, from_community: string, to_object_id: i32, delta_goodwill: i32): void;
    community_goodwill(this: void, from_community: string, to_object_id: i32): i32;
    /**
     * @returns relation points between communities, usually between `-5000` and `5000`
     */
    community_relation(this: void, from_community: string, to_community: string): i32;
    /**
     * Get relation from object to actor.
     * Return formula looks like `personal_goodwill + community_to_obj_goodwill + community_to_community_goodwill`.
     *
     * @param from_object_id - object from
     * @param to_object_id - object to
     * @returns general goodwill from object to another object based on personal and community goodwill
     */
    get_general_goodwill_between(this: void, from_object_id: u16, to_object_id: u16): i32;
    set_community_goodwill(this: void, from_community: string, to_object_id: i32, goodwill: i32): void;
    set_community_relation(this: void, from_community: string, to_community: string, goodwill: i32): void;
  }

  /**
   * @source namespace actor_stats
   * @group xr_global
   */
  export interface IXR_actor_stats {
    add_points_str(this: void, value1: string, value2: string, value3: string): void;
    get_points(this: void, value: string): i32;
    add_points(this: void, value1: string, value2: string, value3: i32, value4: i32): void;
    remove_from_ranking(this: void, object_id: number): void | null;
  }

  /**
   * @source namespace ActorMenu
   * @group xr_global
   */
  export interface IXR_ActorMenu {
    get_pda_menu(this: void): CUIPdaWnd;
    get_actor_menu(this: void): CUIActorMenu;
    /**
     * enum EMenuMode
     * {
     *     mmUndefined,
     *     mmInventory,
     *     mmTrade,
     *     mmUpgrade,
     *     mmDeadBodySearch,
     * };
     */
    get_menu_mode(this: void): number;
    // get_maingame(this: void): unknown; // CUIMainIngameWnd - not registered, throws exception
  }

  /**
   * @source namespace game
   * @group xr_global
   */
  export interface IXR_game {
    CTime: (this: void) => CTime;

    translate_string(this: void, translation_key: string): string;
    time(this: void): u32;
    reload_language(this: void): void;
    get_game_time(this: void): CTime;
    log_stack_trace(this: void): void;
    jump_to_level(this: void, level_name: string): void;
    jump_to_level(this: void, position: vector, lvi: u32, gvi: u16): void;
    jump_to_level(this: void, position: vector, lvi: u32, gvi: u16, direction: vector): void;
    start_tutorial(this: void, tutorial_id: string): void;
    has_active_tutorial(this: void): boolean;
    active_tutorial_name(this: void): string;
    stop_tutorial(this: void): void;
  }
}
