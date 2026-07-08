import type { cse_alife_item_grenade } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife grenade item server object.
 */
export class MockAlifeItemGrenade extends MockAlifeItem implements cse_alife_item_grenade {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_grenade {
    return new this(config) as unknown as cse_alife_item_grenade;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemGrenade {
    return new this(config);
  }
}
