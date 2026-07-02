import type { Nillable } from "../../internal";

declare module "xray16" {
  /**
   * Cover point returned by cover search helpers.
   *
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
   * Hit context passed to monster combat callbacks.
   *
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
   * @source `src/xrGame/script_game_object_script2.cpp`, `game_object.EPathType` enum.
   * @group xr_script_interface
   */
  export type TXR_game_object_path = 0 | 1 | 2 | 3 | number;

  /**
   * Game-graph destination selection mode for stalker movement.
   *
   * @source `src/xrGame/script_game_object_script2.cpp`, `game_object.ESelectionType` enum.
   * @group xr_script_interface
   */
  export type TXR_movement_selection_type = 0 | 1;

  /**
   * Script entity action type id passed to action callbacks.
   *
   * @source C++ enum ScriptEntity::EActionType
   * @group xr_script_interface
   */
  export type TXR_action_type =
    | typeof game_object.movement
    | typeof game_object.watch
    | typeof game_object.animation
    | typeof game_object.sound
    | typeof game_object.particle
    | typeof game_object.object
    | 7;

  /**
   * Engine callback id registry.
   *
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
    public static readonly key_press: 123;

    /**
     * Engine enum value for `callback.key_release`.
     */
    public static readonly key_release: 124;

    /**
     * Engine enum value for `callback.key_hold`.
     */
    public static readonly key_hold: 125;

    /**
     * Engine enum value for `callback.mouse_move`.
     */
    public static readonly mouse_move: 127;

    /**
     * Engine enum value for `callback.mouse_wheel`.
     */
    public static readonly mouse_wheel: 126;

    /**
     * Engine enum value for `callback.controller_press`.
     */
    public static readonly controller_press: 48;

    /**
     * Engine enum value for `callback.controller_release`.
     */
    public static readonly controller_release: 49;

    /**
     * Engine enum value for `callback.controller_hold`.
     */
    public static readonly controller_hold: 50;

    /**
     * Engine enum value for `callback.controller_attitude_change`.
     */
    public static readonly controller_attitude_change: 51;

    /**
     * Engine enum value for `callback.item_to_belt`.
     */
    public static readonly item_to_belt: 37;

    /**
     * Engine enum value for `callback.item_to_slot`.
     */
    public static readonly item_to_slot: 38;

    /**
     * Engine enum value for `callback.item_to_ruck`.
     */
    public static readonly item_to_ruck: 39;

    /**
     * Engine enum value for `callback.weapon_zoom_in`.
     */
    public static readonly weapon_zoom_in: 40;

    /**
     * Engine enum value for `callback.weapon_zoom_out`.
     */
    public static readonly weapon_zoom_out: 41;

    /**
     * Engine enum value for `callback.weapon_jammed`.
     */
    public static readonly weapon_jammed: 42;

    /**
     * Engine enum value for `callback.weapon_magazine_empty`.
     */
    public static readonly weapon_magazine_empty: 43;

    /**
     * Engine enum value for `callback.actor_before_death`.
     */
    public static readonly actor_before_death: 44;

    /**
     * Engine enum value for `callback.on_attach_vehicle`.
     */
    public static readonly on_attach_vehicle: 45;

    /**
     * Engine enum value for `callback.on_detach_vehicle`.
     */
    public static readonly on_detach_vehicle: 46;

    /**
     * Engine enum value for `callback.on_use_vehicle`.
     */
    public static readonly on_use_vehicle: 47;
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
   * `game_object.set_callback` overloads for Lua-visible game object callbacks.
   *
   * @group xr_script_interface
   *
   * @remarks
   * When `object` is supplied, `CScriptCallbackEx` passes it as the first Lua callback argument.
   */
  class game_object_callbacks_implementation_base {
    /**
     * Clear one callback registration.
     *
     * @remarks
     * Uses the no-functor `CScriptGameObject::SetCallback(type)` overload, which clears the callback slot.
     *
     * @param type - Callback type to clear.
     * @param cb - Nullish value used to select the clear overload.
     */
    public set_callback(type: TXR_callback, cb: Nillable<never>): void;

