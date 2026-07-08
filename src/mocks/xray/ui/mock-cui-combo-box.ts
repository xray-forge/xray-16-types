import { jest } from "@jest/globals";
import { type CUIComboBox } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUIComboBox extends MockCUIWindow implements CUIComboBox {
  public static override mock(): CUIComboBox {
    return new this() as unknown as CUIComboBox;
  }

  public static override create(): MockCUIComboBox {
    return new this();
  }

  public items: Map<number, string> = new Map();
  public disabledItemIds: Set<number> = new Set();
  public currentId: number = 0;
  public currentIndex: number = 0;
  public text: string = "";
  public listLength: number = 0;
  public isVertScrollEnabled: boolean = false;

  public CurrentID = jest.fn(() => this.currentId);

  public SetCurrentID = jest.fn((id: number) => {
    this.currentId = id;
    this.currentIndex = Array.from(this.items.keys()).indexOf(id);
    this.text = this.items.get(id) ?? this.text;
  });

  public AddItem = jest.fn((label: string, id: number) => {
    this.items.set(id, label);
  });

  public GetText = jest.fn(() => this.text);

  public SetText = jest.fn((text: string) => {
    this.text = text;
  });

  public GetTextOf = jest.fn((id: number) => this.items.get(id) ?? "");

  public ClearList = jest.fn(() => {
    this.items.clear();
    this.disabledItemIds.clear();
    this.currentId = 0;
    this.currentIndex = 0;
  });

  public enable_id = jest.fn((id: number) => {
    this.disabledItemIds.delete(id);
  });

  public disable_id = jest.fn((id: number) => {
    this.disabledItemIds.add(id);
  });

  public SetListLength = jest.fn((length: number) => {
    this.listLength = length;
  });

  public SetCurrentOptValue = jest.fn();

  public SetVertScroll = jest.fn((enabled: boolean) => {
    this.isVertScrollEnabled = enabled;
  });

  public SetCurrentIdx = jest.fn((index: number) => {
    this.currentIndex = index;
    this.currentId = Array.from(this.items.keys())[index] ?? this.currentId;
  });

  public GetCurrentIdx = jest.fn(() => this.currentIndex);

  public SetCurrentValue = jest.fn();
}
