import type { cse_alife_item } from "xray16";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife item server object.
 */
export class MockAlifeItem extends MockAlifeDynamicObjectVisual implements cse_alife_item {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item {
    return new this(config) as unknown as cse_alife_item;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItem {
    return new this(config);
  }

  public objectUpgrades: Set<string> = new Set();
  public isUsefulForNpc: boolean = false;

  public bfUseful(): boolean {
    return this.isUsefulForNpc;
  }

  public has_upgrade(section: string): boolean {
    return this.objectUpgrades.has(section);
  }

  public add_upgrade(section: string): void {
    this.objectUpgrades.add(section);
  }
}
