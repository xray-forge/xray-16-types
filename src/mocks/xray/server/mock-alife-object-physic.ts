import type { cse_alife_object_physic } from "xray16";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife physic server object.
 */
export class MockAlifeObjectPhysic extends MockAlifeDynamicObjectVisual implements cse_alife_object_physic {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_object_physic {
    return new this(config) as unknown as cse_alife_object_physic;
  }
}
