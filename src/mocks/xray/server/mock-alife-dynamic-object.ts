import type { cse_alife_dynamic_object } from "xray16";

import { type IMockAlifeObjectConfig, MockAlifeObject } from "./mock-alife-object";

/**
 * Mock dynamic alife server object.
 */
export class MockAlifeDynamicObject extends MockAlifeObject implements cse_alife_dynamic_object {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_dynamic_object {
    return new this(config) as unknown as cse_alife_dynamic_object;
  }

  public switch_offline(): void {
    this.online = false;
  }

  public switch_online(): void {
    this.online = true;
  }
}
