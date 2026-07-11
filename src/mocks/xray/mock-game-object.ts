import { jest } from "@jest/globals";
import type { CHelicopter, game_object, ini_file, TXR_callback, TXR_class_id, TXR_SightType, vector } from "xray16";

import { MockActionPlanner } from "./mock-action-planner";
import { MockAnim } from "./mock-anim";
import { mockClsid } from "./mock-clsid";
import { mockConfig } from "./mock-config";
import { ACTOR_ID } from "./mock-constants";
import { MockCHelicopter } from "./mock-helicopter";
import { MockIniFile } from "./mock-ini-file";
import { MockMove } from "./mock-move";
import { mockRelationRegistryInterface } from "./mock-relation-registry-interface";
import { MockSightParameters } from "./mock-sight-parameters";
import { MockVector } from "./mock-vector";

export interface IMockGameObjectConfig {
  alive?: boolean;
  bleeding?: number;
  characterRank?: number;
  clsid?: number;
  community?: string;
  health?: number;
  id?: number;
  inRestrictions?: string;
  infoPortions?: Array<string>;
  inventory?: Array<[string | number, game_object]>;
  money?: number;
  morale?: number;
  name?: string;
  position?: vector;
  levelVertexId?: number;
  gameVertexId?: number;
  outRestrictions?: string;
  power?: number;
  psyHealth?: number;
  radiation?: number;
  rank?: number;
  satiety?: number;
  section?: string;
  spawnIni?: ini_file | null;
  upgrades?: Array<string>;
}

/**
 * Abstract game object mock.
 */
export class MockGameObject implements game_object {
  public static readonly dummy: number = -1;
  public static readonly game_path: number = 0;
  public static readonly level_path: number = 1;
  public static readonly patrol_path: number = 2;
  public static readonly no_path: number = 3;
  public static readonly friend: number = 0;
  public static readonly neutral: number = 1;
  public static readonly enemy: number = 2;
  public static readonly alifeMovementTypeMask: number = 0;
  public static readonly alifeMovementTypeRandom: number = 1;
  public static readonly dialog_pda_msg: number = 0;
  public static readonly info_pda_msg: number = 1;
  public static readonly no_pda_msg: number = 2;
  public static readonly relation_kill: number = 0;
  public static readonly relation_attack: number = 1;
  public static readonly relation_fight_help_human: number = 2;
  public static readonly relation_fight_help_monster: number = 4;
  public static readonly movement: number = 0;
  public static readonly watch: number = 1;
  public static readonly animation: number = 2;
  public static readonly sound: number = 3;
  public static readonly particle: number = 4;
  public static readonly object: number = 5;
  public static readonly action_type_count: number = 6;

  public static REGISTRY: Map<number, game_object> = new Map();

  public static mock(config: IMockGameObjectConfig = {}): game_object {
    return new MockGameObject(config).asGameObject();
  }

  public static create(config: IMockGameObjectConfig = {}): MockGameObject {
    return new MockGameObject(config);
  }

  public static mockHelicopter(config: IMockGameObjectConfig = {}): game_object {
    const object: MockGameObject = new MockGameObject(config);
    const helicopter: CHelicopter = MockCHelicopter.mock();

    jest.spyOn(object, "clsid").mockImplementation(() => mockClsid.helicopter as TXR_class_id);
    jest.spyOn(object, "get_helicopter").mockImplementation(() => helicopter);

    return object.asGameObject();
  }

  public static mockStalker(base: IMockGameObjectConfig = {}): game_object {
    const object: MockGameObject = new MockGameObject({
      ...base,
      clsid: base.clsid ?? mockClsid.script_stalker,
      community: base.community ?? "stalker",
    });

    return object.asGameObject();
  }
  public static mockWithClassId(clsid: number): game_object {
    return new MockGameObject({ clsid }).asGameObject();
  }

  public static mockWithSection(section: string): game_object {
    return new MockGameObject({ section }).asGameObject();
  }

  public static mockActor(config: IMockGameObjectConfig = {}): game_object {
    return this.createActor(config).asGameObject();
  }

  public static createActor(config: IMockGameObjectConfig = {}): MockGameObject {
    const object: MockGameObject = new MockGameObject({ ...config, id: ACTOR_ID });

    object.objectVisual = "some_actor_visual";

    return object;
  }

  public static callCallback(object: game_object, id: TXR_callback, ...args: Array<any>): void {
    (object as unknown as MockGameObject).callCallback(id, ...args);
  }

  public static asMock(object: game_object): MockGameObject {
    return object as unknown as MockGameObject;
  }

  public static clamp(value: number, min: number, max: number): number {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }

  public isInvulnerable: boolean = false;

  public callbacks: Partial<Record<TXR_callback, (this: void, ...args: Array<any>) => any>> = {};
  public sight: TXR_SightType = MockSightParameters.eSightTypeDummy;

  public objectActionManager: MockActionPlanner = MockActionPlanner.mockDefault(this) as unknown as MockActionPlanner;
  public objectAlive: boolean;
  public objectBleeding: number;
  public objectCenter: vector = MockVector.mock(0.15, 0.15, 0.15);
  public objectCharacterRank: number | null;
  public objectClsid: TXR_class_id;
  public objectCommunity: string;
  public objectDirection: vector = MockVector.mock(1, 1, 1);
  public objectGameVertexId: number;
  public objectHealth: number;
  public objectId: number;
  public objectInRestrictions: Array<string>;
  public objectInfoPortions: Array<string>;
  public objectInventory: Map<string | number, game_object>;
  public objectLevelVertexId: number;
  public objectMoney: number;
  public objectMorale: number;
  public objectName: string;
  public objectOutRestrictions: Array<string>;
  public objectPosition: vector;
  public objectPower: number;
  public objectPsyHealth: number;
  public objectRadiation: number;
  public objectRank: number;
  public objectSatiety: number;
  public objectSection: string;
  public objectSpawnIni: ini_file | null;
  public objectUpgradesSet: Set<string>;
  public objectVisual: string = "object_visual_name";
  public objectAmmoCount: number = 0;
  public objectAmmoElapsed: number = 0;
  public objectAmmoType: number = 0;
  public objectMaxUses: number = 1;
  public objectRemainingUses: number = 1;
  public objectRestrictorType: number = 0;
  public objectSpatialType: number = 0;
  public objectTaskStates: Map<string, number> = new Map();
  public objectWeight: number = 0;
  public disabledInventoryUpgrades: Set<string> = new Set();
  public isDeadBodyCanTake: boolean = true;
  public isDeadBodyClosed: boolean = false;
  public isDoorLockedForNpc: boolean = false;
  public isInventoryBoxCanTake: boolean = true;
  public isInventoryBoxClosed: boolean = false;
  public isMarkedDropped: boolean = false;
  public isVisible: boolean = true;
  public isVisualMemoryEnabled: boolean = true;

  public story_id = jest.fn() as unknown as jest.MockedFunction<game_object["story_id"]>;

  public action_count = jest.fn() as unknown as jest.MockedFunction<game_object["action_count"]>;

  public active_zone_contact = jest.fn() as unknown as jest.MockedFunction<game_object["active_zone_contact"]>;

  public base_out_restrictions = jest.fn() as unknown as jest.MockedFunction<game_object["base_out_restrictions"]>;

  public binded_object = jest.fn() as unknown as jest.MockedFunction<game_object["binded_object"]>;

  public can_throw_grenades = jest.fn() as unknown as jest.MockedFunction<game_object["can_throw_grenades"]>;

