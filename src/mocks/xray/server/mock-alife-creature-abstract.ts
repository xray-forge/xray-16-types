import { jest } from "@jest/globals";
import type { cse_alife_creature_abstract } from "xray16";

import { MAX_ALIFE_ID } from "../mock-constants";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock server creature object.
 */
export class MockServerAlifeCreatureAbstract extends MockAlifeDynamicObjectVisual {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_creature_abstract {
    return new this(config) as unknown as cse_alife_creature_abstract;
  }

  public m_smart_terrain_id: number;
  public group_id: number;
  public torso: Record<string, any> = {};

  public constructor(config: IMockAlifeObjectConfig) {
    super(config);

    this.group_id = config.groupId ?? MAX_ALIFE_ID;
    this.m_smart_terrain_id = config.smartTerrainId ?? MAX_ALIFE_ID;
  }

  public o_torso = jest.fn(() => this.torso);

  public force_set_goodwill = jest.fn();

  public smart_terrain_task_activate = jest.fn();

  public smart_terrain_id = jest.fn(() => this.m_smart_terrain_id);

  public on_death(): void {}
}
