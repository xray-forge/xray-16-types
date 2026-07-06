import type { cse_alife_item } from "xray16";

import { MockAlifeDynamicObjectVisual } from "./mock-alife-dynamic-object-visual";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife item server object.
 */
export class MockAlifeItem extends MockAlifeDynamicObjectVisual {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item {
    return new this(config) as unknown as cse_alife_item;
  }
}
