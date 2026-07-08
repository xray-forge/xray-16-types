import { jest } from "@jest/globals";
import { type CUIScrollView } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock generic scroll view.
 */
export class MockCUIScrollView extends MockCUIWindow implements CUIScrollView {
  public static override mock(): CUIScrollView {
    return new this() as unknown as CUIScrollView;
  }

  public static override create(): MockCUIScrollView {
    return new this();
  }

  public scrollPosition: number = 0;
  public maxScrollPosition: number = 0;
  public minScrollPosition: number = 0;
  public isFixedScrollBar: boolean = false;

  public AddWindow = jest.fn();

  public SetScrollPos = jest.fn((position: number) => {
    this.scrollPosition = position;
  });

  public RemoveWindow = jest.fn();

  public ScrollToBegin = jest.fn(() => {
    this.scrollPosition = this.minScrollPosition;
  });

  public GetCurrentScrollPos = jest.fn(() => this.scrollPosition);

  public GetMaxScrollPos = jest.fn(() => this.maxScrollPosition);

  public GetMinScrollPos = jest.fn(() => this.minScrollPosition);

  public ScrollToEnd = jest.fn(() => {
    this.scrollPosition = this.maxScrollPosition;
  });

  public Clear = jest.fn();

  public SetFixedScrollBar = jest.fn((fixed: boolean) => {
    this.isFixedScrollBar = fixed;
  });
}
