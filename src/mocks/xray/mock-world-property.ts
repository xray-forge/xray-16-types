import { MockLuabindClass } from "./mock-luabind";

/**
 * Mock of the X-Ray engine logics world property.
 */
export class MockWorldProperty extends MockLuabindClass {
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
