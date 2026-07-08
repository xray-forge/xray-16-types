import { jest } from "@jest/globals";
import { type CUILines } from "xray16";

/**
 * Mock CUILines.
 */
export class MockCUILines implements CUILines {
  public static mock(): CUILines {
    return new this() as unknown as CUILines;
  }

  public static create(): MockCUILines {
    return new this();
  }

  public text: string = "";

  public GetText = jest.fn(() => {
    return this.text;
  });

  public SetText = jest.fn((text: string) => {
    this.text = text;
  });

  public SetTextST = jest.fn((text: string) => {
    this.text = text;
  });

  public SetElipsis = jest.fn();

  public SetFont = jest.fn();

  public SetTextColor = jest.fn();
}
