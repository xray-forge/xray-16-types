import { jest } from "@jest/globals";

import { MockCUIDialogWnd } from "./mock-cui-dialog-wnd";

/**
 * Mock generic message box.
 */
export class MockCUIMessageBoxEx extends MockCUIDialogWnd {
  public SetText = jest.fn();

  public InitMessageBox = jest.fn();
}
