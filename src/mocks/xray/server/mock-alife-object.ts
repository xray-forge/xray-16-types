import { jest } from "@jest/globals";
import type { cse_alife_object, ini_file, net_packet, prop_item_vec, TXR_class_id, vector } from "xray16";

import { mockConfig } from "../mock-config";
import { MockIniFile } from "../mock-ini-file";
import { MockLuabindClass } from "../mock-luabind";
import { MockVector } from "../mock-vector";

import { addMockAlifeObjectToRegistry } from "./mock-alife-registry";

export interface IMockAlifeObjectConfig {
  alive?: boolean;
  angle?: vector;
  canSave?: boolean;
  canSwitchOffline?: boolean;
  canSwitchOnline?: boolean;
  clsid?: number;
  community?: string;
  gameVertexId?: number;
  groupId?: number;
  id?: number;
  interactive?: boolean;
  levelVertexId?: number;
  moveOffline?: boolean;
  name?: string;
  online?: boolean;
  parentId?: number;
  position?: vector;
  rank?: number;
  section?: string;
  scriptVersion?: number;
  smartTerrainId?: number;
  spawnIni?: ini_file;
  storyId?: number;
  usedAiLocations?: boolean;
  visibleForMap?: boolean;
}

/**
 * Mock base alife object implementation.
 */
export class MockAlifeObject extends MockLuabindClass implements cse_alife_object {
  public static mock(config: IMockAlifeObjectConfig = {}): cse_alife_object {
    return new this(config) as unknown as cse_alife_object;
  }

  public static mockWithClassId(classId: number): cse_alife_object {
    const object: MockAlifeObject = new this({ clsid: classId });

    return object as unknown as cse_alife_object;
  }

  public static toMock(object: cse_alife_object): MockAlifeObject {
    return object as unknown as MockAlifeObject;
  }

  public id: number;
  public classId: TXR_class_id;
  public section: string;
  public position: vector;
  public m_story_id: number;
  public parent_id: number;
  public script_version: number;
  public m_level_vertex_id: number;
  public m_game_vertex_id: number;
  public angle: vector;

  public online: boolean;
  public canSave: boolean;
  public canSwitchOnline: boolean;
  public canSwitchOffline: boolean;
  public isInteractive: boolean;
  public isVisibleForMap: boolean;
  public shouldMoveOffline: boolean;
  public usesAiLocations: boolean;

  public objectAlive: boolean;
  public objectName: string;
  public objectCommunity: string;
  public spawnIni: ini_file | null;

  public constructor(config: IMockAlifeObjectConfig | string = {}) {
    super();

    if (typeof config === "object") {
      this.classId = (config.clsid as TXR_class_id) ?? -1;
      this.id = config.id ?? mockConfig.ID_COUNTER++;
      this.m_game_vertex_id = config.gameVertexId ?? 512;
      this.m_level_vertex_id = config.levelVertexId ?? 255;
      this.m_story_id = config.storyId ?? -1;
      this.parent_id = config.parentId ?? -1;
      this.script_version = config.scriptVersion ?? 0;
      this.angle = config.angle ?? MockVector.mock(0, 0, 0);
      this.position = config.position ?? MockVector.mock(0, 0, 0);
      this.section = config.section ?? "test_alife_object";
      this.spawnIni = typeof config.spawnIni === "undefined" ? MockIniFile.mock("object_spawn.ini") : config.spawnIni;
      this.online = config.online ?? true;
      this.canSave = config.canSave ?? true;
      this.canSwitchOnline = config.canSwitchOnline ?? true;
      this.canSwitchOffline = config.canSwitchOffline ?? true;
      this.isInteractive = config.interactive ?? true;
      this.isVisibleForMap = config.visibleForMap ?? false;
      this.shouldMoveOffline = config.moveOffline ?? true;
      this.usesAiLocations = config.usedAiLocations ?? true;

      this.objectAlive = config.alive ?? true;
      this.objectCommunity = config.community ?? "unknown";
      this.objectName = config.name ?? `${this.section}_${this.id}`;
    } else {
      this.classId = -1 as TXR_class_id;
      this.id = mockConfig.ID_COUNTER++;
      this.m_game_vertex_id = 512;
      this.m_level_vertex_id = 255;
      this.m_story_id = -1;
      this.parent_id = -1;
      this.script_version = 0;
      this.angle = MockVector.mock(0, 0, 0);
      this.position = MockVector.mock(0, 0, 0);
      this.section = config ?? "test_alife_object";
      this.spawnIni = MockIniFile.mock("object_spawn.ini");
      this.online = true;
      this.canSave = true;
      this.canSwitchOnline = true;
      this.canSwitchOffline = true;
      this.isInteractive = true;
      this.isVisibleForMap = false;
      this.shouldMoveOffline = true;
      this.usesAiLocations = true;

      this.objectAlive = true;
      this.objectCommunity = "unknown";
      this.objectName = `${this.section}_${this.id}`;
    }

    addMockAlifeObjectToRegistry(this as unknown as cse_alife_object);
  }

