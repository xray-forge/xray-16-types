import { type u32, type world_property, type world_state } from "xray16";

import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine logics world state.
 */
export class MockWorldState extends MockLuabindClass implements world_state {
  public static override create(state?: world_state): MockWorldState {
    return new MockWorldState(state);
  }

  public static override mock(state?: world_state): world_state {
    return new MockWorldState(state);
  }

  public properties: Array<world_property> = [];

  public constructor(state?: world_state) {
    super();

    if (state instanceof MockWorldState) {
      this.properties = [...state.properties];
    }
  }

  public add_property(property: world_property): void {
    this.remove_property(property.condition());
    this.properties.push(property);
  }

  public clear(): void {
    this.properties = [];
  }

  public includes(state: world_state): boolean {
    return state instanceof MockWorldState && state.properties.every((property) => {
      const own: world_property | undefined = this.properties.find((it) => it.condition() === property.condition());

      return own?.value() === property.value();
    });
  }

  public property(id: u32): world_property {
    return (this.properties.find((it) => it.condition() === id) ?? null) as unknown as world_property;
  }

  public remove_property(id: u32): void {
    this.properties = this.properties.filter((property) => property.condition() !== id);
  }
}
