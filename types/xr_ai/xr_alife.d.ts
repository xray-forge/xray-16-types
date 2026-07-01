import type { Nillable, Nullable } from "../internal";

declare module "xray16" {
  /**
   * Restriction-space category stored on space restrictors and used by ALife restriction events.
   *
   * @group xr_alife
   *
   * @remarks
   * Values mirror `RestrictionSpace::ERestrictorTypes`: default none/out/in are `0`, `1`, `2`; runtime none/in/out
   * are `3`, `4`, `5`.
   */
  export type TXR_restrictor_type = 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * Dynamic restriction-list type accepted by APIs that clear ALife in/out restriction arrays.
   *
   * @group xr_alife
   *
   * @remarks
   * The engine switch handles only runtime `eRestrictorTypeIn` (`4`) and `eRestrictorTypeOut` (`5`) here.
   */
  export type TXR_dynamic_restrictor_type = 4 | 5;

  /**
   * Access point for ALife simulation objects and registries.
   *
   * @source C++ class alife_simulator
   * @customConstructor alife_simulator
   * @group xr_alife
   *
   * @remarks
   * This is the active single-player ALife simulator. Most methods expect ids that are already registered in ALife.
   */
  export class alife_simulator {
    /**
     * Get the ALife actor server object.
     *
     * @throws If no active ALife simulator exists.
     *
     * @returns Actor object registered in the ALife graph.
     */
    public actor<T extends cse_alife_creature_actor>(): T;

    /**
     * Add an inside-space restriction to an offline monster.
     *
     * @remarks
     * `monster` must be a registered monster server object. `restrictorId` should point to a space restrictor.
     *
     * @param monster - Monster server object to restrict.
     * @param restrictorId - Restrictor object id.
     */
    public add_in_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Add an outside-space restriction to an offline monster.
     *
     * @remarks
     * `monster` must be a registered monster server object. `restrictorId` should point to a space restrictor.
     *
     * @param monster - Monster server object to restrict.
     * @param restrictorId - Restrictor object id.
     */
    public add_out_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Spawn ammo with a custom amount left in the box.
     *
     * @remarks
     * The section must spawn a server ammo object, and `count` must not exceed the ammo box size.
     *
     * @throws If the spawned section is not ammo, or if `count` is larger than the box size.
     *
     * @param section - Ammo section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Level vertex id at the spawn position.
     * @param game_vertex_id - Game graph vertex id at the spawn position.
     * @param parent_object_id - Parent inventory or container id, or `65535` for no parent.
     * @param count - Amount of ammo in the spawned box.
     * @returns Spawned server object, or `null` when a non-empty parent id is invalid.
     */
    public create_ammo(
      section: string,
      position: vector,
      level_vertex_id: u32,
      game_vertex_id: u16,
      parent_object_id: u16,
      count: i32
    ): cse_abstract;

    /**
     * Check that an object does not know an info portion.
     *
     * @param object_id - ALife object id.
     * @param info_id - Info portion id.
     * @returns Whether the object does not have the info portion.
     */
    public dont_has_info(object_id: u16, info_id: string): boolean;

    /**
     * Check that an object knows an info portion.
     *
     * @param object_id - ALife object id.
     * @param info_id - Info portion id.
     * @returns Whether the object has the info portion.
     */
    public has_info(object_id: u16, info_id: string): boolean;

    /**
     * Iterate over registered ALife objects until the callback returns `true`.
     *
     * @remarks
     * Returning `true` from the callback stops iteration early.
     *
     * @param cb - Callback called for every server object.
     */
    public iterate_objects(cb: (this: void, object: cse_alife_object) => boolean | void): void;

    /**
     * Get the current level id from the active ALife graph.
     *
     * @returns Current level id.
     */
    public level_id(): u32;

    /**
     * Method to get level name based on level ID.
     * Easy way to get level is to get it by game vertex ID graph or iterate over all levels in graphs.
     *
     * @throws If `level_id` is not present in the game graph header.
     *
     * @param level_id - ID of the level.
     * @returns Level name based on level ID provided.
     */
    public level_name<T extends string = string>(level_id: i32): T;

    /**
     * Release an ALife object from the simulator.
     *
     * @remarks
     * Online objects are destroyed through a network event. Offline objects are removed from ALife immediately.
     *
     * @throws If `object` is `null` or is not an ALife object.
     *
     * @param object - Object to remove.
     * @param flag - Compatibility flag accepted by the engine binding.
     */
    public release(object: Nillable<cse_alife_object>, flag: boolean): void;

    /**
     * Remove all restrictions of one type from an object.
     *
     * @remarks
     * `objectId` must resolve to an ALife object that has restriction storage.
     *
     * @param objectId - Restricted object id.
     * @param type - Restriction type.
     */
    public remove_all_restrictions(objectId: u16, type: TXR_dynamic_restrictor_type): void;

    /**
     * Remove an inside-space restriction from an offline monster.
     *
     * @remarks
     * `monster` must be a registered monster server object.
     *
     * @param monster - Monster server object to update.
     * @param restrictorId - Restrictor object id.
     */
    public remove_in_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Remove an outside-space restriction from an offline monster.
     *
     * @remarks
     * `monster` must be a registered monster server object.
     *
     * @param monster - Monster server object to update.
     * @param restrictorId - Restrictor object id.
     */
    public remove_out_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Enable or disable interaction for an ALife object.
     *
     * @remarks
     * `objectId` must resolve to a registered ALife object.
     *
     * @param objectId - ALife object id.
     * @param enabled - New interaction state.
     */
    public set_interactive(objectId: u16, enabled: boolean): void;

    /**
     * Set the online/offline switch distance.
     *
     * @param distance - Switch distance in meters.
     */
    public set_switch_distance(distance: f32): void;

    /**
     * Allow or forbid switching an ALife object offline.
     *
     * @remarks
     * `objectId` must resolve to a registered ALife object.
     *
     * @param objectId - ALife object id.
     * @param enabled - New offline switching state.
     */
    public set_switch_offline(objectId: u16, enabled: boolean): void;

    /**
     * Allow or forbid switching an ALife object online.
     *
     * @remarks
     * `objectId` must resolve to a registered ALife object.
     *
     * @param objectId - ALife object id.
     * @param enabled - New online switching state.
     */
    public set_switch_online(objectId: u16, enabled: boolean): void;

    /**
     * Resolve a spawn story id to a spawn graph id.
     *
     * @param spawnStoryId - Spawn story id.
     * @returns Spawn graph id.
     */
    public spawn_id(spawnStoryId: u32): u16;

