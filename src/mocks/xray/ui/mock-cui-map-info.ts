import { jest } from "@jest/globals";
import { type CUIMapInfo } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

export class MockCUIMapInfo extends MockCUIWindow implements CUIMapInfo {
  public static override mock(): CUIMapInfo {
    return new this() as unknown as CUIMapInfo;
  }

  public static override create(): MockCUIMapInfo {
    return new this();
  }

  public mapName: string | null = null;
  public mapVersion: string | null = null;

  public InitMap = jest.fn((mapName: string, mapVersion: string) => {
    this.mapName = mapName;
    this.mapVersion = mapVersion;
  });
}