  public external_sound_start = jest.fn() as unknown as jest.MockedFunction<game_object["external_sound_start"]>;

  public get_current_direction = jest.fn() as unknown as jest.MockedFunction<game_object["get_current_direction"]>;

  public get_current_outfit_protection = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_current_outfit_protection"]
  >;

  public get_dest_smart_cover = jest.fn() as unknown as jest.MockedFunction<game_object["get_dest_smart_cover"]>;

  public get_dest_smart_cover_name = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_dest_smart_cover_name"]
  >;

  public get_smart_cover_description = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_smart_cover_description"]
  >;

  public give_talk_message = jest.fn() as unknown as jest.MockedFunction<game_object["give_talk_message"]>;

  public inventory_for_each = jest.fn() as unknown as jest.MockedFunction<game_object["inventory_for_each"]>;

  public iterate_inventory_box = jest.fn() as unknown as jest.MockedFunction<game_object["iterate_inventory_box"]>;

  public memory_hit_objects = jest.fn() as unknown as jest.MockedFunction<game_object["memory_hit_objects"]>;

  public remove_memory_hit_object = jest.fn() as unknown as jest.MockedFunction<
    game_object["remove_memory_hit_object"]
  >;

  public memory_visible_objects = jest.fn() as unknown as jest.MockedFunction<game_object["memory_visible_objects"]>;

  public remove_memory_visible_object = jest.fn() as unknown as jest.MockedFunction<
    game_object["remove_memory_visible_object"]
  >;

  public mental_state = jest.fn() as unknown as jest.MockedFunction<game_object["mental_state"]>;

  public not_yet_visible_objects = jest.fn() as unknown as jest.MockedFunction<game_object["not_yet_visible_objects"]>;

  public path_completed = jest.fn() as unknown as jest.MockedFunction<game_object["path_completed"]>;

  public reset_action_queue = jest.fn() as unknown as jest.MockedFunction<game_object["reset_action_queue"]>;

  public restore_sound_threshold = jest.fn() as unknown as jest.MockedFunction<game_object["restore_sound_threshold"]>;

  public set_enemy = jest.fn() as unknown as jest.MockedFunction<game_object["set_enemy"]>;

  public set_fov = jest.fn() as unknown as jest.MockedFunction<game_object["set_fov"]>;

  public set_override_animation = jest.fn() as unknown as jest.MockedFunction<game_object["set_override_animation"]>;

  public set_previous_point = jest.fn() as unknown as jest.MockedFunction<game_object["set_previous_point"]>;

  public set_start_point = jest.fn() as unknown as jest.MockedFunction<game_object["set_start_point"]>;

  public sound_voice_prefix = jest.fn() as unknown as jest.MockedFunction<game_object["sound_voice_prefix"]>;

  public switch_to_talk = jest.fn() as unknown as jest.MockedFunction<game_object["switch_to_talk"]>;

  public weapon_addon_attach = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_addon_attach"]>;

  public weapon_addon_detach = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_addon_detach"]>;

  public weapon_is_scope = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_is_scope"]>;

  public weapon_silencer_status = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_silencer_status"]>;

  public who_hit_name = jest.fn() as unknown as jest.MockedFunction<game_object["who_hit_name"]>;

  public who_hit_section_name = jest.fn() as unknown as jest.MockedFunction<game_object["who_hit_section_name"]>;

  public actor_look_at_point = jest.fn() as unknown as jest.MockedFunction<game_object["actor_look_at_point"]>;

  public aim_bone_id = jest.fn() as unknown as jest.MockedFunction<game_object["aim_bone_id"]>;

  public allow_sprint = jest.fn() as unknown as jest.MockedFunction<game_object["allow_sprint"]>;

  public remove_danger = jest.fn() as unknown as jest.MockedFunction<game_object["remove_danger"]>;

  public body_state = jest.fn() as unknown as jest.MockedFunction<game_object["body_state"]>;

  public bone_position = jest.fn() as unknown as jest.MockedFunction<game_object["bone_position"]>;

  public character_name = jest.fn() as unknown as jest.MockedFunction<game_object["character_name"]>;

  public condition = jest.fn() as unknown as jest.MockedFunction<game_object["condition"]>;

  public cost = jest.fn() as unknown as jest.MockedFunction<game_object["cost"]>;

  public deadbody_closed = jest.fn() as unknown as jest.MockedFunction<game_object["deadbody_closed"]>;

  public death_sound_enabled = jest.fn() as unknown as jest.MockedFunction<game_object["death_sound_enabled"]>;

  public disable_inv_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["disable_inv_upgrade"]>;

  public enable_inv_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["enable_inv_upgrade"]>;

  public enable_memory_object = jest.fn() as unknown as jest.MockedFunction<game_object["enable_memory_object"]>;

  public extrapolate_length = jest.fn() as unknown as jest.MockedFunction<game_object["extrapolate_length"]>;

  public fake_death_stand_up = jest.fn() as unknown as jest.MockedFunction<game_object["fake_death_stand_up"]>;

  public get_ammo_total = jest.fn() as unknown as jest.MockedFunction<game_object["get_ammo_total"]>;

  public get_ammo_type = jest.fn() as unknown as jest.MockedFunction<game_object["get_ammo_type"]>;

  public get_current_outfit = jest.fn() as unknown as jest.MockedFunction<game_object["get_current_outfit"]>;

  public get_holder_class = jest.fn() as unknown as jest.MockedFunction<game_object["get_holder_class"]>;

  public hide_weapon = jest.fn() as unknown as jest.MockedFunction<game_object["hide_weapon"]>;

  public in_loophole_fov = jest.fn() as unknown as jest.MockedFunction<game_object["in_loophole_fov"]>;

  public inv_box_can_take = jest.fn() as unknown as jest.MockedFunction<game_object["inv_box_can_take"]>;

  public is_body_turning = jest.fn() as unknown as jest.MockedFunction<game_object["is_body_turning"]>;

  public is_level_changer_enabled = jest.fn() as unknown as jest.MockedFunction<
    game_object["is_level_changer_enabled"]
  >;

  public lock_door_for_npc = jest.fn() as unknown as jest.MockedFunction<game_object["lock_door_for_npc"]>;

  public marked_dropped = jest.fn() as unknown as jest.MockedFunction<game_object["marked_dropped"]>;

  public memory_sound_objects = jest.fn() as unknown as jest.MockedFunction<game_object["memory_sound_objects"]>;

  public remove_memory_sound_object = jest.fn() as unknown as jest.MockedFunction<
    game_object["remove_memory_sound_object"]
  >;

  public movement_type = jest.fn() as unknown as jest.MockedFunction<game_object["movement_type"]>;

  public patrol = jest.fn() as unknown as jest.MockedFunction<game_object["patrol"]>;

  public register_door_for_npc = jest.fn() as unknown as jest.MockedFunction<game_object["register_door_for_npc"]>;

  public remove_sound = jest.fn() as unknown as jest.MockedFunction<game_object["remove_sound"]>;

  public restore_default_start_dialog = jest.fn() as unknown as jest.MockedFunction<
    game_object["restore_default_start_dialog"]
  >;

  public set__force = jest.fn() as unknown as jest.MockedFunction<game_object["set__force"]>;

  public set_actor_relation_flags = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_actor_relation_flags"]
  >;

  public set_alien_control = jest.fn() as unknown as jest.MockedFunction<game_object["set_alien_control"]>;

  public set_capture_anim = jest.fn() as unknown as jest.MockedFunction<game_object["set_capture_anim"]>;

