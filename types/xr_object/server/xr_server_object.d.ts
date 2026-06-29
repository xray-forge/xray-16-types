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
   * Server-side inventory item mixin.
   *
   * @source C++ class cse_alife_inventory_item
   * @group xr_object_server
   */
  export interface IXR_cse_alife_inventory_item {
    /**
     * Check whether the item already has an upgrade section.
     *
     * @param section - Upgrade section id.
     * @returns Whether the upgrade is installed.
     */
    has_upgrade(section: string): boolean;

    /**
     * Add an upgrade section to the item.
     *
     * @remarks Adding the same upgrade twice is a fatal engine error.
     *
     * @param section - Upgrade section id.
     */
    add_upgrade(section: string): void;
  }

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
    /**
     * Get the startup animation configured for the visual object.
     *
     * @returns Startup animation name.
     */
    public getStartupAnimation(): string;

    /**
     * Initialize the server object and return its base abstract entity.
     *
     * @returns Initialized abstract entity.
     */
    public init(): cse_abstract;
  }

  /**
   * @source C++ class cse_alife_trader_abstract
   * @customConstructor cse_alife_trader_abstract
   * @group xr_object_server
   */
  export class cse_alife_trader_abstract extends cse_alife_dynamic_object_visual {
    /**
     * @returns Trader reputation value.
     */
    public reputation(): i32;

    /**
     * @returns Trader rank.
     */
    public rank(): i32;

    /**
     * Set trader rank.
     *
     * @param rank - New rank value.
     */
    public set_rank(rank: i32): void;

    /**
     * @returns Trader community name.
     */
    public community(): string;

    /**
     * @returns Character profile section name.
     */
    public profile_name(): string;

    /**
     * @returns Localized character name.
     */
    public character_name(): string;

    /**
     * Resolve and return the character icon name.
     *
     * @returns Icon name.
     */
    public character_icon(): string;

    /**
     * Set character profile section name.
     *
     * @param name - Profile section name.
     */
    public set_profile_name(name: string): void;

    /**
     * Set localized character name.
     *
     * @param name - Character name.
     */
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

    /**
     * Create a server object for an object section.
     *
     * @param section - Spawn section name.
     */
    public constructor(section: string);

    /**
     * @returns Runtime object name.
     */
    public name<T extends string = string>(): T;

    /**
     * @returns Engine class id.
     */
    public clsid(): TXR_class_id;

    /**
     * @returns Spawn ini attached to this object, if any.
     */
    public spawn_ini(): ini_file | null;

    /**
     * @returns Spawn section name.
     */
    public section_name<T extends string = string>(): T;

    /**
     * Read an update packet into this object.
     *
     * @param packet - Source network packet.
     */
    public UPDATE_Read(packet: net_packet): void;

    /**
     * Read a state packet into this object.
     *
     * @param packet - Source network packet.
     * @param size - Serialized state size.
     */
    public STATE_Read(packet: net_packet, size: number): void;

    /**
     * Write an update packet from this object.
     *
     * @param packet - Target network packet.
     */
    public UPDATE_Write(packet: net_packet): void;

    /**
     * Write a state packet from this object.
     *
     * @param packet - Target network packet.
     */
    public STATE_Write(packet: net_packet): void;

    /**
     * Fill editor property rows for this object.
     *
     * @param pref - Property prefix.
     * @param items - Property collection to populate.
     */
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

    /**
     * Create an ALife object for a spawn section.
     *
     * @param section - Spawn section name.
     */
    public constructor(section: string);

    /**
     * @returns Whether the object uses AI location graph data.
     */
    public used_ai_locations(): boolean;

    /**
     * Enable or disable AI location graph use.
     *
     * @param value - Whether AI locations should be used.
     */
    public use_ai_locations(value: boolean): void;

    /**
     * @returns Whether this object should be saved.
     */
    public can_save(): boolean;

    /**
     * @returns Whether this object may switch online.
     */
    public can_switch_online(): boolean;

    /**
     * Allow or block switching online.
     *
     * @param value - Whether online switching is allowed.
     */
    public can_switch_online(value: boolean): void;

    /**
     * Initialize the ALife object and return its abstract base.
     *
     * @returns Initialized abstract entity.
     */
    public init(): cse_abstract;

    /**
     * @returns Whether the object is interactive.
     */
    public interactive(): boolean;

    /**
     * @returns Whether the object is visible on the map.
     */
    public visible_for_map(): boolean;

    /**
     * Set whether the object is visible on the map.
     *
     * @param value - Whether the object should be shown on the map.
     */
    public visible_for_map(value: boolean): void;

    /**
     * @returns Whether this object may switch offline.
     */
    public can_switch_offline(): boolean;

    /**
     * Allow or block switching offline.
     *
     * @param value - Whether offline switching is allowed.
     */
    public can_switch_offline(value: boolean): void;

    /**
     * @returns Whether the object should move while offline.
     */
    public move_offline(): boolean;

    /**
     * Set whether the object should move while offline.
     *
     * @param value - Whether offline movement is enabled.
     */
    public move_offline(value?: boolean): void;

    /**
     * Run the server-side ALife update for this object.
     */
    public update(): void;
  }

  /**
   * @source C++ class cse_alife_dynamic_object : cse_alife_object
   * @customConstructor cse_alife_dynamic_object
   * @group xr_object_server
   */
  export class cse_alife_dynamic_object extends cse_alife_object {
    /**
     * Move the object to offline ALife simulation.
     */
    public switch_offline(): void;

    /**
     * Bring the object online and create its client-side representation.
     */
    public switch_online(): void;

    /**
     * @returns Whether saved data should be kept even when regular cleanup would remove it.
     */
    public keep_saved_data_anyway(): boolean;

    /**
     * Called after the object is registered in the ALife registry.
     */
    public on_register(): void;

    /**
     * Called before the object is registered in the ALife registry.
     */
    public on_before_register(): void;

    /**
     * Called when the object has been spawned.
     */
    public on_spawn(): void;

    /**
     * Called when the object is removed from the ALife registry.
     */
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
    /**
     * Set object yaw.
     *
     * @param yaw - Yaw angle.
     */
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
     * Example: 8 is monster, 9 is stalker, 0 is actor, 4 is freedom.
     */
    public team: u8;

    public group: u8;

    /**
     * Object squad id, maximal u16 (65535) if no squad assigned.
     */
    public group_id: u16;
    public m_smart_terrain_id: u16;

    /**
     * @returns Current creature health.
     */
    public health(): f32;

    /**
     * @returns Whether the creature is alive.
     */
    public alive(): boolean;

    /**
     * @returns Game team id.
     */
    public g_team(): u8;

    /**
     * @returns Game group id.
     */
    public g_group(): u8;

    /**
     * @returns Game squad id.
     */
    public g_squad(): u8;

    /**
     * @returns Torso rotation state.
     */
    public o_torso(): rotation;

    /**
     * Notify the server object that this creature died.
     *
     * @param killer - Server object that killed this creature.
     */
    public on_death(killer: cse_alife_object): void;

    /**
     * @returns Assigned smart terrain id, or `65535` when none is assigned.
     */
    public smart_terrain_id(): u16;

    /**
     * Kill the server-side creature.
     */
    public kill(): void;

    /**
     * Set goodwill from this creature toward another object.
     *
     * @param goodwill - New goodwill value.
     * @param npc_id - Target object id.
     */
    public force_set_goodwill(goodwill: number, npc_id: number): void;

    /**
     * Clear the assigned smart terrain.
     */
    public clear_smart_terrain(): void;

    /**
     * @returns Travel speed used for graph movement.
     */
    public travel_speed(): f32;

    /**
     * Set travel speed used for graph movement.
     *
     * @param value - New travel speed.
     */
    public travel_speed(value: number): void;

    /**
     * Mark the current smart terrain task as not reached.
     */
    public smart_terrain_task_deactivate(): void;

    /**
     * Works for `CSE_ALifeMonsterAbstract`, marks smart terrain as reached and switches logic to terrain task.
     */
    public smart_terrain_task_activate(): void;

    /**
     * @returns Travel speed used inside the current level.
     */
    public current_level_travel_speed(): f32;

    /**
     * Set travel speed used inside the current level.
     *
     * @param value - New travel speed.
     */
    public current_level_travel_speed(value: number): void;

    /**
     * @returns ALife brain that drives offline monster behavior.
     */
    public brain(): CAILifeMonsterBrain;

    /**
     * @returns Whether the creature has a detector.
     */
    public has_detector(): boolean;

    /**
     * @returns Creature rank.
     */
    public rank(): i32;

    /**
     * @returns Object community like `monolith`, `stalker` or `zombied`.
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
    /**
     * @returns Character profile section name.
     */
    public profile_name(): string;

    /**
     * Set human rank.
     *
     * @param rank - New rank value.
     */
    public set_rank(rank: i32): void;

    /**
     * @returns Human reputation value.
     */
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
    /**
     * @returns Whether the ALife item is useful to AI.
     */
    public bfUseful(): boolean;

    /**
     * Check whether the item already has an upgrade section.
     *
     * @param section - Upgrade section id.
     * @returns Whether the upgrade is installed.
     */
    public has_upgrade(section: string): boolean;

    /**
     * Add an upgrade section to the item.
     *
     * @remarks Adding the same upgrade twice is a fatal engine error.
     *
     * @param section - Upgrade section id.
     */
    public add_upgrade(section: string): void;
  }

  /**
   * Base representation of any weapon item on server side.
   *
   * @source C++ class cse_alife_item_weapon : cse_alife_item
   * @customConstructor cse_alife_item_weapon
   * @group xr_object_server
   */
  export class cse_alife_item_weapon extends cse_alife_item {
    /**
     * Copy addon flags from another weapon server object.
     *
     * @param weapon - Weapon to copy addon state from.
     */
    public clone_addons(weapon: cse_alife_item_weapon): void;

    /**
     * Set ammo currently loaded in the weapon.
     *
     * @param count - Loaded ammo count.
     */
    public set_ammo_elapsed(count: u16): void;

    /**
     * @returns Ammo currently loaded in the weapon.
     */
    public get_ammo_elapsed(): u16;

    /**
     * @returns Weapon magazine size from the weapon section.
     */
    public get_ammo_magsize(): u16;
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
    /**
     * @returns Destination level name configured for the level changer.
     */
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
  export class cse_alife_monster_rat extends cse_alife_monster_abstract {}

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
    implements IXR_cse_alife_schedulable
  {
    public readonly object: T;

    /**
     * Add an object to this online/offline group.
     *
     * @param id - Server object id.
     */
    public register_member(id: u16): void;

    /**
     * Remove all location type filters from the group.
     */
    public clear_location_types(): void;

    /**
     * @returns Current smart terrain task, when one is assigned.
     */
    public get_current_task(): CALifeSmartTerrainTask;

    /**
     * Get current squad command ID.
     */
    public commander_id(): u16;

    /**
     * Remove an object from this online/offline group.
     *
     * @param id - Server object id.
     */
    public unregister_member(id: u16): void;

    /**
     * Iterate over group members.
     *
     * @returns Lua iterator of squad member records.
     */
    public squad_members(): LuaIterable<IXR_squad_member<T>>; // Struct std::less<unsigned short> 3rd param

    /**
     * Force the group's graph position from a world position.
     *
     * @param vector - Target world position.
     */
    public force_change_position(vector: vector): void;

    /**
     * Add a location type accepted by the group.
     *
     * @param location - Location type name.
     */
    public add_location_type(location: string): void;

    /**
     * @returns Number of NPCs in the group.
     */
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
    /**
     * @returns Probability used by the zone for detecting objects.
     */
    public detect_probability(): f32;

    /**
     * Notify the smart zone that a monster touched it.
     *
     * @param monster - Monster server object.
     */
    public smart_touch(monster: cse_alife_monster_abstract): void;

    /**
     * Remove a monster from the smart zone.
     *
     * @param monster - Monster server object.
     */
    public unregister_npc(monster: cse_alife_monster_abstract): void;

    /**
     * Register a monster in the smart zone.
     *
     * @param monster - Monster server object.
     */
    public register_npc(monster: cse_alife_monster_abstract): void;

    /**
     * Rate how suitable this smart zone is for a monster.
     *
     * @param monster - Monster server object.
     * @returns Suitability score.
     */
    public suitable(monster: cse_alife_monster_abstract): f32;

    /**
     * Get the smart terrain task assigned to a monster.
     *
     * @param monster - Monster server object.
     * @returns Smart terrain task, or `null` when none is assigned.
     */
    public task(monster: cse_alife_monster_abstract): CALifeSmartTerrainTask | null;

    /**
     * Check whether this smart zone is enabled for a monster.
     *
     * @param monster - Monster server object.
     * @returns Whether the zone can be used.
     */
    public enabled(monster: cse_alife_monster_abstract): boolean;
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
    implements IXR_cse_ph_skeleton, cse_alife_trader_abstract
  {
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
