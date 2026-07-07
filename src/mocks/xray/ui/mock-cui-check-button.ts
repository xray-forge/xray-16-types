import { jest } from "@jest/globals";
import { type CUICheckButton } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock check button.
 */
export class MockCUICheckButton extends MockCUIWindow {
  public static override mock(): CUICheckButton {
    return new MockCUICheckButton() as unknown as CUICheckButton;
  }

  public isChecked: boolean = false;

  public SetCheck = jest.fn((isChecked: boolean) => {
    this.isChecked = isChecked;
  });

  public GetCheck = jest.fn(() => this.isChecked);

  public SetDependControl = jest.fn();
}
