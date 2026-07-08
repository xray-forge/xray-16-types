import type { cse_alife_helicopter } from "xray16";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock helicopter server object.
 */
export class MockAlifeHelicopter extends MockAlifeDynamicObjectVisual implements cse_alife_helicopter {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_helicopter {
    return new this(config) as unknown as cse_alife_helicopter;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeHelicopter {
    return new this(config);
  }
}
