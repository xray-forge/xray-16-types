import { jest } from "@jest/globals";
import type {
  CALifeSmartTerrainTask,
  cse_alife_creature_abstract,
  cse_alife_online_offline_group,
  IXR_squad_member,
} from "xray16";

import { mockClsid } from "../mock-clsid";
import { type TDefaultCommunity } from "../mock-constants";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";
import { MockAlifeSimulator } from "./mock-alife-simulator";

/**
 * Loosely typed condition list (parsed `cond` descriptor) - inlined from the engine `TConditionList`.
 */
type TConditionList = Array<Record<string, any>>;

/**
 * Class mocking generic server offline-online group.
 */
export class MockAlifeOnlineOfflineGroup extends MockAlifeDynamicObject implements cse_alife_online_offline_group {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_online_offline_group {
    return new this({
      ...config,
      clsid: mockClsid.online_offline_group_s,
    }) as unknown as cse_alife_online_offline_group;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeOnlineOfflineGroup {
    return new this({
      ...config,
      clsid: mockClsid.online_offline_group_s,
    });
  }

  public members: Array<IXR_squad_member<cse_alife_creature_abstract>> = [];
  public object: cse_alife_creature_abstract = null as unknown as cse_alife_creature_abstract;
  public invulnerable!: TConditionList;
  public faction!: TDefaultCommunity;

  public squad_members = jest.fn((): LuaIterable<IXR_squad_member<cse_alife_creature_abstract>> => {
    return this.members as unknown as LuaIterable<IXR_squad_member<cse_alife_creature_abstract>>;
  });

  public register_member(id: number): void {
    const object = MockAlifeSimulator.getFromRegistry(id) as cse_alife_creature_abstract;

    this.object = object;
    this.members.push({ id: id, object });
  }

  public unregister_member(id: number): void {
    const index: number = this.members.findIndex((it) => it.id === id);

    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  public addMember(): void {}

  public assignToTerrain(): void {}

  public getScriptedSimulationTarget(): void {}

  public get_current_task(): CALifeSmartTerrainTask {
    return null as unknown as CALifeSmartTerrainTask;
  }

  public add_location_type = jest.fn(() => {});

  public clear_location_types = jest.fn(() => {});

  public force_change_position = jest.fn(() => {});

  public commander_id(): number {
    return null as unknown as number;
  }

  public npc_count = jest.fn((): number => {
    return this.members.length;
  });

  public force_set_goodwill = jest.fn();

  public asMock(): cse_alife_online_offline_group {
    return this as unknown as cse_alife_online_offline_group;
  }
}
