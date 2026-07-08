import { type CUI3tButton } from "xray16";

import { MockCUIStatic } from "./mock-cui-static";

/**
 * Mock CUI button.
 */
export class MockCUI3tButton extends MockCUIStatic implements CUI3tButton {
  public static override mock(): CUI3tButton {
    return new this() as unknown as CUI3tButton;
  }

  public static override create(): MockCUI3tButton {
    return new this();
  }
}
