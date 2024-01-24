declare module "xray16" {
  /**
   * @source C++ class cover_point
   * @customConstructor cover_point
   * @group xr_script_interface
   */
  export class cover_point {
    private constructor();

    public level_vertex_id(): u32;

    public is_smart_cover(): boolean;

    public position(): vector;
  }

  /**
   * @source C++ class MonsterHitInfo
   * @customConstructor MonsterHitInfo
   * @group xr_script_interface
   */
  export class MonsterHitInfo extends EngineBinding {
    private constructor();

    public direction: vector;

    public time: i32;

    public who: game_object;
  }

  /**
   * Visibility state of bloodsucker.
   * Possible values are:
   * - unset = -1,
   * - no_visibility = 0,
   * - partial_visibility = 1,
   * - full_visibility = 2
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
     * Placeholder.
     */
    public static readonly dummy: -1;

    /**
     * Default x-ray 16 callbacks.
     */
    public static readonly trade_start: 0;
    public static readonly trade_stop: 1;
    public static readonly trade_sell_buy_item: 2;
    public static readonly trade_perform_operation: 3;
    public static readonly zone_enter: 4;
    public static readonly zone_exit: 5;
    public static readonly level_border_exit: 6;
    public static readonly level_border_enter: 7;
    public static readonly death: 8;
    public static readonly patrol_path_in_point: 9;
    public static readonly inventory_pda: 10;
    public static readonly inventory_info: 11;
    public static readonly article_info: 12;
    public static readonly task_state: 13;
    public static readonly map_location_added: 14;
    public static readonly use_object: 15;
    public static readonly hit: 16;
    public static readonly sound: 17;
    public static readonly action_movement: 18;
    public static readonly action_watch: 19;
    public static readonly action_removed: 20;
    public static readonly action_animation: 21;
    public static readonly action_sound: 22;
    public static readonly action_particle: 23;
    public static readonly action_object: 24;
    public static readonly actor_sleep: 25;
    public static readonly helicopter_on_point: 26;
    public static readonly helicopter_on_hit: 27;
    public static readonly on_item_take: 28;
    public static readonly on_item_drop: 29;
    public static readonly script_animation: 30;
    public static readonly trader_global_anim_request: 31;
    public static readonly trader_head_anim_request: 32;
    public static readonly trader_sound_end: 33;
    public static readonly take_item_from_box: 34;
    public static readonly weapon_no_ammo: 35;

    /**
     * Custom callbacks from open x-ray:
     */
    public static readonly key_press: 36;
    public static readonly key_release: 37;
    public static readonly key_hold: 38;
    public static readonly mouse_move: 39;
    public static readonly mouse_wheel: 40;
    public static readonly controller_press: 41;
    public static readonly controller_release: 42;
    public static readonly controller_hold: 43;
    public static readonly item_to_belt: 44;
    public static readonly item_to_slot: 45;
    public static readonly item_to_ruck: 46;
    public static readonly actor_before_death: 47;
    public static readonly on_attach_vehicle: 48;
    public static readonly on_detach_vehicle: 49;
    public static readonly on_use_vehicle: 50;
    public static readonly weapon_zoom_in: 51;
    public static readonly weapon_zoom_out: 52;
    public static readonly weapon_jammed: 53;
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
   * For reference: src/xrGame/script_game_object_script.cpp
   *
   * @group xr_script_interface
   */
  class game_object_callbacks_implementation_base {
    /**
     * Remove callback.
     *
     * @param type - type of callback
     * @param cb - null to reset
     */
    public set_callback(type: TXR_callback, cb: null): void;

    // 0 todo: trade start

    // 1 todo: trade stop

    /**
     * 2 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_sell_buy_item"],
      cb?: ((this: void, item: game_object, money_direction: boolean, money: number) => void) | null,
      object?: Maybe<T>
    ): void;

    // 3 todo: trade_perform_operation

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
     * 4 todo;
     *
     * Works with script_zone objects.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["zone_exit"],
      cb?: ((this: void, zone: game_object, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    // 6 todo: level_border_exit

    // 7 todo: level_border_enter

    /**
     * 8 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["death"],
      cb?: (this: void, target: game_object, killer: game_object) => void,
      object?: Maybe<T>
    ): void;

    /**
     * 9 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["patrol_path_in_point"],
      cb?: ((this: void, object: game_object, action_type: number, point_index: number) => void) | null,
      object?: Maybe<T>
    ): void;

    // 10 todo: inventory_pda

    /**
     * 11 todo:
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["inventory_info"],
      cb?: ((this: void, npc: game_object, info_id: string) => void) | null,
      object?: Maybe<T>
    ): void;

    // 12 todo: article_info

    /**
     * 13 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["task_state"],
      cb?: ((this: void, task: CGameTask, state: TXR_TaskState) => void) | null,
      object?: Maybe<T>
    ): void;

    // 14 todo: map_location_added

    /**
     * 15 Use some object.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["use_object"],
      cb?: ((this: void, object: game_object) => void) | null,
      object?: Maybe<T>
    ): void;
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
     * 17 todo;
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

    // 18 todo: action_movement

    // 19 todo: action_watch

    // 20 todo: action_removed

    // 21 todo: action_animation

    // 22 todo: action_sound

    // 23 todo: action_particle

    // 24 todo: action_object

    // 25 todo: actor_sleep

    /**
     * 26 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["helicopter_on_point"],
      cb?: ((this: void, distance: number, current_position: vector, vertex_id: number) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 27 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["helicopter_on_hit"],
      cb?: ((this: void, damage: number, impulse: number, hit_type: number, who_id: number) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 28 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_item_take"],
      cb?: ((this: void, object: game_object, item: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 29 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_item_drop"],
      cb?: ((this: void, object: game_object, item: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    /**
     * 30 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["script_animation"],
      cb?: ((this: void, skip_multi_anim_check?: boolean) => void) | null,
      object?: object | null
    ): void;

    // 31 todo: trader_global_anim_request

    // 32 todo: trader_head_anim_request

    // 33 todo: trader_sound_end

    /**
     * 34 todo;
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["take_item_from_box"],
      cb?: ((this: void, object: game_object, box: game_object, item: game_object) => void) | null,
      object?: Maybe<T>
    ): void;

    // 35 todo: weapon_no_ammo

    // 36 todo: key_press

    // 37 todo: key_release

    // 38 todo: key_hold

    // 39 todo: mouse_move

    // 40 todo: mouse_wheel

    // 41 todo: controller_press

    // 42 todo: controller_release

    // 43 todo: controller_hold

    // 44 todo: item_to_belt

    // 45 todo: item_to_slot

    // 46 todo: item_to_ruck

    // 47 todo: actor_before_death

    // 48 todo: on_attach_vehicle

    // 49 todo: on_detach_vehicle

    // 50 todo: on_use_vehicle

    // 51 todo: weapon_zoom_in

    // 52 todo: weapon_zoom_out

    // 53 todo: weapon_jammed

    public clear_callbacks(): void;

    public set_enemy_callback(cb: null): void;

    public set_enemy_callback<T>(cb: (this: T, object: game_object, enemy: game_object) => boolean, object: T): void;

    public set_fastcall<T>(cb: (this: T) => boolean, context: T): void;

    public set_patrol_extrapolate_callback(cb?: ((cur_pt: number) => boolean) | null, object?: object): void;

    public set_smart_cover_target_selector(cb?: ((object: game_object) => void) | null, object?: object | null): void;
  }
}