  public name<T extends string>(): T {
    return this.objectName as T;
  }

  public section_name<T extends string>(): T {
    return this.section as T;
  }

  public clsid(): TXR_class_id {
    return this.classId;
  }

  public on_spawn(): void {}

  public on_before_register(): void {}

  public on_register(): void {}

  public on_unregister(): void {}

  public keep_saved_data_anyway(): boolean {
    return false;
  }

  public used_ai_locations(): boolean {
    return this.usesAiLocations;
  }

  public use_ai_locations(value: boolean): void {
    this.usesAiLocations = value;
  }

  public can_save(): boolean {
    return this.canSave;
  }

  public can_switch_online(): boolean;
  public can_switch_online(value: boolean): void;
  public can_switch_online(value?: boolean): boolean | void {
    if (typeof value === "boolean") {
      this.canSwitchOnline = value;
    } else {
      return this.canSwitchOnline;
    }
  }

  public can_switch_offline(): boolean;
  public can_switch_offline(value: boolean): void;
  public can_switch_offline(value?: boolean): boolean | void {
    if (typeof value === "boolean") {
      this.canSwitchOffline = value;
    } else {
      return this.canSwitchOffline;
    }
  }

  public init(): cse_alife_object {
    return this as unknown as cse_alife_object;
  }

  public interactive(): boolean {
    return this.isInteractive;
  }

  public visible_for_map(): boolean;
  public visible_for_map(value: boolean): void;
  public visible_for_map(value?: boolean): boolean | void {
    if (typeof value === "boolean") {
      this.isVisibleForMap = value;
    } else {
      return this.isVisibleForMap;
    }
  }

  public move_offline(): boolean;
  public move_offline(value: boolean): void;
  public move_offline(value?: boolean): boolean | void {
    if (typeof value === "boolean") {
      this.shouldMoveOffline = value;
    } else {
      return this.shouldMoveOffline;
    }
  }

  public spawn_ini = jest.fn(() => this.spawnIni);

  public community = jest.fn(() => this.objectCommunity);

  public alive = jest.fn(() => this.objectAlive);

  public update = jest.fn();

  public clear_smart_terrain = jest.fn();

  public UPDATE_Write(packet: net_packet): void {
    packet.w_stringZ(`update_write_from_${this.constructor.name}`);
  }

  public UPDATE_Read(packet: net_packet): void {
    packet.r_stringZ();
  }

  public STATE_Write(packet: net_packet): void {
    packet.w_stringZ(`state_write_from_${this.constructor.name}`);
  }

  public STATE_Read(packet: net_packet, size: number): void {
    packet.r_stringZ();
  }

  public FillProps(_pref: string, _items: prop_item_vec): void {}
}