    /**
     * Get a server object by story id.
     *
     * @param storyId - Story id.
     * @returns Matching server object, or `null` when it is not registered.
     */
    public story_object(storyId: u32): Nullable<cse_alife_object>;

    /**
     * @returns Alife server-client switch distance.
     */
    public switch_distance(): f32;

    /**
     * Set alife server-client switch distance.
     *
     * @param distance - Distance to set.
     */
    public switch_distance(distance: f32): void;

    /**
     * Set count of object updated in alife per one tick.
     *
     * @since OpenXRay 2022-06-29, 09598fe7, PR #1033
     *
     * @param count - Count of objects to update per tick.
     */
    public set_objects_per_update(count: u16): void;

    /**
     * Move a server object to another graph and level vertex.
     *
     * @since OpenXRay 2014-12-27, c82669625
     *
     * @param object_id - Object id to teleport.
     * @param game_vertex_id - Destination game graph vertex id.
     * @param level_vertex_id - Destination level vertex id.
     * @param position - Destination position.
     */
    public teleport_object(object_id: u16, game_vertex_id: u16, level_vertex_id: u32, position: vector): void;

    /**
     * Check whether an object id is usable.
     *
     * @remarks
     * This only checks the engine invalid id value. It does not prove that an object with this id is registered.
     *
     * @param object_id - ALife object id.
     * @returns Whether the id is not the engine invalid id.
     */
    public valid_object_id(object_id: u16): boolean;

    /**
     * Kill an offline monster.
     *
     * @remarks
     * Use only for monster server objects registered in ALife.
     *
     * @throws If `monster` is not a valid ALife monster object.
     *
     * @param monster - Monster server object.
     * @param graph_id - Optional game graph vertex id used as death location.
     * @param schedulable - Optional killer or source object.
     */
    public kill_entity(
      monster: cse_alife_monster_abstract,
      graph_id?: u16,
      schedulable?: cse_alife_monster_abstract
    ): void;

    /**
     * Get a server object by id.
     *
     * @remarks
     * With the default id overload, an invalid id is logged and returns `null`. Pass `no_assert` to use the raw
     * engine lookup mode.
     *
     * @param object_id - ALife object id.
     * @param no_assert - Return `null` instead of asserting when the object is missing.
     * @returns Matching server object, or `null`.
     */
    public object<T extends cse_alife_object = cse_alife_object>(object_id: u16, no_assert?: boolean): Nullable<T>;

    /**
     * Get a server object by its engine replacement name.
     *
     * @param name - Server object replacement name.
     * @returns Matching server object, or `null`.
     */
    public object<T extends cse_alife_object = cse_alife_object>(name: string): Nullable<T>;

    /**
     * Create an object from a spawn graph id.
     *
     * @throws If `spawn_id` does not exist or does not resolve to a dynamic ALife object.
     *
     * @param spawn_id - Spawn graph id.
     * @returns Created server object.
     */
    public create<T extends cse_alife_object = cse_alife_object>(spawn_id: u16): T;

    /**
     * Spawn a server object by section.
     *
     * @remarks
     * If a non-empty parent id is invalid, the engine logs the error and returns `null`.
     *
     * @param section - Object section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Level vertex id at the spawn position.
     * @param game_vertex_id - Game graph vertex id at the spawn position.
     * @param parent_object_id - Optional parent inventory or container id.
     * @returns Created server object, or `null` when a non-empty parent id is invalid.
     */
    public create<T extends cse_alife_object = cse_alife_object>(
      section: string,
      position: vector,
      level_vertex_id: u32,
      game_vertex_id: u32,
      parent_object_id?: u16
    ): T;

    /**
     * Spawn a server object and optionally defer network registration.
     *
     * @remarks
     * Passing `reg = false` returns the unregistered server object so scripts can edit its packet before registering
     * it manually. If a non-empty parent id is invalid, the engine logs the error and returns `null`.
     *
     * @param section - Object section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Level vertex id at the spawn position.
     * @param game_vertex_id - Game graph vertex id at the spawn position.
     * @param parent_object_id - Parent inventory or container id.
     * @param reg - Whether to register the object immediately.
     * @returns Created server object, or `null` when a non-empty parent id is invalid.
     */
    public create<T extends cse_alife_object = cse_alife_object>(
      section: string,
      position: vector,
      level_vertex_id: u32,
      game_vertex_id: u32,
      parent_object_id: u16,
      reg: boolean
    ): T;
  }

  /**
   * ALife smart-terrain task binding.
   *
   * @source C++ class CALifeSmartTerrainTask
   * @customConstructor CALifeSmartTerrainTask
   * @group xr_alife
   *
   * @remarks
   * Tasks are resolved against patrol paths and graph vertices immediately. Invalid paths or vertices assert in the
   * engine.
   */
  export class CALifeSmartTerrainTask {
    /**
     * Create a task from a patrol path.
     *
     * @throws If the patrol path or requested patrol point does not exist.
     *
     * @param patrol_path_name - Patrol path name.
     * @param patrol_point_index - Optional patrol point index.
     */
    public constructor(patrol_path_name: string, patrol_point_index?: u32);

    /**
     * Create a task from graph vertices.
     *
     * @throws If `game_vertex_id` is not valid in the game graph.
     *
     * @param game_vertex_id - Target game graph vertex id.
     * @param level_vertex_id - Target level vertex id.
     */
    public constructor(game_vertex_id: u16, level_vertex_id: u32);

    /**
     * Get the target level vertex.
     *
     * @throws If the task points to an invalid graph vertex.
     *
     * @returns Level vertex id.
     */
    public level_vertex_id(): u16;

    /**
     * Get the target game graph vertex.
     *
     * @throws If the task points to an invalid graph vertex.
     *
     * @returns Game graph vertex id.
     */
    public game_vertex_id(): u16;

    /**
     * Get the target position.
     *
     * @returns Task position.
     */
    public position(): vector;
  }

  /**
   * Offline ALife brain for monster server objects.
   *
   * @source C++ class CALifeMonsterBrain
   * @customConstructor CALifeMonsterBrain
   * @group xr_alife
   *
   * @remarks
   * Belongs to an offline monster server object. Do not use it with client-side `game_object` instances.
   */
  export class CAILifeMonsterBrain {
    /**
     * Create a brain for a monster server object.
     *
     * @param object - Monster server object.
     */
    public constructor(object: cse_alife_monster_abstract);

    /**
     * Select the next ALife task.
     *
     * @param forced - Whether task selection should ignore regular throttling.
     */
    public select_task(forced?: boolean): void;

    /**
     * Process the currently selected ALife task.
     */
    public process_task(): void;