    /**
     * Fired when a trader starts a trade session.
     *
     * @source `src/xrGame/ai/trader/ai_trader.cpp`, `CAI_Trader::OnStartTrade`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_start"],
      cb?: Nillable<(this: void) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a trader stops a trade session.
     *
     * @source `src/xrGame/ai/trader/ai_trader.cpp`, `CAI_Trader::OnStopTrade`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_stop"],
      cb?: Nillable<(this: void) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an actor-involved trade transfers an item and money.
     *
     * @source `src/xrGame/trade2.cpp`, `CTrade::TransferItem`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_sell_buy_item"],
      cb?: Nillable<
        (this: void, item: game_object, money_direction: boolean, money: number, partner: game_object) => void
      >,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a trader performs the money part of a trade operation.
     *
     * @source `src/xrGame/trade.cpp`, `CTrade::OnPerformTrade`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trade_perform_operation"],
      cb?: Nillable<(this: void, money_get: u32, money_put: u32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired by a script zone when a game object enters it.
     *
     * @source `src/xrGame/script_zone.cpp`, `CScriptZone::feel_touch_new`.
     *
     * @remarks
     * The first callback argument is the zone object; the second is the entering object.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["zone_enter"],
      cb?: Nillable<(this: void, zone: game_object, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired by a script zone when a game object leaves it or is released while touching it.
     *
     * @source `src/xrGame/script_zone.cpp`, `CScriptZone::feel_touch_delete` and `CScriptZone::net_Relcase`.
     *
     * @remarks
     * The first callback argument is the zone object; the second is the leaving object.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["zone_exit"],
      cb?: Nillable<(this: void, zone: game_object, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor leaves the playable level border.
     *
     * @source `src/xrGame/Actor.cpp`, `CActor::SwitchOutBorder`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["level_border_exit"],
      cb?: Nillable<(this: void, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor re-enters the playable level border.
     *
     * @source `src/xrGame/Actor.cpp`, `CActor::SwitchOutBorder`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["level_border_enter"],
      cb?: Nillable<(this: void, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the object dies or a destroyable physics object is destroyed.
     *
     * @source `src/xrGame/entity_alive.cpp`, `src/xrGame/DestroyablePhysicsObject.cpp`, and `src/xrGame/ai/crow/ai_crow.cpp`.
     *
     * @remarks
     * The engine passes the victim and, when available, the killer object.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["death"],
      cb?: (this: void, target: game_object, killer: game_object) => void,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an object reaches a patrol path point.
     *
     * @source `src/xrGame/patrol_path_manager.cpp`, `CPatrolPathManager::select_point`.
     *
     * @remarks
     * The action type is `ScriptEntity::eActionTypeMovement`; `point_index` is the reached patrol vertex index.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["patrol_path_in_point"],
      cb?: Nillable<(this: void, object: game_object, action_type: number, point_index: number) => void>,
      object?: Nillable<T>
    ): void;

    // The `inventory_pda` callback is registered in the enum, but no xray-16 call site was found.

    /**
     * Fired when the actor receives an info portion.
     *
     * @source `src/xrGame/actor_communication.cpp`, `CActor::OnReceiveInfo`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["inventory_info"],
      cb?: Nillable<(this: void, npc: game_object, info_id: string) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives an encyclopedia article from an info portion.
     *
     * @source `src/xrGame/actor_communication.cpp`, `CActor::AddEncyclopediaArticle`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["article_info"],
      cb?: Nillable<(this: void, actor: game_object, group: string, name: string, article_type: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an actor task state changes.
     *
     * @source `src/xrGame/GameTask.cpp`, `CGameTask::ChangeStateCallback` and `SGameTaskObjective::ChangeStateCallback`.
     *
     * @remarks
     * Root task callbacks pass task and state. Objective callbacks are fired from the engine with parent task, objective, and state.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["task_state"],
      cb?: Nillable<(this: void, task: CGameTask, state: TXR_TaskState) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a task objective state changes.
     *
     * @source `src/xrGame/GameTask.cpp`, `SGameTaskObjective::ChangeStateCallback`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["task_state"],
      cb?: Nillable<(this: void, task: CGameTask, objective: SGameTaskObjective, state: TXR_TaskState) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the single-player map manager adds an actor map location.
     *
     * @source `src/xrGame/map_manager.cpp`, `CMapManager::AddMapLocation`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["map_location_added"],
      cb?: Nillable<(this: void, spot_type: string, id: u16) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor uses an inventory item.
     *
     * @source `src/xrGame/Inventory.cpp`, inventory item use path.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["use_object"],
      cb?: Nillable<(this: void, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an object is used by another object.
     *
     * @source `src/xrGame/GameObject.cpp` and `src/xrGame/doors_door.cpp`.
     *
     * @remarks
     * Door use callbacks pass the used object and the initiator when the initiator is available.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["use_object"],
      cb?: Nillable<(this: void, object: game_object, who: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a hit processed by the script hit path.
     *
     * @source `src/xrGame/Actor.cpp`, `CActor::Hit`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["hit"],
      cb?: Nillable<
        (this: void, object: game_object, damage: number, direction: vector, who: game_object, bone_id: number) => void
      >,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity processes a saved sound notification.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::process_sound_callbacks`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["sound"],
      cb?: Nillable<
        (
          this: void,
          object: game_object,
          source_id: number,
          sound_type: TXR_snd_type,
          position: vector,
          sound_power: number
        ) => void
      >,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity movement action completes.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::ProcessScripts`.
     *
     * @remarks
     * The engine passes `ScriptEntity::eActionTypeMovement` as the action type and `-1` as the target point index for
     * this callback path.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_movement"],
            cb?: Nillable<
        (this: void, object: game_object, action_type: TXR_action_type, target_point_index: -1) => void
      >,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity watch action completes.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::ProcessScripts`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_watch"],
      cb?: Nillable<(this: void, object: game_object, action_type: TXR_action_type) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity action is removed from its queue.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::ProcessScripts`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_removed"],
      cb?: Nillable<(this: void, object: game_object, action_type: TXR_action_type) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity animation action completes.
     *
     * @source `src/xrGame/script_entity.cpp`, `ScriptCallBack`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_animation"],
      cb?: Nillable<(this: void, object: game_object, action_type: TXR_action_type) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity sound action completes.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::ProcessScripts`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_sound"],
      cb?: Nillable<(this: void, object: game_object, action_type: TXR_action_type) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity particle action completes.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::ProcessScripts`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_particle"],
      cb?: Nillable<(this: void, object: game_object, action_type: TXR_action_type) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a script entity object action completes.
     *
     * @source `src/xrGame/script_entity.cpp`, `CScriptEntity::ProcessScripts`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["action_object"],
      cb?: Nillable<(this: void, object: game_object, action_type: TXR_action_type) => void>,
      object?: Nillable<T>
    ): void;

    // The `actor_sleep` callback is registered in the enum, but no xray-16 call site was found.

    /**
     * Fired when a helicopter reaches its current patrol path point or move target.
     *
     * @source `src/xrGame/HelicopterMovementManager.cpp`.
     *
     * @remarks
     * Patrol-path movement passes the patrol vertex id. Direct movement passes `-1`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["helicopter_on_point"],
      cb?: Nillable<(this: void, distance: number, current_position: vector, vertex_id: number) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a helicopter is hit by the actor, stalker, or custom zone.
     *
     * @source `src/xrGame/Helicopter2.cpp`, `CHelicopter::Hit`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["helicopter_on_hit"],
      cb?: Nillable<(this: void, damage: number, impulse: number, hit_type: number, who_id: number) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an inventory owner takes an item.
     *
     * @source `src/xrGame/InventoryOwner.cpp`, `CInventoryOwner::OnItemTake`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_item_take"],
      cb?: Nillable<(this: void, object: game_object, item: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an inventory owner drops an item.
     *
     * @source `src/xrGame/InventoryOwner.cpp`, `CInventoryOwner::OnItemDrop`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_item_drop"],
      cb?: Nillable<(this: void, object: game_object, item: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired by script animation callback processing.
     *
     * @source `src/xrGame/stalker_animation_manager_update.cpp` and `src/xrGame/animation_script_callback.cpp`.
     *
     * @remarks
     * Stalker animation manager callbacks can call this with no arguments; animation script callbacks pass whether the ended phase is being reported.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["script_animation"],
      cb?: Nillable<(this: void, skip_multi_anim_check?: boolean) => void>,
      object?: Nillable<object>
    ): void;

    /**
     * Fired when a trader needs a new global animation motion.
     *
     * @source `src/xrGame/ai/trader/trader_animation.cpp`, `CTraderAnimation::update_frame`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trader_global_anim_request"],
      cb?: Nillable<(this: void) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a trader needs a new head animation motion while sound is playing.
     *
     * @source `src/xrGame/ai/trader/trader_animation.cpp`, `CTraderAnimation::update_frame`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trader_head_anim_request"],
      cb?: Nillable<(this: void) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a trader sound finishes playing.
     *
     * @source `src/xrGame/ai/trader/trader_animation.cpp`, `CTraderAnimation::update_frame`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["trader_sound_end"],
      cb?: Nillable<(this: void) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor takes an item from an inventory box while the box is open.
     *
     * @source `src/xrGame/InventoryBox.cpp`, `CInventoryBox::TakeItem`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["take_item_from_box"],
      cb?: Nillable<(this: void, object: game_object, box: game_object, item: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an actor-owned weapon tries to reload and no suitable ammo is available.
     *
     * @source `src/xrGame/WeaponMagazined.cpp`, `CWeaponMagazined::TryReload`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_no_ammo"],
      cb?: Nillable<(this: void, object: game_object, suitable_ammo_total: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a HUD item animation ends.
     *
     * @source `src/xrGame/HudItem.cpp`, `CHudItem::OnAnimationEnd`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["hud_animation_end"],
      cb?: Nillable<
        (
          this: void,
          object: game_object,
          hud_section: string,
          current_motion: string,
          state: u32,
          animation_slot: u32
        ) => void
      >,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a keyboard press before UI and game input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnKeyboardPress`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["key_press"],
      cb?: Nillable<(this: void, key: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a keyboard release before UI and game input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnKeyboardRelease`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["key_release"],
      cb?: Nillable<(this: void, key: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a keyboard hold before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnKeyboardHold`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["key_hold"],
      cb?: Nillable<(this: void, key: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a mouse movement event before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnMouseMove`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["mouse_move"],
      cb?: Nillable<(this: void, dx: i32, dy: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a mouse wheel event before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnMouseWheel`.
     *
     * @remarks
     * The engine passes wheel deltas as `(y, x)`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["mouse_wheel"],
      cb?: Nillable<(this: void, y: number, x: number) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a controller press event before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnControllerPress`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["controller_press"],
      cb?: Nillable<(this: void, key: i32, state: AnyObject) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a controller release event before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnControllerRelease`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["controller_release"],
      cb?: Nillable<(this: void, key: i32, state: AnyObject) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a controller hold event before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnControllerHold`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["controller_hold"],
      cb?: Nillable<(this: void, key: i32, state: AnyObject) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor receives a controller attitude change event before normal input handling.
     *
     * @source `src/xrGame/Level_input.cpp`, `CLevel::IR_OnControllerAttitudeChange`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["controller_attitude_change"],
      cb?: Nillable<(this: void, change: vector) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an inventory owner moves an item to the belt.
     *
     * @source `src/xrGame/InventoryOwner.cpp`, `CInventoryOwner::OnItemBelt`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["item_to_belt"],
      cb?: Nillable<(this: void, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an inventory owner moves an item to a slot.
     *
     * @source `src/xrGame/InventoryOwner.cpp`, `CInventoryOwner::OnItemSlot`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["item_to_slot"],
      cb?: Nillable<(this: void, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an inventory owner moves an item to the rucksack.
     *
     * @source `src/xrGame/InventoryOwner.cpp`, `CInventoryOwner::OnItemRuck`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["item_to_ruck"],
      cb?: Nillable<(this: void, object: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a weapon owner zooms in with a magazined weapon.
     *
     * @source `src/xrGame/WeaponMagazined.cpp`, `CWeaponMagazined::OnZoomIn`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_zoom_in"],
      cb?: Nillable<(this: void, owner: game_object, weapon: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a weapon owner zooms out with a magazined weapon.
     *
     * @source `src/xrGame/WeaponMagazined.cpp`, `CWeaponMagazined::OnZoomOut`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_zoom_out"],
      cb?: Nillable<(this: void, owner: game_object, weapon: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when a magazined weapon misfires.
     *
     * @source `src/xrGame/WeaponMagazined.cpp`, `CWeaponMagazined::OnShot` misfire path.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_jammed"],
      cb?: Nillable<(this: void, owner: game_object, weapon: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when an actor-owned magazined weapon becomes empty or unloads its magazine.
     *
     * @source `src/xrGame/WeaponMagazined.cpp`, `CWeaponMagazined::OnMagazineEmpty` and `CWeaponMagazined::UnloadMagazine`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["weapon_magazine_empty"],
      cb?: Nillable<(this: void, object: game_object, suitable_ammo_total: i32) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired before actor death handling when the engine callback gate is enabled.
     *
     * @source `src/xrGame/Entity.cpp`, `CEntity::KillEntity` under `ACTOR_BEFORE_DEATH_CALLBACK`.
     *
     * @remarks
     * The callback receives the id of the object that caused the actor death path.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["actor_before_death"],
      cb?: Nillable<(this: void, killer_id: u16) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor attaches to a vehicle or mounted weapon.
     *
     * @source `src/xrGame/ActorVehicle.cpp` and `src/xrGame/ActorMountedWeapon.cpp`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_attach_vehicle"],
      cb?: Nillable<(this: void, vehicle: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor detaches from a vehicle or mounted weapon.
     *
     * @source `src/xrGame/ActorVehicle.cpp` and `src/xrGame/ActorMountedWeapon.cpp`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_detach_vehicle"],
      cb?: Nillable<(this: void, vehicle: game_object) => void>,
      object?: Nillable<T>
    ): void;

    /**
     * Fired when the actor uses a vehicle without attaching to it.
     *
     * @source `src/xrGame/ActorVehicle.cpp`, `CActor::use_Vehicle`.
     */
    public set_callback<T extends AnyObject>(
      type: TXR_callbacks["on_use_vehicle"],
      cb?: Nillable<(this: void, vehicle: game_object) => void>,
      object?: Nillable<T>
    ): void;

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
    public set_patrol_extrapolate_callback(cb?: Nillable<(cur_pt: number) => boolean>, object?: object): void;

    /**
     * Set or clear smart-cover target selection callback.
     *
     * @param cb - Callback that receives this object when a smart-cover target is selected.
     * @param object - Optional Lua context.
     */
    public set_smart_cover_target_selector(
      cb?: Nillable<(object: game_object) => void>,
      object?: Nillable<object>
    ): void;
  }
}
