import type { cse_alife_object_hanging_lamp } from "xray16";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife hanging lamp server object.
 */
export class MockAlifeHangingLamp extends MockAlifeDynamicObjectVisual implements cse_alife_object_hanging_lamp {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_object_hanging_lamp {
    return new this(config) as unknown as cse_alife_object_hanging_lamp;
  }
}