    /**
     * Reset the brain to default no-path behavior.
     */
    public default_behaviour(): void;

    /**
     * @returns Whether this brain may choose ALife tasks.
     */
    public can_choose_alife_tasks(): boolean;

    /**
     * Enable or disable ALife task selection.
     *
     * @param value - New task-selection state.
     */
    public can_choose_alife_tasks(value: boolean): void;

    /**
     * Write brain state to a network packet.
     *
     * @param packet - Target network packet.
     */
    public on_state_write(packet: net_packet): void;

    /**
     * Read brain state from a network packet.
     *
     * @param packet - Source network packet.
     */
    public on_state_read(packet: net_packet): void;

    /**
     * Called when the owning monster is registered.
     */
    public on_register(): void;

    /**
     * Called when the owning monster is unregistered.
     */
    public on_unregister(): void;

    /**
     * Called when the owning monster changes graph location.
     */
    public on_location_change(): void;

    /**
     * Called when the owning monster switches online.
     */
    public on_switch_online(): void;

    /**
     * Called when the owning monster switches offline.
     */
    public on_switch_offline(): void;

    /**
     * Update offline planning.
     *
     * @param forced - Whether the update should ignore regular throttling.
     */
    public update(forced?: boolean): void;

    /**
     * Script-facing update hook.
     */
    public update_script(): void;

    /**
     * Try to perform an offline attack.
     *
     * @returns Whether an attack was performed.
     */
    public perform_attack(): boolean;

    /**
     * Get the meet action type for another ALife object.
     *
     * @param object - Other ALife schedulable object.
     * @param index - Relation index.
     * @param mutual_detection - Whether both objects detected each other.
     * @returns Meet action type id.
     */
    public action_type(object: IXR_cse_alife_schedulable, index: number, mutual_detection: boolean): number;

    /**
     * @returns Owning monster server object.
     */
    public object(): cse_alife_monster_abstract;

    /**
     * @returns Offline movement manager.
     */
    public movement(): CALifeMonsterMovementManager;

    /**
     * @returns Smart terrain assigned to the owner.
     */
    public smart_terrain(): cse_alife_smart_zone;
  }

  /**
   * ALife monster brain binding.
   *
   * @source C++ class CALifeMonsterBrain
   * @customConstructor CALifeMonsterBrain
   * @group xr_alife
   *
   * @remarks
   * Script-visible subset of the offline monster brain. `update()` is bound as a forced update.
   */
  export class CALifeMonsterBrain {
    /**
     * Get the offline movement manager.
     *
     * @returns Monster movement manager.
     */
    public movement(): CALifeMonsterMovementManager;

    /**
     * Update offline ALife planning for the monster.
     */
    public update(): void;

    /**
     * Check whether this brain may choose ALife tasks.
     *
     * @returns Whether ALife task selection is enabled.
     */
    public can_choose_alife_tasks(): boolean;

    /**
     * Enable or disable ALife task selection.
     *
     * @param can_choose - New task-selection state.
     */
    public can_choose_alife_tasks(can_choose: boolean): void;
  }

  /**
   * ALife human brain binding.
   *
   * @source C++ class CALifeHumanBrain : CALifeMonsterBrain
   * @customConstructor CALifeHumanBrain
   * @group xr_alife
   *
   * @remarks
   * Human ALife brain with the same script-visible surface as `CALifeMonsterBrain`.
   */
  export class CALifeHumanBrain extends CALifeMonsterBrain {}

  /**
   * ALife monster detail-path manager binding.
   *
   * @source C++ class CALifeMonsterDetailPathManager
   * @customConstructor CALifeMonsterDetailPathManager
   * @group xr_alife
   *
   * @remarks
   * Owned by an offline monster brain. Targets are validated against the game graph and current level graph.
   */
  export class CALifeMonsterDetailPathManager {
    /**
     * Check whether the detail path reached its target.
     *
     * @returns Whether detail movement is complete.
     */
    public completed(): boolean;

    /**
     * Set a target by graph vertex, level vertex, and position.
     *
     * @throws If the graph vertex is invalid or does not match the level vertex and position on the current level.
     *
     * @param game_vertex_id - Target game graph vertex id.
     * @param level_vertex_id - Target level vertex id.
     * @param position - Target position.
     */
    public target(game_vertex_id: number, level_vertex_id: number, position: vector): void;

    /**
     * Set a target by game graph vertex.
     *
     * @throws If `game_vertex_id` is not valid.
     *
     * @param game_vertex_id - Target game graph vertex id.
     */
    public target(game_vertex_id: number): void;

    /**
     * Set a target from a smart-terrain task.
     *
     * @remarks
     * The task is resolved to graph vertex, level vertex, and position before assigning the target.
     *
     * @param task - Smart-terrain task.
     */
    public target(task: CALifeSmartTerrainTask): void;

    /**
     * Check whether the last path build failed.
     *
     * @returns Whether detail movement failed.
     */
    public failed(): boolean;

    /**
     * Set detail movement speed.
     *
     * @param speed - New movement speed.
     */
    public speed(speed: f32): void;

    /**
     * Get detail movement speed.
     *
     * @returns Current movement speed.
     */
    public speed(): f32;

    /**
     * Check whether the current detail path still matches the target.
     *
     * @returns Whether the path is actual.
     */
    public actual(): boolean;
  }

  /**
   * ALife monster movement manager binding.
   *
   * @source C++ class CALifeMonsterMovementManager
   * @customConstructor CALifeMonsterMovementManager
   * @group xr_alife
   *
   * @remarks
   * Owned by an offline monster brain. The returned detail and patrol managers are engine-owned.
   */
  export class CALifeMonsterMovementManager {
    /**
     * Check whether offline movement has completed.
     *
     * @returns Whether movement is complete.
     */
    public completed(): boolean;

    /**
     * Get the patrol path manager.
     *
     * @returns Patrol path manager.
     */
    public patrol(): CALifeMonsterPatrolPathManager;

    /**
     * Check whether the movement target is still actual.
     *
     * @returns Whether movement is actual.
     */
    public actual(): boolean;

    /**
     * Get the active offline path type.
     *
     * @returns Movement path type.
     */
    public path_type(): TXR_game_object_path;

    /**
     * Get the detail path manager.
     *
     * @returns Detail path manager.
     */
    public detail(): CALifeMonsterDetailPathManager;
  }

