import { jest } from "@jest/globals";
import { type CUITabButton, type CUITabControl } from "xray16";

import { MockCUI3tButton } from "./mock-cui-3t-button";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic tabs.
 */
export class MockCUITabControl extends MockCUIWindow implements CUITabControl {
  public static override mock(): CUITabControl {
    return new this() as unknown as CUITabControl;
  }

  public static override create(): MockCUITabControl {
    return new this();
  }

  public activeTab: string = "";
  public activeIndex: number = 0;
  public tabs: Array<CUITabButton> = [];

  public SetActiveTab = jest.fn((tab: string | number) => {
    if (typeof tab === "number") {
      this.activeIndex = tab;
    } else {
      this.activeTab = tab;
    }
  });

  public GetActiveId = jest.fn(() => this.activeTab);

  public GetButtonById = jest.fn(() => MockCUI3tButton.mock());

  public GetTabsCount = jest.fn(() => this.tabs.length);

  public RemoveAll = jest.fn(() => {
    this.tabs = [];
    this.activeIndex = 0;
    this.activeTab = "";
  });

  public AddItem = jest.fn((item: CUITabButton | string) => {
    if (typeof item !== "string") {
      this.tabs.push(item);
    }
  });

  public RemoveItem = jest.fn((index: number) => {
    this.tabs.splice(index, 1);
  });

  public RemoveItemById = jest.fn();

  public GetButtonByIndex = jest.fn((index: number) => this.tabs[index] ?? MockCUI3tButton.mock());

  public SetNewActiveTab = jest.fn((index: number) => {
    this.activeIndex = index;
  });

  public GetActiveIndex = jest.fn(() => this.activeIndex);
}
