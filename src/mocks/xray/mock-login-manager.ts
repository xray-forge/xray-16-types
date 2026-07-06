import { jest } from "@jest/globals";
import { type login_manager } from "xray16";

/**
 * Mock of the X-Ray engine multiplayer `login_manager`.
 */
export class MockLoginManager {
  public static mock(): login_manager {
    return new MockLoginManager() as unknown as login_manager;
  }

  public get_current_profile = jest.fn(() => null);

  public login_offline = jest.fn();

  public save_remember_me_to_registry = jest.fn();

  public save_nick_to_registry = jest.fn();
}