  /**
   * ALife monster patrol-path manager binding.
   *
   * @source C++ class CALifeMonsterPatrolPathManager
   * @customConstructor CALifeMonsterPatrolPathManager
   * @group xr_alife
   *
   * @remarks
   * Patrol target getters require a patrol path and a selected current patrol vertex.
   */
  export class CALifeMonsterPatrolPathManager {
    /**
     * Set the patrol path by name.
     *
     * @throws If `path_name` is not a registered patrol path.
     *
     * @param path_name - Patrol path name.
     */
    public path(path_name: string): void;

    /**
     * Get the current patrol target game vertex.
     *
     * @throws If no patrol path is assigned or the current vertex is not selected.
     *
     * @returns Target game graph vertex id.
     */
    public target_game_vertex_id(): u16;

    /**
     * Get the current patrol target level vertex.
     *
     * @throws If no patrol path is assigned or the current vertex is not selected.
     *
     * @returns Target level vertex id.
     */
    public target_level_vertex_id(): u16;

    /**
     * Get the current patrol target position.
     *
     * @throws If no patrol path is assigned or the current vertex is not selected.
     *
     * @returns Target position.
     */
    public target_position(): vector;

    /**
     * Check whether patrol movement reached the target.
     *
     * @returns Whether patrol movement is complete.
     */
    public completed(): boolean;

    /**
     * Set patrol route behavior.
     *
     * @param type - Patrol route type.
     */
    public route_type(type: TXR_patrol_route_type): void;

    /**
     * Get patrol route behavior.
     *
     * @returns Patrol route type.
     */
    public route_type(): TXR_patrol_route_type;

    /**
     * Enable or disable random patrol point selection.
     *
     * @param enabled - New randomness state.
     */
    public use_randomness(enabled: boolean): void;

    /**
     * Check whether random patrol point selection is enabled.
     *
     * @returns Whether randomness is enabled.
     */
    public use_randomness(): boolean;

    /**
     * Set how the patrol path starts.
     *
     * @param type - Patrol start type.
     */
    public start_type(type: TXR_patrol_start_type): void;

    /**
     * Get how the patrol path starts.
     *
     * @returns Patrol start type.
     */
    public start_type(): TXR_patrol_start_type;

    /**
     * Set the starting patrol point.
     *
     * @remarks
     * Used when start type is the explicit point mode. The index must exist in the current patrol path.
     *
     * @param index - Patrol point index.
     */
    public start_vertex_index(index: u32): void;

    /**
     * Check whether the patrol target is still actual.
     *
     * @returns Whether the patrol path is actual.
     */
    public actual(): boolean;
  }
  /**
   * Story id constants used by spawned objects.
   *
   * @source C++ class spawn_story_ids
   * @customConstructor spawn_story_ids
   * @group xr_alife
   */
  export class spawn_story_ids {
    /**
     * Engine enum value for `spawn_story_ids.INVALID_SPAWN_STORY_ID`.
     */
    public static readonly INVALID_SPAWN_STORY_ID: -1;

    /**
     * Engine-owned spawn story id constants.
     */
    private constructor();
  }

  /**
   * Story id constants used by scripts.
   *
   * @source C++ class story_ids
   * @customConstructor story_ids
   * @group xr_alife
   */
  export class story_ids {
    /**
     * Engine enum value for `story_ids.INVALID_STORY_ID`.
     */
    public static readonly INVALID_STORY_ID: -1;
    /**
     * Engine enum value for `story_ids.Invalid`.
     */
    public static readonly Invalid: 65535;
    /**
     * Engine enum value for `story_ids.test_01`.
     */
    public static readonly test_01: 65000;
    /**
     * Engine enum value for `story_ids.test_02`.
     */
    public static readonly test_02: 65001;
    /**
     * Engine enum value for `story_ids.test_03`.
     */
    public static readonly test_03: 65002;
    /**
     * Engine enum value for `story_ids.test_04`.
     */
    public static readonly test_04: 65003;
    /**
     * Engine enum value for `story_ids.test_05`.
     */
    public static readonly test_05: 65004;
  }

  /**
   * Client-side spawn manager binding.
   *
   * @source C++ class client_spawn_manager
   * @customConstructor client_spawn_manager
   * @group xr_alife
   */
  export class client_spawn_manager {
    /**
     * Remove a delayed spawn callback.
     *
     * @param parent_id - Parent object id.
     * @param object_id - Delayed object id.
     */
    public remove(parent_id: u16, object_id: u16): void;

    /**
     * Register a callback for a delayed client spawn.
     *
     * @param parent_id - Parent object id.
     * @param object_id - Object id waiting for spawn.
     * @param cb - Callback called when the object is available.
     */
    public add(parent_id: u16, object_id: u16, cb: (this: void) => void): void;

    /**
     * Register a callback with user data for a delayed client spawn.
     *
     * @param parent_id - Parent object id.
     * @param object_id - Object id waiting for spawn.
     * @param cb - Callback called when the object is available.
     * @param object - Extra Lua object passed through the callback registry.
     */
    public add(parent_id: u16, object_id: u16, cb: (this: void) => void, object: XR_object): void;
  }

