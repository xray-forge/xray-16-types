import type { cse_alife_item_weapon_shotgun } from "xray16";

import { MockAlifeItemWeapon } from "./mock-alife-item-weapon";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife shotgun weapon server object.
 */
export class MockAlifeItemWeaponShotgun extends MockAlifeItemWeapon implements cse_alife_item_weapon_shotgun {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_weapon_shotgun {
    return new this(config) as unknown as cse_alife_item_weapon_shotgun;
  }
}
