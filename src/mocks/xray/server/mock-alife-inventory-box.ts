import type { cse_alife_inventory_box } from "xray16";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife inventory box server object.
 */
export class MockAlifeInventoryBox extends MockAlifeDynamicObjectVisual implements cse_alife_inventory_box {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_inventory_box {
    return new this(config) as unknown as cse_alife_inventory_box;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeInventoryBox {
    return new this(config);
  }
}
