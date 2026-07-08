import { jest } from "@jest/globals";
import { type CDialogHolder, type CUIDialogWnd } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUIDialogWnd extends MockCUIWindow implements CUIDialogWnd {
  public static override mock(): CUIDialogWnd {
    return new this() as unknown as CUIDialogWnd;
  }

  public static override create(): MockCUIDialogWnd {
    return new this();
  }

  public holder: CDialogHolder | null = null;

  public HideDialog = jest.fn();

  public ShowDialog = jest.fn();

  public GetHolder = jest.fn(() => this.holder as CDialogHolder);

  public SetHolder = jest.fn((holder: CDialogHolder) => {
    this.holder = holder;
  });
}
