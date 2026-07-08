import { type CUISpinText } from "xray16";

import { MockCUICustomSpin } from "./mock-cui-custom-spin";

export class MockCUISpinText extends MockCUICustomSpin implements CUISpinText {
  public static override mock(): CUISpinText {
    return new this() as unknown as CUISpinText;
  }

  public static override create(): MockCUISpinText {
    return new this();
  }
}
