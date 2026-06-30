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
     * @remarks
     * The physics commander polls this callback pair. Remove it with the same condition and action callbacks when the
     * owner no longer needs it.
     *
     * @param condition - Callback polled by the engine.
     * @param action - Callback called when the condition is satisfied.
     */
    add_call(this: void, condition: (this: void) => boolean, action: (this: void) => boolean): void;

    /**
     * Register a conditional level callback owned by an object.
     *
     * @remarks
     * The owner is used only for callback lookup and bulk removal. Keep the object alive while the callback can run.
     *
     * @param object - Owner object used for later removal.
     * @param condition - Callback polled by the engine.
     * @param action - Callback called when the condition is satisfied.
     */
    add_call(this: void, object: object, condition: (this: void) => boolean, action: (this: void) => boolean): void;

    /**
     * Register named object methods as a conditional level callback.
     *
     * @remarks
     * This overload registers a unique callback pair for the object and method names.
     *
     * @param object - Owner object used for callback lookup and removal.
     * @param condition - Method name used as condition callback.
     * @param action - Method name called when the condition is satisfied.
     */
    add_call(this: void, object: object, condition: string, action: string): void;

    /**
     * Start a camera effector.
     *
     * @remarks
     * Requires an actor. The binding adds the effector to `Actor().Cameras()`.
     *
     * @param effect - Camera effector animation file.
     * @param id - Effector id used for replacement and removal.
     * @param is_cyclic - Whether the effector loops.
     * @param callback - Lua callback name called when the effector finishes.
     * @returns Effector animation length.
     */
    add_cam_effector(this: void, effect: string, id: i32, is_cyclic: boolean, callback: string): f32;

    /**
     * Start a camera effector with custom field of view.
     *
     * @since OpenXRay 2019-05-07, 2d1b946a, PR #382
     *
     * @remarks
     * Requires an actor. The binding adds the effector to `Actor().Cameras()`.
     *
     * @param effect - Camera effector animation file.
     * @param id - Effector id used for replacement and removal.
     * @param is_cyclic - Whether the effector loops.
     * @param callback - Lua callback name called when the effector finishes.
     * @param camera_fov - Optional field of view for the effector.
     * @returns Effector animation length.
     */
    add_cam_effector2(this: void, effect: string, id: i32, is_cyclic: boolean, callback: string, camera_fov?: f32): f32;

    /**
     * Start a named complex effector.
     *
     * @remarks
     * Requires an actor. The effector is attached to the current actor object.
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
     * @remarks
     * Requires an actor. The effector is attached to the actor camera manager.
     *
     * @param file_name - Post-process effector file.
     * @param id - Effector id used for replacement and removal.
     * @param is_cyclic - Whether the effector loops.
     */
    add_pp_effector(this: void, file_name: string, id: i32, is_cyclic: boolean): void;

    /**
     * Move game time forward.
     *
     * @remarks
     * Works only on a single-player server with ALife available. Otherwise the binding returns without changing time.
     *
     * @param days - Days to add.
     * @param hours - Hours to add.
     * @param minutes - Minutes to add.
     */
    change_game_time(this: void, days: u32, hours: u32, minutes: u32): void;

    /**
     * Validate a game object pointer in the engine.
     *
     * @remarks
     * Exported only in debug builds.
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
     * @remarks
     * Exported only in debug builds.
     *
     * @returns Actor game object.
     */
    debug_actor(this: void): game_object;

    /**
     * Find an object by debug name.
     *
     * @remarks
     * Exported only in debug builds.
     *
     * @param name - Object name.
     * @returns Matching game object.
     */
    debug_object(this: void, name: string): game_object;

    /**
     * Disable player input.
     *
     * @remarks
     * Does nothing while the actor exists and permanent god mode is enabled.
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
     * @since OpenXRay 2015-07-07, 6e703b4c
     *
     * @remarks
     * Returns `255` when the current view entity is not an actor.
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
     * @since OpenXRay 2014-12-27, c82669625
     *
     * @returns Target distance.
     */
    get_target_dist(this: void): f32;

    /**
     * Get targeted model element under the crosshair.
     *
     * @since OpenXRay 2015-06-03, 7213550c
     *
     * @remarks
     * Returns `0` when the current ray query has no model element.
     *
     * @returns Target element id.
     */
    get_target_element(this: void): u32;

    /**
     * Get the object under the crosshair.
     *
     * @since OpenXRay 2014-12-27, c82669625
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
     *
     * @remarks
     * Also enables the runtime god-mode flag used while HUD indicators are hidden.
     */
    hide_indicators(this: void): void;

    /**
     * Hide HUD indicators if the HUD is available.
     *
     * @remarks
     * Also enables the runtime god-mode flag used while HUD indicators are hidden.
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
     * @since OpenXRay 2019-04-28, 13c5c022
     *
     * @param cb - Callback called for each online object.
     */
    iterate_online_objects(this: void, cb: (this: void, object: game_object) => void | boolean): void;

    /**
     * Iterate sounds from a sound collection.
     *
     * @remarks
     * `section` may contain a comma-separated list of base names. The callback receives each existing sound name found
     * in `$game_sounds$`, including numbered variants from `0` up to `max_count - 1`.
     *
     * @param section - Sound collection section.
     * @param max_count - Numbered suffixes to probe for each base name.
     * @param cb - Callback called with each sound name.
     */
    iterate_sounds(this: void, section: string, max_count: u32, cb: (this: void, name: string) => void): void;

    /**
     * Iterate sounds from a sound collection with an owner object.
     *
     * @remarks
     * `section` may contain a comma-separated list of base names. The callback receives each existing sound name found
     * in `$game_sounds$`, including numbered variants from `0` up to `max_count - 1`.
     *
     * @param section - Sound collection section.
     * @param max_count - Numbered suffixes to probe for each base name.
     * @param object - Owner object.
     * @param cb - Callback called with each sound name.
     */
    iterate_sounds(
      this: void,
      section: string,
      max_count: u32,
      object: object,
      cb: (this: void, name: string) => void
    ): void;

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
     * @remarks
     * Does nothing when the object does not have a matching map spot.
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
     * @remarks
     * The callbacks must match the original registered pair.
     *
     * @param condition - Condition callback originally registered.
     * @param action - Action callback originally registered.
     */
    remove_call(this: void, condition: (this: void) => boolean, action: (this: void) => void): void;

    /**
     * Remove an object-owned conditional level callback.
     *
     * @remarks
     * The owner and callbacks must match the original registered pair.
     *
     * @param object - Owner object.
     * @param condition - Condition callback originally registered.
     * @param action - Action callback originally registered.
     */
    remove_call(this: void, object: object, condition: (this: void) => boolean, action: (this: void) => void): void;

    /**
     * Remove named object methods registered as a level callback.
     *
     * @remarks
     * The owner and method names must match the original registered pair.
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
     * @remarks
     * Requires an actor. The binding removes the effector from `Actor().Cameras()`.
     *
     * @param id - Effector id.
     */
    remove_cam_effector(this: void, id: i32): void;

    /**
     * Stop a complex effector.
     *
     * @remarks
     * Requires an actor. The binding removes the effector from the current actor object.
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
     * @remarks
     * Requires an actor. Does nothing when no post-process effector exists for the id.
     *
     * @param id - Effector id.
     */
    remove_pp_effector(this: void, id: i32): void;

    /**
     * Send a network packet through the level.
     *
     * @since OpenXRay 2014-12-27, c82669625
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
     * @since OpenXRay 2015-07-07, 6e703b4c
     *
     * @remarks
     * Does nothing when the current view entity is not an actor or when the id is outside the actor camera range.
     *
     * @param id - Camera id.
     */
    set_active_cam(this: void, id: u8): void;

    /**
     * Set active single-player difficulty.
     *
     * @remarks
     * Updates the global difficulty and notifies the active single-player game state.
     *
     * @throws If the active game state is not single-player.
     *
     * @param difficulty - Difficulty id.
     */
    set_game_difficulty(this: void, difficulty: unknown /* Enum ESingleGameDifficulty */): void;

    /**
     * Set a post-process effector factor.
     *
     * @remarks
     * Requires an actor. Does nothing when no post-process effector exists for the id.
     *
     * @param id - Effector id.
     * @param factor - Target factor.
     * @param speed - Optional transition speed.
     */
    set_pp_effector_factor(this: void, id: i32, factor: f32, speed?: f32): void;

    /**
     * Set sound volume.
     *
     * @remarks
     * The engine clamps the value to the `0..1` range.
     *
     * @param volume - Sound volume.
     */
    set_snd_volume(this: void, volume: f32): void;

    /**
     * Set game time speed multiplier.
     *
     * @remarks
     * Works only on the server and outside editor mode. Otherwise the binding returns without changing the time factor.
     *
     * @param factor - Time factor.
     */
    set_time_factor(this: void, factor: f32): void;

    /**
     * Change active game weather.
     *
     * @remarks
     * Does nothing in editor mode.
     *
     * @param weather_name - Name of weather config to apply.
     * @param is_forced - Whether weather change should be forced.
     */
    set_weather(this: void, weather_name: string, is_forced: boolean): void;

    /**
     * Start a weather effect by name.
     *
     * @remarks
     * Returns `false` in editor mode.
     *
     * @param weather_fx_name - Weather effect config name.
     * @returns Whether the effect started.
     */
    set_weather_fx(this: void, weather_fx_name: string): boolean;

    /**
     * Show HUD indicators.
     *
     * @remarks
     * Clears the runtime god-mode flag set by `hide_indicators()` and `hide_indicators_safe()`.
     */
    show_indicators(this: void): void;

    /**
     * Show or hide actor weapon.
     *
     * @remarks
     * Does nothing while the actor exists and permanent god mode is enabled.
     *
     * @param is_visible - Whether weapon should be visible.
     */
    show_weapon(this: void, is_visible: boolean): void;

    /**
     * Spawn an item on the level.
     *
     * @since OpenXRay 2015-01-18, 3ee7401d
     *
     * @remarks
     * Uses the level spawn path, which is suitable for sections that are unsafe to create through `alife():create()`,
     * such as bolts, phantoms, and ammo.
     *
     * @param section - Item section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Target level vertex.
     * @param parent_id - Parent object id, or `0xffff` for none.
     * @param return_item - Engine spawn flag passed through to `Level().spawn_item`.
     */
    spawn_item(
      this: void,
      section: string,
      position: vector,
      level_vertex_id: u32,
      parent_id: u16,
      return_item: boolean
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
     * @remarks
     * Hides the dialog when it is already shown. Otherwise shows it and applies `should_hide_indicators`.
     *
     * @param dialog - Dialog window.
     * @param should_hide_indicators - Whether showing the dialog should hide HUD indicators.
     */
    start_stop_menu(this: void, dialog: CUIDialogWnd, should_hide_indicators: boolean): void;

    /**
     * Start a weather effect from a specific time.
     *
     * @remarks
     * Returns `false` in editor mode.
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
     * @remarks
     * The binding preserves original Lua behavior for invalid vertices and returns `4294967296` instead of `u32(-1)`.
     *
     * @param position - World position.
     * @returns Level vertex id.
     */
    vertex_id(this: void, position: vector): u64;

    /**
     * Move from a level vertex in a direction.
     *
     * @remarks
     * Returns the original vertex when the engine cannot find a valid vertex in the requested direction.
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
     * @remarks
     * `result` is updated only when this returns `true`.
     *
     * @param position - Ray origin.
     * @param direction - Ray direction.
     * @param range - Ray range.
     * @param target - Ray query target flags.
     * @param result - Ray query result placeholder.
     * @param ignore_object - Object ignored by the query, or `null`.
     * @returns Whether the ray hit anything.
     */
    ray_pick(
      this: void,
      position: vector,
      direction: vector,
      range: f32,
      target: unknown,
      result: unknown,
      ignore_object: game_object | null
    ): boolean;
  }

  /**
   * Global engine `level` namespace.
   *
   * @group xr_level
   */
  export const level: IXR_level;
}
