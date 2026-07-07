import type { cse_alife_item_ammo } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife ammo item server object.
 */
export class MockAlifeItemAmmo extends MockAlifeItem implements cse_alife_item_ammo {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_ammo {
    return new this(config) as unknown as cse_alife_item_ammo;
  }
}
