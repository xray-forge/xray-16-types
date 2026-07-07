import { jest } from "@jest/globals";
import type { CAILifeMonsterBrain, cse_alife_creature_abstract, cse_alife_object, rotation } from "xray16";

import { MockCAlifeMonsterBrain } from "../mock-alife-monster-brain";
import { MAX_ALIFE_ID } from "../mock-constants";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock server creature object.
 */
export class MockServerAlifeCreatureAbstract
  extends MockAlifeDynamicObjectVisual
  implements cse_alife_creature_abstract
{
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_creature_abstract {
    return new this(config) as unknown as cse_alife_creature_abstract;
  }

  public squad: number;
  public team: number;
  public group: number;
  public group_id: number;
  public m_smart_terrain_id: number;
  public torso: rotation = { pitch: 0, yaw: 0 };
  public objectHealth: number;
  public objectRank: number;
  public objectTravelSpeed: number;
  public objectCurrentLevelTravelSpeed: number;
  public objectHasDetector: boolean;
  public aiBrain: CAILifeMonsterBrain = MockCAlifeMonsterBrain.mockInterface();

  public constructor(config: IMockAlifeObjectConfig) {
    super(config);

    this.squad = config.squad ?? 0;
    this.team = config.team ?? 0;
    this.group = config.groupId ?? 0;
    this.group_id = config.groupId ?? MAX_ALIFE_ID;
    this.m_smart_terrain_id = config.smartTerrainId ?? MAX_ALIFE_ID;
    this.objectHealth = config.health ?? (this.objectAlive ? 1 : 0);
    this.objectRank = config.rank ?? 0;
    this.objectTravelSpeed = config.travelSpeed ?? 1;
    this.objectCurrentLevelTravelSpeed = config.currentLevelTravelSpeed ?? 1;
    this.objectHasDetector = config.hasDetector ?? false;
  }

  public o_torso = jest.fn(() => this.torso);

  public brain = jest.fn(() => this.aiBrain);

  public health = jest.fn(() => this.objectHealth);

  public g_team = jest.fn(() => this.team);

  public g_group = jest.fn(() => this.group);

  public g_squad = jest.fn(() => this.squad);

  public force_set_goodwill = jest.fn();

  public smart_terrain_task_activate = jest.fn();

  public smart_terrain_task_deactivate = jest.fn();

  public smart_terrain_id = jest.fn(() => this.m_smart_terrain_id);

  public kill(): void {
    this.objectAlive = false;
    this.objectHealth = 0;
  }

  public on_death(_killer?: cse_alife_object): void {
    this.kill();
  }

  public travel_speed(): number;
  public travel_speed(value: number): void;
  public travel_speed(value?: number): number | void {
    if (typeof value === "number") {
      this.objectTravelSpeed = value;
    } else {
      return this.objectTravelSpeed;
    }
  }

  public current_level_travel_speed(): number;
  public current_level_travel_speed(value: number): void;
  public current_level_travel_speed(value?: number): number | void {
    if (typeof value === "number") {
      this.objectCurrentLevelTravelSpeed = value;
    } else {
      return this.objectCurrentLevelTravelSpeed;
    }
  }

  public has_detector = jest.fn(() => this.objectHasDetector);

  public rank = jest.fn(() => this.objectRank);
}
