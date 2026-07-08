import type { cse_anomalous_zone } from "xray16";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock anomalous zone server object.
 */
export class MockAnomalousZone extends MockAlifeDynamicObject implements cse_anomalous_zone {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_anomalous_zone {
    return new this(config) as unknown as cse_anomalous_zone;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAnomalousZone {
    return new this(config);
  }
}