  public set_character_community = jest.fn() as unknown as jest.MockedFunction<game_object["set_character_community"]>;

  public set_character_rank = jest.fn() as unknown as jest.MockedFunction<game_object["set_character_rank"]>;

  public set_character_reputation = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_character_reputation"]
  >;

  public set_collision_off = jest.fn() as unknown as jest.MockedFunction<game_object["set_collision_off"]>;

  public set_default_panic_threshold = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_default_panic_threshold"]
  >;

  public set_trader_sound = jest.fn() as unknown as jest.MockedFunction<game_object["set_trader_sound"]>;

  public skip_transfer_enemy = jest.fn() as unknown as jest.MockedFunction<game_object["skip_transfer_enemy"]>;

  public sniper_update_rate = jest.fn() as unknown as jest.MockedFunction<game_object["sniper_update_rate"]>;

  public switch_to_trade = jest.fn() as unknown as jest.MockedFunction<game_object["switch_to_trade"]>;

  public sympathy = jest.fn() as unknown as jest.MockedFunction<game_object["sympathy"]>;

  public unload_magazine = jest.fn() as unknown as jest.MockedFunction<game_object["unload_magazine"]>;

  public unlock_door_for_npc = jest.fn() as unknown as jest.MockedFunction<game_object["unlock_door_for_npc"]>;

  public visibility_threshold = jest.fn() as unknown as jest.MockedFunction<game_object["visibility_threshold"]>;

  public weapon_is_grenadelauncher = jest.fn() as unknown as jest.MockedFunction<
    game_object["weapon_is_grenadelauncher"]
  >;

  public set_task_state = jest.fn() as unknown as jest.MockedFunction<game_object["set_task_state"]>;

  public set_visual_memory_enabled = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_visual_memory_enabled"]
  >;

  public show_condition = jest.fn() as unknown as jest.MockedFunction<game_object["show_condition"]>;

  public sound_prefix = jest.fn() as unknown as jest.MockedFunction<game_object["sound_prefix"]>;

  public add_sound = jest.fn() as unknown as jest.MockedFunction<game_object["add_sound"]>;

  public active_sound_count = jest.fn() as unknown as jest.MockedFunction<game_object["active_sound_count"]>;

  public allow_break_talk_dialog = jest.fn() as unknown as jest.MockedFunction<game_object["allow_break_talk_dialog"]>;

  public attachable_item_enabled = jest.fn() as unknown as jest.MockedFunction<game_object["attachable_item_enabled"]>;

  public change_goodwill = jest.fn() as unknown as jest.MockedFunction<game_object["change_goodwill"]>;

  public change_character_rank = jest.fn() as unknown as jest.MockedFunction<game_object["change_character_rank"]>;

  public character_reputation = jest.fn() as unknown as jest.MockedFunction<game_object["character_reputation"]>;

  public community_goodwill = jest.fn() as unknown as jest.MockedFunction<game_object["community_goodwill"]>;

  public deadbody_can_take = jest.fn() as unknown as jest.MockedFunction<game_object["deadbody_can_take"]>;

  public deadbody_can_take_status = jest.fn() as unknown as jest.MockedFunction<
    game_object["deadbody_can_take_status"]
  >;

  public detail_path_type = jest.fn() as unknown as jest.MockedFunction<game_object["detail_path_type"]>;

  public disable_show_hide_sounds = jest.fn() as unknown as jest.MockedFunction<
    game_object["disable_show_hide_sounds"]
  >;

  public enable_vision = jest.fn() as unknown as jest.MockedFunction<game_object["enable_vision"]>;

  public fake_death_fall_down = jest.fn() as unknown as jest.MockedFunction<game_object["fake_death_fall_down"]>;

  public force_visibility_state = jest.fn() as unknown as jest.MockedFunction<game_object["force_visibility_state"]>;

  public get_actor_relation_flags = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_actor_relation_flags"]
  >;

  public get_corpse = jest.fn() as unknown as jest.MockedFunction<game_object["get_corpse"]>;

  public get_current_holder = jest.fn() as unknown as jest.MockedFunction<game_object["get_current_holder"]>;

  public get_enemy_strength = jest.fn() as unknown as jest.MockedFunction<game_object["get_enemy_strength"]>;

  public get_start_dialog = jest.fn() as unknown as jest.MockedFunction<game_object["get_start_dialog"]>;

  public get_task_state = jest.fn() as unknown as jest.MockedFunction<game_object["get_task_state"]>;

  public goodwill = jest.fn() as unknown as jest.MockedFunction<game_object["goodwill"]>;

  public head_orientation = jest.fn() as unknown as jest.MockedFunction<game_object["head_orientation"]>;

  public in_current_loophole_range = jest.fn() as unknown as jest.MockedFunction<
    game_object["in_current_loophole_range"]
  >;

  public inv_box_can_take_status = jest.fn() as unknown as jest.MockedFunction<game_object["inv_box_can_take_status"]>;

  public inv_box_closed = jest.fn() as unknown as jest.MockedFunction<game_object["inv_box_closed"]>;

  public is_active_task = jest.fn() as unknown as jest.MockedFunction<game_object["is_active_task"]>;

  public is_door_locked_for_npc = jest.fn() as unknown as jest.MockedFunction<game_object["is_door_locked_for_npc"]>;

  public is_inv_upgrade_enabled = jest.fn() as unknown as jest.MockedFunction<game_object["is_inv_upgrade_enabled"]>;

  public is_trade_enabled = jest.fn() as unknown as jest.MockedFunction<game_object["is_trade_enabled"]>;

  public item_on_belt = jest.fn() as unknown as jest.MockedFunction<game_object["item_on_belt"]>;

  public mark_item_dropped = jest.fn() as unknown as jest.MockedFunction<game_object["mark_item_dropped"]>;

  public mass = jest.fn() as unknown as jest.MockedFunction<game_object["mass"]>;

  public max_health = jest.fn() as unknown as jest.MockedFunction<game_object["max_health"]>;

  public on_door_is_closed = jest.fn() as unknown as jest.MockedFunction<game_object["on_door_is_closed"]>;

  public on_door_is_open = jest.fn() as unknown as jest.MockedFunction<game_object["on_door_is_open"]>;

  public path_type = jest.fn() as unknown as jest.MockedFunction<game_object["path_type"]>;

  public profile_name = jest.fn() as unknown as jest.MockedFunction<game_object["profile_name"]>;

  public range = jest.fn() as unknown as jest.MockedFunction<game_object["range"]>;

  public remove_all_restrictions = jest.fn() as unknown as jest.MockedFunction<game_object["remove_all_restrictions"]>;

  public restore_weapon = jest.fn() as unknown as jest.MockedFunction<game_object["restore_weapon"]>;

  public run_talk_dialog = jest.fn() as unknown as jest.MockedFunction<game_object["run_talk_dialog"]>;

  public set_anomaly_power = jest.fn() as unknown as jest.MockedFunction<game_object["set_anomaly_power"]>;

  public set_custom_panic_threshold = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_custom_panic_threshold"]
  >;

  public set_goodwill = jest.fn() as unknown as jest.MockedFunction<game_object["set_goodwill"]>;

  public set_queue_size = jest.fn() as unknown as jest.MockedFunction<game_object["set_queue_size"]>;

  public set_tip_text_default = jest.fn() as unknown as jest.MockedFunction<game_object["set_tip_text_default"]>;

  public set_trader_global_anim = jest.fn() as unknown as jest.MockedFunction<game_object["set_trader_global_anim"]>;

