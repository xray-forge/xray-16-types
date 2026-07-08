import type { cse_alife_item_helmet } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife helmet server object.
 */
export class MockAlifeItemHelmet extends MockAlifeItem implements cse_alife_item_helmet {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_helmet {
    return new this(config) as unknown as cse_alife_item_helmet;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemHelmet {
    return new this(config);
  }
}
