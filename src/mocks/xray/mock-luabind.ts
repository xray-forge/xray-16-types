/**
 * Mock abstraction for luabind classes.
 * Handles the `__name` wrapper that the custom transformer injects on luabind classes.
 */
export class MockLuabindClass {
  public static create(..._args: Array<never>): MockLuabindClass {
    return new MockLuabindClass();
  }

  public static mock(..._args: Array<never>): MockLuabindClass {
    return new MockLuabindClass();
  }

  public static get __name(): string {
    return this.name;
  }

  public get __name(): string {
    return this.constructor.name;
  }
}
