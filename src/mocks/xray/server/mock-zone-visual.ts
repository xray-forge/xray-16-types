import type { cse_zone_visual } from "xray16";

import { type IMockAlifeObjectConfig } from "./mock-alife-object";
import { MockAnomalousZone } from "./mock-anomalous-zone";

/**
 * Mock visual zone server object.
 */
export class MockZoneVisual extends MockAnomalousZone implements cse_zone_visual {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_zone_visual {
    return new this(config) as unknown as cse_zone_visual;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockZoneVisual {
    return new this(config);
  }
}
