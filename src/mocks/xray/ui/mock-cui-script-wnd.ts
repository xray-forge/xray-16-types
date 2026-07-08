import { jest } from "@jest/globals";
import {
  type CUIDialogWnd,
  type CUIEditBox,
  type CUIFrameLineWnd,
  type CUIFrameWindow,
  type CUIListBox,
  type CUIListWnd,
  type CUIProgressBar,
  type CUIScriptWnd,
  type CUIStatic,
  type CUITabControl,
  type CUIWindow,
} from "xray16";

import { MockCUIDialogWnd } from "./mock-cui-dialog-wnd";

/**
 * Mocking script window for testing.
 */
export class MockCUIScriptWnd extends MockCUIDialogWnd implements CUIScriptWnd {
  public static override mock(): CUIScriptWnd {
    return new this() as unknown as CUIScriptWnd;
  }

  public static override create(): MockCUIScriptWnd {
    return new this();
  }

  public registeredWindows: Map<string, CUIWindow> = new Map();

  public Register = jest.fn((window: CUIWindow, name?: string) => {
    const id: string | null = name ?? window.WindowName();

    if (id) {
      this.registeredWindows.set(id, window);
    }
  });
  public AddCallback = jest.fn();
  public Dispatch = jest.fn(() => false);
  public Load = jest.fn(() => true);
  public GetListWnd = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIListWnd) ?? null);
  public GetDialogWnd = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIDialogWnd) ?? null);
  public GetEditBox = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIEditBox) ?? null);
  public GetListBox = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIListBox) ?? null);
  public GetFrameLineWnd = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIFrameLineWnd) ?? null);
  public GetTabControl = jest.fn((id: string) => (this.registeredWindows.get(id) as CUITabControl) ?? null);
  public GetProgressBar = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIProgressBar) ?? null);
  public GetFrameWindow = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIFrameWindow) ?? null);
  public GetStatic = jest.fn((id: string) => (this.registeredWindows.get(id) as CUIStatic) ?? null);

  public Update(): void {}
}