  public set_vis_state = jest.fn() as unknown as jest.MockedFunction<game_object["set_vis_state"]>;

  public sniper_fire_mode = jest.fn() as unknown as jest.MockedFunction<game_object["sniper_fire_mode"]>;

  public switch_to_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["switch_to_upgrade"]>;

  public can_add_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["can_add_upgrade"]>;

  public can_install_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["can_install_upgrade"]>;

  public has_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["has_upgrade"]>;

  public has_upgrade_group = jest.fn() as unknown as jest.MockedFunction<game_object["has_upgrade_group"]>;

  public has_upgrade_group_by_upgrade_id = jest.fn() as unknown as jest.MockedFunction<
    game_object["has_upgrade_group_by_upgrade_id"]
  >;

  public install_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["install_upgrade"]>;

  public unregister_in_combat = jest.fn() as unknown as jest.MockedFunction<game_object["unregister_in_combat"]>;

  public vertex_in_direction = jest.fn() as unknown as jest.MockedFunction<game_object["vertex_in_direction"]>;

  public vision_enabled = jest.fn() as unknown as jest.MockedFunction<game_object["vision_enabled"]>;

  public weapon_grenadelauncher_status = jest.fn() as unknown as jest.MockedFunction<
    game_object["weapon_grenadelauncher_status"]
  >;

  public weapon_is_silencer = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_is_silencer"]>;

  public weapon_scope_status = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_scope_status"]>;

  public accuracy = jest.fn() as unknown as jest.MockedFunction<game_object["accuracy"]>;

  public attachable_item_load_attach = jest.fn() as unknown as jest.MockedFunction<
    game_object["attachable_item_load_attach"]
  >;

  public best_cover = jest.fn() as unknown as jest.MockedFunction<game_object["best_cover"]>;

  public deadbody_closed_status = jest.fn() as unknown as jest.MockedFunction<game_object["deadbody_closed_status"]>;

  public death_time = jest.fn() as unknown as jest.MockedFunction<game_object["death_time"]>;

  public force_stand_sleep_animation = jest.fn() as unknown as jest.MockedFunction<
    game_object["force_stand_sleep_animation"]
  >;

  public get_visibility_state = jest.fn() as unknown as jest.MockedFunction<game_object["get_visibility_state"]>;

  public in_loophole_range = jest.fn() as unknown as jest.MockedFunction<game_object["in_loophole_range"]>;

  public set_range = jest.fn() as unknown as jest.MockedFunction<game_object["set_range"]>;

  public suitable_smart_cover = jest.fn() as unknown as jest.MockedFunction<game_object["suitable_smart_cover"]>;

  public add_combat_sound = jest.fn() as unknown as jest.MockedFunction<game_object["add_combat_sound"]>;

  public berserk = jest.fn() as unknown as jest.MockedFunction<game_object["berserk"]>;

  public inactualize_level_path = jest.fn() as unknown as jest.MockedFunction<game_object["inactualize_level_path"]>;

  public inactualize_game_path = jest.fn() as unknown as jest.MockedFunction<game_object["inactualize_game_path"]>;

  public action_by_index = jest.fn() as unknown as jest.MockedFunction<game_object["action_by_index"]>;

  public base_in_restrictions = jest.fn() as unknown as jest.MockedFunction<game_object["base_in_restrictions"]>;

  public can_script_capture = jest.fn() as unknown as jest.MockedFunction<game_object["can_script_capture"]>;

  public external_sound_stop = jest.fn() as unknown as jest.MockedFunction<game_object["external_sound_stop"]>;

  public find_best_cover = jest.fn() as unknown as jest.MockedFunction<game_object["find_best_cover"]>;

  public get_sound_info = jest.fn() as unknown as jest.MockedFunction<game_object["get_sound_info"]>;

  public inv_box_closed_status = jest.fn() as unknown as jest.MockedFunction<game_object["inv_box_closed_status"]>;

  public movement_target_reached = jest.fn() as unknown as jest.MockedFunction<game_object["movement_target_reached"]>;

  public register_in_combat = jest.fn() as unknown as jest.MockedFunction<game_object["register_in_combat"]>;

  public safe_cover = jest.fn() as unknown as jest.MockedFunction<game_object["safe_cover"]>;

  public set_sound_threshold = jest.fn() as unknown as jest.MockedFunction<game_object["set_sound_threshold"]>;

  public set_trader_head_anim = jest.fn() as unknown as jest.MockedFunction<game_object["set_trader_head_anim"]>;

  public unregister_door_for_npc = jest.fn() as unknown as jest.MockedFunction<game_object["unregister_door_for_npc"]>;

  public ammo_get_count = jest.fn() as unknown as jest.MockedFunction<game_object["ammo_get_count"]>;

  public ammo_set_count = jest.fn() as unknown as jest.MockedFunction<game_object["ammo_set_count"]>;

  public ammo_box_size = jest.fn() as unknown as jest.MockedFunction<game_object["ammo_box_size"]>;

  public cast_Stalker = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Stalker"]>;

  public cast_Artefact = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Artefact"]>;

  public cast_Car = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Car"]>;

  public cast_GameObject = jest.fn() as unknown as jest.MockedFunction<game_object["cast_GameObject"]>;

  public cast_Heli = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Heli"]>;

  public cast_SpaceRestrictor = jest.fn() as unknown as jest.MockedFunction<game_object["cast_SpaceRestrictor"]>;

  public cast_HolderCustom = jest.fn() as unknown as jest.MockedFunction<game_object["cast_HolderCustom"]>;

  public cast_InventoryItem = jest.fn() as unknown as jest.MockedFunction<game_object["cast_InventoryItem"]>;

  public cast_InventoryOwner = jest.fn() as unknown as jest.MockedFunction<game_object["cast_InventoryOwner"]>;

  public cast_Actor = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Actor"]>;

  public cast_Weapon = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Weapon"]>;

  public cast_Ammo = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Ammo"]>;

  public cast_WeaponMagazined = jest.fn() as unknown as jest.MockedFunction<game_object["cast_WeaponMagazined"]>;

  public cast_ScriptZone = jest.fn() as unknown as jest.MockedFunction<game_object["cast_ScriptZone"]>;

  public cast_CustomZone = jest.fn() as unknown as jest.MockedFunction<game_object["cast_CustomZone"]>;

  public cast_Monster = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Monster"]>;

  public cast_EntityAlive = jest.fn() as unknown as jest.MockedFunction<game_object["cast_EntityAlive"]>;

  public cast_Explosive = jest.fn() as unknown as jest.MockedFunction<game_object["cast_Explosive"]>;

  public cast_PhysicsShellHolder = jest.fn() as unknown as jest.MockedFunction<game_object["cast_PhysicsShellHolder"]>;

  public get_info_time = jest.fn() as unknown as jest.MockedFunction<game_object["get_info_time"]>;

  public bone_visible = jest.fn() as unknown as jest.MockedFunction<game_object["bone_visible"]>;

  public has_ammo_type = jest.fn() as unknown as jest.MockedFunction<game_object["has_ammo_type"]>;

  public is_on_belt = jest.fn() as unknown as jest.MockedFunction<game_object["is_on_belt"]>;

  public use = jest.fn() as unknown as jest.MockedFunction<game_object["use"]>;

  public set_remaining_uses = jest.fn() as unknown as jest.MockedFunction<game_object["set_remaining_uses"]>;

  public get_max_uses = jest.fn() as unknown as jest.MockedFunction<game_object["get_max_uses"]>;

