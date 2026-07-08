import { jest } from "@jest/globals";
import type { cse_alife_creature_actor } from "xray16";

import { mockClsid } from "../mock-clsid";
import { ACTOR_ID, defaultCommunities } from "../mock-constants";

import { MockServerAlifeCreatureAbstract } from "./mock-alife-creature-abstract";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Class based server object mock.
 */
export class MockAlifeCreatureActor extends MockServerAlifeCreatureAbstract implements cse_alife_creature_actor {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_creature_actor {
    return new this(config) as unknown as cse_alife_creature_actor;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeCreatureActor {
    return new this(config);
  }

  public constructor(config: IMockAlifeObjectConfig = {}) {
    super({
      ...config,
      id: ACTOR_ID,
      clsid: mockClsid.script_actor,
      community: defaultCommunities.actor,
    });
  }

  public override on_death(): void {}

  public asMock(): cse_alife_creature_actor {
    return this as unknown as cse_alife_creature_actor;
  }

  public override force_set_goodwill = jest.fn();

  public objectProfileName: string = "actor";
  public objectCharacterName: string = "actor";
  public objectCharacterIcon: string = "ui_inGame2_actor";
  public objectReputation: number = 0;

  public reputation = jest.fn(() => this.objectReputation);

  public override rank = jest.fn(() => this.objectRank);

  public set_rank = jest.fn((rank: number) => {
    this.objectRank = rank;
  });

  public profile_name = jest.fn(() => this.objectProfileName);

  public character_name = jest.fn(() => this.objectCharacterName);

  public character_icon = jest.fn(() => this.objectCharacterIcon);

  public set_profile_name = jest.fn((name: string) => {
    this.objectProfileName = name;
  });

  public set_character_name = jest.fn((name: string) => {
    this.objectCharacterName = name;
  });
}
