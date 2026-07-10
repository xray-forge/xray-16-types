import { jest } from "@jest/globals";
import { type CUIListBox, type CUIListBoxItem, type CUIWindow } from "xray16";

import { MockCUIListBoxItem } from "./mock-cui-list-box-item";
import { MockCUIScrollView } from "./mock-cui-scroll-view";

/**
 * Mock CUI list box.
 */
export class MockCUIListBox<T extends CUIListBoxItem = CUIListBoxItem>
  extends MockCUIScrollView
  implements CUIListBox<T>
{
  public static override mock(): CUIListBox {
    return new this() as unknown as CUIListBox;
  }

  public static override create(): MockCUIListBox {
    return new this();
  }

  public items: Array<T> = [];
  public selectedIndex: number = 0;
  public itemHeight: number = 0;

  public SetSelectedIndex = jest.fn((index: number) => {
    this.selectedIndex = index;
  });

  public GetSelectedIndex = jest.fn(() => this.selectedIndex);

  public ShowSelectedItem = jest.fn();

  public RemoveAll = jest.fn(() => {
    this.items = [];
    this.selectedIndex = 0;
  });

  public GetSize = jest.fn(() => this.items.length);

  public GetItem = jest.fn((index: number) => this.items[index] as unknown as CUIWindow);

  public GetItemByIndex = jest.fn((index: number) => this.items[index]);

  public GetSelectedItem = jest.fn(() => this.items[this.selectedIndex] ?? null);

  public GetItemHeight = jest.fn(() => this.itemHeight);

  public AddExistingItem = jest.fn((item: T) => {
    this.items.push(item);
  });

  public AddTextItem = jest.fn((text: string) => {
    const item: T = MockCUIListBoxItem.mock() as T;

    item.GetTextItem().SetText(text);
    this.items.push(item);

    return item;
  });

  public RemoveItem = jest.fn((window: CUIWindow) => {
    this.items = this.items.filter((it) => it !== window);
  });

  public SetItemHeight = jest.fn((height: number) => {
    this.itemHeight = height;
  });
}
