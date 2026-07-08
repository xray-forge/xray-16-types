import { jest } from "@jest/globals";
import { type CUIStatic, type StaticDrawableWrapper } from "xray16";

import { MockCUIStatic } from "./mock-cui-static";

/**
 * Mock StaticDrawableWrapper.
 */
export class MockStaticDrawableWrapper implements StaticDrawableWrapper {
  public static mock(id: string): StaticDrawableWrapper {
    return new this(id) as unknown as StaticDrawableWrapper;
  }

  public static create(id: string): MockStaticDrawableWrapper {
    return new this(id);
  }

  public readonly id: string;
  public readonly uiStatic: CUIStatic = MockCUIStatic.mock();
  public m_endTime: number = -1;
  public isDestroyed: boolean = false;

  public constructor(id: string) {
    this.id = id;
  }

  public wnd(): CUIStatic {
    return this.uiStatic;
  }

  public Draw = jest.fn();

  public Update = jest.fn();

  public IsActual = jest.fn(() => !this.isDestroyed);

  public SetText = jest.fn((text: string) => {
    this.uiStatic.SetText(text);
  });

  public destroy = jest.fn(() => {
    this.isDestroyed = true;
  });
}