  public get_remaining_uses = jest.fn() as unknown as jest.MockedFunction<game_object["get_remaining_uses"]>;

  public set_restrictor_type = jest.fn() as unknown as jest.MockedFunction<game_object["set_restrictor_type"]>;

  public get_restrictor_type = jest.fn() as unknown as jest.MockedFunction<game_object["get_restrictor_type"]>;

  public set_spatial_type = jest.fn() as unknown as jest.MockedFunction<game_object["set_spatial_type"]>;

  public set_weapon_type = jest.fn() as unknown as jest.MockedFunction<game_object["set_weapon_type"]>;

  public get_weapon_substate = jest.fn() as unknown as jest.MockedFunction<game_object["get_weapon_substate"]>;

  public start_trade = jest.fn() as unknown as jest.MockedFunction<game_object["start_trade"]>;

  public start_upgrade = jest.fn() as unknown as jest.MockedFunction<game_object["start_upgrade"]>;

  public switch_state = jest.fn() as unknown as jest.MockedFunction<game_object["switch_state"]>;

  public phantom_set_enemy = jest.fn() as unknown as jest.MockedFunction<game_object["phantom_set_enemy"]>;

  public set_actor_jump_speed = jest.fn() as unknown as jest.MockedFunction<game_object["set_actor_jump_speed"]>;

  public set_actor_max_walk_weight = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_actor_max_walk_weight"]
  >;

  public set_actor_max_weight = jest.fn() as unknown as jest.MockedFunction<game_object["set_actor_max_weight"]>;

  public set_actor_run_coef = jest.fn() as unknown as jest.MockedFunction<game_object["set_actor_run_coef"]>;

  public set_actor_runback_coef = jest.fn() as unknown as jest.MockedFunction<game_object["set_actor_runback_coef"]>;

  public set_actor_sprint_koef = jest.fn() as unknown as jest.MockedFunction<game_object["set_actor_sprint_koef"]>;

  public set_additional_max_walk_weight = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_additional_max_walk_weight"]
  >;

  public set_additional_max_weight = jest.fn() as unknown as jest.MockedFunction<
    game_object["set_additional_max_weight"]
  >;

  public set_ammo_type = jest.fn() as unknown as jest.MockedFunction<game_object["set_ammo_type"]>;

  public set_artefact_bleeding = jest.fn() as unknown as jest.MockedFunction<game_object["set_artefact_bleeding"]>;

  public set_artefact_health = jest.fn() as unknown as jest.MockedFunction<game_object["set_artefact_health"]>;

  public set_artefact_power = jest.fn() as unknown as jest.MockedFunction<game_object["set_artefact_power"]>;

  public set_artefact_radiation = jest.fn() as unknown as jest.MockedFunction<game_object["set_artefact_radiation"]>;

  public set_artefact_satiety = jest.fn() as unknown as jest.MockedFunction<game_object["set_artefact_satiety"]>;

  public set_bone_visible = jest.fn() as unknown as jest.MockedFunction<game_object["set_bone_visible"]>;

  public set_character_icon = jest.fn() as unknown as jest.MockedFunction<game_object["set_character_icon"]>;

  public set_main_weapon_type = jest.fn() as unknown as jest.MockedFunction<game_object["set_main_weapon_type"]>;

  public get_actor_jump_speed = jest.fn() as unknown as jest.MockedFunction<game_object["get_actor_jump_speed"]>;

  public get_actor_max_walk_weight = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_actor_max_walk_weight"]
  >;

  public get_actor_max_weight = jest.fn() as unknown as jest.MockedFunction<game_object["get_actor_max_weight"]>;

  public get_actor_run_coef = jest.fn() as unknown as jest.MockedFunction<game_object["get_actor_run_coef"]>;

  public get_actor_runback_coef = jest.fn() as unknown as jest.MockedFunction<game_object["get_actor_runback_coef"]>;

  public get_actor_sprint_koef = jest.fn() as unknown as jest.MockedFunction<game_object["get_actor_sprint_koef"]>;

  public get_additional_max_walk_weight = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_additional_max_walk_weight"]
  >;

  public get_additional_max_weight = jest.fn() as unknown as jest.MockedFunction<
    game_object["get_additional_max_weight"]
  >;

  public get_anomaly_power = jest.fn() as unknown as jest.MockedFunction<game_object["get_anomaly_power"]>;

  public get_artefact_bleeding = jest.fn() as unknown as jest.MockedFunction<game_object["get_artefact_bleeding"]>;

  public get_artefact_health = jest.fn() as unknown as jest.MockedFunction<game_object["get_artefact_health"]>;

  public get_artefact_power = jest.fn() as unknown as jest.MockedFunction<game_object["get_artefact_power"]>;

  public get_artefact_radiation = jest.fn() as unknown as jest.MockedFunction<game_object["get_artefact_radiation"]>;

  public get_artefact_satiety = jest.fn() as unknown as jest.MockedFunction<game_object["get_artefact_satiety"]>;

  public get_luminocity = jest.fn() as unknown as jest.MockedFunction<game_object["get_luminocity"]>;

  public get_luminocity_hemi = jest.fn() as unknown as jest.MockedFunction<game_object["get_luminocity_hemi"]>;

  public get_total_weight = jest.fn() as unknown as jest.MockedFunction<game_object["get_total_weight"]>;

  public get_attached_vehicle = jest.fn() as unknown as jest.MockedFunction<game_object["get_attached_vehicle"]>;

  public belt_count = jest.fn() as unknown as jest.MockedFunction<game_object["belt_count"]>;

  public get_main_weapon_type = jest.fn() as unknown as jest.MockedFunction<game_object["get_main_weapon_type"]>;

  public get_spatial_type = jest.fn() as unknown as jest.MockedFunction<game_object["get_spatial_type"]>;

  public get_state = jest.fn() as unknown as jest.MockedFunction<game_object["get_state"]>;

  public get_weapon_type = jest.fn() as unknown as jest.MockedFunction<game_object["get_weapon_type"]>;

  public play_hud_motion = jest.fn() as unknown as jest.MockedFunction<game_object["play_hud_motion"]>;

  public attach_vehicle = jest.fn() as unknown as jest.MockedFunction<game_object["attach_vehicle"]>;

  public clear_game_news = jest.fn() as unknown as jest.MockedFunction<game_object["clear_game_news"]>;

  public detach_vehicle = jest.fn() as unknown as jest.MockedFunction<game_object["detach_vehicle"]>;

  public force_set_position = jest.fn() as unknown as jest.MockedFunction<game_object["force_set_position"]>;

  public reset_bone_protections = jest.fn() as unknown as jest.MockedFunction<game_object["reset_bone_protections"]>;

  public iterate_feel_touch = jest.fn() as unknown as jest.MockedFunction<game_object["iterate_feel_touch"]>;

  public get_ammo_count_for_type = jest.fn() as unknown as jest.MockedFunction<game_object["get_ammo_count_for_type"]>;

  public weapon_in_grenade_mode = jest.fn() as unknown as jest.MockedFunction<game_object["weapon_in_grenade_mode"]>;

  public is_entity_alive = jest.fn() as unknown as jest.MockedFunction<game_object["is_entity_alive"]>;

  public is_inventory_item = jest.fn() as unknown as jest.MockedFunction<game_object["is_inventory_item"]>;

  public is_inventory_owner = jest.fn() as unknown as jest.MockedFunction<game_object["is_inventory_owner"]>;

  public is_actor = jest.fn() as unknown as jest.MockedFunction<game_object["is_actor"]>;

