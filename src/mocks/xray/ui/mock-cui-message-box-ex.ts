import { jest } from "@jest/globals";
import { type CUIMessageBoxEx } from "xray16";

import { MockCUIDialogWnd } from "./mock-cui-dialog-wnd";

/**
 * Mock generic message box.
 */
export class MockCUIMessageBoxEx extends MockCUIDialogWnd implements CUIMessageBoxEx {
  public static override mock(): CUIMessageBoxEx {
    return new this() as unknown as CUIMessageBoxEx;
  }

  public static override create(): MockCUIMessageBoxEx {
    return new this();
  }

  public text: string = "";
  public password: string = "";
  public host: string = "";

  public SetText = jest.fn((text: string) => {
    this.text = text;
  });

  public InitMessageBox = jest.fn();

  public GetPassword = jest.fn(() => this.password);

  public GetHost = jest.fn(() => this.host);
}
