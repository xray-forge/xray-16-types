import type { cse_alife_item_custom_outfit } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife outfit server object.
 */
export class MockAlifeItemOutfit extends MockAlifeItem implements cse_alife_item_custom_outfit {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_custom_outfit {
    return new this(config) as unknown as cse_alife_item_custom_outfit;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemOutfit {
    return new this(config);
  }
}
