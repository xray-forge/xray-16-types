import { type StaticDrawableWrapper } from "xray16";

import { MockCUIStatic } from "./mock-cui-static";

/**
 * Mock StaticDrawableWrapper.
 */
export class MockStaticDrawableWrapper {
  public static mock(id: string): StaticDrawableWrapper {
    return new MockStaticDrawableWrapper(id) as unknown as StaticDrawableWrapper;
  }

  public readonly id: string;
  public readonly uiStatic: MockCUIStatic = new MockCUIStatic();

  public constructor(id: string) {
    this.id = id;
  }

  public wnd(): MockCUIStatic {
    return this.uiStatic;
  }
}
