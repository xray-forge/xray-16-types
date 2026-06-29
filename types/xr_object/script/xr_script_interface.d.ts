declare module "xray16" {
  /**
   * @source C++ class cover_point
   * @customConstructor cover_point
   * @group xr_script_interface
   */
  export class cover_point {
    /**
     * Engine-created cover point descriptor.
     */
    private constructor();

    /**
     * Get the level vertex occupied by this cover.
     *
     * @returns Level vertex id.
     */
    public level_vertex_id(): u32;

    /**
     * Check whether this cover point comes from a smart cover.
     *
     * @returns Whether it is a smart cover.
     */
    public is_smart_cover(): boolean;

    /**
     * Get cover position.
     *
     * @returns Cover position.
     */
    public position(): vector;
  }

  /**
   * @source C++ class MonsterHitInfo
   * @customConstructor MonsterHitInfo
   * @group xr_script_interface
   */
  export class MonsterHitInfo extends EngineBinding {
    /**
     * Engine-created monster hit descriptor.
     */
    private constructor();

    /**
     * Hit direction.
     */
    public direction: vector;

    /**
     * Hit time.
     */
    public time: i32;

    /**
     * Object that caused the hit.
     */
    public who: game_object;
  }

  /**
   * Visibility state of bloodsucker.
   * Possible values are:
   * - unset = -1,
   * - no_visibility = 0,
   * - partial_visibility = 1,
   * - full_visibility = 2.
   *
   * @source C++ enum visibility_t
   * @group xr_script_interface
   */
  export type TXR_bloodsucker_visibility_state = -1 | 0 | 1 | 2;

  /**
   * @source C++ enum visibility_t
   * @group xr_script_interface
   */
  export type TXR_game_object_path = 0 | 1 | 2 | 3 | number;

  /**
   * @source C++ class callback
   * @customConstructor callback
   * @group xr_script_interface
   */
  export class callback {
    /**
     * Default x-ray 16 callbacks.
     */
    public static readonly trade_start: 0;
    /**
     * Engine enum value for `callback.trade_stop`.
     */
    public static readonly trade_stop: 1;
    /**
     * Engine enum value for `callback.trade_sell_buy_item`.
     */
    public static readonly trade_sell_buy_item: 2;
    /**
     * Engine enum value for `callback.trade_perform_operation`.
     */
    public static readonly trade_perform_operation: 3;
    /**
     * Engine enum value for `callback.zone_enter`.
     */
    public static readonly zone_enter: 4;
    /**
     * Engine enum value for `callback.zone_exit`.
     */
    public static readonly zone_exit: 5;
    /**
     * Engine enum value for `callback.level_border_exit`.
     */
    public static readonly level_border_exit: 6;
    /**
     * Engine enum value for `callback.level_border_enter`.
     */
    public static readonly level_border_enter: 7;
    /**
     * Engine enum value for `callback.death`.
     */
    public static readonly death: 8;
    /**
     * Engine enum value for `callback.patrol_path_in_point`.
     */
    public static readonly patrol_path_in_point: 9;
    /**
     * Engine enum value for `callback.inventory_pda`.
     */
    public static readonly inventory_pda: 10;
    /**
     * Engine enum value for `callback.inventory_info`.
     */
    public static readonly inventory_info: 11;
    /**
     * Engine enum value for `callback.article_info`.
     */
    public static readonly article_info: 12;
    /**
     * Engine enum value for `callback.task_state`.
     */
    public static readonly task_state: 13;
    /**
     * Engine enum value for `callback.map_location_added`.
     */
    public static readonly map_location_added: 14;
    /**
     * Engine enum value for `callback.use_object`.
     */
    public static readonly use_object: 15;
    /**
     * Engine enum value for `callback.hit`.
     */
    public static readonly hit: 16;
    /**
     * Engine enum value for `callback.sound`.
     */
    public static readonly sound: 17;
    /**
     * Engine enum value for `callback.action_movement`.
     */
    public static readonly action_movement: 18;
    /**
     * Engine enum value for `callback.action_watch`.
     */
    public static readonly action_watch: 19;
    /**
     * Engine enum value for `callback.action_removed`.
     */
    public static readonly action_removed: 20;
    /**
     * Engine enum value for `callback.action_animation`.
     */
    public static readonly action_animation: 21;
    /**
     * Engine enum value for `callback.action_sound`.
     */
    public static readonly action_sound: 22;
    /**
     * Engine enum value for `callback.action_particle`.
     */
    public static readonly action_particle: 23;
    /**
     * Engine enum value for `callback.action_object`.
     */
    public static readonly action_object: 24;
    /**
     * Engine enum value for `callback.actor_sleep`.
     */
    public static readonly actor_sleep: 25;
    /**
     * Engine enum value for `callback.helicopter_on_point`.
     */
    public static readonly helicopter_on_point: 26;
    /**
     * Engine enum value for `callback.helicopter_on_hit`.
     */
    public static readonly helicopter_on_hit: 27;
    /**
     * Engine enum value for `callback.on_item_take`.
     */
    public static readonly on_item_take: 28;
    /**
     * Engine enum value for `callback.on_item_drop`.
     */
    public static readonly on_item_drop: 29;
    /**
     * Engine enum value for `callback.script_animation`.
     */
    public static readonly script_animation: 30;
    /**
     * Engine enum value for `callback.trader_global_anim_request`.
     */
    public static readonly trader_global_anim_request: 31;
    /**
     * Engine enum value for `callback.trader_head_anim_request`.
     */
    public static readonly trader_head_anim_request: 32;
    /**
     * Engine enum value for `callback.trader_sound_end`.
     */
    public static readonly trader_sound_end: 33;
    /**
     * Engine enum value for `callback.take_item_from_box`.
     */
    public static readonly take_item_from_box: 34;
    /**
     * Engine enum value for `callback.weapon_no_ammo`.
     */
    public static readonly weapon_no_ammo: 35;
    /**
     * Engine enum value for `callback.hud_animation_end`.
     */
    public static readonly hud_animation_end: 36;

    /**
     * Engine enum value for `callback.key_press`.
     */
    public static readonly key_press: 37;
    /**
     * Engine enum value for `callback.key_release`.
     */
    public static readonly key_release: 38;
    /**
     * Engine enum value for `callback.key_hold`.
     */
    public static readonly key_hold: 39;
    /**
     * Engine enum value for `callback.mouse_move`.
     */
    public static readonly mouse_move: 40;
    /**
     * Engine enum value for `callback.mouse_wheel`.
     */
    public static readonly mouse_wheel: 41;
    /**
     * Engine enum value for `callback.controller_press`.
     */
    public static readonly controller_press: 42;
    /**
     * Engine enum value for `callback.controller_release`.
     */
    public static readonly controller_release: 43;
    /**
     * Engine enum value for `callback.controller_hold`.
     */
    public static readonly controller_hold: 44;
    // Public static readonly controller_attitude_change: 45;

    /**
     * Engine enum value for `callback.item_to_belt`.
     */
    public static readonly item_to_belt: 46;
    /**
     * Engine enum value for `callback.item_to_slot`.
     */
    public static readonly item_to_slot: 47;
    /**
     * Engine enum value for `callback.item_to_ruck`.
     */
    public static readonly item_to_ruck: 48;

    /**
     * Engine enum value for `callback.weapon_zoom_in`.
     */
    public static readonly weapon_zoom_in: 49;
    /**
     * Engine enum value for `callback.weapon_zoom_out`.
     */
    public static readonly weapon_zoom_out: 50;
    /**
     * Engine enum value for `callback.weapon_jammed`.
     */
    public static readonly weapon_jammed: 51;
    /**
     * Engine enum value for `callback.weapon_magazine_empty`.
     */
    public static readonly weapon_magazine_empty: 52;

    /**
     * Engine enum value for `callback.actor_before_death`.
     */
    public static readonly actor_before_death: 53;
    /**
     * Engine enum value for `callback.on_attach_vehicle`.
     */
    public static readonly on_attach_vehicle: 54;
    /**
     * Engine enum value for `callback.on_detach_vehicle`.
     */
    public static readonly on_detach_vehicle: 55;
    /**
     * Engine enum value for `callback.on_use_vehicle`.
     */
    public static readonly on_use_vehicle: 56;
  }

  /**
   * @group xr_script_interface
   */
  export type TXR_callbacks = typeof callback;

  /**
   * @group xr_script_interface
   */
  export type TXR_callback = EnumeratedStaticsValues<TXR_callbacks>;

  /**
   * Custom extension.
   * For reference: src/xrGame/script_game_object_script.cpp.
   *
   * @group xr_script_interface
   */
  class game_object_callbacks_implementation_base {
    /**
     * Remove callback.
     *
     * @param type - Type of callback.
     * @param cb - Null to reset.
     */
    public set_callback(type: TXR_callback, cb: null): void;

    /**
     * 0 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_start"],
      cb?: ((this: void) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 1 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_stop"],
      cb?: ((this: void) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 2 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_sell_buy_item"],
      cb?: ((this: void, item: game_object, money_direction: boolean, money: number) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 3 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_perform_operation"],
      cb?: ((this: void, money_get: u32, money_put: u32) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 4 todo;
     *
     * Works with script_zone objects.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["zone_enter"],
      cb?: ((this: void, zone: game_object, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 5 todo;
     *
     * Works with script_zone objects.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["zone_exit"],
      cb?: ((this: void, zone: game_object, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 6 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["level_border_exit"],
      cb?: ((this: void, xobject: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 7 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["level_border_enter"],
      cb?: ((this: void, xobject: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 8 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["death"],
      cb?: (this: void, target: game_object, killer: game_object) => void,
      object?: Maybe<T>
    ): void;

    /**
     * 9 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["patrol_path_in_point"],
      cb?: ((this: void, object: game_object, action_type: number, point_index: number) => void) | null,
      object?: Maybe<T>
    ): void;

    // 10 todo: inventory_pda -> implement in game engine

    /**
     * Callback executed when an NPC receives an info portion.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["inventory_info"],
      cb?: ((this: void, npc: game_object, info_id: string) => void) | null,
      object?: Maybe<T>
    ): void;

    // 12 todo: article_info -> implement in game engine

    /**
     * 13 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["task_state"],
      cb?: ((this: void, task: CGameTask, state: TXR_TaskState) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 14 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["map_location_added"],
      cb?: ((this: void, spot_type: string, id: u16) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 15 Use some object.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["use_object"],
      cb?: ((this: void, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 15 Use some object with explicit user object.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["use_object"],
      cb?: ((this: void, object: game_object, who: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 16 Entity got hit.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["hit"],
      cb?:
        | ((
            this: void,
            object: game_object,
            damage: number,
            direction: vector,
            who: game_object,
            bone_id: number
          ) => void)
        | null,
      object?: Maybe<T>
    ): void;

    /**
     * 17 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["sound"],
      cb?:
        | ((
            this: void,
            object: game_object,
            source_id: number,
            sound_type: TXR_snd_type,
            position: vector,
            sound_power: number
          ) => void)
        | null,
      object?: Maybe<T>
    ): void;

    /**
     * 18 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_movement"],
      cb?: ((this: void, object: game_object, movement_type: u32 /* EMovementType */, unknown: -1) => void) | null,
      object?: Maybe<T>
    ): void;

    // 19 todo: action_watch

    // 20 todo: action_removed

    // 21 todo: action_animation

    // 22 todo: action_sound

    // 23 todo: action_particle

    // 24 todo: action_object

    // 25 todo: actor_sleep -> implement in game engine

    /**
     * 26 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["helicopter_on_point"],
      cb?: ((this: void, distance: number, current_position: vector, vertex_id: number) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 27 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["helicopter_on_hit"],
      cb?: ((this: void, damage: number, impulse: number, hit_type: number, who_id: number) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 28 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_item_take"],
      cb?: ((this: void, object: game_object, item: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 29 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_item_drop"],
      cb?: ((this: void, object: game_object, item: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 30 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["script_animation"],
      cb?: ((this: void, skip_multi_anim_check?: boolean) => void) | null,
      object?: object | null
    ): void;

    /**
     * 31 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trader_global_anim_request"],
      cb?: ((this: void) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 32 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trader_head_anim_request"],
      cb?: ((this: void) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 33 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trader_sound_end"],
      cb?: ((this: void) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 34 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["take_item_from_box"],
      cb?: ((this: void, object: game_object, box: game_object, item: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 35 Callback executed when weapon has no ammo to fire.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_no_ammo"],
      cb?: ((this: void, object: game_object, suitable_ammo_total: i32) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 36 Callback executed on hud animation stop.
     * Called from CHudItem class internals.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["hud_animation_end"],
      cb?:
        | ((
            this: void,
            object: game_object,
            hud_section: string,
            current_motion: string,
            state: u32,
            animation_slot: u32
          ) => void)
        | null,
      object?: Maybe<T>
    ): void;

    /**
     * 37 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["key_press"],
      cb?: ((this: void, key: i32) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 38 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["key_release"],
      cb?: ((this: void, key: i32) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 39 todo;.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["key_hold"],
      cb?: ((this: void, key: i32) => void) | null,
      object?: Maybe<T>
    ): void;

    // 40 todo: mouse_move

    // 41 todo: mouse_wheel

    // 42 todo: controller_press

    // 43 todo: controller_release

    // 44 todo: controller_hold

    // 45 todo: controller_attitude_change

    /**
     * 46 todo: item_to_belt.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["item_to_belt"],
      cb?: ((this: void, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 47 todo: item_to_slot.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["item_to_slot"],
      cb?: ((this: void, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 48 todo: item_to_ruck.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["item_to_ruck"],
      cb?: ((this: void, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 49 Callback executed when weapon is zoomed in.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_zoom_in"],
      cb?: ((this: void, owner: game_object, weapon: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 50 Callback executed when weapon is zoomed out.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_zoom_out"],
      cb?: ((this: void, owner: game_object, weapon: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 51 Callback executed when magazine ammo is elapsed and empty.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_jammed"],
      cb?: ((this: void, owner: game_object, weapon: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 52 Callback executed when magazine ammo is elapsed and empty.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_magazine_empty"],
      cb?: ((this: void, object: game_object, suitable_ammo_total: i32) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 53 todo: actor_before_death.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["actor_before_death"],
      cb?: ((this: void, killer_id: u16) => void) | null,
      object?: Maybe<T>
    ): void;

    // 54 todo: on_attach_vehicle

    // 55 todo: on_detach_vehicle

    // 56 todo: on_use_vehicle

    /**
     * Clear all callbacks registered on this object.
     */
    public clear_callbacks(): void;

    /**
     * Clear the custom enemy selector callback.
     */
    public set_enemy_callback(cb: null): void;

    /**
     * Set a custom enemy selector callback.
     *
     * @param cb - Callback that receives this object and a candidate enemy.
     * @param object - Lua context used as callback `this`.
     */
    public set_enemy_callback<T>(cb: (this: T, object: game_object, enemy: game_object) => boolean, object: T): void;

    /**
     * Set a fast update callback for this object.
     *
     * @param cb - Callback called from the object's fast update path.
     * @param context - Lua context used as callback `this`.
     */
    public set_fastcall<T>(cb: (this: T) => boolean, context: T): void;

    /**
     * Set or clear the patrol extrapolation callback.
     *
     * @param cb - Callback called with current patrol point index.
     * @param object - Optional Lua context.
     */
    public set_patrol_extrapolate_callback(cb?: ((cur_pt: number) => boolean) | null, object?: object): void;

    /**
     * Set or clear smart-cover target selection callback.
     *
     * @param cb - Callback that receives this object when a smart-cover target is selected.
     * @param object - Optional Lua context.
     */
    public set_smart_cover_target_selector(cb?: ((object: game_object) => void) | null, object?: object | null): void;
  }
}
