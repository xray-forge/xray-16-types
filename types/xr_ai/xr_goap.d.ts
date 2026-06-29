declare module "xray16" {
  /**
   * GOAP property and action id constants for stalker AI.
   *
   * @source C++ class stalker_ids
   * @customConstructor stalker_ids
   * @group xr_goap
   */
  export class stalker_ids {
    /**
     * Engine enum value for `stalker_ids.action_accomplish_task`.
     */
    public static readonly action_accomplish_task: 7;
    /**
     * Engine enum value for `stalker_ids.action_aim_enemy`.
     */
    public static readonly action_aim_enemy: 16;
    /**
     * Engine enum value for `stalker_ids.action_alife_planner`.
     */
    public static readonly action_alife_planner: 88;
    /**
     * Engine enum value for `stalker_ids.action_anomaly_planner`.
     */
    public static readonly action_anomaly_planner: 90;
    /**
     * Engine enum value for `stalker_ids.action_combat_planner`.
     */
    public static readonly action_combat_planner: 89;
    /**
     * Engine enum value for `stalker_ids.action_communicate_with_customer`.
     */
    public static readonly action_communicate_with_customer: 9;
    /**
     * Engine enum value for `stalker_ids.action_critically_wounded`.
     */
    public static readonly action_critically_wounded: 36;
    /**
     * Engine enum value for `stalker_ids.action_danger_by_sound_planner`.
     */
    public static readonly action_danger_by_sound_planner: 73;
    /**
     * Engine enum value for `stalker_ids.action_danger_grenade_look_around`.
     */
    public static readonly action_danger_grenade_look_around: 85;
    /**
     * Engine enum value for `stalker_ids.action_danger_grenade_planner`.
     */
    public static readonly action_danger_grenade_planner: 72;
    /**
     * Engine enum value for `stalker_ids.action_danger_grenade_search`.
     */
    public static readonly action_danger_grenade_search: 86;
    /**
     * Engine enum value for `stalker_ids.action_danger_grenade_take_cover`.
     */
    public static readonly action_danger_grenade_take_cover: 82;
    /**
     * Engine enum value for `stalker_ids.action_danger_grenade_take_cover_after_explosion`.
     */
    public static readonly action_danger_grenade_take_cover_after_explosion: 84;
    /**
     * Engine enum value for `stalker_ids.action_danger_grenade_wait_for_explosion`.
     */
    public static readonly action_danger_grenade_wait_for_explosion: 83;
    /**
     * Engine enum value for `stalker_ids.action_danger_in_direction_detour`.
     */
    public static readonly action_danger_in_direction_detour: 80;
    /**
     * Engine enum value for `stalker_ids.action_danger_in_direction_hold_position`.
     */
    public static readonly action_danger_in_direction_hold_position: 79;
    /**
     * Engine enum value for `stalker_ids.action_danger_in_direction_look_out`.
     */
    public static readonly action_danger_in_direction_look_out: 78;
    /**
     * Engine enum value for `stalker_ids.action_danger_in_direction_planner`.
     */
    public static readonly action_danger_in_direction_planner: 71;
    /**
     * Engine enum value for `stalker_ids.action_danger_in_direction_search`.
     */
    public static readonly action_danger_in_direction_search: 81;
    /**
     * Engine enum value for `stalker_ids.action_danger_in_direction_take_cover`.
     */
    public static readonly action_danger_in_direction_take_cover: 77;
    /**
     * Engine enum value for `stalker_ids.action_danger_planner`.
     */
    public static readonly action_danger_planner: 91;
    /**
     * Engine enum value for `stalker_ids.action_danger_unknown_look_around`.
     */
    public static readonly action_danger_unknown_look_around: 75;
    /**
     * Engine enum value for `stalker_ids.action_danger_unknown_planner`.
     */
    public static readonly action_danger_unknown_planner: 70;
    /**
     * Engine enum value for `stalker_ids.action_danger_unknown_search`.
     */
    public static readonly action_danger_unknown_search: 76;
    /**
     * Engine enum value for `stalker_ids.action_danger_unknown_take_cover`.
     */
    public static readonly action_danger_unknown_take_cover: 74;
    /**
     * Engine enum value for `stalker_ids.action_dead`.
     */
    public static readonly action_dead: 0;
    /**
     * Engine enum value for `stalker_ids.action_death_planner`.
     */
    public static readonly action_death_planner: 87;
    /**
     * Engine enum value for `stalker_ids.action_detour_enemy`.
     */
    public static readonly action_detour_enemy: 25;
    /**
     * Engine enum value for `stalker_ids.action_dying`.
     */
    public static readonly action_dying: 1;
    /**
     * Engine enum value for `stalker_ids.action_find_ammo`.
     */
    public static readonly action_find_ammo: 15;
    /**
     * Engine enum value for `stalker_ids.action_find_item_to_kill`.
     */
    public static readonly action_find_item_to_kill: 13;
    /**
     * Engine enum value for `stalker_ids.action_gather_items`.
     */
    public static readonly action_gather_items: 2;
    /**
     * Engine enum value for `stalker_ids.action_get_distance`.
     */
    public static readonly action_get_distance: 24;
    /**
     * Engine enum value for `stalker_ids.action_get_item_to_kill`.
     */
    public static readonly action_get_item_to_kill: 12;
    /**
     * Engine enum value for `stalker_ids.action_get_ready_to_kill`.
     */
    public static readonly action_get_ready_to_kill: 17;
    /**
     * Engine enum value for `stalker_ids.action_hold_position`.
     */
    public static readonly action_hold_position: 23;
    /**
     * Engine enum value for `stalker_ids.action_kill_enemy`.
     */
    public static readonly action_kill_enemy: 19;
    /**
     * Engine enum value for `stalker_ids.action_kill_enemy_if_not_visible`.
     */
    public static readonly action_kill_enemy_if_not_visible: 29;
    /**
     * Engine enum value for `stalker_ids.action_kill_if_enemy_critically_wounded`.
     */
    public static readonly action_kill_if_enemy_critically_wounded: 37;
    /**
     * Engine enum value for `stalker_ids.action_kill_if_player_on_the_path`.
     */
    public static readonly action_kill_if_player_on_the_path: 35;
    /**
     * Engine enum value for `stalker_ids.action_kill_wounded_enemy`.
     */
    public static readonly action_kill_wounded_enemy: 33;
    /**
     * Engine enum value for `stalker_ids.action_look_out`.
     */
    public static readonly action_look_out: 22;
    /**
     * Engine enum value for `stalker_ids.action_make_item_killing`.
     */
    public static readonly action_make_item_killing: 14;
    /**
     * Engine enum value for `stalker_ids.action_no_alife`.
     */
    public static readonly action_no_alife: 3;
    /**
     * Engine enum value for `stalker_ids.action_post_combat_wait`.
     */
    public static readonly action_post_combat_wait: 34;
    /**
     * Engine enum value for `stalker_ids.action_prepare_wounded_enemy`.
     */
    public static readonly action_prepare_wounded_enemy: 32;
    /**
     * Engine enum value for `stalker_ids.action_reach_customer_location`.
     */
    public static readonly action_reach_customer_location: 8;
    /**
     * Engine enum value for `stalker_ids.action_reach_task_location`.
     */
    public static readonly action_reach_task_location: 6;
    /**
     * Engine enum value for `stalker_ids.action_reach_wounded_enemy`.
     */
    public static readonly action_reach_wounded_enemy: 30;
    /**
     * Engine enum value for `stalker_ids.action_retreat_from_enemy`.
     */
    public static readonly action_retreat_from_enemy: 20;
    /**
     * Engine enum value for `stalker_ids.action_script`.
     */
    public static readonly action_script: 92;
    /**
     * Engine enum value for `stalker_ids.action_search_enemy`.
     */
    public static readonly action_search_enemy: 26;
    /**
     * Engine enum value for `stalker_ids.action_smart_terrain_task`.
     */
    public static readonly action_smart_terrain_task: 4;
    /**
     * Engine enum value for `stalker_ids.action_solve_zone_puzzle`.
     */
    public static readonly action_solve_zone_puzzle: 5;
    /**
     * Engine enum value for `stalker_ids.action_sudden_attack`.
     */
    public static readonly action_sudden_attack: 28;
    /**
     * Engine enum value for `stalker_ids.action_take_cover`.
     */
    public static readonly action_take_cover: 21;
    /**
     * Engine enum value for `stalker_ids.detect_anomaly`.
     */
    public static readonly detect_anomaly: 11;
    /**
     * Engine enum value for `stalker_ids.get_out_of_anomaly`.
     */
    public static readonly get_out_of_anomaly: 10;

    /**
     * Engine enum value for `stalker_ids.property_alife`.
     */
    public static readonly property_alife: 3;
    /**
     * Whether object is alive.
     */
    public static readonly property_alive: 0;
    /**
     * Engine enum value for `stalker_ids.property_already_dead`.
     */
    public static readonly property_already_dead: 2;
    /**
     * Engine enum value for `stalker_ids.property_anomaly`.
     */
    public static readonly property_anomaly: 46;
    /**
     * Engine enum value for `stalker_ids.property_cover_actual`.
     */
    public static readonly property_cover_actual: 42;
    /**
     * Engine enum value for `stalker_ids.property_cover_reached`.
     */
    public static readonly property_cover_reached: 43;
    /**
     * Engine enum value for `stalker_ids.property_critically_wounded`.
     */
    public static readonly property_critically_wounded: 29;
    /**
     * Engine enum value for `stalker_ids.property_danger`.
     */
    public static readonly property_danger: 8;
    /**
     * Engine enum value for `stalker_ids.property_danger_by_sound`.
     */
    public static readonly property_danger_by_sound: 41;
    /**
     * Engine enum value for `stalker_ids.property_danger_grenade`.
     */
    public static readonly property_danger_grenade: 40;
    /**
     * Engine enum value for `stalker_ids.property_danger_in_direction`.
     */
    public static readonly property_danger_in_direction: 39;
    /**
     * Engine enum value for `stalker_ids.property_danger_unknown`.
     */
    public static readonly property_danger_unknown: 38;
    /**
     * Engine enum value for `stalker_ids.property_dead`.
     */
    public static readonly property_dead: 1;
    /**
     * Whether object has any enemy.
     */
    public static readonly property_enemy: 7;
    /**
     * Engine enum value for `stalker_ids.property_enemy_critically_wounded`.
     */
    public static readonly property_enemy_critically_wounded: 30;
    /**
     * Engine enum value for `stalker_ids.property_enemy_detoured`.
     */
    public static readonly property_enemy_detoured: 21;
    /**
     * Engine enum value for `stalker_ids.property_found_ammo`.
     */
    public static readonly property_found_ammo: 12;
    /**
     * Engine enum value for `stalker_ids.property_found_item_to_kill`.
     */
    public static readonly property_found_item_to_kill: 10;
    /**
     * Engine enum value for `stalker_ids.property_grenade_exploded`.
     */
    public static readonly property_grenade_exploded: 45;
    /**
     * Engine enum value for `stalker_ids.property_in_cover`.
     */
    public static readonly property_in_cover: 18;
    /**
     * Engine enum value for `stalker_ids.property_inside_anomaly`.
     */
    public static readonly property_inside_anomaly: 47;
    /**
     * Engine enum value for `stalker_ids.property_item_can_kill`.
     */
    public static readonly property_item_can_kill: 11;
    /**
     * Engine enum value for `stalker_ids.property_item_to_kill`.
     */
    public static readonly property_item_to_kill: 9;
    /**
     * Whether object has valuable items to be looted after death.
     */
    public static readonly property_items: 6;
    /**
     * Engine enum value for `stalker_ids.property_looked_around`.
     */
    public static readonly property_looked_around: 44;
    /**
     * Engine enum value for `stalker_ids.property_looked_out`.
     */
    public static readonly property_looked_out: 19;
    /**
     * Whether object should panic.
     */
    public static readonly property_panic: 17;
    /**
     * Engine enum value for `stalker_ids.property_position_holded`.
     */
    public static readonly property_position_holded: 20;
    /**
     * Engine enum value for `stalker_ids.property_pure_enemy`.
     */
    public static readonly property_pure_enemy: 23;
    /**
     * Whether object has solved zone puzzle.
     * Originally alife was different and it was end goal of each stalker.
     * To solve zone puzzle stalkers collected artefacts, did quests etc.
     */
    public static readonly property_puzzle_solved: 4;
    /**
     * Engine enum value for `stalker_ids.property_ready_to_detour`.
     */
    public static readonly property_ready_to_detour: 14;
    /**
     * Engine enum value for `stalker_ids.property_ready_to_kill`.
     */
    public static readonly property_ready_to_kill: 13;
    /**
     * Engine enum value for `stalker_ids.property_script`.
     */
    public static readonly property_script: 74;
    /**
     * Whether object see enemy.
     */
    public static readonly property_see_enemy: 15;
    /**
     * Engine enum value for `stalker_ids.property_smart_terrain_task`.
     */
    public static readonly property_smart_terrain_task: 5;
    /**
     * Engine enum value for `stalker_ids.property_use_crouch_to_look_out`.
     */
    public static readonly property_use_crouch_to_look_out: 24;
    /**
     * Engine enum value for `stalker_ids.property_use_suddenness`.
     */
    public static readonly property_use_suddenness: 22;

    /**
     * Engine enum value for `stalker_ids.sound_alarm`.
     */
    public static readonly sound_alarm: 4;
    /**
     * Engine enum value for `stalker_ids.sound_attack_allies_several_enemies`.
     */
    public static readonly sound_attack_allies_several_enemies: 7;
    /**
     * Engine enum value for `stalker_ids.sound_attack_allies_single_enemy`.
     */
    public static readonly sound_attack_allies_single_enemy: 6;
    /**
     * Engine enum value for `stalker_ids.sound_attack_no_allies`.
     */
    public static readonly sound_attack_no_allies: 5;
    /**
     * Engine enum value for `stalker_ids.sound_backup`.
     */
    public static readonly sound_backup: 8;
    /**
     * Engine enum value for `stalker_ids.sound_detour`.
     */
    public static readonly sound_detour: 9;
    /**
     * Engine enum value for `stalker_ids.sound_die`.
     */
    public static readonly sound_die: 0;
    /**
     * Engine enum value for `stalker_ids.sound_die_in_anomaly`.
     */
    public static readonly sound_die_in_anomaly: 1;
    /**
     * Engine enum value for `stalker_ids.sound_enemy_critically_wounded`.
     */
    public static readonly sound_enemy_critically_wounded: 24;
    /**
     * Engine enum value for `stalker_ids.sound_enemy_killed_or_wounded`.
     */
    public static readonly sound_enemy_killed_or_wounded = -805289984;
    /**
     * Engine enum value for `stalker_ids.sound_enemy_lost_no_allies`.
     */
    public static readonly sound_enemy_lost_no_allies: 12;
    /**
     * Engine enum value for `stalker_ids.sound_enemy_lost_with_allies`.
     */
    public static readonly sound_enemy_lost_with_allies: 13;
    /**
     * Engine enum value for `stalker_ids.sound_friendly_grenade_alarm`.
     */
    public static readonly sound_friendly_grenade_alarm: 20;
    /**
     * Engine enum value for `stalker_ids.sound_grenade_alarm`.
     */
    public static readonly sound_grenade_alarm: 19;
    /**
     * Engine enum value for `stalker_ids.sound_humming`.
     */
    public static readonly sound_humming: 3;
    /**
     * Engine enum value for `stalker_ids.sound_injuring`.
     */
    public static readonly sound_injuring: 2;
    /**
     * Engine enum value for `stalker_ids.sound_injuring_by_friend`.
     */
    public static readonly sound_injuring_by_friend: 14;
    /**
     * Engine enum value for `stalker_ids.sound_kill_wounded`.
     */
    public static readonly sound_kill_wounded: 23;
    /**
     * Engine enum value for `stalker_ids.sound_need_backup`.
     */
    public static readonly sound_need_backup: 21;
    /**
     * Engine enum value for `stalker_ids.sound_panic_human`.
     */
    public static readonly sound_panic_human: 15;
    /**
     * Engine enum value for `stalker_ids.sound_panic_monster`.
     */
    public static readonly sound_panic_monster: 16;
    /**
     * Engine enum value for `stalker_ids.sound_running_in_danger`.
     */
    public static readonly sound_running_in_danger: 22;
    /**
     * Engine enum value for `stalker_ids.sound_script`.
     */
    public static readonly sound_script: 27;
    /**
     * Engine enum value for `stalker_ids.sound_search1_no_allies`.
     */
    public static readonly sound_search1_no_allies: 11;
    /**
     * Engine enum value for `stalker_ids.sound_search1_with_allies`.
     */
    public static readonly sound_search1_with_allies: 10;
    /**
     * Engine enum value for `stalker_ids.sound_tolls`.
     */
    public static readonly sound_tolls: 17;
    /**
     * Engine enum value for `stalker_ids.sound_wounded`.
     */
    public static readonly sound_wounded: 18;

    /**
     * Create an ids constants wrapper.
     */
    public constructor();
  }

  /**
   * Generic container object for GOAP world properties.
   *
   * @source C++ class world_property
   * @customConstructor world_property
   * @group xr_goap
   */
  export class world_property extends EngineBinding {
    /**
     * Default constructor to describe a pair of identifier and value.
     *
     * @param id - Identifier of unique world property.
     * @param enabled - Value of property state.
     */
    public constructor(id: u32, enabled: boolean);

    /**
     * @returns Value of current world property.
     */
    public value(): boolean;

    /**
     * @returns Condition identifier of current world property.
     */
    public condition(): u32;
  }

  /**
   * World state describing whole world state in action planning.
   *
   * Overrides operators: `<`, `==`.
   *
   * @source C++ class world_state
   * @customConstructor world_state
   * @group xr_goap
   */
  export class world_state extends EngineBinding {
    /**
     * Default constructor.
     */
    public constructor();

    /**
     * Copy constructor.
     *
     * @param another_state - Target world state to copy.
     */
    public constructor(another_state: world_state);

    /**
     * Set property for world state.
     *
     * @param property - Target property to add in world state.
     */
    public add_property(property: world_property): void;

    /**
     * Clear all properties in the state.
     */
    public clear(): void;

    /**
     * Check if provided state is subset of current one.
     *
     * @param state - Target state to check.
     * @returns Whether current world state includes provided state.
     */
    public includes(state: world_state): boolean;

    /**
     * Get world property by id.
     *
     * @param id - Numeric if of the required property.
     * @returns Property id/state based on provided id.
     */
    public property(id: u32): world_property;

    /**
     * Remove world property from current world state.
     *
     * @param id - Identifier of the property to remove.
     */
    public remove_property(id: u32): void;
  }

  /**
   * Storage of object evaluators cached state for handling of in-game logic.
   * Container for actions.
   *
   * @source C++ class property_storage
   * @customConstructor property_storage
   * @group xr_goap
   */
  export class property_storage extends EngineBinding {
    /**
     * Get property evaluator value by `id`.
     *
     * @throws If property is not declared in storage.
     *
     * @param id - Unique identifier of the world property.
     * @returns Current value for provided `id`.
     */
    public property(id: u32): boolean;

    /**
     * Set property value in the storage.
     *
     * @param id - Unique identifier of the world property.
     * @param value - Value for provided `id`.
     */
    public set_property(id: u32, value: boolean): void;
  }

  /**
   * Class implementation of world properties evaluators.
   * Generic handler to calculate current state of bound world property `id`.
   *
   * @source C++ class property_evaluator
   * @customConstructor property_evaluator
   * @group xr_goap
   */
  export class property_evaluator extends EngineBinding {
    /**
     * Linked game object to work with.
     */
    public readonly object: game_object;

    /**
     * Container reference with state of action preconditions.
     */
    public readonly storage: property_storage;

    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @param object - Target game object to work with, `null` is OK since correct object will be injected on setup.
     */
    public constructor(object: game_object | null);

    /**
     * @param object - Target game object to work with, `null` is OK since correct object will be injected on setup.
     * @param name - Name of the evaluator, used for debug purposes mainly.
     */
    public constructor(object: game_object | null, name: string);

    /**
     * Handle setup of the evaluator and binding to a specific object.
     *
     * @param object - Target client object to work with.
     * @param storage - Action instance storage with preconditions and state.
     */
    public setup(object: game_object, storage: property_storage): void;

    /**
     * Main evaluator lifecycle method.
     * Called every time to get world property up-to-date state.
     *
     * @returns Current evaluator value.
     */
    public evaluate(): boolean;
  }

  /**
   * Class implementation of world properties evaluators.
   * Static handler to return pre-defined value for specific world property `id`.
   *
   * @source C++ class property_evaluator_const : property_evaluator
   * @customConstructor property_evaluator_const
   * @group xr_goap
   */
  export class property_evaluator_const extends property_evaluator {
    /**
     * @param value - Constant value for evaluation.
     */
    public constructor(value: boolean);
  }

  /**
   * Abstract class for implementation of GOAP planner actions.
   *
   * @source C++ class action_base
   * @customConstructor action_base
   * @group xr_goap
   */
  export abstract class action_base extends EngineBinding {
    /**
     * Game object that is handled by current action instance.
     */
    public readonly object: game_object;

    /**
     * Container reference with state of action preconditions.
     */
    public readonly storage: property_storage;

    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @param object - Target game object to work with, `null` is OK since correct object will be injected on setup.
     */
    public constructor(object?: game_object | null);

    /**
     * @param object - Target game object to work with, `null` is OK since correct object will be injected on setup.
     * @param name - Name of the action, used for debug purposes mainly.
     */
    public constructor(object: game_object | null, name: string);

    /**
     * Handle setup of the action and binding to a specific object.
     *
     * @param object - Target client object to work with.
     * @param storage - Action instance storage with preconditions and state.
     */
    public setup(object: game_object, storage: property_storage): void;

    /**
     * Lifecycle method called once on action execution start.
     * Means that lifecycle of the action begun.
     */
    public initialize(): void;

    /**
     * Lifecycle method.
     * Execution tick of the action, called from object logics update cycle when current action is active.
     */
    public execute(): void;

    /**
     * Lifecycle method called once on action execution stop.
     * Means that action is finished / preconditions are not met anymore.
     */
    public finalize(): void;

    /**
     * Set weight of current action execution.
     *
     * @param weight - Weight value to express how prioritized action is.
     */
    public set_weight(weight: u16): void;

    /**
     * Add action effect.
     * Describes what target world state is expected to be if action is completed.
     *
     * @param property - World state property describing a pair of evaluator ID and value.
     */
    public add_effect(property: world_property): void;

    /**
     * Remove action effect.
     * Action will be not considered as property changing for `id` anymore.
     *
     * @param id - World state property id.
     */
    public remove_effect(id: u32): void;

    /**
     * Add action execution precondition.
     * When building logics graph, action will be considered blocked by some preconditions.
     *
     * @param property - World state property describing a pair of evaluator ID and value.
     */
    public add_precondition(property: world_property): void;

    /**
     * Remove precondition for action.
     * When building logics graph, action will not be considered blocked by evaluator `id` states.
     *
     * @param id - World state property id.
     */
    public remove_precondition(id: u32): void;

    /**
     * Debug method.
     * With mixed / debug build allows investigation of evaluators and actions matches.
     * Helps to debug custom actions and actions pre-conditions with state printing in log files.
     *
     * Note: Available only in mixed / debug engine builds, not for direct usage from lua.
     *
     * @param prefix - String prefix to display current action state in logs.
     */
    public show(prefix?: string): void;
  }

  /**
   * Script action planner binding for GOAP evaluators and actions.
   *
   * @source C++ class action_planner
   * @customConstructor action_planner
   * @group xr_goap
   */
  export class action_planner extends EngineBinding {
    /**
     * Game object that is handled by current planner instance.
     */
    public readonly object: game_object;

    /**
     * Container reference with state of planner preconditions.
     */
    public readonly storage: property_storage;

    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @returns Whether object action planner is already initialized.
     */
    public initialized(): boolean;

    /**
     * @returns Whether state of current planner is actual.
     */
    public actual(): boolean;

    /**
     * Setup planner for game object.
     *
     * @param object - Client game object to setup planner for.
     */
    public setup(object: game_object): void;

    /**
     * Clear state of current action planner.
     */
    public clear(): void;

    /**
     * Lifecycle method to handle generic game loop updates.
     */
    public update(): void;

    /**
     * Add generic action by `id` for planner execution.
     *
     * @param id - Unique identifier of new action.
     * @param action - Action implementation containing preconditions, logics, effects and other meta infos.
     */
    public add_action(id: u32, action: action_base): void;

    /**
     * Remove action by unique `id`.
     *
     * @param id - Unique identifier of the action to remove.
     */
    public remove_action(id: u32): void;

    /**
     * Get action instance by unique `id`.
     *
     * @param id - Unique identifier of the action to get.
     * @returns Registered action instance.
     */
    public action(id: u32): action_base;

    /**
     * Get currently active action being executed.
     *
     * @returns Current action instance reference.
     */
    public current_action(): action_base;

    /**
     * Get currently active action identifier.
     *
     * @returns Unique identifier of current action.
     */
    public current_action_id(): u32;

    /**
     * Set target world state to try to reach with all the graph logics.
     * All graphs will be built from current state to goal world state with the shortest possible path.
     *
     * @param state - Target world state to reach with planner.
     */
    public set_goal_world_state(state: world_state): void;

    /**
     * Add evaluator instance for current action planner.
     *
     * @param id - Unique identifier of the evaluator.
     * @param evaluator - Instance of evaluator linked to the `id`.
     */
    public add_evaluator(id: u32, evaluator: property_evaluator): void;

    /**
     * Remove evaluator instance from current action planner.
     *
     * @param id - Unique identifier of the evaluator for removal.
     */
    public remove_evaluator(id: u32): void;

    /**
     * Get evaluator instance by `id`.
     *
     * @param id - Unique identifier of the evaluator to get.
     * @returns Registered property evaluator.
     */
    public evaluator(id: u32): property_evaluator;

    /**
     * Debug method.
     * With mixed / debug build allows investigation of evaluators and actions matches.
     * Helps to debug custom actions and actions pre-conditions with state printing in log files.
     *
     * Note: Available only in mixed / debug engine builds, not for direct usage from lua.
     *
     * @param prefix - String prefix to display current action state in logs.
     */
    public show(prefix: string): void;
  }

  /**
   * GOAP action class implementing both action base and action planner.
   * Captures execution as action and plans its internal logic with separate logics graph.
   *
   * Examples: combat planner, anomaly planner, items looting planner, alife planner, state planner.
   *
   * @source C++ class planner_action : action_planner,action_base
   * @customConstructor planner_action
   * @group xr_goap
   */
  export class planner_action extends action_planner {
    /**
     * Default constructor.
     */
    public constructor();

    /**
     * @param object - Target game object to work with, `null` is OK since correct object will be injected on setup.
     */
    public constructor(object?: game_object | null);

    /**
     * @param object - Target game object to work with, `null` is OK since correct object will be injected on setup.
     * @param name - Name of the action, used for debug purposes mainly.
     */
    public constructor(object: game_object | null, name: string);

    /**
     * Lifecycle method called once on action execution start.
     * Means that lifecycle of the action begun.
     */
    public initialize(): void;

    /**
     * Lifecycle method called once on action execution stop.
     * Means that action is finished / preconditions are not met anymore.
     */
    public finalize(): void;

    /**
     * Lifecycle method.
     * Execution tick of the action, called from object logics update cycle when current action is active.
     */
    public execute(): void;

    /**
     * Add action effect.
     * Describes what target world state is expected to be if action is completed.
     *
     * @param property - World state property describing a pair of evaluator ID and value.
     */
    public add_effect(property: world_property): void;

    /**
     * Remove action effect.
     * Action will be not considered as property changing for `id` anymore.
     *
     * @param id - World state property id.
     */
    public remove_effect(id: u32): void;

    /**
     * Add action execution precondition.
     * When building logics graph, action will be considered blocked by some preconditions.
     *
     * @param property - World state property describing a pair of evaluator ID and value.
     */
    public add_precondition(property: world_property): void;

    /**
     * Remove precondition for action.
     * When building logics graph, action will not be considered blocked by evaluator `id` states.
     *
     * @param id - World state property id.
     */
    public remove_precondition(id: u32): void;

    /**
     * Set weight of planner action switch.
     *
     * @param weight - Weight value to express how prioritized action is.
     */
    public set_weight(weight: u32): void;

    /**
     * Comparator to check weight of switching one state to another.
     *
     * @param first - First state.
     * @param second - Second state.
     * @returns Transition weight.
     */
    public weight(first: world_state, second: world_state): u16;
  }

  /**
   * Cast a base action to an action planner when it is implemented as a planner action.
   *
   * @group xr_global_declaration
   *
   * @param base_action - Action to cast.
   * @returns Planner interface for the action.
   */
  export function cast_planner(this: void, base_action: action_base): action_planner;
}
