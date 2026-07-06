import { jest } from "@jest/globals";
import type { cse_alife_object, ini_file, net_packet, TXR_class_id, vector } from "xray16";

import { mockConfig } from "../mock-config";
import { MockIniFile } from "../mock-ini-file";
import { MockLuabindClass } from "../mock-luabind";
import { MockVector } from "../mock-vector";

import { MockAlifeSimulator } from "./mock-alife-simulator";

export interface IMockAlifeObjectConfig {
  alive?: boolean;
  clsid?: number;
  community?: string;
  gameVertexId?: number;
  groupId?: number;
  id?: number;
  levelVertexId?: number;
  name?: string;
  online?: boolean;
  parentId?: number;
  position?: vector;
  rank?: number;
  section?: string;
  smartTerrainId?: number;
  spawnIni?: ini_file;
  storyId?: number;
}

/**
 * Mock base alife object implementation.
 */
export class MockAlifeObject extends MockLuabindClass {
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
  public m_level_vertex_id: number;
  public m_game_vertex_id: number;

  public online: boolean;
  public canSwitchOnline: boolean = true;
  public canSwitchOffline: boolean = true;

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
      this.position = config.position ?? MockVector.mock(0, 0, 0);
      this.section = config.section ?? "test_alife_object";
      this.spawnIni = typeof config.spawnIni === "undefined" ? MockIniFile.mock("object_spawn.ini") : config.spawnIni;
      this.online = config.online ?? true;

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
      this.position = MockVector.mock(0, 0, 0);
      this.section = config ?? "test_alife_object";
      this.spawnIni = MockIniFile.mock("object_spawn.ini");
      this.online = true;

      this.objectAlive = true;
      this.objectCommunity = "unknown";
      this.objectName = `${this.section}_${this.id}`;
    }

    MockAlifeSimulator.addToRegistry(this as unknown as cse_alife_object);
  }

  public name(): string {
    return this.objectName;
  }

  public section_name(): string {
    return this.section;
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

  public can_switch_online(): boolean {
    return this.canSwitchOnline;
  }

  public can_switch_offline(): boolean {
    return this.canSwitchOffline;
  }

  public spawn_ini = jest.fn(() => this.spawnIni);

  public community = jest.fn(() => this.objectCommunity);

  public alive = jest.fn(() => this.objectAlive);

  public visible_for_map = jest.fn();

  public update = jest.fn();

  public clear_smart_terrain = jest.fn();

  public STATE_Write(packet: net_packet): void {
    packet.w_stringZ(`state_write_from_${this.constructor.name}`);
  }

  public STATE_Read(packet: net_packet, size: number): void {
    packet.r_stringZ();
  }
}
