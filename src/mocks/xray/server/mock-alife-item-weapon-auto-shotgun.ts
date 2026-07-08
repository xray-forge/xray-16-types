import type { cse_alife_item_weapon_auto_shotgun } from "xray16";

import { MockAlifeItemWeapon } from "./mock-alife-item-weapon";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife auto shotgun server object.
 */
export class MockAlifeItemWeaponAutoShotgun extends MockAlifeItemWeapon implements cse_alife_item_weapon_auto_shotgun {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_weapon_auto_shotgun {
    return new this(config) as unknown as cse_alife_item_weapon_auto_shotgun;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemWeaponAutoShotgun {
    return new this(config);
  }
}
