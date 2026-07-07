import type { cse_torrid_zone } from "xray16";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock torrid zone server object.
 */
export class MockTorridZone extends MockAlifeDynamicObject implements cse_torrid_zone {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_torrid_zone {
    return new this(config) as unknown as cse_torrid_zone;
  }
}
