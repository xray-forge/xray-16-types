import { jest } from "@jest/globals";
import { type CUIListBox } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock CUI list box.
 */
export class MockCUIListBox extends MockCUIWindow {
  public static override mock(): CUIListBox {
    return new MockCUIListBox() as unknown as CUIListBox;
  }

  public SetSelectedIndex = jest.fn();

  public GetSelectedIndex = jest.fn();

  public ShowSelectedItem = jest.fn();

  public RemoveAll = jest.fn();
}
