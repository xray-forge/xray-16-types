import type { cse_alife_item_detector } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife detector server object.
 */
export class MockAlifeItemDetector extends MockAlifeItem implements cse_alife_item_detector {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_detector {
    return new this(config) as unknown as cse_alife_item_detector;
  }
}
