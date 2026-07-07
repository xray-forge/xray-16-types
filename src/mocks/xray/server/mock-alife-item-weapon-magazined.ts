import type { cse_alife_item_weapon_magazined } from "xray16";

import { MockAlifeItemWeapon } from "./mock-alife-item-weapon";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife magazined weapon item server object.
 */
export class MockAlifeItemWeaponMagazined extends MockAlifeItemWeapon implements cse_alife_item_weapon_magazined {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_weapon_magazined {
    return new this(config) as unknown as cse_alife_item_weapon_magazined;
  }
}
