import { jest } from "@jest/globals";
import { type CGameFont, type CUIWindow, type Frect, type vector2 } from "xray16";

import { MockFrect } from "../mock-frect";
import { MockLuabindClass } from "../mock-luabind";
import { MockVector2D } from "../mock-vector-2d";

/**
 * Mock base window class.
 */
export class MockCUIWindow extends MockLuabindClass implements CUIWindow {
  public static mock(): CUIWindow {
    return new this() as unknown as CUIWindow;
  }

  public static create(): MockCUIWindow {
    return new this();
  }

  public isEnabled: boolean = false;
  public isShown: boolean = false;
  public isAutoDelete: boolean = false;
  public isPostProcessMode: boolean = false;
  public focusReceiveTime: number = 0;
  public mouseX: number = 0;
  public mouseY: number = 0;

  public children: Array<CUIWindow> = [];

  public windowFont: CGameFont | null = null;
  public windowName: string | null = null;
  public windowRect: Frect | null = null;
  public windowPosition: vector2 = MockVector2D.mock();
  public windowSize: vector2 = MockVector2D.mock();

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

  public GetFont = jest.fn(() => this.windowFont as CGameFont);

  public GetMouseX = jest.fn(() => this.mouseX);

  public GetMouseY = jest.fn(() => this.mouseY);

  public GetWidth(): number {
    return this.windowSize.y;
  }

  public GetHeight(): number {
    return this.windowSize.x;
  }

  public SetAutoDelete = jest.fn((isAutoDelete: boolean) => {
    this.isAutoDelete = isAutoDelete;
  });

  public SetWndPos = jest.fn((positionOrX: vector2 | number, y?: number) => {
    this.windowPosition = typeof positionOrX === "number" ? MockVector2D.mock(positionOrX, y ?? 0) : positionOrX;
  });

  public SetWndSize = jest.fn((sizeOrWidth: vector2 | number, height?: number) => {
    this.windowSize = typeof sizeOrWidth === "number" ? MockVector2D.mock(sizeOrWidth, height ?? 0) : sizeOrWidth;
  });

  public GetWndPos = jest.fn(() => {
    return this.windowPosition;
  });

  public SetWndRect = jest.fn((rectOrX: Frect | number, y?: number, width?: number, height?: number) => {
    this.windowRect =
      typeof rectOrX === "number"
        ? (new MockFrect(rectOrX, y ?? 0, width ?? 0, height ?? 0) as unknown as Frect)
        : rectOrX;
  });

  public GetAbsoluteRect = jest.fn(() => {
    return this.windowRect ?? (new MockFrect(0, 0, this.GetWidth(), this.GetHeight()) as unknown as Frect);
  });

  public SetWindowName = jest.fn((name: string): void => {
    this.windowName = name;
  });

  public AttachChild = jest.fn((window: CUIWindow): void => {
    this.children.push(window);
  });

  public DetachChild = jest.fn((window: CUIWindow): void => {
    const index = this.children.indexOf(window);

    if (index >= 0) {
      this.children.splice(index, 1);
    }
  });

  public WindowName = jest.fn(() => this.windowName ?? "");

  public SetFont = jest.fn((font: CGameFont) => {
    this.windowFont = font;
  });

  public SetPPMode = jest.fn(() => {
    this.isPostProcessMode = true;
  });

  public SetHeight = jest.fn((height: number) => {
    this.windowSize = MockVector2D.mock(this.GetWidth(), height);
  });

  public SetWidth = jest.fn((width: number) => {
    this.windowSize = MockVector2D.mock(width, this.GetHeight());
  });

  public FocusReceiveTime = jest.fn(() => this.focusReceiveTime);

  public Init = jest.fn((rectOrX: Frect | number, y?: number, width?: number, height?: number) => {
    this.SetWndRect(rectOrX, y, width, height);
  });

  public ResetPPMode = jest.fn(() => {
    this.isPostProcessMode = false;
  });

  public OnKeyboard(): boolean {
    return true;
  }
}