  public is_custom_monster = jest.fn() as unknown as jest.MockedFunction<game_object["is_custom_monster"]>;

  public is_weapon = jest.fn() as unknown as jest.MockedFunction<game_object["is_weapon"]>;

  public is_outfit = jest.fn() as unknown as jest.MockedFunction<game_object["is_outfit"]>;

  public is_scope = jest.fn() as unknown as jest.MockedFunction<game_object["is_scope"]>;

  public is_silencer = jest.fn() as unknown as jest.MockedFunction<game_object["is_silencer"]>;

  public is_grenade_launcher = jest.fn() as unknown as jest.MockedFunction<game_object["is_grenade_launcher"]>;

  public is_weapon_magazined = jest.fn() as unknown as jest.MockedFunction<game_object["is_weapon_magazined"]>;

  public is_space_restrictor = jest.fn() as unknown as jest.MockedFunction<game_object["is_space_restrictor"]>;

  public is_stalker = jest.fn() as unknown as jest.MockedFunction<game_object["is_stalker"]>;

  public is_anomaly = jest.fn() as unknown as jest.MockedFunction<game_object["is_anomaly"]>;

  public is_monster = jest.fn() as unknown as jest.MockedFunction<game_object["is_monster"]>;

  public is_artefact = jest.fn() as unknown as jest.MockedFunction<game_object["is_artefact"]>;

  public is_ammo = jest.fn() as unknown as jest.MockedFunction<game_object["is_ammo"]>;

  public is_trader = jest.fn() as unknown as jest.MockedFunction<game_object["is_trader"]>;

  public is_hud_item = jest.fn() as unknown as jest.MockedFunction<game_object["is_hud_item"]>;

  public is_weapon_gl = jest.fn() as unknown as jest.MockedFunction<game_object["is_weapon_gl"]>;

  public is_inventory_box = jest.fn() as unknown as jest.MockedFunction<game_object["is_inventory_box"]>;

  public set_enemy_callback = jest.fn() as unknown as jest.MockedFunction<game_object["set_enemy_callback"]>;

  public constructor(config: IMockGameObjectConfig = {}) {
    this.objectAlive = config.alive ?? true;
    this.objectClsid = (config.clsid ?? -1) as TXR_class_id;
    this.objectCommunity = (config.community ?? "none") as string;
    this.objectId = config.id ?? mockConfig.ID_COUNTER++;
    this.objectInRestrictions = (config.inRestrictions ?? "a,b,c").split(",");
    this.objectInfoPortions = config.infoPortions ?? [];
    this.objectInventory = new Map(config.inventory ?? []);
    this.objectMoney = config.money ?? 0;
    this.objectOutRestrictions = (config.outRestrictions ?? "d,e,f").split(",");
    this.objectCharacterRank = config.characterRank ?? null;
    this.objectPosition = config.position ?? MockVector.mock(0.25, 0.25, 0.25);
    this.objectRank = config.rank ?? 0;
    this.objectSection = config.section ?? "section";
    this.objectSpawnIni = config.spawnIni === undefined ? MockIniFile.mock("spawn.ini") : config.spawnIni;
    this.objectUpgradesSet = new Set(config.upgrades ?? []);

    this.objectName = config.name ?? `${this.objectSection}_${this.objectId}`;

    this.objectBleeding = MockGameObject.clamp(config.bleeding ?? 0, 0, 1);
    this.objectHealth = MockGameObject.clamp(config.health ?? 1, 0, 1);
    this.objectMorale = MockGameObject.clamp(config.morale ?? 1, 0, 1);
    this.objectPower = MockGameObject.clamp(config.power ?? 1, 0, 1);
    this.objectPsyHealth = MockGameObject.clamp(config.psyHealth ?? 1, 0, 1);
    this.objectRadiation = MockGameObject.clamp(config.radiation ?? 0, 0, 1);
    this.objectSatiety = MockGameObject.clamp(config.satiety ?? 1, 0, 1);

    this.objectLevelVertexId = config.levelVertexId ?? 255;
    this.objectGameVertexId = config.gameVertexId ?? 512;

    // Register the same concrete instance that callers receive from `mock()`, so
    // `level.object_by_id` and other registry lookups preserve object identity.
    MockGameObject.REGISTRY.set(this.id(), this);
  }

  public get bleeding(): number {
    return this.objectBleeding;
  }

  public set bleeding(delta: number) {
    this.objectBleeding = MockGameObject.clamp(this.objectBleeding - delta, 0, 1);
  }

  public get health(): number {
    return this.objectHealth;
  }

  public set health(delta: number) {
    this.objectHealth = MockGameObject.clamp(this.objectHealth + delta, 0, 1);
  }

  public get morale(): number {
    return this.objectMorale;
  }

  public set morale(delta: number) {
    this.objectMorale = MockGameObject.clamp(this.objectMorale + delta, 0, 1);
  }

  public get power(): number {
    return this.objectPower;
  }

  public set power(delta: number) {
    this.objectPower = MockGameObject.clamp(this.objectPower + delta, 0, 1);
  }

  public get psy_health(): number {
    return this.objectPsyHealth;
  }

  public set psy_health(delta: number) {
    this.objectPsyHealth = MockGameObject.clamp(this.objectPsyHealth + delta, 0, 1);
  }

  public get radiation(): number {
    return this.objectRadiation;
  }

  public set radiation(delta: number) {
    this.objectRadiation = MockGameObject.clamp(this.objectRadiation + delta, 0, 1);
  }

  public get satiety(): number {
    return this.objectSatiety;
  }

  public set satiety(delta: number) {
    this.objectSatiety = MockGameObject.clamp(this.objectSatiety + delta, 0, 1);
  }

  public animation_count = jest.fn(() => 0);

  public accessible = jest.fn(() => true);

  public action = jest.fn(() => null);

  public active_item = jest.fn(() => null);

  public activate_slot = jest.fn();

  public add_animation = jest.fn();

  public add_upgrade = jest.fn((it: string) => {
    this.objectUpgradesSet.add(it);

    return true;
  }) as jest.MockedFunction<game_object["add_upgrade"]>;

  public animation_slot = jest.fn(() => 1);

  public alive = jest.fn(() => this.objectAlive);

  public accessible_nearest = jest.fn(() => $multi(15326, MockVector.mock())) as jest.MockedFunction<
    game_object["accessible_nearest"]
  >;

  public active_detector = jest.fn(() => null);

  public active_slot = jest.fn(<T extends number>(): T => 3 as T) as jest.MockedFunction<game_object["active_slot"]>;

  public add_restrictions = jest.fn((outAdd: string, inAdd: string) => {
    outAdd
      .split(",")
      .map((it) => it.trim())
      .filter(Boolean)
      .forEach((it) => this.objectOutRestrictions.push(it));
    inAdd
      .split(",")
      .map((it) => it.trim())
      .filter(Boolean)
      .forEach((it) => this.objectInRestrictions.push(it));
  });

  public apply_loophole_direction_distance = jest.fn(() => 0) as unknown as jest.MockedFunction<
    game_object["apply_loophole_direction_distance"]
  >;

  public aim_time = jest.fn((_weapon: game_object, _aimTime?: number) => 300);

  public best_enemy = jest.fn(() => null);

  public best_danger = jest.fn(() => null);

  public best_item = jest.fn(() => null);

  public best_weapon = jest.fn(() => null);

  public bind_object = jest.fn();

  public burer_set_force_gravi_attack = jest.fn();

