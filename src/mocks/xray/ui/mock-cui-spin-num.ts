import { type CUISpinNum } from "xray16";

import { MockCUICustomSpin } from "./mock-cui-custom-spin";

export class MockCUISpinNum extends MockCUICustomSpin {
  public static override mock(): CUISpinNum {
    return new MockCUISpinNum() as unknown as CUISpinNum;
  }
}
