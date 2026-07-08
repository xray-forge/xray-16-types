import { type CUIListBoxItemMsgChain } from "xray16";

import { MockCUIListBoxItem } from "./mock-cui-list-box-item";

/**
 * Mock UI list box message chain.
 */
export class MockCUIListBoxItemMsgChain extends MockCUIListBoxItem implements CUIListBoxItemMsgChain {
  public static override mock(): CUIListBoxItemMsgChain {
    return new this() as unknown as CUIListBoxItemMsgChain;
  }

  public static override create(): MockCUIListBoxItemMsgChain {
    return new this();
  }
}
