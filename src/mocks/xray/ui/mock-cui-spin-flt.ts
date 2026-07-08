import { type CUISpinFlt } from "xray16";

import { MockCUICustomSpin } from "./mock-cui-custom-spin";

export class MockCUISpinFlt extends MockCUICustomSpin implements CUISpinFlt {
  public static override mock(): CUISpinFlt {
    return new this() as unknown as CUISpinFlt;
  }

  public static override create(): MockCUISpinFlt {
    return new this();
  }
}
