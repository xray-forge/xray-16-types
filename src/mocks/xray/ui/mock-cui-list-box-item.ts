import { jest } from "@jest/globals";

import { MockCUIStatic } from "./mock-cui-static";
import { MockCUITextWnd } from "./mock-cui-text-wnd";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic list box item.
 */
export class MockCUIListBoxItem extends MockCUIWindow {
  public textItem: MockCUITextWnd = new MockCUITextWnd();
  public textField?: MockCUITextWnd;
  public iconItem?: MockCUIStatic;

  public AddTextField = jest.fn((text: string) => {
    this.textField = new MockCUITextWnd();
    this.textField.SetText(text);

    return this.textField;
  });

  public GetTextItem = jest.fn(() => this.textItem);

  public SetTextColor = jest.fn();

  public AddIconField = jest.fn(() => {
    this.iconItem = new MockCUIStatic();

    return this.iconItem;
  });
}
