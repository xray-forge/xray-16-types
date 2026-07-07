import type { cse_alife_item_explosive } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife explosive server object.
 */
export class MockAlifeItemExplosive extends MockAlifeItem implements cse_alife_item_explosive {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_explosive {
    return new this(config) as unknown as cse_alife_item_explosive;
  }
}