  /**
   * Engine class id constants.
   *
   * @source C++ class clsid
   * @customConstructor clsid
   * @group xr_alife
   */
  export class clsid {
    /**
     * Engine enum value for `clsid.actor`.
     */
    public static readonly actor: 90;
    /**
     * Engine enum value for `clsid.art_bast_artefact`.
     */
    public static readonly art_bast_artefact: 0;
    /**
     * Engine enum value for `clsid.art_black_drops`.
     */
    public static readonly art_black_drops: 1;
    /**
     * Engine enum value for `clsid.art_cta`.
     */
    public static readonly art_cta: 3;
    /**
     * Engine enum value for `clsid.art_dummy`.
     */
    public static readonly art_dummy: 4;
    /**
     * Engine enum value for `clsid.art_electric_ball`.
     */
    public static readonly art_electric_ball: 5;
    /**
     * Engine enum value for `clsid.art_faded_ball`.
     */
    public static readonly art_faded_ball: 6;
    /**
     * Engine enum value for `clsid.art_galantine`.
     */
    public static readonly art_galantine: 7;
    /**
     * Engine enum value for `clsid.art_gravi`.
     */
    public static readonly art_gravi: 8;
    /**
     * Engine enum value for `clsid.art_gravi_black`.
     */
    public static readonly art_gravi_black: 2;
    /**
     * Engine enum value for `clsid.art_mercury_ball`.
     */
    public static readonly art_mercury_ball: 9;
    /**
     * Engine enum value for `clsid.art_needles`.
     */
    public static readonly art_needles: 10;
    /**
     * Engine enum value for `clsid.art_rusty_hair`.
     */
    public static readonly art_rusty_hair: 11;
    /**
     * Engine enum value for `clsid.art_thorn`.
     */
    public static readonly art_thorn: 12;
    /**
     * Engine enum value for `clsid.art_zuda`.
     */
    public static readonly art_zuda: 13;
    /**
     * Engine enum value for `clsid.artefact`.
     */
    public static readonly artefact: 41;
    /**
     * Engine enum value for `clsid.artefact_s`.
     */
    public static readonly artefact_s: 102;
    /**
     * Engine enum value for `clsid.bloodsucker`.
     */
    public static readonly bloodsucker: 14;
    /**
     * Engine enum value for `clsid.bloodsucker_s`.
     */
    public static readonly bloodsucker_s: 108;
    /**
     * Engine enum value for `clsid.boar`.
     */
    public static readonly boar: 15;
    /**
     * Engine enum value for `clsid.boar_s`.
     */
    public static readonly boar_s: 109;
    /**
     * Engine enum value for `clsid.burer`.
     */
    public static readonly burer: 16;
    /**
     * Engine enum value for `clsid.burer_s`.
     */
    public static readonly burer_s: 110;
    /**
     * Engine enum value for `clsid.car`.
     */
    public static readonly car: 52;
    /**
     * Engine enum value for `clsid.cat`.
     */
    public static readonly cat: 17;
    /**
     * Engine enum value for `clsid.cat_s`.
     */
    public static readonly cat_s: 111;
    /**
     * Engine enum value for `clsid.chimera`.
     */
    public static readonly chimera: 29;
    /**
     * Engine enum value for `clsid.chimera_s`.
     */
    public static readonly chimera_s: 112;
    /**
     * Engine enum value for `clsid.controller`.
     */
    public static readonly controller: 18;
    /**
     * Engine enum value for `clsid.controller_s`.
     */
    public static readonly controller_s: 113;
    /**
     * Engine enum value for `clsid.crow`.
     */
    public static readonly crow: 19;
    /**
     * Engine enum value for `clsid.destrphys_s`.
     */
    public static readonly destrphys_s: 93;
    /**
     * Engine enum value for `clsid.device_detector_advanced`.
     */
    public static readonly device_detector_advanced: 53;
    /**
     * Engine enum value for `clsid.device_detector_elite`.
     */
    public static readonly device_detector_elite: 54;
    /**
     * Engine enum value for `clsid.device_detector_scientific`.
     */
    public static readonly device_detector_scientific: 57;
    /**
     * Engine enum value for `clsid.detector_scientific_s`.
     */
    public static readonly detector_scientific_s: -1;
    /**
     * Engine enum value for `clsid.device_detector_simple`.
     */
    public static readonly device_detector_simple: 58;
    /**
     * Engine enum value for `clsid.device_flare`.
     */
    public static readonly device_flare: 55;
    /**
     * Engine enum value for `clsid.device_pda`.
     */
    public static readonly device_pda: 56;
    /**
     * Engine enum value for `clsid.device_torch`.
     */
    public static readonly device_torch: 59;
    /**
     * Engine enum value for `clsid.device_torch_s`.
     */
    public static readonly device_torch_s: 146;
    /**
     * Engine enum value for `clsid.dog_black`.
     */
    public static readonly dog_black: 20;
    /**
     * Engine enum value for `clsid.dog_red`.
     */
    public static readonly dog_red: 23;
    /**
     * Engine enum value for `clsid.dog_s`.
     */
    public static readonly dog_s: 116;
    /**
     * Engine enum value for `clsid.equ_exo`.
     */
    public static readonly equ_exo: 60;
    /**
     * Engine enum value for `clsid.equ_military`.
     */
    public static readonly equ_military: 61;
    /**
     * Engine enum value for `clsid.equ_scientific`.
     */
    public static readonly equ_scientific: 62;
    /**
     * Engine enum value for `clsid.equ_stalker`.
     */
    public static readonly equ_stalker: 63;
    /**
     * Engine enum value for `clsid.equ_stalker_s`.
     */
    public static readonly equ_stalker_s: 65;
    /**
     * Engine enum value for `clsid.equ_helmet_s`.
     */
    public static readonly equ_helmet_s: 70;
    /**
     * Engine enum value for `clsid.flesh`.
     */
    public static readonly flesh: 24;
    /**
     * Engine enum value for `clsid.flesh_group`.
     */
    public static readonly flesh_group: 25;
    /**
     * Engine enum value for `clsid.flesh_s`.
     */
    public static readonly flesh_s: 117;
    /**
     * Engine enum value for `clsid.fracture`.
     */
    public static readonly fracture: 26;
    /**
     * Engine enum value for `clsid.fracture_s`.
     */
    public static readonly fracture_s: 119;
    /**
     * Engine enum value for `clsid.game`.
     */
    public static readonly game: 70;
    /**
     * Engine enum value for `clsid.game_cl_artefact_hunt`.
     */
    public static readonly game_cl_artefact_hunt: 45;
    /**
     * Engine enum value for `clsid.game_cl_capture_the_artefact`.
     */
    public static readonly game_cl_capture_the_artefact: 46;
    /**
     * Engine enum value for `clsid.game_cl_deathmatch`.
     */
    public static readonly game_cl_deathmatch: 47;
    /**
     * Engine enum value for `clsid.game_cl_single`.
     */
    public static readonly game_cl_single: 48;
    /**
     * Engine enum value for `clsid.game_cl_team_deathmatch`.
     */
    public static readonly game_cl_team_deathmatch: 49;
    /**
     * Engine enum value for `clsid.game_sv_artefact_hunt`.
     */
    public static readonly game_sv_artefact_hunt: 129;
    /**
     * Engine enum value for `clsid.game_sv_capture_the_artefact`.
     */
    public static readonly game_sv_capture_the_artefact: 130;
    /**
     * Engine enum value for `clsid.game_sv_deathmatch`.
     */
    public static readonly game_sv_deathmatch: 131;
    /**
     * Engine enum value for `clsid.game_sv_single`.
     */
    public static readonly game_sv_single: 132;
    /**
     * Engine enum value for `clsid.game_sv_team_deathmatch`.
     */
    public static readonly game_sv_team_deathmatch: 133;
    /**
     * Engine enum value for `clsid.game_ui_artefact_hunt`.
     */
    public static readonly game_ui_artefact_hunt: 147;
    /**
     * Engine enum value for `clsid.game_ui_capture_the_artefact`.
     */
    public static readonly game_ui_capture_the_artefact: 148;
    /**
     * Engine enum value for `clsid.game_ui_deathmatch`.
     */
    public static readonly game_ui_deathmatch: 149;
    /**
     * Engine enum value for `clsid.game_ui_single`.
     */
    public static readonly game_ui_single: 150;
    /**
     * Engine enum value for `clsid.game_ui_team_deathmatch`.
     */
    public static readonly game_ui_team_deathmatch: 151;
    /**
     * Engine enum value for `clsid.gigant_s`.
     */
    public static readonly gigant_s: 118;
    /**
     * Engine enum value for `clsid.graph_point`.
     */
    public static readonly graph_point: 28;
    /**
     * Engine enum value for `clsid.hanging_lamp`.
     */
    public static readonly hanging_lamp: 94;
    /**
     * Engine enum value for `clsid.helicopter`.
     */
    public static readonly helicopter: 50;
    /**
     * Engine enum value for `clsid.helmet`.
     */
    public static readonly helmet: 64;
    /**
     * Engine enum value for `clsid.hlamp_s`.
     */
    public static readonly hlamp_s: 125;
    /**
     * Engine enum value for `clsid.hud_manager`.
     */
    public static readonly hud_manager: 74;
    /**
     * Engine enum value for `clsid.inventory_box`.
     */
    public static readonly inventory_box: 95;
    /**
     * Engine enum value for `clsid.inventory_box_s`.
     */
    public static readonly inventory_box_s: 140;
    /**
     * Engine enum value for `clsid.level`.
     */
    public static readonly level: 69;
    /**
     * Engine enum value for `clsid.level_changer`.
     */
    public static readonly level_changer: 84;
    /**
     * Engine enum value for `clsid.level_changer_s`.
     */
    public static readonly level_changer_s: 85;
    /**
     * Engine enum value for `clsid.main_menu`.
     */
    public static readonly main_menu: 86;
    /**
     * Engine enum value for `clsid.mp_players_bag`.
     */
    public static readonly mp_players_bag: 87;
    /**
     * Engine enum value for `clsid.nogravity_zone`.
     */
    public static readonly nogravity_zone: 211;
    /**
     * Engine enum value for `clsid.obj_antirad`.
     */
    public static readonly obj_antirad: 75;
    /**
     * Engine enum value for `clsid.obj_antirad_s`.
     */
    public static readonly obj_antirad_s: 135;
    /**
     * Engine enum value for `clsid.obj_attachable`.
     */
    public static readonly obj_attachable: 76;
    /**
     * Engine enum value for `clsid.obj_bandage`.
     */
    public static readonly obj_bandage: 77;
    /**
     * Engine enum value for `clsid.obj_bandage_s`.
     */
    public static readonly obj_bandage_s: 136;
    /**
     * Engine enum value for `clsid.obj_bolt`.
     */
    public static readonly obj_bolt: 78;
    /**
     * Engine enum value for `clsid.obj_bottle`.
     */
    public static readonly obj_bottle: 79;
    /**
     * Engine enum value for `clsid.obj_bottle_s`.
     */
    public static readonly obj_bottle_s: 137;
    /**
     * Engine enum value for `clsid.obj_breakable`.
     */
    public static readonly obj_breakable: 91;
    /**
     * Engine enum value for `clsid.obj_climable`.
     */
    public static readonly obj_climable: 92;
    /**
     * Engine enum value for `clsid.obj_document`.
     */
    public static readonly obj_document: 80;
    /**
     * Engine enum value for `clsid.obj_explosive`.
     */
    public static readonly obj_explosive: 81;
    /**
     * Engine enum value for `clsid.obj_explosive_s`.
     */
    public static readonly obj_explosive_s: 138;
    /**
     * Engine enum value for `clsid.obj_food`.
     */
    public static readonly obj_food: 82;
    /**
     * Engine enum value for `clsid.obj_food_s`.
     */
    public static readonly obj_food_s: 139;
    /**
     * Engine enum value for `clsid.obj_medkit`.
     */
    public static readonly obj_medkit: 83;
    /**
     * Engine enum value for `clsid.obj_medkit_s`.
     */
    public static readonly obj_medkit_s: 142;
    /**
     * Engine enum value for `clsid.obj_pda_s`.
     */
    public static readonly obj_pda_s: 144;
    /**
     * Engine enum value for `clsid.obj_phskeleton`.
     */
    public static readonly obj_phskeleton: 100;
    /**
     * Engine enum value for `clsid.obj_phys_destroyable`.
     */
    public static readonly obj_phys_destroyable: 99;
    /**
     * Engine enum value for `clsid.obj_physic`.
     */
    public static readonly obj_physic: 96;
    /**
     * Engine enum value for `clsid.online_offline_group`.
     */
    public static readonly online_offline_group: 88;
    /**
     * Engine enum value for `clsid.online_offline_group_s`.
     */
    public static readonly online_offline_group_s: 89;
    /**
     * Engine enum value for `clsid.phantom`.
     */
    public static readonly phantom: 30;
    /**
     * Engine enum value for `clsid.poltergeist`.
     */
    public static readonly poltergeist: 31;
    /**
     * Engine enum value for `clsid.poltergeist_s`.
     */
    public static readonly poltergeist_s: 120;
    /**
     * Engine enum value for `clsid.projector`.
     */
    public static readonly projector: 98;
    /**
     * Engine enum value for `clsid.pseudo_gigant`.
     */
    public static readonly pseudo_gigant: 27;
    /**
     * Engine enum value for `clsid.pseudodog_s`.
     */
    public static readonly pseudodog_s: 121;
    /**
     * Engine enum value for `clsid.psy_dog`.
     */
    public static readonly psy_dog: 22;
    /**
     * Engine enum value for `clsid.psy_dog_phantom`.
     */
    public static readonly psy_dog_phantom: 21;
    /**
     * Engine enum value for `clsid.psy_dog_phantom_s`.
     */
    public static readonly psy_dog_phantom_s: 114;
    /**
     * Engine enum value for `clsid.psy_dog_s`.
     */
    public static readonly psy_dog_s: 115;
    /**
     * Engine enum value for `clsid.rat`.
     */
    public static readonly rat: 32;
    /**
     * Engine enum value for `clsid.script_actor`.
     */
    public static readonly script_actor: 134;
    /**
     * Engine enum value for `clsid.script_heli`.
     */
    public static readonly script_heli: 51;
    /**
     * Engine enum value for `clsid.script_object`.
     */
    public static readonly script_object: 103;
    /**
     * Engine enum value for `clsid.script_phys`.
     */
    public static readonly script_phys: 97;
    /**
     * Engine enum value for `clsid.script_restr`.
     */
    public static readonly script_restr: 127;
    /**
     * Engine enum value for `clsid.script_stalker`.
     */
    public static readonly script_stalker: 35;
    /**
     * Engine enum value for `clsid.script_zone`.
     */
    public static readonly script_zone: 101;
    /**
     * Engine enum value for `clsid.smart_cover`.
     */
    public static readonly smart_cover: 104;
    /**
     * Engine enum value for `clsid.smart_terrain`.
     */
    public static readonly smart_terrain: 105;
    /**
     * Engine enum value for `clsid.smart_zone`.
     */
    public static readonly smart_zone: 106;
    /**
     * Engine enum value for `clsid.smartcover_s`.
     */
    public static readonly smartcover_s: 107;
    /**
     * Engine enum value for `clsid.snork`.
     */
    public static readonly snork: 33;
    /**
     * Engine enum value for `clsid.snork_s`.
     */
    public static readonly snork_s: 122;
    /**
     * Engine enum value for `clsid.space_restrictor`.
     */
    public static readonly space_restrictor: 126;
    /**
     * Engine enum value for `clsid.spectator`.
     */
    public static readonly spectator: 128;
    /**
     * Engine enum value for `clsid.stalker`.
     */
    public static readonly stalker: 34;
    /**
     * Engine enum value for `clsid.team_base_zone`.
     */
    public static readonly team_base_zone: 214;
    /**
     * Engine enum value for `clsid.torrid_zone`.
     */
    public static readonly torrid_zone: 215;
    /**
     * Engine enum value for `clsid.trader`.
     */
    public static readonly trader: 36;
    /**
     * Engine enum value for `clsid.tushkano`.
     */
    public static readonly tushkano: 37;
    /**
     * Engine enum value for `clsid.tushkano_s`.
     */
    public static readonly tushkano_s: 123;
    /**
     * Engine enum value for `clsid.wpn_ak74`.
     */
    public static readonly wpn_ak74: 173;
    /**
     * Engine enum value for `clsid.wpn_ak74_s`.
     */
    public static readonly wpn_ak74_s: 152;
    /**
     * Engine enum value for `clsid.wpn_ammo`.
     */
    public static readonly wpn_ammo: 39;
    /**
     * Engine enum value for `clsid.wpn_ammo_m209`.
     */
    public static readonly wpn_ammo_m209: 42;
    /**
     * Engine enum value for `clsid.wpn_ammo_m209_s`.
     */
    public static readonly wpn_ammo_m209_s: 141;
    /**
     * Engine enum value for `clsid.wpn_ammo_og7b`.
     */
    public static readonly wpn_ammo_og7b: 43;
    /**
     * Engine enum value for `clsid.wpn_ammo_og7b_s`.
     */
    public static readonly wpn_ammo_og7b_s: 143;
    /**
     * Engine enum value for `clsid.wpn_ammo_s`.
     */
    public static readonly wpn_ammo_s: 40;
    /**
     * Engine enum value for `clsid.wpn_ammo_vog25`.
     */
    public static readonly wpn_ammo_vog25: 44;
    /**
     * Engine enum value for `clsid.wpn_ammo_vog25_s`.
     */
    public static readonly wpn_ammo_vog25_s: 145;
    /**
     * Engine enum value for `clsid.wpn_auto_shotgun_s`.
     */
    public static readonly wpn_auto_shotgun_s: 153;
    /**
     * Engine enum value for `clsid.wpn_binocular`.
     */
    public static readonly wpn_binocular: 174;
    /**
     * Engine enum value for `clsid.wpn_binocular_s`.
     */
    public static readonly wpn_binocular_s: 154;
    /**
     * Engine enum value for `clsid.wpn_bm16`.
     */
    public static readonly wpn_bm16: 175;
    /**
     * Engine enum value for `clsid.wpn_bm16_s`.
     */
    public static readonly wpn_bm16_s: 155;
    /**
     * Engine enum value for `clsid.wpn_fn2000`.
     */
    public static readonly wpn_fn2000: 176;
    /**
     * Engine enum value for `clsid.wpn_fort`.
     */
    public static readonly wpn_fort: 177;
    /**
     * Engine enum value for `clsid.wpn_grenade_f1`.
     */
    public static readonly wpn_grenade_f1: 66;
    /**
     * Engine enum value for `clsid.wpn_grenade_f1_s`.
     */
    public static readonly wpn_grenade_f1_s: 67;
    /**
     * Engine enum value for `clsid.wpn_grenade_fake`.
     */
    public static readonly wpn_grenade_fake: 68;
    /**
     * Engine enum value for `clsid.wpn_grenade_launcher`.
     */
    public static readonly wpn_grenade_launcher: 178;
    /**
     * Engine enum value for `clsid.wpn_grenade_launcher_s`.
     */
    public static readonly wpn_grenade_launcher_s: 156;
    /**
     * Engine enum value for `clsid.wpn_grenade_rgd5`.
     */
    public static readonly wpn_grenade_rgd5: 71;
    /**
     * Engine enum value for `clsid.wpn_grenade_rgd5_s`.
     */
    public static readonly wpn_grenade_rgd5_s: 72;
    /**
     * Engine enum value for `clsid.wpn_grenade_rpg7`.
     */
    public static readonly wpn_grenade_rpg7: 73;
    /**
     * Engine enum value for `clsid.wpn_groza`.
     */
    public static readonly wpn_groza: 179;
    /**
     * Engine enum value for `clsid.wpn_groza_s`.
     */
    public static readonly wpn_groza_s: 157;
    /**
     * Engine enum value for `clsid.wpn_hpsa`.
     */
    public static readonly wpn_hpsa: 180;
    /**
     * Engine enum value for `clsid.wpn_hpsa_s`.
     */
    public static readonly wpn_hpsa_s: 158;
    /**
     * Engine enum value for `clsid.wpn_knife`.
     */
    public static readonly wpn_knife: 181;
    /**
     * Engine enum value for `clsid.wpn_knife_s`.
     */
    public static readonly wpn_knife_s: 159;
    /**
     * Engine enum value for `clsid.wpn_lr300`.
     */
    public static readonly wpn_lr300: 182;
    /**
     * Engine enum value for `clsid.wpn_lr300_s`.
     */
    public static readonly wpn_lr300_s: 160;
    /**
     * Engine enum value for `clsid.wpn_pm`.
     */
    public static readonly wpn_pm: 183;
    /**
     * Engine enum value for `clsid.wpn_pm_s`.
     */
    public static readonly wpn_pm_s: 161;
    /**
     * Engine enum value for `clsid.wpn_rg6`.
     */
    public static readonly wpn_rg6: 184;
    /**
     * Engine enum value for `clsid.wpn_rg6_s`.
     */
    public static readonly wpn_rg6_s: 162;
    /**
     * Engine enum value for `clsid.wpn_rpg7`.
     */
    public static readonly wpn_rpg7: 185;
    /**
     * Engine enum value for `clsid.wpn_rpg7_s`.
     */
    public static readonly wpn_rpg7_s: 163;
    /**
     * Engine enum value for `clsid.wpn_scope`.
     */
    public static readonly wpn_scope: 186;
    /**
     * Engine enum value for `clsid.wpn_scope_s`.
     */
    public static readonly wpn_scope_s: 164;
    /**
     * Engine enum value for `clsid.wpn_shotgun`.
     */
    public static readonly wpn_shotgun: 187;
    /**
     * Engine enum value for `clsid.wpn_shotgun_s`.
     */
    public static readonly wpn_shotgun_s: 165;
    /**
     * Engine enum value for `clsid.wpn_silencer`.
     */
    public static readonly wpn_silencer: 188;
    /**
     * Engine enum value for `clsid.wpn_silencer_s`.
     */
    public static readonly wpn_silencer_s: 166;
    /**
     * Engine enum value for `clsid.wpn_stat_mgun`.
     */
    public static readonly wpn_stat_mgun: 189;
    /**
     * Engine enum value for `clsid.wpn_svd`.
     */
    public static readonly wpn_svd: 190;
    /**
     * Engine enum value for `clsid.wpn_svd_s`.
     */
    public static readonly wpn_svd_s: 167;
    /**
     * Engine enum value for `clsid.wpn_svu`.
     */
    public static readonly wpn_svu: 191;
    /**
     * Engine enum value for `clsid.wpn_svu_s`.
     */
    public static readonly wpn_svu_s: 168;
    /**
     * Engine enum value for `clsid.wpn_usp45`.
     */
    public static readonly wpn_usp45: 192;
    /**
     * Engine enum value for `clsid.wpn_usp45_s`.
     */
    public static readonly wpn_usp45_s: 169;
    /**
     * Engine enum value for `clsid.wpn_val`.
     */
    public static readonly wpn_val: 193;
    /**
     * Engine enum value for `clsid.wpn_val_s`.
     */
    public static readonly wpn_val_s: 170;
    /**
     * Engine enum value for `clsid.wpn_vintorez`.
     */
    public static readonly wpn_vintorez: 194;
    /**
     * Engine enum value for `clsid.wpn_vintorez_s`.
     */
    public static readonly wpn_vintorez_s: 171;
    /**
     * Engine enum value for `clsid.wpn_walther`.
     */
    public static readonly wpn_walther: 195;
    /**
     * Engine enum value for `clsid.wpn_walther_s`.
     */
    public static readonly wpn_walther_s: 172;
    /**
     * Engine enum value for `clsid.wpn_wmagaz`.
     */
    public static readonly wpn_wmagaz: 196;
    /**
     * Engine enum value for `clsid.wpn_wmaggl`.
     */
    public static readonly wpn_wmaggl: 197;
    /**
     * Engine enum value for `clsid.zombie`.
     */
    public static readonly zombie: 38;
    /**
     * Engine enum value for `clsid.zombie_s`.
     */
    public static readonly zombie_s: 124;
    /**
     * Engine enum value for `clsid.zone`.
     */
    public static readonly zone: 216;
    /**
     * Engine enum value for `clsid.zone_acid_fog`.
     */
    public static readonly zone_acid_fog: 204;
    /**
     * Engine enum value for `clsid.zone_bfuzz`.
     */
    public static readonly zone_bfuzz: 205;
    /**
     * Engine enum value for `clsid.zone_bfuzz_s`.
     */
    public static readonly zone_bfuzz_s: 198;
    /**
     * Engine enum value for `clsid.zone_campfire`.
     */
    public static readonly zone_campfire: 206;
    /**
     * Engine enum value for `clsid.zone_dead`.
     */
    public static readonly zone_dead: 207;
    /**
     * Engine enum value for `clsid.zone_galant_s`.
     */
    public static readonly zone_galant_s: 199;
    /**
     * Engine enum value for `clsid.zone_galantine`.
     */
    public static readonly zone_galantine: 208;
    /**
     * Engine enum value for `clsid.zone_mbald_s`.
     */
    public static readonly zone_mbald_s: 200;
    /**
     * Engine enum value for `clsid.zone_mincer`.
     */
    public static readonly zone_mincer: 210;
    /**
     * Engine enum value for `clsid.zone_mincer_s`.
     */
    public static readonly zone_mincer_s: 201;
    /**
     * Engine enum value for `clsid.zone_mosquito_bald`.
     */
    public static readonly zone_mosquito_bald: 209;
    /**
     * Engine enum value for `clsid.zone_radio_s`.
     */
    public static readonly zone_radio_s: 202;
    /**
     * Engine enum value for `clsid.zone_radioactive`.
     */
    public static readonly zone_radioactive: 212;
    /**
     * Engine enum value for `clsid.zone_rusty_hair`.
     */
    public static readonly zone_rusty_hair: 213;
    /**
     * Engine enum value for `clsid.zone_torrid_s`.
     */
    public static readonly zone_torrid_s: 203;
  }

