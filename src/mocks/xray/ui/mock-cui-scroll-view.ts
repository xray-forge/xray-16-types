import { type CUIScrollView } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic scroll view.
 */
export class MockCUIScrollView extends MockCUIWindow {
  public static override mock(): CUIScrollView {
    return new MockCUIScrollView() as unknown as CUIScrollView;
  }

  public AddWindow(): void {}
}
