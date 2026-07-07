import { jest } from "@jest/globals";
import type { CScriptXmlInit } from "xray16";

import { MockCServerList } from "./mock-cserver-list";
import { MockCUI3tButton } from "./mock-cui-3t-button";
import { MockCUICheckButton } from "./mock-cui-check-button";
import { MockCUIComboBox } from "./mock-cui-combo-box";
import { MockCUIEditBox } from "./mock-cui-edit-box";
import { MockCUIListBox } from "./mock-cui-list-box";
import { MockCUIMapInfo } from "./mock-cui-map-info";
import { MockCUIMapList } from "./mock-cui-map-list";
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
export class MockCScriptXmlInit {
  public static mock(): CScriptXmlInit {
    return new MockCScriptXmlInit() as unknown as CScriptXmlInit;
  }

  public ParseFile = jest.fn();

  public InitWindow = jest.fn(() => MockCUIWindow.mock());
  public InitTab = jest.fn(() => MockCUITabControl.mock());
  public Init3tButton = jest.fn(() => MockCUI3tButton.mock());
  public InitCheck = jest.fn(() => MockCUICheckButton.mock());
  public InitStatic = jest.fn(() => MockCUIStatic.mock());
  public InitComboBox = jest.fn(() => MockCUIComboBox.mock());
  public InitListBox = jest.fn(() => MockCUIListBox.mock());
  public InitEditBox = jest.fn(() => MockCUIEditBox.mock());
  public InitLabel = jest.fn();
  public InitScrollView = jest.fn(() => MockCUIScrollView.mock());
  public InitSpinNum = jest.fn(() => MockCUISpinNum.mock());
  public InitSpinText = jest.fn(() => MockCUISpinText.mock());
  public InitMapList = jest.fn(() => MockCUIMapList.mock());
  public InitMapInfo = jest.fn(() => MockCUIMapInfo.mock());
  public InitTrackBar = jest.fn(() => MockCUITrackBar.mock());
  public InitFrame = jest.fn();
  public InitFrameLine = jest.fn();
  public InitKeyBinding = jest.fn();
  public InitProgressBar = jest.fn();
  public InitTextWnd = jest.fn(() => MockCUITextWnd.mock());
  public InitMPPlayerName = jest.fn(() => MockCUIEditBox.mock());
  public InitCDkey = jest.fn(() => MockCUIEditBox.mock());
  public InitMMShniaga = jest.fn();
  public InitSpinFlt = jest.fn(() => MockCUISpinFlt.mock());
  public InitServerList = jest.fn(() => MockCServerList.mock());
}
