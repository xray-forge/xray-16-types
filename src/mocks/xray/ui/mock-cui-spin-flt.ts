import { type CUISpinFlt } from "xray16";

import { MockCUICustomSpin } from "./mock-cui-custom-spin";

export class MockCUISpinFlt extends MockCUICustomSpin {
  public static override mock(): CUISpinFlt {
    return new MockCUISpinFlt() as unknown as CUISpinFlt;
  }
}
