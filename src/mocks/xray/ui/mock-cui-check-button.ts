import { jest } from "@jest/globals";
import { type CUICheckButton } from "xray16";

import { MockCUI3tButton } from "./mock-cui-3t-button";

/**
 * Mock check button.
 */
export class MockCUICheckButton extends MockCUI3tButton implements CUICheckButton {
  public static override mock(): CUICheckButton {
    return new this() as unknown as CUICheckButton;
  }

  public static override create(): MockCUICheckButton {
    return new this();
  }

  public isChecked: boolean = false;

  public SetCheck = jest.fn((isChecked: boolean) => {
    this.isChecked = isChecked;
  });

  public GetCheck = jest.fn(() => this.isChecked);

  public SetDependControl = jest.fn();
}
