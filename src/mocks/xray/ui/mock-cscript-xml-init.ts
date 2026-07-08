import { jest } from "@jest/globals";
import type {
  CUIButton,
  CUIFrameLineWnd,
  CUIFrameWindow,
  CUIListBox,
  CUIListBoxItem,
  CUIListWnd,
  CUIProgressBar,
  CUIWindow,
  CScriptXmlInit,
  CUISleepStatic,
  CUIVersionList,
  UIHint,
} from "xray16";

import { MockCServerList } from "./mock-cserver-list";
import { MockCUI3tButton } from "./mock-cui-3t-button";
import { MockCUICheckButton } from "./mock-cui-check-button";
import { MockCUIComboBox } from "./mock-cui-combo-box";
import { MockCUIEditBox } from "./mock-cui-edit-box";
import { MockCUIListBox } from "./mock-cui-list-box";
import { MockCUIMapInfo } from "./mock-cui-map-info";
import { MockCUIMapList } from "./mock-cui-map-list";
import { MockCUIMMShniaga } from "./mock-cui-mm-shniaga";
import { MockCUIScrollView } from "./mock-cui-scroll-view";
import { MockCUISpinFlt } from "./mock-cui-spin-flt";
import { MockCUISpinNum } from "./mock-cui-spin-num";
import { MockCUISpinText } from "./mock-cui-spin-text";
import { MockCUIStatic } from "./mock-cui-static";
import { MockCUITabControl } from "./mock-cui-tab-control";
import { MockCUITextWnd } from "./mock-cui-text-wnd";
import { MockCUITrackBar } from "./mock-cui-track-bar";
import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock xml file with forms sources.
 */
export class MockCScriptXmlInit implements CScriptXmlInit {
  public static mock(): CScriptXmlInit {
    return new this() as unknown as CScriptXmlInit;
  }

  public static create(): MockCScriptXmlInit {
    return new this();
  }

  public ParseFile = jest.fn();
  public ParseShTexInfo = jest.fn();

  public InitWindow = jest.fn(() => MockCUIWindow.mock());
  public InitButton = jest.fn(() => MockCUIStatic.mock() as unknown as CUIButton);
  public InitTab = jest.fn(() => MockCUITabControl.mock());
  public Init3tButton = jest.fn(() => MockCUI3tButton.mock());
  public InitAnimStatic = jest.fn(() => MockCUIStatic.mock());
  public InitCheck = jest.fn(() => MockCUICheckButton.mock());
  public InitStatic = jest.fn(() => MockCUIStatic.mock());
  public InitComboBox = jest.fn(() => MockCUIComboBox.mock());
  public InitListBox = jest.fn(<T extends CUIListBoxItem = CUIListBoxItem>(): CUIListBox<T> => {
    return MockCUIListBox.mock() as CUIListBox<T>;
  }) as <T extends CUIListBoxItem = CUIListBoxItem>(
    selector: string,
    parent: CUIWindow | null | undefined
  ) => CUIListBox<T>;
  public InitEditBox = jest.fn(() => MockCUIEditBox.mock());
  public InitLabel = jest.fn(() => MockCUIStatic.mock());
  public InitList = jest.fn(() => MockCUIWindow.mock() as unknown as CUIListWnd);
  public InitScrollView = jest.fn(() => MockCUIScrollView.mock());
  public InitSpinNum = jest.fn(() => MockCUISpinNum.mock());
  public InitSpinText = jest.fn(() => MockCUISpinText.mock());
  public InitMapList = jest.fn(() => MockCUIMapList.mock());
  public InitMapInfo = jest.fn(() => MockCUIMapInfo.mock());
  public InitTrackBar = jest.fn(() => MockCUITrackBar.mock());
  public InitFrame = jest.fn(() => MockCUIWindow.mock() as unknown as CUIFrameWindow);
  public InitFrameLine = jest.fn(() => MockCUIWindow.mock() as unknown as CUIFrameLineWnd);
  public InitKeyBinding = jest.fn(() => MockCUIWindow.mock());
  public InitProgressBar = jest.fn(() => MockCUIWindow.mock() as unknown as CUIProgressBar);
  public InitTextWnd = jest.fn(() => MockCUITextWnd.mock());
  public InitMPPlayerName = jest.fn(() => MockCUIEditBox.mock());
  public InitCDkey = jest.fn(() => MockCUIEditBox.mock());
  public InitMMShniaga = jest.fn(() => MockCUIMMShniaga.mock());
  public InitSpinFlt = jest.fn(() => MockCUISpinFlt.mock());
  public InitServerList = jest.fn(() => MockCServerList.mock());
  public InitSleepStatic = jest.fn(() => MockCUIStatic.mock() as unknown as CUISleepStatic);
  public InitVerList = jest.fn(() => MockCUIWindow.mock() as unknown as CUIVersionList);
  public InitHint = jest.fn(() => MockCUIWindow.mock() as unknown as UIHint);
  public InitAutoStaticGroup = jest.fn();
}