  /**
   * @group xr_alife
   */
  type TXR_class_key = EnumeratedStaticsKeys<typeof clsid>;

  /**
   * @group xr_alife
   */
  type TXR_class_id = EnumeratedStaticsValues<typeof clsid>;

  /**
   * Factory for ALife server object bindings.
   *
   * @source C++ class global
   * @customConstructor object_factory
   * @group xr_alife
   *
   * @remarks
   * Registers Lua script classes for engine class ids. Missing Lua class constructors are logged and skipped.
   */
  export class object_factory {
    /**
     * Engine-owned object factory.
     */
    protected constructor();

    /**
     * Register a script class pair for an engine class id.
     *
     * @param client_object_class - Lua client-side class name.
     * @param server_object_class - Lua server-side class name.
     * @param clsid - Engine class id name.
     * @param script_clsid - Script class id exported by `clsid`.
     */
    public register(
      client_object_class: string,
      server_object_class: string,
      clsid: string,
      script_clsid: TXR_class_key
    ): void;

    /**
     * Register a single script class for an engine class id.
     *
     * @param client_object_class - Lua class name.
     * @param clsid - Engine class id name.
     * @param script_clsid - Script class id exported by `clsid`.
     */
    public register(client_object_class: string, clsid: string, script_clsid: TXR_class_key): void;
  }

  /**
   * Get the active ALife simulator.
   *
   * @group xr_alife
   *
   * @returns ALife simulator singleton.
   */
  export function alife(this: void): alife_simulator;
}
