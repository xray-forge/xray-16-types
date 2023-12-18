declare module "xray16" {
  /**
   * @source C++ class cse_motion
   * @group xr_object_server
   */
  export interface IXR_cse_motion {}

  /**
   * @source C++ class ipure_schedulable_object
   * @group xr_object_server
   */
  export interface IXR_ipure_schedulable_object {}

  /**
   * @source C++ class cse_alife_group_abstract
   * @group xr_object_server
   */
  export interface IXR_cse_alife_group_abstract {}

  /**
   * @source C++ class cse_ph_skeleton
   * @group xr_object_server
   */
  export interface IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_visual
   * @group xr_object_server
   */
  export interface IXR_cse_visual {}

  /**
   * @source C++ class cse_shape
   * @group xr_object_server
   */
  export interface IXR_cse_shape {}

  /**
   * @source C++ class cse_alife_schedulable : ipure_schedulable_object
   * @group xr_object_server
   */
  export interface IXR_cse_alife_schedulable extends IXR_ipure_schedulable_object {}

  /**
   * @source C++ class ipure_alife_load_object
   * @group xr_object_server
   */
  export interface IXR_ipure_alife_load_object {}

  /**
   * @source C++ class ipure_alife_save_object
   * @group xr_object_server
   */
  export interface IXR_ipure_alife_save_object {}

  /**
   * @source C++ class ipure_alife_load_save_object : ipure_alife_load_object, ipure_alife_save_object
   * @group xr_object_server
   */
  export interface IXR_ipure_alife_load_save_object extends IXR_ipure_alife_load_object, IXR_ipure_alife_save_object {}

  /**
   * @source C++ class ipure_server_object : ipure_alife_load_save_object
   * @group xr_object_server
   */
  export interface IXR_ipure_server_object extends IXR_ipure_alife_load_save_object {}

  /**
   * @source C++ class cpure_server_object : ipure_server_object
   * @group xr_object_server
   */
  export interface IXR_cpure_server_object extends IXR_ipure_server_object {}

  /**
   * @source C++ class cse_alife_inventory_item
   * @group xr_object_server
   */
  export interface IXR_cse_alife_inventory_item {}

  /**
   * @source C++ class cse_alife_object_breakable : cse_alife_dynamic_object_visual
   * @group xr_object_server
   */
  export interface IXR_cse_alife_object_breakable extends cse_alife_dynamic_object_visual {}

  /**
   * @source C++ class CSE_AbstractVisual : cse_visual, cse_abstract
   * @customConstructor CSE_AbstractVisual
   * @group xr_object_server
   */
  export class CSE_AbstractVisual extends cse_abstract implements IXR_cse_visual {
    public getStartupAnimation(): string;
    public init(): cse_abstract;
  }

  /**
   * @source C++ class cse_alife_trader_abstract
   * @customConstructor cse_alife_trader_abstract
   * @group xr_object_server
   */
  export class cse_alife_trader_abstract extends cse_alife_dynamic_object_visual {
    public reputation(): i32;
    public rank(): i32;
    public set_rank(rank: i32): void;
    public community(): string;
    public profile_name(): string;
    public character_name(): string;
    public character_icon(): string;
    public set_profile_name(name: string): void;
    public set_character_name(name: string): void;
  }

  /**
   * Base abstract logic for any representation of objects on server side.
   *
   * @source C++ class cse_abstract : cpure_server_object
   * @customConstructor cse_abstract
   * @group xr_object_server
   */
  export class cse_abstract extends EngineBinding implements IXR_cpure_server_object {
    public readonly id: u16;
    public readonly parent_id: u16;
    public readonly script_version: u16;

    public position: vector;
    public angle: vector;

    public constructor(section: string);

    public name<T extends string = string>(): T;

    public clsid(): TXR_class_id;

    public spawn_ini(): ini_file | null;

    public section_name<T extends string = string>(): T;

    public UPDATE_Read(packet: net_packet): void;

    public STATE_Read(packet: net_packet, size: number): void;

    public UPDATE_Write(packet: net_packet): void;

    public STATE_Write(packet: net_packet): void;

    public FillProps(pref: string, items: LuaTable<number, unknown>): void;
  }

  /**
   * Base representation of any object on server side.
   *
   * @source C++ class cse_alife_object : cse_abstract
   * @customConstructor cse_alife_object
   * @group xr_object_server
   */
  export class cse_alife_object extends cse_abstract {
    public readonly m_game_vertex_id: u16;
    public readonly m_level_vertex_id: u32;
    /**
     * Always numeric value.
     * Returns maximal u32 (4294967295) value if object has no story id.
     */
    public readonly m_story_id: u32;
    /**
     * Whether server object has client representation and is in online mode.
     */
    public readonly online: boolean;

    public constructor(section: string);

    public used_ai_locations(): boolean;

    public use_ai_locations(value: boolean): void;

    public can_save(): boolean;

    public can_switch_online(): boolean;

    public can_switch_online(value: boolean): void;

    public init(): cse_abstract;

    public interactive(): boolean;

    public visible_for_map(): void;

    public visible_for_map(value: boolean): void;

    public can_switch_offline(): boolean;

    public can_switch_offline(value: boolean): void;

    public move_offline(): boolean;

    public move_offline(value?: boolean): void;

    public update(): void;
  }

  /**
   * @source C++ class cse_alife_dynamic_object : cse_alife_object
   * @customConstructor cse_alife_dynamic_object
   * @group xr_object_server
   */
  export class cse_alife_dynamic_object extends cse_alife_object {
    public switch_offline(): void;

    public switch_online(): void;

    public keep_saved_data_anyway(): boolean;

    public on_register(): void;

    public on_before_register(): void;

    public on_spawn(): void;

    public on_unregister(): void;
  }

  /**
   * @source C++ class cse_alife_space_restrictor : cse_alife_dynamic_object,cse_shape
   * @customConstructor cse_alife_space_restrictor
   * @group xr_object_server
   */
  export class cse_alife_space_restrictor extends cse_alife_dynamic_object implements IXR_cse_shape {}

  /**
   * @source C++ class cse_alife_dynamic_object_visual : cse_alife_dynamic_object,cse_visual
   * @customConstructor cse_alife_dynamic_object_visual
   * @group xr_object_server
   */
  export class cse_alife_dynamic_object_visual extends cse_alife_dynamic_object implements IXR_cse_visual {
    public set_yaw(yaw: number): void;
  }

  /**
   * @source C++ class cse_custom_zone : cse_alife_dynamic_object,cse_shape
   * @customConstructor cse_custom_zone
   * @group xr_object_server
   */
  export class cse_custom_zone extends cse_alife_dynamic_object implements IXR_cse_shape {}

  /**
   * Base representation of any alive creature on server side.
   *
   * @source C++ class cse_alife_creature_abstract : cse_alife_dynamic_object_visual
   * @customConstructor cse_alife_creature_abstract
   * @group xr_object_server
   */
  export class cse_alife_creature_abstract extends cse_alife_dynamic_object_visual {
    /**
     * Squad identifier that links squad and parent smart terrain.
     */
    public squad: u8;

    /**
     * Team (community) of the object.
     * Defined in game_relations.ltx -> [game_relations] -> [communities].
     *
     * Example: 8 is monster, 9 is stalker, 0 is actor, 4 is freedom
     */
    public team: u8;

    public group: u8;

    /**
     * Object squad id, maximal u16 (65535) if no squad assigned.
     */
    public group_id: u16;
    public m_smart_terrain_id: u16;

    public health(): f32;

    public alive(): boolean;

    public g_team(): u8;

    public g_group(): u8;

    public g_squad(): u8;

    public o_torso(): rotation;

    public on_death(killer: cse_alife_object): void;

    public smart_terrain_id(): u16;

    public kill(): void;

    public force_set_goodwill(goodwill: number, npc_id: number): void;

    public clear_smart_terrain(): void;

    public travel_speed(): unknown;

    public travel_speed(value: number): void;

    public smart_terrain_task_deactivate(): unknown;

    /**
     * Works for `CSE_ALifeMonsterAbstract`, marks smart terrain as reached and switches logic to terrain task.
     */
    public smart_terrain_task_activate(): void;

    public current_level_travel_speed(): unknown;

    public current_level_travel_speed(value: number): unknown;

    public brain(): CAILifeMonsterBrain;

    public has_detector(): boolean;

    public rank(): i32;

    /**
     * @returns object community like `monolith`, `stalker` or `zombied`
     */
    public community<T extends string = string>(): T;
  }

  /**
   * Base representation of any human stalker on server side.
   *
   * @source C++ class cse_alife_human_abstract : cse_alife_trader_abstract,cse_alife_monster_abstract
   * @customConstructor XR_cse_alife_human_abstract
   * @group xr_object_server
   */
  export class cse_alife_human_abstract extends cse_alife_monster_abstract {
    public profile_name(): string;

    public set_rank(rank: i32): void;

    public reputation(): i32;
  }

  /**
   * Base representation of any item on server side.
   *
   * @source C++ class cse_alife_item : cse_alife_dynamic_object_visual,cse_alife_inventory_item
   * @customConstructor cse_alife_item
   * @group xr_object_server
   */
  export class cse_alife_item extends cse_alife_dynamic_object_visual implements IXR_cse_alife_inventory_item {
    public bfUseful(): boolean;
  }

  /**
   * Base representation of any weapon item on server side.
   *
   * @source C++ class cse_alife_item_weapon : cse_alife_item
   * @customConstructor cse_alife_item_weapon
   * @group xr_object_server
   */
  export class cse_alife_item_weapon extends cse_alife_item {
    public clone_addons(cse_alife_item_weapon: cse_alife_item_weapon): void;
  }

  /**
   * @source C++ class cse_zone_visual : cse_anomalous_zone,cse_visual
   * @customConstructor cse_zone_visual
   * @group xr_object_server
   */
  export class cse_zone_visual extends cse_anomalous_zone implements IXR_cse_visual {}

  /**
   * @source C++ class cse_spectator : cse_abstract
   * @customConstructor cse_spectator
   * @group xr_object_server
   */
  export class cse_spectator extends cse_abstract {
    public init(): void;
  }

  /**
   * @source C++ class cse_temporary : cse_abstract
   * @customConstructor cse_temporary
   * @group xr_object_server
   */
  export class cse_temporary extends cse_abstract {
    public init(): void;
  }

  /**
   * @source C++ class cse_alife_item_weapon_magazined : cse_alife_item_weapon
   * @customConstructor cse_alife_item_weapon_magazined
   * @group xr_object_server
   */
  export class cse_alife_item_weapon_magazined extends cse_alife_item_weapon {}

  /**
   * Base class for magazined weapons with grenade launcher.
   *
   * @source C++ class cse_alife_item_weapon_magazined_w_gl : cse_alife_item_weapon_magazined
   * @customConstructor cse_alife_item_weapon_magazined_w_gl
   * @group xr_object_server
   */
  export class cse_alife_item_weapon_magazined_w_gl extends cse_alife_item_weapon {}

  /**
   * @source C++ class cse_alife_item_weapon_shotgun : cse_alife_item_weapon
   * @customConstructor cse_alife_item_weapon_shotgun
   * @group xr_object_server
   */
  export class cse_alife_item_weapon_shotgun extends cse_alife_item_weapon {}

  /**
   * @source C++ class cse_alife_level_changer : cse_alife_space_restrictor
   * @customConstructor cse_alife_level_changer
   * @group xr_object_server
   */
  export class cse_alife_level_changer extends cse_alife_space_restrictor {
    public get_dest_level_name(): string;
  }

  /**
   * @source C++ class cse_alife_monster_abstract : cse_alife_creature_abstract,cse_alife_schedulable
   * @customConstructor cse_alife_monster_abstract
   * @group xr_object_server
   */
  export class cse_alife_monster_abstract extends cse_alife_creature_abstract implements IXR_cse_alife_schedulable {}

  /**
   * @source C++ class cse_alife_monster_base : cse_alife_monster_abstract,cse_ph_skeleton
   * @customConstructor cse_alife_monster_base
   * @group xr_object_server
   */
  export class cse_alife_monster_base extends cse_alife_monster_abstract implements IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_alife_monster_rat : cse_alife_monster_abstract,cse_alife_inventory_item
   * @customConstructor cse_alife_monster_rat
   * @group xr_object_server
   */
  export class cse_alife_monster_rat extends cse_alife_monster_abstract implements IXR_cse_alife_inventory_item {}

  /**
   * @source C++ class cse_alife_monster_zombie : cse_alife_monster_abstract
   * @customConstructor cse_alife_monster_zombie
   * @group xr_object_server
   */
  export class cse_alife_monster_zombie extends cse_alife_monster_abstract {}

  /**
   * @source C++ class cse_alife_mounted_weapon : cse_alife_dynamic_object_visual
   * @customConstructor cse_alife_mounted_weapon
   * @group xr_object_server
   */
  export class cse_alife_mounted_weapon extends cse_alife_dynamic_object_visual {}

  /**
   * @source C++ class cse_alife_inventory_box : cse_alife_dynamic_object_visual
   * @customConstructor cse_alife_inventory_box
   * @group xr_object_server
   */
  export class cse_alife_inventory_box extends cse_alife_dynamic_object_visual {}

  /**
   * @source C++ class cse_alife_item_ammo : cse_alife_item
   * @customConstructor cse_alife_item_ammo
   * @group xr_object_server
   */
  export class cse_alife_item_ammo extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_artefact : cse_alife_item
   * @customConstructor cse_alife_item_artefact
   * @group xr_object_server
   */
  export class cse_alife_item_artefact extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_bolt : cse_alife_item
   * @customConstructor cse_alife_item_bolt
   * @group xr_object_server
   */
  export class cse_alife_item_bolt extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_custom_outfit : cse_alife_item
   * @customConstructor cse_alife_item_custom_outfit
   * @group xr_object_server
   */
  export class cse_alife_item_custom_outfit extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_helmet : cse_alife_item
   * @customConstructor cse_alife_item_helmet
   * @group xr_object_server
   */
  export class cse_alife_item_helmet extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_document : cse_alife_item
   * @customConstructor cse_alife_item_document
   * @group xr_object_server
   */
  export class cse_alife_item_document extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_explosive : cse_alife_item
   * @customConstructor cse_alife_item_explosive
   * @group xr_object_server
   */
  export class cse_alife_item_explosive extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_grenade : cse_alife_item
   * @customConstructor cse_alife_item_grenade
   * @group xr_object_server
   */
  export class cse_alife_item_grenade extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_pda : cse_alife_item
   * @customConstructor cse_alife_item_pda
   * @group xr_object_server
   */
  export class cse_alife_item_pda extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_detector : cse_alife_item
   * @customConstructor cse_alife_item_detector
   * @group xr_object_server
   */
  export class cse_alife_item_detector extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_torch : cse_alife_item
   * @customConstructor cse_alife_item_torch
   * @group xr_object_server
   */
  export class cse_alife_item_torch extends cse_alife_item {}

  /**
   * @source C++ class cse_alife_item_weapon_auto_shotgun : cse_alife_item_weapon
   * @customConstructor cse_alife_item_weapon_auto_shotgun
   * @group xr_object_server
   */
  export class cse_alife_item_weapon_auto_shotgun extends cse_alife_item_weapon {}

  /**
   * @source C++ class cse_anomalous_zone : cse_custom_zone
   * @customConstructor cse_anomalous_zone
   * @group xr_object_server
   */
  export class cse_anomalous_zone extends cse_custom_zone {}

  /**
   * @source C++ class cse_alife_object_climable : cse_shape,cse_abstract
   * @customConstructor cse_alife_object_climable
   * @group xr_object_server
   */
  export class cse_alife_object_climable extends cse_abstract implements IXR_cse_shape {
    public init(): void;
  }

  /**
   * @source C++ class cse_alife_object_hanging_lamp : cse_alife_dynamic_object_visual,cse_ph_skeleton
   * @customConstructor cse_alife_object_hanging_lamp
   * @group xr_object_server
   */
  export class cse_alife_object_hanging_lamp extends cse_alife_dynamic_object_visual implements IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_alife_object_physic : cse_alife_dynamic_object_visual,cse_ph_skeleton
   * @customConstructor cse_alife_object_physic
   * @group xr_object_server
   */
  export class cse_alife_object_physic extends cse_alife_dynamic_object_visual implements IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_alife_object_projector : cse_alife_dynamic_object_visual
   * @customConstructor cse_alife_object_projector
   * @group xr_object_server
   */
  export class cse_alife_object_projector extends cse_alife_dynamic_object_visual {}

  /**
   * Squad member representation.
   *
   * @group xr_object_server
   */
  export interface IXR_squad_member<T extends cse_alife_creature_abstract> {
    id: u16;
    object: T;
  }

  /**
   * @source C++ class cse_alife_online_offline_group : cse_alife_dynamic_object,cse_alife_schedulable
   * @customConstructor cse_alife_online_offline_group
   * @group xr_object_server
   */
  export class cse_alife_online_offline_group<T extends cse_alife_creature_abstract = cse_alife_creature_abstract>
    extends cse_alife_dynamic_object
    implements IXR_cse_alife_schedulable {
    public readonly object: T;

    public register_member(id: u16): void;

    public clear_location_types(): void;

    public get_current_task(): CALifeSmartTerrainTask;

    /**
     * Get current squad command ID.
     */
    public commander_id(): u16;

    public unregister_member(id: u16): void;

    public squad_members(): LuaIterable<IXR_squad_member<T>>; // struct std::less<unsigned short> 3rd param

    public force_change_position(vector: vector): void;

    public add_location_type(location: string): void;

    public npc_count(): i32;
  }

  /**
   * @source C++ class cse_alife_ph_skeleton_object : cse_alife_dynamic_object_visual,cse_ph_skeleton
   * @customConstructor cse_alife_ph_skeleton_object
   * @group xr_object_server
   */
  export class cse_alife_ph_skeleton_object extends cse_alife_dynamic_object_visual implements IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_alife_psydog_phantom : cse_alife_monster_base
   * @customConstructor cse_alife_psydog_phantom
   * @group xr_object_server
   */
  export class cse_alife_psydog_phantom extends cse_alife_monster_abstract {}

  /**
   * @source C++ class cse_alife_smart_zone : cse_alife_space_restrictor,cse_alife_schedulable
   * @customConstructor cse_alife_smart_zone
   * @group xr_object_server
   */
  export class cse_alife_smart_zone extends cse_alife_space_restrictor implements IXR_cse_alife_schedulable {
    public detect_probability(): void;

    public smart_touch(cse_alife_monster_abstract: cse_alife_creature_abstract): void;

    public unregister_npc(cse_alife_monster_abstract: cse_alife_creature_abstract): void;

    public register_npc(cse_alife_monster_abstract: cse_alife_creature_abstract): void;

    public suitable(cse_alife_monster_abstract: cse_alife_creature_abstract): void;

    public task(cse_alife_monster_abstract: cse_alife_creature_abstract): CALifeSmartTerrainTask | null;

    public enabled(cse_alife_monster_abstract: cse_alife_creature_abstract): void;
  }

  /**
   * @source C++ class cse_alife_team_base_zone : cse_alife_space_restrictor
   * @customConstructor cse_alife_team_base_zone
   * @group xr_object_server
   */
  export class cse_alife_team_base_zone extends cse_alife_space_restrictor {}

  /**
   * @source C++ class cse_torrid_zone : cse_custom_zone,cse_motion
   * @customConstructor cse_torrid_zone
   * @group xr_object_server
   */
  export class cse_torrid_zone extends cse_custom_zone implements cse_abstract {}

  /**
   * @source C++ class cse_alife_trader : cse_alife_dynamic_object_visual,cse_alife_trader_abstract
   * @customConstructor cse_alife_trader
   * @group xr_object_server
   */
  export class cse_alife_trader extends cse_alife_dynamic_object_visual implements cse_alife_trader_abstract {
    public reputation(): i32;

    public rank(): i32;

    public set_rank(rank: i32): void;

    public community(): string;

    public profile_name(): string;

    public character_name(): string;

    public character_icon(): string;

    public set_profile_name(name: string): void;

    public set_character_name(name: string): void;
  }

  /**
   * @source C++ class cse_smart_cover : cse_alife_dynamic_object
   * @customConstructor cse_smart_cover
   * @group xr_object_server
   */
  export class cse_smart_cover extends cse_alife_dynamic_object {
    public description<T extends string = string>(): T | null;

    public set_available_loopholes(object: unknown): void;

    public set_loopholes_table_checker(value: boolean): void;
  }

  /**
   * @source C++ class cse_alife_car : cse_alife_dynamic_object_visual,cse_ph_skeleton
   * @customConstructor cse_alife_car
   * @group xr_object_server
   */
  export class cse_alife_car extends cse_alife_dynamic_object_visual implements IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_alife_creature_actor : cse_alife_creature_abstract,cse_alife_trader_abstract,cse_ph_skeleton
   * @customConstructor cse_alife_creature_actor
   * @group xr_object_server
   */
  export class cse_alife_creature_actor
    extends cse_alife_creature_abstract
    implements IXR_cse_ph_skeleton, cse_alife_trader_abstract {
    public reputation(): i32;

    public rank(): i32;

    public set_rank(rank: i32): void;

    public profile_name(): string;

    public character_name(): string;

    public character_icon(): string;

    public set_profile_name(name: string): void;

    public set_character_name(name: string): void;
  }

  /**
   * @source C++ class cse_alife_creature_crow : cse_alife_creature_abstract
   * @customConstructor cse_alife_creature_crow
   * @group xr_object_server
   */
  export class cse_alife_creature_crow extends cse_alife_creature_abstract {}

  /**
   * @source C++ class cse_alife_creature_phantom : cse_alife_creature_abstract
   * @customConstructor cse_alife_creature_phantom
   * @group xr_object_server
   */
  export class cse_alife_creature_phantom extends cse_alife_creature_abstract {}

  /**
   * @source C++ class cse_alife_graph_point : cse_abstract
   * @customConstructor cse_alife_graph_point
   * @group xr_object_server
   */
  export class cse_alife_graph_point extends cse_abstract {
    public init(): void;
  }

  /**
   * @source C++ class cse_alife_helicopter : cse_alife_dynamic_object_visual,cse_motion,cse_ph_skeleton
   * @customConstructor cse_alife_helicopter
   * @group xr_object_server
   */
  export class cse_alife_helicopter
    extends cse_alife_dynamic_object_visual
    implements IXR_cse_motion, IXR_cse_ph_skeleton {}

  /**
   * @source C++ class cse_alife_human_stalker : cse_alife_human_abstract,cse_ph_skeleton
   * @customConstructor cse_alife_human_stalker
   * @group xr_object_server
   */
  export class cse_alife_human_stalker extends cse_alife_human_abstract implements IXR_cse_ph_skeleton {}
}
