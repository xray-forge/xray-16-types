import { jest } from "@jest/globals";
import { type CUITextWnd } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUITextWnd extends MockCUIWindow implements CUITextWnd {
  public static override mock(): CUITextWnd {
    return new this() as unknown as CUITextWnd;
  }

  public static override create(): MockCUITextWnd {
    return new this();
  }

  public text: string = "";
  public textColor: number = 0xffffffff;
  public textOffsetX: number = 0;
  public textOffsetY: number = 0;
  public isComplexMode: boolean = false;

  public SetText = jest.fn((text: string) => (this.text = text));

  public GetText = jest.fn(() => this.text);

  public SetTextAlignment = jest.fn();

  public SetEllipsis = jest.fn();

  public SetTextOffset = jest.fn((x: number, y: number) => {
    this.textOffsetX = x;
    this.textOffsetY = y;
  });

  public SetTextComplexMode = jest.fn((complex: boolean) => {
    this.isComplexMode = complex;
  });

  public GetTextColor = jest.fn(() => this.textColor);

  public SetTextColor = jest.fn((color: number) => {
    this.textColor = color;
  });

  public SetTextST = jest.fn((text: string) => {
    this.text = text;
  });

  public AdjustHeightToText = jest.fn();

  public AdjustWidthToText = jest.fn();

  public SetVTextAlignment = jest.fn();
}
