declare module "xray16" {
  /**
   * Enumeration of relations.
   *
   * eRelationTypeFriend - 0
   * eRelationTypeNeutral - 1
   * eRelationTypeEnemy - 2
   * eRelationTypeWorstEnemy - 3
   * eRelationTypeLast - 4
   * eRelationTypeDummy - -1
   *
   * @group xr_script_object
   */
  export type TXR_relation = 0 | 1 | 2 | 3;

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
   * @source C++ class explosive
   * @customConstructor explosive
   * @group xr_script_interface
   */
  export class explosive extends EngineBinding {
    protected constructor();

    public explode(): void;
  }

  /**
   * @source C++ class holder
   * @customConstructor holder
   * @group xr_script_interface
   */
  export class holder {
    public engaged(): boolean;

    public Action(value1: u16, value2: u32): void;

    public SetParam(value: i32, vector: vector): void;
  }

  /**
   * Custom extension.
   * For reference: src/xrGame/script_game_object_script.cpp
   *
   * @group xr_script_interface
   */
  class game_object_callbacks_base {
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
    public set_callback(
      type: TXR_callbacks["trade_sell_buy_item"],
      cb?: ((this: void, item: game_object, money_direction: boolean, money: number) => void) | null,
      object?: object_binder | null
    ): void;

    // 3 todo: trade_perform_operation

    /**
     * 4 todo;
     */
    public set_callback(
      type: TXR_callbacks["zone_enter"],
      cb?: ((this: void, zone: game_object, object: game_object) => void) | null,
      object?: object_binder | null
    ): void;

    /**
     * 4 todo;
     */
    public set_callback(
      type: TXR_callbacks["zone_exit"],
      cb?: ((this: void, zone: game_object, object: game_object) => void) | null,
      object?: object_binder | null
    ): void;

    // 6 todo: level_border_exit

    // 7 todo: level_border_enter

    /**
     * 8 todo;
     */
    public set_callback(
      type: TXR_callbacks["death"],
      cb?: (this: void, target: game_object, killer: game_object) => void,
      object?: object_binder
    ): void;

    /**
     * 9 todo;
     */
    public set_callback(
      type: TXR_callbacks["patrol_path_in_point"],
      cb?: ((this: void, object: game_object, action_type: number, point_index: number) => void) | null,
      object?: object_binder | null
    ): void;

    // 10 todo: inventory_pda

    /**
     * 11 todo:
     */
    public set_callback(
      type: TXR_callbacks["inventory_info"],
      cb?: ((this: void, npc: game_object, info_id: string) => void) | null,
      object?: object_binder | null
    ): void;

    // 12 todo: article_info

    /**
     * 13 todo;
     */
    public set_callback(
      type: TXR_callbacks["task_state"],
      cb?: ((this: void, task: CGameTask, state: TXR_TaskState) => void) | null,
      object?: object_binder | null
    ): void;

    // 14 todo: map_location_added

    /**
     * 15 Use some object.
     */
    public set_callback(
      type: TXR_callbacks["use_object"],
      cb?: ((this: void, object: game_object) => void) | null,
      object?: object_binder | null
    ): void;
    public set_callback(
      type: TXR_callbacks["use_object"],
      cb?: ((this: void, object: game_object, who: game_object) => void) | null,
      object?: object_binder | null
    ): void;

    /**
     * 16 Entity got hit.
     */
    public set_callback(
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
      object?: object_binder | null
    ): void;

    /**
     * 17 todo;
     */
    public set_callback(
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
      object?: object_binder | null
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
    public set_callback(
      type: TXR_callbacks["helicopter_on_point"],
      cb?: ((this: void, distance: number, current_position: vector, vertex_id: number) => void) | null,
      object?: object_binder | null
    ): void;

    /**
     * 27 todo;
     */
    public set_callback(
      type: TXR_callbacks["helicopter_on_hit"],
      cb?: ((this: void, damage: number, impulse: number, hit_type: number, who_id: number) => void) | null,
      object?: object_binder | null
    ): void;

    /**
     * 28 todo;
     */
    public set_callback(
      type: TXR_callbacks["on_item_take"],
      cb?: ((this: void, object: game_object, item: game_object) => void) | null,
      object?: object_binder | null
    ): void;

    /**
     * 29 todo;
     */
    public set_callback(
      type: TXR_callbacks["on_item_drop"],
      cb?: ((this: void, object: game_object, item: game_object) => void) | null,
      object?: object_binder | null
    ): void;

    /**
     * 30 todo;
     */
    public set_callback(
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
    public set_callback(
      type: TXR_callbacks["take_item_from_box"],
      cb?: ((this: void, object: game_object, box: game_object, item: game_object) => void) | null,
      object?: object_binder | null
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

    public set_smart_cover_target_selector(cb?: (object: game_object) => void, object?: object): void;
  }
}
