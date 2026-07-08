import { jest } from "@jest/globals";
import { type CUICustomSpin } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUICustomSpin extends MockCUIWindow implements CUICustomSpin {
  public static override mock(): CUICustomSpin {
    return new this() as unknown as CUICustomSpin;
  }

  public static override create(): MockCUICustomSpin {
    return new this();
  }

  public text: string = "test-cs";

  public GetText = jest.fn(() => this.text);
}
