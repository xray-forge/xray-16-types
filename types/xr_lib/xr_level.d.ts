declare module "xray16" {
  /**
   * @source namespace level
   * @group xr_level
   */
  export interface IXR_level {
    add_call(this: void, cb1: (this: void) => boolean, cb2: (this: void) => boolean): void;

    add_call(this: void, object: object, cb1: (this: void) => boolean, cb2: (this: void) => boolean): void;

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

    /**
     * @returns current hours time number
     */
    get_time_hours(this: void): u32;

    /**
     * @returns current minutes time number
     */
    get_time_minutes(this: void): u32;

    get_weather(this: void): string;

    get_wfx_time(this: void): f32;

    hide_indicators(this: void): void;

    hide_indicators_safe(this: void): void;

    high_cover_in_direction(this: void, num: u32, vector: vector): f32;

    is_wfx_playing(this: void): boolean;

    iterate_online_objects(this: void, cb: (this: void, object: game_object) => void | boolean): void;

    iterate_sounds(this: void, str: string, num: u32, cb: (this: void) => void): void;

    iterate_sounds(this: void, str: string, num: u32, object: object, cb: (this: void) => void): void;

    low_cover_in_direction(this: void, num: u32, vector: vector): f32;

    main_input_receiver(this: void): CUIDialogWnd;

    map_add_object_spot(this: void, id: u16, selector: string, hint: string): void;

    map_add_object_spot_ser(this: void, id: u16, str1: string, str2: string): void;

    map_change_spot_hint(this: void, num: u16, selector: string, hint: string): void;

    /**
     * Checks if object has map spot registered with provided selector.
     *
     * @param object_id - game object id to check map spot
     * @param spot_type - map spot type (icon type to display for the object)
     * @returns whether object map spot with provided selector is registered
     */
    map_has_object_spot(this: void, object_id: u16, spot_type: string): u16;

    /**
     * Remove object map spot if it exists.
     * Checks if map spot is registered and then removes it in such case.
     * There is no sense in checking object spot before calling removal since action will be duplicated.
     *
     * @param object_id - game object id to check map spot
     * @param spot_type - map spot type (icon type to display for the object)
     */
    map_remove_object_spot(this: void, object_id: u16, spot_type: string): void;

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

    remove_call(this: void, cb1: (this: void) => boolean, cb2: (this: void) => void): void;

    remove_call(this: void, object: object, cb1: (this: void) => boolean, cb2: (this: void) => void): void;

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

    /**
     * Change active game weather.
     *
     * @param weather_name - name of weather config to apply (gamedata\configs\environment\weathers)
     * @param is_forced - whether weather change should be forced
     */
    set_weather(this: void, weather_name: string, is_forced: boolean): void;

    set_weather_fx(this: void, weather_fs_name: string): boolean;

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
   * @group xr_level
   */
  export const level: IXR_level;
}
