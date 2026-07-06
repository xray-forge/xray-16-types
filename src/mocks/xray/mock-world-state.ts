import { type world_property } from "xray16";

import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine logics world state.
 */
export class MockWorldState extends MockLuabindClass {
  public properties: Array<world_property> = [];

  public add_property(property: world_property): void {
    this.properties.push(property);
  }
}
