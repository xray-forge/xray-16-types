declare module "xray16" {
  /**
   * @source C++ class alife_simulator
   * @customConstructor alife_simulator
   * @group xr_alife
   */
  export class alife_simulator {
    public actor<T extends cse_alife_creature_actor>(): T;
    public add_in_restriction(monster: cse_alife_monster_abstract, value: u16): void;
    public add_out_restriction(monster: cse_alife_monster_abstract, value: u16): void;
    public create_ammo(
      section: string,
      vector: vector,
      level_vertex_id: u32,
      game_vertex_id: u16,
      pid: u16,
      count: i32
    ): cse_abstract;
    public dont_has_info(object_id: u16, info_id: string): boolean;
    public has_info(object_id: u16, info_id: string): boolean;
    public iterate_objects(cb: (this: void, object: cse_alife_object) => boolean | void): void;
    public level_id(): u32;
    /**
     * Method to get level name based on level ID.
     * Easy way to get level is to get it by game vertex ID graph or iterate over all levels in graphs.
     *
     * @param level_id - ID of the level
     * @returns level name based on level ID provided
     */
    public level_name<T extends string = string>(level_id: i32): T;
    public release(cse_abstract: cse_alife_object | null, flag: boolean): void;
    public remove_all_restrictions(value: u16, type: i32 /* enum RestrictionSpace::ERestrictorTypes */): void;
    public remove_in_restriction(monster: cse_alife_monster_abstract, value: u16): void;
    public remove_out_restriction(monster: cse_alife_monster_abstract, value: u16): void;
    public set_interactive(value1: u16, value2: boolean): void;
    public set_switch_distance(distance: f32): void;
    public set_switch_offline(value1: u16, value2: boolean): void;
    public set_switch_online(value1: u16, value2: boolean): void;
    public spawn_id(value: u32): u16;
    public story_object(value: u32): cse_alife_object;
    /**
     * @returns alife server-client switch distance
     */
    public switch_distance(): f32;
    /**
     * Set alife server-client switch distance.
     *
     * @param distance - distance to set
     */
    public switch_distance(distance: f32): void;
    /**
     * Set count of object updated in alife per one tick.
     *
     * @param count - count of objects to update per tick
     */
    public set_objects_per_update(count: u16): void;
    public teleport_object(level_vertex_id: u16, game_vertex_id: u16, int: u32, vector: vector): void;
    public valid_object_id(value: u16): boolean;

    public kill_entity(monster1: cse_alife_monster_abstract, value?: u16, monster2?: cse_alife_monster_abstract): void;

    public object<T extends cse_alife_object = cse_alife_object>(id: number, value2?: boolean): T | null;

    public create<T extends cse_alife_object = cse_alife_object>(value: u32): T;
    public create<T extends cse_alife_object = cse_alife_object>(
      item_section: string,
      position: vector,
      level_vertex_id: u32,
      game_vertex_id: u32,
      pid?: i32
    ): T;
  }

  /**
   * @source C++ class CALifeSmartTerrainTask
   * @customConstructor CALifeSmartTerrainTask
   * @group xr_alife
   */
  export class CALifeSmartTerrainTask {
    public constructor(patrol_path_name: string, patrol_point_index?: u32);
    public constructor(game_vertex_id: u16, level_vertex_id: u32);

    public level_vertex_id(): u16;
    public game_vertex_id(): u16;
    public position(): vector;
  }

  /**
   * @source C++ class CALifeMonsterBrain
   * @customConstructor CALifeMonsterBrain
   * @group xr_alife
   */
  export class CAILifeMonsterBrain {
    public constructor(object: unknown);

    public select_task(forced?: boolean): void;
    public process_task(): void;
    public default_behaviour(): void;

    public can_choose_alife_tasks(): boolean;
    public can_choose_alife_tasks(value: boolean): void;

    public on_state_write(packet: net_packet): void;
    public on_state_read(packet: net_packet): void;
    public on_register(): void;
    public on_unregister(): void;
    public on_location_change(): void;
    public on_switch_online(): void;
    public on_switch_offline(): void;

    public update(forced?: boolean): void;
    public update_script(): void;

    public perform_attack(): boolean;
    public action_type(tpALifeSchedulable: unknown, index: number, mutual_detection: boolean): unknown;
    public object(): unknown;
    public movement(): unknown;
    public smart_terrain(): unknown;
  }

  /**
   * @source C++ class CALifeMonsterBrain
   * @customConstructor CALifeMonsterBrain
   * @group xr_alife
   */
  export class CALifeMonsterBrain {
    public movement(): CALifeMonsterMovementManager;
    public update(): void;
    public can_choose_alife_tasks(): boolean;
    public can_choose_alife_tasks(can_choose: boolean): void;
  }

  /**
   * @source C++ class CALifeHumanBrain : CALifeMonsterBrain
   * @customConstructor CALifeHumanBrain
   * @group xr_alife
   */
  export class CALifeHumanBrain extends CALifeMonsterBrain {}

  /**
   * @source C++ class CALifeMonsterDetailPathManager
   * @customConstructor CALifeMonsterDetailPathManager
   * @group xr_alife
   */
  export class CALifeMonsterDetailPathManager {
    public completed(): boolean;
    public target(a: number, b: number, vector: vector): void;
    public target(task_id: number): void;
    public target(task: CALifeSmartTerrainTask): void;
    public failed(): boolean;
    public speed(number: f32): f32;
    public speed(): f32;
    public actual(): boolean;
  }

  /**
   * @source C++ class CALifeMonsterMovementManager
   * @customConstructor CALifeMonsterMovementManager
   * @group xr_alife
   */
  export class CALifeMonsterMovementManager {
    public completed(): boolean;
    public patrol(): CALifeMonsterPatrolPathManager;
    public actual(): boolean;
    public path_type(): number; /* EPathType */
    public detail(): CALifeMonsterDetailPathManager;
  }

  /**
   * @source C++ class CALifeMonsterPatrolPathManager
   * @customConstructor CALifeMonsterPatrolPathManager
   * @group xr_alife
   */
  export class CALifeMonsterPatrolPathManager {
    public path(string: string): void;
    public target_game_vertex_id(): u16;
    public target_level_vertex_id(): u16;
    public target_position(): vector;
    public completed(): boolean;
    public route_type(type: u32 /* const enum PatrolPathManager::EPatrolRouteType */): u32;
    public route_type(): u32;
    public use_randomness(enabled: boolean): boolean;
    public use_randomness(): boolean;
    public start_type(type: u32 /* const enum PatrolPathManager::EPatrolStartType */): u32;
    public start_type(): u32;
    public start_vertex_index(index: u32): void;
    public actual(): boolean;
  }

  /**
   * @source C++ class cover_point
   * @customConstructor cover_point
   * @group xr_alife
   */
  export class cover_point {
    private constructor();

    public level_vertex_id(): u32;
    public is_smart_cover(): boolean;
    public position(): vector;
  }

  /**
   * @source C++ class client_spawn_manager
   * @customConstructor client_spawn_manager
   * @group xr_alife
   */
  export class client_spawn_manager {
    public remove(number1: u16, number2: u16): void;
    public add(number1: u16, number2: u16, cb: (this: void) => void): void;
    public add(number1: u16, number2: u16, cb: (this: void) => void, object: XR_object): void;
  }
}
