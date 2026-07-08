import { jest } from "@jest/globals";
import type { CALifeSmartTerrainTask, cse_alife_monster_abstract, cse_alife_smart_zone } from "xray16";

import { mockClsid } from "../mock-clsid";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

export interface IMockAlifeSmartZoneConfig extends IMockAlifeObjectConfig {
  detectProbability?: number;
  enabled?: boolean;
  suitable?: number;
  task?: CALifeSmartTerrainTask | null;
}

/**
 * Mock alife smart zone server object.
 */
export class MockAlifeSmartZone extends MockAlifeDynamicObject implements cse_alife_smart_zone {
  public registeredNpcs: Map<number, cse_alife_monster_abstract> = new Map();
  public objectDetectProbability: number;
  public objectEnabled: boolean;
  public objectSuitable: number;
  public objectTask: CALifeSmartTerrainTask | null;

  public static override mock(config: IMockAlifeSmartZoneConfig = {}): cse_alife_smart_zone {
    return new this({ ...config, clsid: mockClsid.smart_zone }) as unknown as cse_alife_smart_zone;
  }

  public static override create(config: IMockAlifeSmartZoneConfig = {}): MockAlifeSmartZone {
    return new this({ ...config, clsid: config.clsid ?? mockClsid.smart_zone });
  }

  public constructor(config: IMockAlifeSmartZoneConfig = {}) {
    super({ ...config, clsid: config.clsid ?? mockClsid.smart_zone });

    this.objectDetectProbability = config.detectProbability ?? 1;
    this.objectEnabled = config.enabled ?? true;
    this.objectSuitable = config.suitable ?? 1;
    this.objectTask = config.task ?? null;
  }

  public set_available_loopholes = jest.fn();

  public detect_probability(): number {
    return this.objectDetectProbability;
  }

  public smart_touch(_monster: cse_alife_monster_abstract): void {}

  public register_npc(monster: cse_alife_monster_abstract): void {
    this.registeredNpcs.set(monster.id, monster);

    monster.m_smart_terrain_id = this.id;
  }

  public unregister_npc(monster: cse_alife_monster_abstract): void {
    this.registeredNpcs.delete(monster.id);

    monster.m_smart_terrain_id = 65535;
  }

  public suitable(_monster: cse_alife_monster_abstract): number {
    return this.objectSuitable;
  }

  public task(_monster: cse_alife_monster_abstract): CALifeSmartTerrainTask | null {
    return this.objectTask;
  }

  public enabled(_monster: cse_alife_monster_abstract): boolean {
    return this.objectEnabled;
  }
}
