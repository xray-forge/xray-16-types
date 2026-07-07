import type { cse_alife_space_restrictor } from "xray16";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock space restrictor server object.
 */
export class MockSpaceRestrictor extends MockAlifeDynamicObject implements cse_alife_space_restrictor {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_space_restrictor {
    return new this(config) as unknown as cse_alife_space_restrictor;
  }
}
