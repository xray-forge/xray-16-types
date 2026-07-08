import { jest } from "@jest/globals";
import { type CUITrackBar } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic trackbar.
 */
export class MockCUITrackBar extends MockCUIWindow implements CUITrackBar {
  public static override mock(): CUITrackBar {
    return new this() as unknown as CUITrackBar;
  }

  public static override create(): MockCUITrackBar {
    return new this();
  }

  public id: number = 1;
  public floatValue: number = 1;
  public isChecked: boolean = false;

  public GetIValue = jest.fn(() => this.id);
  public SetCurrentValue = jest.fn((value?: number) => {
    if (typeof value === "number") {
      this.id = value;
      this.floatValue = value;
    }
  });
  public SetCheck = jest.fn((value: boolean) => {
    this.isChecked = value;
  });
  public GetCheck = jest.fn(() => this.isChecked);
  public GetFValue = jest.fn(() => this.floatValue);
  public SetOptIBounds = jest.fn();
  public SetOptFBounds = jest.fn(() => 0);
}
