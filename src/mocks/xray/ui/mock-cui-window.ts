import { jest } from "@jest/globals";
import { type CUIWindow } from "xray16";

import { MockFrect } from "../mock-frect";
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
  public isPostProcessMode: boolean = false;
  public focusReceiveTime: number = 0;
  public mouseX: number = 0;
  public mouseY: number = 0;

  public children: Array<MockCUIWindow> = [];

  public windowFont: unknown = null;
  public windowName: string | null = null;
  public windowRect: MockFrect | null = null;
  public windowPosition: MockVector2D | null = MockVector2D.create();
  public windowSize: MockVector2D | null = MockVector2D.create();

  public Enable = jest.fn((isEnabled: boolean) => {
    this.isEnabled = isEnabled;
  });

  public Show(isShown: boolean): void {
    this.isShown = isShown;
  }

  public IsShown = jest.fn(() => this.isShown);

  public IsEnabled = jest.fn(() => this.isEnabled);

  public IsAutoDelete = jest.fn(() => this.isAutoDelete);

  public IsCursorOverWindow = jest.fn(() => false);

  public GetFont = jest.fn(() => this.windowFont);

  public GetMouseX = jest.fn(() => this.mouseX);

  public GetMouseY = jest.fn(() => this.mouseY);

  public GetWidth(): number {
    return this.windowSize?.y ?? -1;
  }

  public GetHeight(): number {
    return this.windowSize?.x ?? -1;
  }

  public SetAutoDelete = jest.fn((isAutoDelete: boolean) => {
    this.isAutoDelete = isAutoDelete;
  });

  public SetWndPos = jest.fn((positionOrX: MockVector2D | number, y?: number) => {
    this.windowPosition =
      typeof positionOrX === "number" ? MockVector2D.create(positionOrX, y ?? 0) : positionOrX;
  });

  public SetWndSize = jest.fn((sizeOrWidth: MockVector2D | number, height?: number) => {
    this.windowSize =
      typeof sizeOrWidth === "number" ? MockVector2D.create(sizeOrWidth, height ?? 0) : sizeOrWidth;
  });

  public GetWndPos = jest.fn(() => {
    return this.windowPosition;
  });

  public SetWndRect = jest.fn((rectOrX: MockFrect | number, y?: number, width?: number, height?: number) => {
    this.windowRect =
      typeof rectOrX === "number" ? new MockFrect(rectOrX, y ?? 0, width ?? 0, height ?? 0) : rectOrX;
  });

  public GetAbsoluteRect = jest.fn(() => {
    return this.windowRect ?? new MockFrect(0, 0, this.GetWidth(), this.GetHeight());
  });

  public SetWindowName = jest.fn((name: string): void => {
    this.windowName = name;
  });

  public AttachChild = jest.fn((window: MockCUIWindow): void => {
    this.children.push(window);
  });

  public DetachChild = jest.fn((window: MockCUIWindow): void => {
    const index = this.children.indexOf(window);

    if (index >= 0) {
      this.children.splice(index, 1);
    }
  });

  public WindowName = jest.fn(() => this.windowName);

  public SetFont = jest.fn((font: unknown) => {
    this.windowFont = font;
  });

  public SetPPMode = jest.fn(() => {
    this.isPostProcessMode = true;
  });

  public SetHeight = jest.fn((height: number) => {
    this.windowSize = MockVector2D.create(this.GetWidth(), height);
  });

  public SetWidth = jest.fn((width: number) => {
    this.windowSize = MockVector2D.create(width, this.GetHeight());
  });

  public FocusReceiveTime = jest.fn(() => this.focusReceiveTime);

  public Init = jest.fn((rectOrX: MockFrect | number, y?: number, width?: number, height?: number) => {
    this.SetWndRect(rectOrX as MockFrect, y, width, height);
  });

  public ResetPPMode = jest.fn(() => {
    this.isPostProcessMode = false;
  });

  public OnKeyboard(): boolean {
    return true;
  }
}
