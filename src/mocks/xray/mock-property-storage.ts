import { type property_storage, type u32 } from "xray16";

import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine AI property storage (properties + actions for the graph).
 */
export class MockPropertyStorage extends MockLuabindClass implements property_storage {
  public readonly values: Map<u32, boolean> = new Map();
  public static mock(): property_storage {
    return new MockPropertyStorage() as unknown as property_storage;
  }

  public property(id: u32): boolean {
    return this.values.get(id) ?? false;
  }

  public set_property(id: u32, value: boolean): void {
    this.values.set(id, value);
  }
}
