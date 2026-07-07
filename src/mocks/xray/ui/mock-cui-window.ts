import { jest } from "@jest/globals";
import { type CUIWindow } from "xray16";

import { type MockFrect } from "../mock-frect";
import { MockLuabindClass } from "../mock-luabind";
import { MockVector2D } from "../mock-vector-2d";

/**
 * Mock base window class.
 */
export class MockCUIWindow extends MockLuabindClass {
  public static mock(): CUIWindow {
    return new MockCUIWindow() as unknown as CUIWindow;
  }

  public isEnabled: boolean = false;
  public isShown: boolean = false;
  public isAutoDelete: boolean = false;

  public children: Array<MockCUIWindow> = [];

  public windowName: string | null = null;
  public windowRect: MockFrect | null = null;
  public windowPosition: MockVector2D | null = MockVector2D.create();
  public windowSize: MockVector2D | null = null;

  public Enable = jest.fn((isEnabled: boolean) => {
    this.isEnabled = isEnabled;
  });

  public Show(isShown: boolean): void {
    this.isShown = isShown;
  }

  public GetWidth(): number {
    return this.windowSize?.y ?? -1;
  }

  public GetHeight(): number {
    return this.windowSize?.x ?? -1;
  }

  public SetAutoDelete = jest.fn((isAutoDelete: boolean) => {
    this.isAutoDelete = isAutoDelete;
  });

  public SetWndPos = jest.fn((position: MockVector2D) => {
    this.windowPosition = position;
  });

  public SetWndSize = jest.fn((size: MockVector2D) => {
    this.windowSize = size;
  });

  public GetWndPos = jest.fn(() => {
    return this.windowPosition;
  });

  public SetWndRect = jest.fn((rect: MockFrect) => {
    this.windowRect = rect;
  });

  public SetWindowName(name: string): void {
    this.windowName = name;
  }

  public AttachChild(window: MockCUIWindow): void {
    this.children.push(window);
  }

  public WindowName = jest.fn(() => this.windowName);

  public SetFont = jest.fn();

  public OnKeyboard(): boolean {
    return true;
  }
}
