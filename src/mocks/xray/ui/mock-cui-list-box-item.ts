import { jest } from "@jest/globals";
import { type CUIListBoxItem, type CUIStatic, type CUITextWnd } from "xray16";

import { MockCUIStatic } from "./mock-cui-static";
import { MockCUITextWnd } from "./mock-cui-text-wnd";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic list box item.
 */
export class MockCUIListBoxItem extends MockCUIWindow implements CUIListBoxItem {
  public static override mock(): CUIListBoxItem {
    return new this() as unknown as CUIListBoxItem;
  }

  public static override create(): MockCUIListBoxItem {
    return new this();
  }

  public textItem: CUITextWnd = MockCUITextWnd.mock();
  public textField?: CUITextWnd;
  public iconItem?: CUIStatic;

  public AddTextField = jest.fn((text: string, _width?: number) => {
    this.textField = MockCUITextWnd.mock();
    this.textField.SetText(text);

    return this.textField;
  });

  public GetTextItem = jest.fn(() => this.textItem);

  public SetTextColor = jest.fn();

  public SetColor = jest.fn();

  public AddIconField = jest.fn((_value?: number) => {
    this.iconItem = MockCUIStatic.mock();

    return this.iconItem;
  });
}
