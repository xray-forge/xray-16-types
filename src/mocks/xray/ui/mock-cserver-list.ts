import { jest } from "@jest/globals";
import { type CServerList } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock server list UI component.
 */
export class MockCServerList extends MockCUIWindow implements CServerList {
  public static readonly ece_unique_nick_expired: number = 2;
  public static readonly ece_unique_nick_not_registred: number = 1;

  public static override mock(): CServerList {
    return new this() as unknown as CServerList;
  }

  public static override create(): MockCServerList {
    return new this();
  }

  public playerName: string = "";

  public SetPlayerName = jest.fn((name: string) => {
    this.playerName = name;
  });

  public SetFilters = jest.fn();

  public RefreshList = jest.fn();

  public SetSortFunc = jest.fn();

  public NetRadioChanged = jest.fn();

  public ShowServerInfo = jest.fn();

  public RefreshQuick = jest.fn();

  public ConnectToSelected = jest.fn();

  public SetConnectionErrCb = jest.fn();
}