  public set_force_anti_aim = jest.fn();

  public buy_condition = jest.fn();

  public buy_supplies = jest.fn();

  public buy_item_condition_factor = jest.fn();

  public callCallback = jest.fn((id: TXR_callback, ...args: Array<any>) => this.callbacks[id]!(...args));

  public can_select_weapon = jest.fn(() => false) as unknown as jest.MockedFunction<game_object["can_select_weapon"]>;

  public center = jest.fn(() => this.objectCenter);

  public clear_override_animation = jest.fn();

  public change_team = jest.fn();

  public change_character_reputation = jest.fn();

  public character_community = jest.fn(
    <T extends string = string>(): T => this.objectCommunity as T
  ) as jest.MockedFunction<game_object["character_community"]>;

  public character_icon = jest.fn(() => "test_character_icon") as <T>() => T;

  public character_rank = jest.fn(() => this.objectCharacterRank) as unknown as jest.MockedFunction<
    game_object["character_rank"]
  >;

  public clear_animations = jest.fn();

  public clear_callbacks = jest.fn(() => {
    Object.keys(this.callbacks).forEach((it) => delete this.callbacks[it as unknown as TXR_callback]);
  });

  public clsid = jest.fn(() => this.objectClsid);

  public command = jest.fn();

  public community = jest.fn(() => this.objectCommunity);

  public critically_wounded = jest.fn(() => false);

  public debug_planner = jest.fn();

  public direction = jest.fn(() => this.objectDirection);

  public disable_anomaly = jest.fn();

  public memory_time = jest.fn((_another: game_object) => 0);

  public memory_position = jest.fn(() => MockVector.mock());

  public disable_hit_marks = jest.fn(() => false) as unknown as jest.MockedFunction<game_object["disable_hit_marks"]>;

  public disable_info_portion = jest.fn((it: string) => {
    const index: number = this.objectInfoPortions.indexOf(it);

    if (index >= 0) {
      this.objectInfoPortions.splice(index, 1);

      return true;
    } else {
      return false;
    }
  });

  public disable_talk = jest.fn();

  public disable_trade = jest.fn();

  public drop_item = jest.fn((it: game_object) => {
    if (this.objectInventory.get(it.section())) {
      this.objectInventory.delete(it.section());
    }
  });

  public drop_item_and_teleport = jest.fn();

  public eat = jest.fn();

  public enable_anomaly = jest.fn();

  public enable_attachable_item = jest.fn();

  public enable_level_changer = jest.fn();

  public enable_night_vision = jest.fn();

  public enable_talk = jest.fn();

  public enable_torch = jest.fn();

  public enable_trade = jest.fn();

  public explode = jest.fn();

  public force_set_goodwill = jest.fn();

  public fov = jest.fn(() => 75);

  public game_vertex_id = jest.fn(() => this.objectGameVertexId);

  public general_goodwill = jest.fn((to: game_object) => {
    return mockRelationRegistryInterface.get_general_goodwill_between(this.id(), to.id());
  });

  public get_artefact = jest.fn(() => null);

  public get_car = jest.fn(() => null as unknown as ReturnType<game_object["get_car"]>);

  public get_hanging_lamp = jest.fn(() => null as unknown as ReturnType<game_object["get_hanging_lamp"]>);

  public get_visual_name = jest.fn(<T extends string = string>(): T => this.objectVisual as T) as jest.MockedFunction<
    game_object["get_visual_name"]
  >;

  public get_ammo_in_magazine = jest.fn(() => this.objectAmmoElapsed);

  public get_bone_id = jest.fn(() => -1);

  public get_campfire = jest.fn(() => null);

  public get_current_point_index = jest.fn(() => 0);

  public get_enemy = jest.fn(() => null);

  public get_monster_hit_info = jest.fn(() => null as unknown as ReturnType<game_object["get_monster_hit_info"]>);

  public get_movement_speed = jest.fn(() => MockVector.mock(0, 0, 0));

  public get_helicopter = jest.fn(() => null as unknown as CHelicopter);

  public get_physics_object = jest.fn(() => null);

  public get_physics_shell = jest.fn(() => null);

  public get_script = jest.fn(() => false);

  public get_script_name = jest.fn(() => "");

  public get_task = jest.fn(() => null);

  public give_info_portion = jest.fn((it: string) => {
    this.objectInfoPortions.push(it);

    return false;
  });

  public info_add = jest.fn((it: string) => this.give_info_portion(it));

  public info_clear = jest.fn(() => {
    this.objectInfoPortions = [];
  });

  public give_game_news = jest.fn();

  public give_money = jest.fn((value: number) => (this.objectMoney += value));

  public give_talk_message2 = jest.fn();

  public give_task = jest.fn();

  public group = jest.fn(() => 0);

  public group_throw_time_interval = jest.fn(() => 0) as unknown as jest.MockedFunction<
    game_object["group_throw_time_interval"]
  >;

  public has_info = jest.fn((it: string) => this.objectInfoPortions.includes(it));

  public dont_has_info = jest.fn((it: string) => !this.has_info(it));

  public hit = jest.fn();

  public id = jest.fn(() => this.objectId);

  public idle_max_time = jest.fn(() => 0) as unknown as jest.MockedFunction<game_object["idle_max_time"]>;

  public idle_min_time = jest.fn(() => 0) as unknown as jest.MockedFunction<game_object["idle_min_time"]>;

  public ignore_monster_threshold = jest.fn(() => 0) as unknown as jest.MockedFunction<
    game_object["ignore_monster_threshold"]
  >;

  public inside = jest.fn(() => false);

  public in_smart_cover = jest.fn(() => false);

  public is_talking = jest.fn(() => false);

  public is_inv_box_empty = jest.fn(() => true);

  public is_talk_enabled = jest.fn(() => false);

  public is_there_items_to_pickup = jest.fn(() => false);

  public is_weapon_going_to_be_strapped = jest.fn(() => false);

  public jump = jest.fn();

  public kill = jest.fn();

  public level_vertex_id = jest.fn(() => this.objectLevelVertexId);

  public location_on_path = jest.fn((_distance: number, _position: vector) => 0);

  public lookout_max_time = jest.fn(() => 0) as unknown as jest.MockedFunction<game_object["lookout_max_time"]>;

  public lookout_min_time = jest.fn(() => 0) as unknown as jest.MockedFunction<game_object["lookout_min_time"]>;

  public make_item_active = jest.fn();

  public make_object_visible_somewhen = jest.fn();

  public max_ignore_monster_distance = jest.fn(() => 0) as unknown as jest.MockedFunction<
    game_object["max_ignore_monster_distance"]
  >;

  public money = jest.fn(() => this.objectMoney);

  public weight = jest.fn(() => this.objectWeight);

  public motivation_action_manager = jest.fn(() => {
    this.objectActionManager.object = this.asGameObject();

    return this.objectActionManager;
  });

  public movement_enabled = jest.fn(() => false) as unknown as jest.MockedFunction<game_object["movement_enabled"]>;

  public name = jest.fn(() => this.objectName);

  public night_vision_enabled = jest.fn(() => false);

  public object = jest.fn((key: string | number) => {
    if (typeof key === "string") {
      return (
        [...this.objectInventory.values()].find((it) => {
          return it.section() === key;
        }) ?? null
      );
    }

    return this.objectInventory.get(key) ?? null;
  });

  public object_count = jest.fn(() => this.objectInventory.size);

  public out_restrictions = jest.fn(() => this.objectOutRestrictions.join(","));

  public in_current_loophole_fov = jest.fn(() => false);

