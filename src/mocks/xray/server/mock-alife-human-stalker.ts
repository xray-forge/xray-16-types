import { jest } from "@jest/globals";
import type { CALifeMonsterBrain, cse_alife_human_abstract } from "xray16";

import { MockCAlifeMonsterBrain } from "../mock-alife-monster-brain";
import { mockClsid } from "../mock-clsid";
import { MAX_ALIFE_ID } from "../mock-constants";

import { MockServerAlifeCreatureAbstract } from "./mock-alife-creature-abstract";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock server human object representation.
 */
export class MockAlifeHumanStalker extends MockServerAlifeCreatureAbstract implements cse_alife_human_abstract {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_human_abstract {
    return new this({
      ...config,
      community: config.community ?? "stalker",
      clsid: config.clsid ?? mockClsid.script_stalker,
    }) as unknown as cse_alife_human_abstract;
  }

  public static override create(config: IMockAlifeObjectConfig | string = {}): MockAlifeHumanStalker {
    return new MockAlifeHumanStalker(typeof config === "string" ? { section: config } : config);
  }

  public static override mockWithClassId(clsid: number): cse_alife_human_abstract {
    const object: MockAlifeHumanStalker = new MockAlifeHumanStalker({
      section: "test_alife_object",
      community: "stalker",
      clsid: clsid,
    });

    return object as unknown as cse_alife_human_abstract;
  }

  public override m_smart_terrain_id: number = MAX_ALIFE_ID;
  public override aiBrain: CALifeMonsterBrain = MockCAlifeMonsterBrain.mock();
  public objectProfileName: string = "stalker_profile";
  public objectReputation: number = 0;

  public override brain = jest.fn(() => this.aiBrain);

  public profile_name = jest.fn(() => this.objectProfileName);

  public set_rank = jest.fn((rank: number) => {
    this.objectRank = rank;
  });

  public reputation = jest.fn(() => this.objectReputation);

  public override can_switch_online(): boolean {
    return false;
  }

  public override can_switch_offline(): boolean {
    return false;
  }
}
