import { jest } from "@jest/globals";
import type { cse_alife_creature_actor } from "xray16";
import { ACTOR_ID } from "xray16/lib";

import { mockClsid } from "../mock-clsid";
import { defaultCommunities } from "../mock-constants";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Class based server object mock.
 */
export class MockAlifeCreatureActor extends MockAlifeDynamicObjectVisual {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_creature_actor {
    return new this(config) as unknown as cse_alife_creature_actor;
  }

  public constructor(config: IMockAlifeObjectConfig = {}) {
    super({
      ...config,
      id: ACTOR_ID,
      clsid: mockClsid.script_actor,
      community: defaultCommunities.actor,
    });
  }

  public on_death(): void {}

  public asMock(): cse_alife_creature_actor {
    return this as unknown as cse_alife_creature_actor;
  }

  public force_set_goodwill = jest.fn();
}
