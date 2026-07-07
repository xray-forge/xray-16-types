import { jest } from "@jest/globals";
import { type CUITabControl } from "xray16";

import { MockCUI3tButton } from "./mock-cui-3t-button";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic tabs.
 */
export class MockCUITabControl extends MockCUIWindow {
  public static override mock(): CUITabControl {
    return new MockCUITabControl() as unknown as CUITabControl;
  }

  public activeTab: string | null = null;

  public SetActiveTab = jest.fn((tab: string) => {
    this.activeTab = tab;
  });

  public GetActiveId = jest.fn(() => this.activeTab);

  public GetButtonById = jest.fn(() => MockCUI3tButton.mock());
}
