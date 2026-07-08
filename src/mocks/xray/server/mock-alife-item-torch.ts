import type { cse_alife_item_torch } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock torch item server object.
 */
export class MockAlifeItemTorch extends MockAlifeItem implements cse_alife_item_torch {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_torch {
    return new this(config) as unknown as cse_alife_item_torch;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemTorch {
    return new this(config);
  }
}
