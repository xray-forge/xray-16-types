declare module "xray16" {
  /**
   * Global helpers for the currently loaded level.
   *
   * This namespace covers object lookup, time/weather control, navigation queries, map spots, and effectors.
   *
   * @source namespace level
   * @group xr_level
   */
  export interface IXR_level {
    /**
     * Register a conditional level callback.
     *
     * @param condition - Callback polled by the engine.
     * @param action - Callback called when the condition is satisfied.
     */
    add_call(this: void, condition: (this: void) => boolean, action: (this: void) => boolean): void;

    /**
     * Register a conditional level callback owned by an object.
     *
     * @param object - Owner object used for later removal.
     * @param condition - Callback polled by the engine.
     * @param action - Callback called when the condition is satisfied.
     */
    add_call(
      this: void,
      object: object,
      condition: (this: void) => boolean,
      action: (this: void) => boolean
    ): void;

    /**
     * Register named object methods as a conditional level callback.
     *
     * @param object - Owner object used for callback lookup and removal.
     * @param condition - Method name used as condition callback.
     * @param action - Method name called when the condition is satisfied.
     */
    add_call(this: void, object: object, condition: string, action: string): void;

    /**
     * Start a camera effector.
     *
     * @param effect - Camera effector animation file.
     * @param id - Effector id used for replacement and removal.
     * @param is_cyclic - Whether the effector loops.
     * @param callback - Lua callback name called when the effector finishes.
     */
    add_cam_effector(this: void, effect: string, id: i32, is_cyclic: boolean, callback: string): void;

    /**
     * Start a camera effector with custom field of view.
     *
     * @param effect - Camera effector animation file.
     * @param id - Effector id used for replacement and removal.
     * @param is_cyclic - Whether the effector loops.
     * @param callback - Lua callback name called when the effector finishes.
     * @param camera_fov - Field of view for the effector.
     */
    add_cam_effector2(
      this: void,
      effect: string,
      id: i32,
      is_cyclic: boolean,
      callback: string,
      camera_fov: f32
    ): void;

    /**
     * Start a named complex effector.
     *
     * @param section - Effector section name.
     * @param id - Effector id used for replacement and removal.
     */
    add_complex_effector(this: void, section: string, id: i32): void;

    /**
     * Add a dialog window to the render list.
     *
     * @param window - Dialog window to render.
     */
    add_dialog_to_render(this: void, window: CUIDialogWnd): void;

    /**
     * Start a post-process effector.
     *
     * @param file_name - Post-process effector file.
     * @param id - Effector id used for replacement and removal.
     * @param is_cyclic - Whether the effector loops.
     */
    add_pp_effector(this: void, file_name: string, id: i32, is_cyclic: boolean): void;

    /**
     * Move game time forward.
     *
     * @param days - Days to add.
     * @param hours - Hours to add.
     * @param minutes - Minutes to add.
     */
    change_game_time(this: void, days: u32, hours: u32, minutes: u32): void;

    /**
     * Validate a game object pointer in the engine.
     *
     * @param object - Object to check.
     */
    check_object(this: void, object: game_object): void;

    /**
     * Get the level client spawn manager.
     *
     * @returns Client spawn manager.
     */
    client_spawn_manager(this: void): client_spawn_manager;

    /**
     * Get actor object used by debug helpers.
     *
     * @returns Actor game object.
     */
    debug_actor(this: void): game_object;

    /**
     * Find an object by debug name.
     *
     * @param name - Object name.
     * @returns Matching game object.
     */
    debug_object(this: void, name: string): game_object;

    /**
     * Disable player input.
     */
    disable_input(this: void): void;

    /**
     * Enable player input.
     */
    enable_input(this: void): void;

    /**
     * Get the active environment object.
     *
     * @returns Engine environment object.
     */
    environment(this: void): unknown /* XR_CEnvironment */;

    /**
     * Get current game state id.
     *
     * @returns Game id bitmask.
     */
    game_id(this: void): TXR_EGameID;

    /**
     * Get active camera id.
     *
     * @returns Camera id.
     */
    get_active_cam(this: void): u8;

    /**
     * Get the level bounding box.
     *
     * @returns Level bounds.
     */
    get_bounding_volume(this: void): Fbox;

    /**
     * Get active single-player difficulty.
     *
     * @returns Difficulty id.
     */
    get_game_difficulty(this: void): TXR_game_difficulty;

    /**
     * Get sound volume.
     *
     * @returns Sound volume.
     */
    get_snd_volume(this: void): f32;

    /**
     * Get distance to the object or surface under the crosshair.
     *
     * @returns Target distance.
     */
    get_target_dist(this: void): f32;

    /**
     * Get targeted model element under the crosshair.
     *
     * @returns Target element id.
     */
    get_target_element(this: void): u32;

    /**
     * Get the object under the crosshair.
     *
     * @returns Target object, or `null` when nothing is targeted.
     */
    get_target_obj(this: void): game_object | null;

    /**
     * Get current game day count.
     *
     * @returns Current day count.
     */
    get_time_days(this: void): u32;

    /**
     * Get game time speed multiplier.
     *
     * @returns Time factor.
     */
    get_time_factor(this: void): f32;

    /**
     * Get current game hour.
     *
     * @returns Hour of day.
     */
    get_time_hours(this: void): u32;

    /**
     * Get current game minute.
     *
     * @returns Minute of hour.
     */
    get_time_minutes(this: void): u32;

    /**
     * Get current weather cycle name.
     *
     * @returns Weather name.
     */
    get_weather(this: void): string;

    /**
     * Get active weather effect time.
     *
     * @returns Weather effect time.
     */
    get_wfx_time(this: void): f32;

    /**
     * Hide HUD indicators.
     */
    hide_indicators(this: void): void;

    /**
     * Hide HUD indicators if the HUD is available.
     */
    hide_indicators_safe(this: void): void;

    /**
     * Sample high cover from a level vertex in a direction.
     *
     * @param vertex_id - Level vertex id.
     * @param direction - Direction to sample.
     * @returns Cover value.
     */
    high_cover_in_direction(this: void, vertex_id: u32, direction: vector): f32;

    /**
     * Check whether a weather effect is playing.
     *
     * @returns Whether a weather effect is active.
     */
    is_wfx_playing(this: void): boolean;

    /**
     * Iterate objects currently online on the level.
     *
     * @param cb - Callback called for each online object.
     */
    iterate_online_objects(this: void, cb: (this: void, object: game_object) => void | boolean): void;

    /**
     * Iterate sounds from a sound collection.
     *
     * @param section - Sound collection section.
     * @param type - Sound type filter.
     * @param cb - Callback called for each sound.
     */
    iterate_sounds(this: void, section: string, type: u32, cb: (this: void) => void): void;

    /**
     * Iterate sounds from a sound collection with an owner object.
     *
     * @param section - Sound collection section.
     * @param type - Sound type filter.
     * @param object - Owner object.
     * @param cb - Callback called for each sound.
     */
    iterate_sounds(this: void, section: string, type: u32, object: object, cb: (this: void) => void): void;

    /**
     * Sample low cover from a level vertex in a direction.
     *
     * @param vertex_id - Level vertex id.
     * @param direction - Direction to sample.
     * @returns Cover value.
     */
    low_cover_in_direction(this: void, vertex_id: u32, direction: vector): f32;

    /**
     * Get the main UI input receiver.
     *
     * @returns Active dialog window.
     */
    main_input_receiver(this: void): CUIDialogWnd;

    /**
     * Add a PDA map spot for an object.
     *
     * @param object_id - Target object id.
     * @param spot_type - Spot type from map spot config.
     * @param hint - Spot hint text.
     */
    map_add_object_spot(this: void, object_id: u16, spot_type: string, hint: string): void;

    /**
     * Add a serialized PDA map spot for an object.
     *
     * @param object_id - Target object id.
     * @param spot_type - Spot type from map spot config.
     * @param hint - Spot hint text.
     */
    map_add_object_spot_ser(this: void, object_id: u16, spot_type: string, hint: string): void;

    /**
     * Change hint text for an object map spot.
     *
     * @param object_id - Target object id.
     * @param spot_type - Spot type from map spot config.
     * @param hint - New hint text.
     */
    map_change_spot_hint(this: void, object_id: u16, spot_type: string, hint: string): void;

    /**
     * Check if an object has a map spot registered with provided selector.
     *
     * @param object_id - Game object id to check.
     * @param spot_type - Map spot type.
     * @returns Non-zero count when the spot exists.
     */
    map_has_object_spot(this: void, object_id: u16, spot_type: string): u16;

    /**
     * Remove an object map spot if it exists.
     *
     * @param object_id - Game object id to update.
     * @param spot_type - Map spot type.
     */
    map_remove_object_spot(this: void, object_id: u16, spot_type: string): void;

    /**
     * Get current level name.
     *
     * @returns Level name.
     */
    name<T extends string = string>(this: void): T;

    /**
     * Find an online object by id.
     *
     * @param object_id - Game object id.
     * @returns Matching object, or `null` when it is not online.
     */
    object_by_id(this: void, object_id: u16): game_object | null;

    /**
     * Check whether a patrol path exists on this level.
     *
     * @param path_name - Patrol path name.
     * @returns Whether the patrol path exists.
     */
    patrol_path_exists(this: void, path_name: string): boolean;

    /**
     * Get the level physics world.
     *
     * @returns Physics world object.
     */
    physics_world(this: void): physics_world;

    /**
     * Preload a sound resource.
     *
     * @param sound - Sound resource name.
     */
    prefetch_sound(this: void, sound: string): void;

    /**
     * Check whether a game level is loaded.
     *
     * @returns Whether a level is present.
     */
    present(this: void): boolean;

    /**
     * Get current rain intensity.
     *
     * @returns Rain intensity, or `0` when no rain is active.
     */
    rain_factor(this: void): f32;

    /**
     * Remove a conditional level callback.
     *
     * @param condition - Condition callback originally registered.
     * @param action - Action callback originally registered.
     */
    remove_call(this: void, condition: (this: void) => boolean, action: (this: void) => void): void;

    /**
     * Remove an object-owned conditional level callback.
     *
     * @param object - Owner object.
     * @param condition - Condition callback originally registered.
     * @param action - Action callback originally registered.
     */
    remove_call(
      this: void,
      object: object,
      condition: (this: void) => boolean,
      action: (this: void) => void
    ): void;

    /**
     * Remove named object methods registered as a level callback.
     *
     * @param object - Owner object.
     * @param condition - Condition method name.
     * @param action - Action method name.
     */
    remove_call(this: void, object: object, condition: string, action: string): void;

    /**
     * Remove all registered level callbacks for an object.
     *
     * @param object - Owner object.
     */
    remove_calls_for_object(this: void, object: object): void;

    /**
     * Stop a camera effector.
     *
     * @param id - Effector id.
     */
    remove_cam_effector(this: void, id: i32): void;

    /**
     * Stop a complex effector.
     *
     * @param id - Effector id.
     */
    remove_complex_effector(this: void, id: i32): void;

    /**
     * Remove a dialog window from the render list.
     *
     * @param window - Dialog window to stop rendering.
     */
    remove_dialog_to_render(this: void, window: CUIDialogWnd): void;

    /**
     * Stop a post-process effector.
     *
     * @param id - Effector id.
     */
    remove_pp_effector(this: void, id: i32): void;

    /**
     * Send a network packet through the level.
     *
     * @param packet - Packet to send.
     * @param reliable - Whether the packet is reliable.
     * @param sequential - Whether the packet is sequential.
     * @param high_priority - Whether to send with high priority.
     * @param send_immediately - Whether to flush immediately.
     */
    send(
      this: void,
      packet: net_packet,
      reliable: boolean,
      sequential: boolean,
      high_priority: boolean,
      send_immediately: boolean
    ): void;

    /**
     * Set active camera id.
     *
     * @param id - Camera id.
     */
    set_active_cam(this: void, id: u8): void;

    /**
     * Set active single-player difficulty.
     *
     * @param difficulty - Difficulty id.
     */
    set_game_difficulty(this: void, difficulty: unknown /* Enum ESingleGameDifficulty */): void;

    /**
     * Set a post-process effector factor.
     *
     * @param id - Effector id.
     * @param factor - Target factor.
     * @param speed - Optional transition speed.
     */
    set_pp_effector_factor(this: void, id: i32, factor: f32, speed?: f32): void;

    /**
     * Set sound volume.
     *
     * @param volume - Sound volume.
     */
    set_snd_volume(this: void, volume: f32): void;

    /**
     * Set game time speed multiplier.
     *
     * @param factor - Time factor.
     */
    set_time_factor(this: void, factor: f32): void;

    /**
     * Change active game weather.
     *
     * @param weather_name - Name of weather config to apply.
     * @param is_forced - Whether weather change should be forced.
     */
    set_weather(this: void, weather_name: string, is_forced: boolean): void;

    /**
     * Start a weather effect by name.
     *
     * @param weather_fx_name - Weather effect config name.
     * @returns Whether the effect started.
     */
    set_weather_fx(this: void, weather_fx_name: string): boolean;

    /**
     * Show HUD indicators.
     */
    show_indicators(this: void): void;

    /**
     * Show or hide actor weapon.
     *
     * @param is_visible - Whether weapon should be visible.
     */
    show_weapon(this: void, is_visible: boolean): void;

    /**
     * Spawn an item on the level.
     *
     * @param section - Item section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Target level vertex.
     * @param parent_id - Parent object id, or `0xffff` for none.
     * @param use_ai_locations - Whether to use AI locations.
     */
    spawn_item(
      this: void,
      section: string,
      position: vector,
      level_vertex_id: u32,
      parent_id: u16,
      use_ai_locations: boolean
    ): void;

    /**
     * Spawn a phantom at a position.
     *
     * @param position - Spawn position.
     */
    spawn_phantom(this: void, position: vector): void;

    /**
     * Start or stop a menu dialog.
     *
     * @param dialog - Dialog window.
     * @param is_active - Whether the dialog is active.
     */
    start_stop_menu(this: void, dialog: CUIDialogWnd, is_active: boolean): void;

    /**
     * Start a weather effect from a specific time.
     *
     * @param weather_fx_name - Weather effect config name.
     * @param time - Start time.
     * @returns Whether the effect started.
     */
    start_weather_fx_from_time(this: void, weather_fx_name: string, time: f32): boolean;

    /**
     * Stop the active weather effect.
     */
    stop_weather_fx(this: void): void;

    /**
     * Get nearest level vertex for a position.
     *
     * @param position - World position.
     * @returns Level vertex id.
     */
    vertex_id(this: void, position: vector): u32;

    /**
     * Move from a level vertex in a direction.
     *
     * @param vertex_id - Start level vertex id.
     * @param direction - Direction to move.
     * @param distance - Distance to move.
     * @returns Result level vertex id.
     */
    vertex_in_direction(this: void, vertex_id: u32, direction: vector, distance: f32): u32;

    /**
     * Get world position of a level vertex.
     *
     * @param id - Level vertex id.
     * @returns Vertex position.
     */
    vertex_position(this: void, id: u32): vector;

    /**
     * Cast a ray through the level collision world.
     *
     * @param position - Ray origin.
     * @param direction - Ray direction.
     * @param range - Ray range.
     * @param target - Ray query target flags.
     * @param result - Ray query result placeholder.
     * @param ignore_object - Object ignored by the query.
     * @returns Whether the ray hit anything.
     */
    ray_pick(
      this: void,
      position: vector,
      direction: vector,
      range: f32,
      target: unknown,
      result: unknown,
      ignore_object: game_object
    ): boolean;
  }

  /**
   * Global engine `level` namespace.
   *
   * @group xr_level
   */
  export const level: IXR_level;
}
