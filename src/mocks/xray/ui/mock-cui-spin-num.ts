import { type CUISpinNum } from "xray16";

import { MockCUICustomSpin } from "./mock-cui-custom-spin";

export class MockCUISpinNum extends MockCUICustomSpin implements CUISpinNum {
  public static override mock(): CUISpinNum {
    return new this() as unknown as CUISpinNum;
  }

  public static override create(): MockCUISpinNum {
    return new this();
  }
}
