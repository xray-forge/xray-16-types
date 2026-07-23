import { jest } from "@jest/globals";
import { type CUIMessageBox } from "xray16";

import { MockCUIStatic } from "./mock-cui-static";

/**
 * Mock generic message box.
 */
export class MockCUIMessageBox extends MockCUIStatic implements CUIMessageBox {
  public static override mock(): CUIMessageBox {
    return new this() as unknown as CUIMessageBox;
  }

  public static override create(): MockCUIMessageBox {
    return new this();
  }

  public password: string = "";
  public host: string = "";

  public InitMessageBox = jest.fn(() => true);

  public GetPassword = jest.fn(() => this.password);

  public GetHost = jest.fn(() => this.host);
}
