import type { cse_alife_item_weapon } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife weapon item server object.
 */
export class MockAlifeItemWeapon extends MockAlifeItem implements cse_alife_item_weapon {
  public objectAmmoElapsed: number = 0;
  public objectAmmoMagSize: number = 30;

  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_weapon {
    return new this(config) as unknown as cse_alife_item_weapon;
  }

  public clone_addons(_weapon: cse_alife_item_weapon): void {}

  public set_ammo_elapsed(count: number): void {
    this.objectAmmoElapsed = count;
  }

  public get_ammo_elapsed(): number {
    return this.objectAmmoElapsed;
  }

  public get_ammo_magsize(): number {
    return this.objectAmmoMagSize;
  }
}
