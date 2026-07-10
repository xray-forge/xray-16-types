import { jest } from "@jest/globals";
import { type CUIMapList, type TXR_GAME_TYPE } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUIMapList extends MockCUIWindow implements CUIMapList {
  public static override mock(): CUIMapList {
    return new this() as unknown as CUIMapList;
  }

  public static override create(): MockCUIMapList {
    return new this();
  }

  public commandLine: string = "";
  public gameType: TXR_GAME_TYPE = 0 as TXR_GAME_TYPE;
  public isEmpty: boolean = true;
  public serverParams: string = "";

  public ClearList = jest.fn(() => {
    this.isEmpty = true;
  });

  public GetCommandLine = jest.fn(
    <T extends string = string>(value: string): T => `${value}${this.commandLine}` as T
  ) as <T extends string = string>(value: string) => T;

  public IsEmpty = jest.fn(() => this.isEmpty);

  public LoadMapList = jest.fn(() => {
    this.isEmpty = false;
  });

  public SaveMapList = jest.fn();

  public SetServerParams = jest.fn((params: string) => {
    this.serverParams = params;
  });

  public StartDedicatedServer = jest.fn();

  public SetWeatherSelector = jest.fn();

  public SetModeSelector = jest.fn();

  public SetMapPic = jest.fn();

  public SetMapInfo = jest.fn();

  public OnModeChange = jest.fn();

  public GetCurGameType = jest.fn(() => this.gameType);
}
