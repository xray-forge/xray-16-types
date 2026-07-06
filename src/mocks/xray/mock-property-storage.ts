import { type property_storage } from "xray16";

import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine AI property storage (properties + actions for the graph).
 */
export class MockPropertyStorage extends MockLuabindClass {
  public static mock(): property_storage {
    return new MockPropertyStorage() as unknown as property_storage;
  }
}
