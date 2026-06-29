declare module "xray16" {
  /**
   * @source C++ class alife_simulator
   * @customConstructor alife_simulator
   * @group xr_alife
   */
  export class alife_simulator {
    /**
     * Get the ALife actor server object.
     *
     * @returns Actor object registered in the ALife graph.
     */
    public actor<T extends cse_alife_creature_actor>(): T;

    /**
     * Add an inside-space restriction to an offline monster.
     *
     * @param monster - Monster server object to restrict.
     * @param restrictorId - Restrictor object id.
     */
    public add_in_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Add an outside-space restriction to an offline monster.
     *
     * @param monster - Monster server object to restrict.
     * @param restrictorId - Restrictor object id.
     */
    public add_out_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Spawn ammo with a custom amount left in the box.
     *
     * @param section - Ammo section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Level vertex id at the spawn position.
     * @param game_vertex_id - Game graph vertex id at the spawn position.
     * @param parent_object_id - Parent inventory or container id, or `65535` for no parent.
     * @param count - Amount of ammo in the spawned box.
     * @returns Spawned server object.
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
     * @param level_id - ID of the level.
     * @returns Level name based on level ID provided.
     */
    public level_name<T extends string = string>(level_id: i32): T;

    /**
     * Release an ALife object from the simulator.
     *
     * @param object - Object to remove.
     * @param flag - Compatibility flag accepted by the engine binding.
     */
    public release(object: cse_alife_object | null, flag: boolean): void;

    /**
     * Remove all restrictions of one type from an object.
     *
     * @param objectId - Restricted object id.
     * @param type - Restriction type.
     */
    public remove_all_restrictions(objectId: u16, type: i32 /* Enum RestrictionSpace::ERestrictorTypes */): void;

    /**
     * Remove an inside-space restriction from an offline monster.
     *
     * @param monster - Monster server object to update.
     * @param restrictorId - Restrictor object id.
     */
    public remove_in_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Remove an outside-space restriction from an offline monster.
     *
     * @param monster - Monster server object to update.
     * @param restrictorId - Restrictor object id.
     */
    public remove_out_restriction(monster: cse_alife_monster_abstract, restrictorId: u16): void;

    /**
     * Enable or disable interaction for an ALife object.
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
     * @param objectId - ALife object id.
     * @param enabled - New offline switching state.
     */
    public set_switch_offline(objectId: u16, enabled: boolean): void;

    /**
     * Allow or forbid switching an ALife object online.
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
    public story_object(storyId: u32): cse_alife_object | null;

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
     * @param count - Count of objects to update per tick.
     */
    public set_objects_per_update(count: u16): void;

    /**
     * Move a server object to another graph and level vertex.
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
     * @param object_id - ALife object id.
     * @returns Whether the id is not the engine invalid id.
     */
    public valid_object_id(object_id: u16): boolean;

    /**
     * Kill an offline monster.
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
     * @param object_id - ALife object id.
     * @param no_assert - Return `null` instead of asserting when the object is missing.
     * @returns Matching server object, or `null`.
     */
    public object<T extends cse_alife_object = cse_alife_object>(object_id: u16, no_assert?: boolean): T | null;

    /**
     * Get a server object by its engine replacement name.
     *
     * @param name - Server object replacement name.
     * @returns Matching server object, or `null`.
     */
    public object<T extends cse_alife_object = cse_alife_object>(name: string): T | null;

    /**
     * Create an object from a spawn graph id.
     *
     * @param spawn_id - Spawn graph id.
     * @returns Created server object.
     */
    public create<T extends cse_alife_object = cse_alife_object>(spawn_id: u16): T;

    /**
     * Spawn a server object by section.
     *
     * @param section - Object section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Level vertex id at the spawn position.
     * @param game_vertex_id - Game graph vertex id at the spawn position.
     * @param parent_object_id - Optional parent inventory or container id.
     * @returns Created server object.
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
     * @param section - Object section name.
     * @param position - Spawn position.
     * @param level_vertex_id - Level vertex id at the spawn position.
     * @param game_vertex_id - Game graph vertex id at the spawn position.
     * @param parent_object_id - Parent inventory or container id.
     * @param reg - Whether to register the object immediately.
     * @returns Created server object.
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
   * @source C++ class CALifeSmartTerrainTask
   * @customConstructor CALifeSmartTerrainTask
   * @group xr_alife
   */
  export class CALifeSmartTerrainTask {
    /**
     * Create a task from a patrol path.
     *
     * @param patrol_path_name - Patrol path name.
     * @param patrol_point_index - Optional patrol point index.
     */
    public constructor(patrol_path_name: string, patrol_point_index?: u32);

    /**
     * Create a task from graph vertices.
     *
     * @param game_vertex_id - Target game graph vertex id.
     * @param level_vertex_id - Target level vertex id.
     */
    public constructor(game_vertex_id: u16, level_vertex_id: u32);

    /**
     * Get the target level vertex.
     *
     * @returns Level vertex id.
     */
    public level_vertex_id(): u16;

    /**
     * Get the target game graph vertex.
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
    /**
     * Check whether the detail path reached its target.
     *
     * @returns Whether detail movement is complete.
     */
    public completed(): boolean;

    /**
     * Set a target by graph vertex, level vertex, and position.
     *
     * @param game_vertex_id - Target game graph vertex id.
     * @param level_vertex_id - Target level vertex id.
     * @param position - Target position.
     */
    public target(game_vertex_id: number, level_vertex_id: number, position: vector): void;

    /**
     * Set a target by game graph vertex.
     *
     * @param game_vertex_id - Target game graph vertex id.
     */
    public target(game_vertex_id: number): void;

    /**
     * Set a target from a smart-terrain task.
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
   * @source C++ class CALifeMonsterMovementManager
   * @customConstructor CALifeMonsterMovementManager
   * @group xr_alife
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
    public path_type(): number; /* EPathType */

    /**
     * Get the detail path manager.
     *
     * @returns Detail path manager.
     */
    public detail(): CALifeMonsterDetailPathManager;
  }

  /**
   * @source C++ class CALifeMonsterPatrolPathManager
   * @customConstructor CALifeMonsterPatrolPathManager
   * @group xr_alife
   */
  export class CALifeMonsterPatrolPathManager {
    /**
     * Set the patrol path by name.
     *
     * @param path_name - Patrol path name.
     */
    public path(path_name: string): void;

    /**
     * Get the current patrol target game vertex.
     *
     * @returns Target game graph vertex id.
     */
    public target_game_vertex_id(): u16;

    /**
     * Get the current patrol target level vertex.
     *
     * @returns Target level vertex id.
     */
    public target_level_vertex_id(): u16;

    /**
     * Get the current patrol target position.
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
    public route_type(type: u32 /* Const enum PatrolPathManager::EPatrolRouteType */): void;

    /**
     * Get patrol route behavior.
     *
     * @returns Patrol route type.
     */
    public route_type(): u32;

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
    public start_type(type: u32 /* Const enum PatrolPathManager::EPatrolStartType */): void;

    /**
     * Get how the patrol path starts.
     *
     * @returns Patrol start type.
     */
    public start_type(): u32;

    /**
     * Set the starting patrol point.
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
   * @source C++ class spawn_story_ids
   * @customConstructor spawn_story_ids
   * @group xr_alife
   */
  export class spawn_story_ids {
    public static readonly INVALID_SPAWN_STORY_ID: -1;

    private constructor();
  }

  /**
   * @source C++ class story_ids
   * @customConstructor story_ids
   * @group xr_alife
   */
  export class story_ids {
    public static readonly INVALID_STORY_ID: -1;
    public static readonly Invalid: 65535;
    public static readonly test_01: 65000;
    public static readonly test_02: 65001;
    public static readonly test_03: 65002;
    public static readonly test_04: 65003;
    public static readonly test_05: 65004;
  }

  /**
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
   * @source C++ class clsid
   * @customConstructor clsid
   * @group xr_alife
   */
  export class clsid {
    public static readonly actor: 90;
    public static readonly art_bast_artefact: 0;
    public static readonly art_black_drops: 1;
    public static readonly art_cta: 3;
    public static readonly art_dummy: 4;
    public static readonly art_electric_ball: 5;
    public static readonly art_faded_ball: 6;
    public static readonly art_galantine: 7;
    public static readonly art_gravi: 8;
    public static readonly art_gravi_black: 2;
    public static readonly art_mercury_ball: 9;
    public static readonly art_needles: 10;
    public static readonly art_rusty_hair: 11;
    public static readonly art_thorn: 12;
    public static readonly art_zuda: 13;
    public static readonly artefact: 41;
    public static readonly artefact_s: 102;
    public static readonly bloodsucker: 14;
    public static readonly bloodsucker_s: 108;
    public static readonly boar: 15;
    public static readonly boar_s: 109;
    public static readonly burer: 16;
    public static readonly burer_s: 110;
    public static readonly car: 52;
    public static readonly cat: 17;
    public static readonly cat_s: 111;
    public static readonly chimera: 29;
    public static readonly chimera_s: 112;
    public static readonly controller: 18;
    public static readonly controller_s: 113;
    public static readonly crow: 19;
    public static readonly destrphys_s: 93;
    public static readonly device_detector_advanced: 53;
    public static readonly device_detector_elite: 54;
    public static readonly device_detector_scientific: 57;
    public static readonly detector_scientific_s: -1;
    public static readonly device_detector_simple: 58;
    public static readonly device_flare: 55;
    public static readonly device_pda: 56;
    public static readonly device_torch: 59;
    public static readonly device_torch_s: 146;
    public static readonly dog_black: 20;
    public static readonly dog_red: 23;
    public static readonly dog_s: 116;
    public static readonly equ_exo: 60;
    public static readonly equ_military: 61;
    public static readonly equ_scientific: 62;
    public static readonly equ_stalker: 63;
    public static readonly equ_stalker_s: 65;
    public static readonly equ_helmet_s: 70;
    public static readonly flesh: 24;
    public static readonly flesh_group: 25;
    public static readonly flesh_s: 117;
    public static readonly fracture: 26;
    public static readonly fracture_s: 119;
    public static readonly game: 70;
    public static readonly game_cl_artefact_hunt: 45;
    public static readonly game_cl_capture_the_artefact: 46;
    public static readonly game_cl_deathmatch: 47;
    public static readonly game_cl_single: 48;
    public static readonly game_cl_team_deathmatch: 49;
    public static readonly game_sv_artefact_hunt: 129;
    public static readonly game_sv_capture_the_artefact: 130;
    public static readonly game_sv_deathmatch: 131;
    public static readonly game_sv_single: 132;
    public static readonly game_sv_team_deathmatch: 133;
    public static readonly game_ui_artefact_hunt: 147;
    public static readonly game_ui_capture_the_artefact: 148;
    public static readonly game_ui_deathmatch: 149;
    public static readonly game_ui_single: 150;
    public static readonly game_ui_team_deathmatch: 151;
    public static readonly gigant_s: 118;
    public static readonly graph_point: 28;
    public static readonly hanging_lamp: 94;
    public static readonly helicopter: 50;
    public static readonly helmet: 64;
    public static readonly hlamp_s: 125;
    public static readonly hud_manager: 74;
    public static readonly inventory_box: 95;
    public static readonly inventory_box_s: 140;
    public static readonly level: 69;
    public static readonly level_changer: 84;
    public static readonly level_changer_s: 85;
    public static readonly main_menu: 86;
    public static readonly mp_players_bag: 87;
    public static readonly nogravity_zone: 211;
    public static readonly obj_antirad: 75;
    public static readonly obj_antirad_s: 135;
    public static readonly obj_attachable: 76;
    public static readonly obj_bandage: 77;
    public static readonly obj_bandage_s: 136;
    public static readonly obj_bolt: 78;
    public static readonly obj_bottle: 79;
    public static readonly obj_bottle_s: 137;
    public static readonly obj_breakable: 91;
    public static readonly obj_climable: 92;
    public static readonly obj_document: 80;
    public static readonly obj_explosive: 81;
    public static readonly obj_explosive_s: 138;
    public static readonly obj_food: 82;
    public static readonly obj_food_s: 139;
    public static readonly obj_medkit: 83;
    public static readonly obj_medkit_s: 142;
    public static readonly obj_pda_s: 144;
    public static readonly obj_phskeleton: 100;
    public static readonly obj_phys_destroyable: 99;
    public static readonly obj_physic: 96;
    public static readonly online_offline_group: 88;
    public static readonly online_offline_group_s: 89;
    public static readonly phantom: 30;
    public static readonly poltergeist: 31;
    public static readonly poltergeist_s: 120;
    public static readonly projector: 98;
    public static readonly pseudo_gigant: 27;
    public static readonly pseudodog_s: 121;
    public static readonly psy_dog: 22;
    public static readonly psy_dog_phantom: 21;
    public static readonly psy_dog_phantom_s: 114;
    public static readonly psy_dog_s: 115;
    public static readonly rat: 32;
    public static readonly script_actor: 134;
    public static readonly script_heli: 51;
    public static readonly script_object: 103;
    public static readonly script_phys: 97;
    public static readonly script_restr: 127;
    public static readonly script_stalker: 35;
    public static readonly script_zone: 101;
    public static readonly smart_cover: 104;
    public static readonly smart_terrain: 105;
    public static readonly smart_zone: 106;
    public static readonly smartcover_s: 107;
    public static readonly snork: 33;
    public static readonly snork_s: 122;
    public static readonly space_restrictor: 126;
    public static readonly spectator: 128;
    public static readonly stalker: 34;
    public static readonly team_base_zone: 214;
    public static readonly torrid_zone: 215;
    public static readonly trader: 36;
    public static readonly tushkano: 37;
    public static readonly tushkano_s: 123;
    public static readonly wpn_ak74: 173;
    public static readonly wpn_ak74_s: 152;
    public static readonly wpn_ammo: 39;
    public static readonly wpn_ammo_m209: 42;
    public static readonly wpn_ammo_m209_s: 141;
    public static readonly wpn_ammo_og7b: 43;
    public static readonly wpn_ammo_og7b_s: 143;
    public static readonly wpn_ammo_s: 40;
    public static readonly wpn_ammo_vog25: 44;
    public static readonly wpn_ammo_vog25_s: 145;
    public static readonly wpn_auto_shotgun_s: 153;
    public static readonly wpn_binocular: 174;
    public static readonly wpn_binocular_s: 154;
    public static readonly wpn_bm16: 175;
    public static readonly wpn_bm16_s: 155;
    public static readonly wpn_fn2000: 176;
    public static readonly wpn_fort: 177;
    public static readonly wpn_grenade_f1: 66;
    public static readonly wpn_grenade_f1_s: 67;
    public static readonly wpn_grenade_fake: 68;
    public static readonly wpn_grenade_launcher: 178;
    public static readonly wpn_grenade_launcher_s: 156;
    public static readonly wpn_grenade_rgd5: 71;
    public static readonly wpn_grenade_rgd5_s: 72;
    public static readonly wpn_grenade_rpg7: 73;
    public static readonly wpn_groza: 179;
    public static readonly wpn_groza_s: 157;
    public static readonly wpn_hpsa: 180;
    public static readonly wpn_hpsa_s: 158;
    public static readonly wpn_knife: 181;
    public static readonly wpn_knife_s: 159;
    public static readonly wpn_lr300: 182;
    public static readonly wpn_lr300_s: 160;
    public static readonly wpn_pm: 183;
    public static readonly wpn_pm_s: 161;
    public static readonly wpn_rg6: 184;
    public static readonly wpn_rg6_s: 162;
    public static readonly wpn_rpg7: 185;
    public static readonly wpn_rpg7_s: 163;
    public static readonly wpn_scope: 186;
    public static readonly wpn_scope_s: 164;
    public static readonly wpn_shotgun: 187;
    public static readonly wpn_shotgun_s: 165;
    public static readonly wpn_silencer: 188;
    public static readonly wpn_silencer_s: 166;
    public static readonly wpn_stat_mgun: 189;
    public static readonly wpn_svd: 190;
    public static readonly wpn_svd_s: 167;
    public static readonly wpn_svu: 191;
    public static readonly wpn_svu_s: 168;
    public static readonly wpn_usp45: 192;
    public static readonly wpn_usp45_s: 169;
    public static readonly wpn_val: 193;
    public static readonly wpn_val_s: 170;
    public static readonly wpn_vintorez: 194;
    public static readonly wpn_vintorez_s: 171;
    public static readonly wpn_walther: 195;
    public static readonly wpn_walther_s: 172;
    public static readonly wpn_wmagaz: 196;
    public static readonly wpn_wmaggl: 197;
    public static readonly zombie: 38;
    public static readonly zombie_s: 124;
    public static readonly zone: 216;
    public static readonly zone_acid_fog: 204;
    public static readonly zone_bfuzz: 205;
    public static readonly zone_bfuzz_s: 198;
    public static readonly zone_campfire: 206;
    public static readonly zone_dead: 207;
    public static readonly zone_galant_s: 199;
    public static readonly zone_galantine: 208;
    public static readonly zone_mbald_s: 200;
    public static readonly zone_mincer: 210;
    public static readonly zone_mincer_s: 201;
    public static readonly zone_mosquito_bald: 209;
    public static readonly zone_radio_s: 202;
    public static readonly zone_radioactive: 212;
    public static readonly zone_rusty_hair: 213;
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
   * @source C++ class global
   * @customConstructor object_factory
   * @group xr_alife
   */
  export class object_factory {
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
