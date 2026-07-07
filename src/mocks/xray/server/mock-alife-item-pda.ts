import type { cse_alife_item_pda } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock server PDA item.
 */
export class MockAlifeItemPda extends MockAlifeItem implements cse_alife_item_pda {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_pda {
    return new this(config) as unknown as cse_alife_item_pda;
  }
}
