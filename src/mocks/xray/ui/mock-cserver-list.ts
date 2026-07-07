import { jest } from "@jest/globals";
import { type CServerList } from "xray16";

import { MockCUIWindow } from "./mock-cui-window";

/**
 * Mock server list UI component.
 */
export class MockCServerList extends MockCUIWindow {
  public static override mock(): CServerList {
    return new MockCServerList() as unknown as CServerList;
  }

  public SetConnectionErrCb = jest.fn();
}
