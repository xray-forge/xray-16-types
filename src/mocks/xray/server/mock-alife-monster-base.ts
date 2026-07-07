import { jest } from "@jest/globals";
import type { CAILifeMonsterBrain, cse_alife_monster_base } from "xray16";

import { MockCAlifeMonsterBrain } from "../mock-alife-monster-brain";
import { mockClsid } from "../mock-clsid";

import { MockServerAlifeCreatureAbstract } from "./mock-alife-creature-abstract";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife monster creature server object.
 */
export class MockAlifeMonsterBase extends MockServerAlifeCreatureAbstract implements cse_alife_monster_base {
  public static override mockWithClassId(classId: number): cse_alife_monster_base {
    return new this({ clsid: classId }) as unknown as cse_alife_monster_base;
  }

  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_monster_base {
    const object: MockAlifeMonsterBase = new this({ ...config, clsid: config.clsid ?? mockClsid.bloodsucker_s });

    object.objectRank = config.rank ?? -1;

    return object as unknown as cse_alife_monster_base;
  }

  public override aiBrain: CAILifeMonsterBrain = MockCAlifeMonsterBrain.mockInterface();

  public override objectRank: number = -1;

  public override brain = jest.fn(() => this.aiBrain);

  public override rank = jest.fn(() => this.objectRank);
}
