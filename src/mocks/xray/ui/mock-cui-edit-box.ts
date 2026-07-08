import { jest } from "@jest/globals";
import { type CUICustomEdit, type CUIEditBox } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mocking edit box for testing.
 */
export class MockCUIEditBox extends MockCUIWindow implements CUIEditBox {
  public static override mock(): CUIEditBox {
    return new this() as unknown as CUIEditBox;
  }

  public static override create(): MockCUIEditBox {
    return new this();
  }

  public text: string = "";
  public texture: string | null = null;
  public nextFocusCapturer: CUICustomEdit | null = null;

  public GetText = jest.fn(() => this.text);

  public SetText = jest.fn((text: string) => (this.text = text));

  public CaptureFocus = jest.fn();

  public SetNextFocusCapturer = jest.fn((edit: CUICustomEdit) => {
    this.nextFocusCapturer = edit;
  });

  public InitTexture = jest.fn((texture: string) => {
    this.texture = texture;
  });
}
