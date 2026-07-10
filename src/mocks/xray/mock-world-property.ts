import { type world_property } from "xray16";

import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine logics world property.
 */
export class MockWorldProperty extends MockLuabindClass implements world_property {
  public static override create(condition: number, value: boolean): MockWorldProperty {
    return new MockWorldProperty(condition, value);
  }

  public static override mock(condition: number, value: boolean): world_property {
    return new MockWorldProperty(condition, value);
  }

  private readonly worldCondition: number;
  private readonly worldValue: boolean;

  public constructor(condition: number, value: boolean) {
    super();

    this.worldCondition = condition;
    this.worldValue = value;
  }

  public value(): boolean {
    return this.worldValue;
  }

  public condition(): number {
    return this.worldCondition;
  }
}
