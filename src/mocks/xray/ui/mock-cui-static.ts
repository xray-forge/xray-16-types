import { jest } from "@jest/globals";
import { type CUIStatic } from "xray16";

import { MockCUILines } from "./mock-cui-lines";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock CUI static.
 */
export class MockCUIStatic extends MockCUIWindow {
  public static override mock(): CUIStatic {
    return new MockCUIStatic() as unknown as CUIStatic;
  }

  public textControl: MockCUILines = new MockCUILines();

  public TextControl = jest.fn(() => this.textControl);

  public SetStretchTexture = jest.fn();

  public SetTextureRect = jest.fn();

  public SetText = jest.fn();
}
