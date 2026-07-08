import type { cse_alife_dynamic_object_visual } from "xray16";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife dynamic visual server object.
 */
export class MockAlifeDynamicObjectVisual extends MockAlifeDynamicObject implements cse_alife_dynamic_object_visual {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_dynamic_object_visual {
    return new this(config) as unknown as cse_alife_dynamic_object_visual;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeDynamicObjectVisual {
    return new this(config);
  }

  public set_yaw(yaw: number): void {
    this.angle.y = yaw;
  }
}
