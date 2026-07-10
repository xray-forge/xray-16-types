import type { cse_alife_item_weapon_magazined_w_gl } from "xray16";

import { MockAlifeItemWeapon } from "./mock-alife-item-weapon";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife magazined weapon with grenade launcher server object.
 */
export class MockAlifeItemWeaponMagazinedWGL
  extends MockAlifeItemWeapon
  implements cse_alife_item_weapon_magazined_w_gl
{
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_weapon_magazined_w_gl {
    return new this(config) as unknown as cse_alife_item_weapon_magazined_w_gl;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemWeaponMagazinedWGL {
    return new this(config);
  }
}
