import { jest } from "@jest/globals";
import { type CMainMenu } from "xray16";

import { MockLoginManager } from "./mock-login-manager";

/**
 * Mock of the X-Ray engine `CMainMenu` manager.
 */
export class MockCMainMenu implements CMainMenu {
  protected static instance: MockCMainMenu | null = null;

  public static getInstance(): MockCMainMenu {
    if (!this.instance) {
      this.instance = new MockCMainMenu();
    }

    return this.instance;
  }

  public static getMockInstance(): CMainMenu {
    return this.getInstance() as unknown as CMainMenu;
  }

  public static mock(): CMainMenu {
    return new MockCMainMenu() as unknown as CMainMenu;
  }

  public loginManager: MockLoginManager = new MockLoginManager();

  public GetLoginMngr = jest.fn(() => this.loginManager);

  public GetAccountMngr = jest.fn(() => null as unknown as ReturnType<CMainMenu["GetAccountMngr"]>);

  public GetDemoInfo = jest.fn(() => null);

  public GetPatchProgress = jest.fn(() => null as unknown as ReturnType<CMainMenu["GetPatchProgress"]>);

  public GetPlayerName = jest.fn(() => "test-player-name");

  public GetProfileStore(): ReturnType<CMainMenu["GetProfileStore"]> {
    return null as unknown as ReturnType<CMainMenu["GetProfileStore"]>;
  }

  public GetGSVer = jest.fn(() => "1.0-test");

  public GetCDKey = jest.fn(() => "aaa-bb-c");

  public CancelDownload = jest.fn();

  public ValidateCDKey = jest.fn(() => true);
}