  public in_restrictions = jest.fn(() => this.objectInRestrictions.join(","));

  public inactualize_patrol_path = jest.fn();

  public invulnerable = jest.fn((nextInvulnerable?: boolean) => {
    if (typeof nextInvulnerable === "boolean") {
      this.isInvulnerable = nextInvulnerable;
    } else {
      return this.isInvulnerable;
    }
  }) as jest.MockedFunction<game_object["invulnerable"]>;

  public item_in_slot = jest.fn(() => null);

  public iterate_inventory = jest.fn(
    (cb: (owner: game_object, item: game_object) => void | boolean, owner: game_object) => {
      for (const [, item] of this.objectInventory) {
        if (cb(owner, item)) {
          break;
        }
      }
    }
  );

  public iterate_installed_upgrades = jest.fn((cb: (upgrade: string, item: game_object) => void | boolean) => {
    for (const upgrade of this.objectUpgradesSet) {
      cb(upgrade, this.asGameObject());
    }
  });

  public patrol_path_make_inactual = jest.fn(() => null);

  public parent = jest.fn(() => null);

  public play_sound = jest.fn();

  public poltergeist_set_actor_ignore = jest.fn();

  public position = jest.fn(() => this.objectPosition);

  public play_cycle = jest.fn();

  public release_stand_sleep_animation = jest.fn();

  public rank = jest.fn(() => this.objectRank);

  public relation = jest.fn((_object: game_object) => {
    return 0;
  }) as jest.MockedFunction<game_object["relation"]>;

  public remove_home = jest.fn();

  public remove_restrictions = jest.fn((outRemove: string, inRemove: string) => {
    outRemove
      .split(",")
      .map((it) => it.trim())
      .forEach((it) => {
        const index: number = this.objectOutRestrictions.indexOf(it);

        if (index !== -1) {
          this.objectOutRestrictions.splice(index, 1);
        }
      });
    inRemove
      .split(",")
      .map((it) => it.trim())
      .forEach((it) => {
        const index: number = this.objectInRestrictions.indexOf(it);

        if (index !== -1) {
          this.objectInRestrictions.splice(index, 1);
        }
      });
  });

  public restore_max_ignore_monster_distance = jest.fn();

  public restore_ignore_monster_threshold = jest.fn();

  public script = jest.fn();

  public section = jest.fn(<T extends string = string>(): T => this.objectSection as T) as jest.MockedFunction<
    game_object["section"]
  >;

  public see = jest.fn(() => false);

  public sell_condition = jest.fn();

  public set_active_task = jest.fn();

  public set_actor_position = jest.fn((it: vector) => {
    this.objectPosition = it;
  });

  public set_actor_direction = jest.fn((it: number) => {
    this.objectDirection = this.objectDirection.set(it, this.objectDirection.y, this.objectDirection.z);
  });

  public set_body_state = jest.fn();

  public set_callback = jest.fn(
    (id: TXR_callback, callback: (this: unknown, ...args: Array<any>) => any, context: Record<string, any>) => {
      if (callback) {
        this.callbacks[id] = callback.bind(context);
      } else {
        delete this.callbacks[id];
      }
    }
  ) as unknown as jest.MockedFunction<game_object["set_callback"]>;

  public set_community_goodwill = jest.fn();

  public set_condition = jest.fn();

  public set_health_ex = jest.fn((value: number) => {
    this.objectHealth = MockGameObject.clamp(value, 0, 1);
  });

  public set_const_force = jest.fn();

  public set_desired_direction = jest.fn();

  public set_desired_position = jest.fn();

  public set_dest_game_vertex_id = jest.fn();

  public set_dest_level_vertex_id = jest.fn();

  public set_dest_loophole = jest.fn();

  public set_dest_smart_cover = jest.fn();

  public set_detail_path_type = jest.fn();

  public set_fastcall = jest.fn();

  public set_home = jest.fn();

  public set_invisible = jest.fn();

  public set_item = jest.fn();

  public set_level_changer_invitation = jest.fn();

  public set_manual_invisibility = jest.fn();

  public set_mental_state = jest.fn();

  public set_movement_selection_type = jest.fn();

  public set_movement_type = jest.fn();

  public set_nonscript_usable = jest.fn();

  public set_npc_position = jest.fn();

  public set_path_type = jest.fn();

  public set_patrol_extrapolate_callback = jest.fn();

  public set_patrol_path = jest.fn();

  public set_relation = jest.fn();

  public set_sight = jest.fn((nextSight: TXR_SightType) => {
    this.sight = nextSight;
  }) as unknown as jest.MockedFunction<game_object["set_sight"]>;

  public set_smart_cover_target = jest.fn();

  public set_smart_cover_target_default = jest.fn();

  public set_smart_cover_target_fire = jest.fn();

  public set_smart_cover_target_fire_no_lookout = jest.fn();

  public set_smart_cover_target_idle = jest.fn();

  public set_smart_cover_target_lookout = jest.fn();

  public set_smart_cover_target_selector = jest.fn();

  public set_sound_mask = jest.fn();

  public set_start_dialog = jest.fn();

  public set_sympathy = jest.fn();

  public set_tip_text = jest.fn();

  public set_visual_name = jest.fn((name: string) => {
    this.objectVisual = name;
  });

  public set_ammo_elapsed = jest.fn((value: number) => {
    this.objectAmmoElapsed = value;
  });

  public set_weight = jest.fn((value: number) => {
    this.objectWeight = value;
  });

  public sight_params = jest.fn(() => {
    const params: MockSightParameters = new MockSightParameters();

    params.m_object = this as unknown as game_object;
    params.m_sight_type = this.sight;
    params.m_vector = this.direction();

    return params;
  });

  public spawn_ini = jest.fn(() => this.objectSpawnIni);

  public special_danger_move = jest.fn(() => true);

  public squad = jest.fn(() => 150);

  public start_particles = jest.fn();

  public stop_particles = jest.fn();

  public stop_talk = jest.fn();

  public take_items_enabled = jest.fn(() => false) as unknown as jest.MockedFunction<game_object["take_items_enabled"]>;

  public target_body_state = jest.fn(() => {
    return MockMove.standing;
  });

  public target_mental_state = jest.fn(() => {
    return MockAnim.free;
  });

  public target_movement_type = jest.fn(() => MockMove.standing);

  public team = jest.fn(() => 140);

  public torch_enabled = jest.fn(() => false);

  public transfer_money = jest.fn();

  public transfer_item = jest.fn((item: game_object, to: game_object) => {
    const targetInventory: Map<string | number, game_object> = MockGameObject.asMock(to).objectInventory;

    for (const [key, it] of this.objectInventory) {
      if (it === item) {
        this.objectInventory.delete(key);
        targetInventory.set(it.section(), it);
        break;
      }
    }
  });

  public use_smart_covers_only = jest.fn(() => false) as unknown as jest.MockedFunction<
    game_object["use_smart_covers_only"]
  >;

  public is_door_blocked_by_npc = jest.fn(() => false);

  public get_force_anti_aim = jest.fn(() => false);

  public burer_get_force_gravi_attack = jest.fn(() => false);

  public poltergeist_get_actor_ignore = jest.fn(() => false);

  public weapon_strapped = jest.fn(() => true);

  public weapon_unstrapped = jest.fn(() => false);

  public wounded = jest.fn(() => false) as unknown as jest.MockedFunction<game_object["wounded"]>;

  public asGameObject(): game_object {
    return this as unknown as game_object;
  }
}
