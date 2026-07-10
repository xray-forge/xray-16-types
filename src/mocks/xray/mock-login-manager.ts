import { jest } from "@jest/globals";
import { type login_manager } from "xray16";

/**
 * Mock of the X-Ray engine multiplayer `login_manager`.
 */
export class MockLoginManager implements login_manager {
  public static mock(): login_manager {
    return new MockLoginManager() as unknown as login_manager;
  }

  public email: string = "";
  public nick: string = "";
  public password: string = "";
  public rememberMe: boolean = false;

  public forgot_password = jest.fn();

  public get_current_profile = jest.fn(() => null);

  public get_email_from_registry = jest.fn(() => this.email);

  public get_nick_from_registry = jest.fn(() => this.nick);

  public get_password_from_registry = jest.fn(() => this.password);

  public get_remember_me_from_registry = jest.fn(() => this.rememberMe);

  public login = jest.fn();

  public login_offline = jest.fn();

  public logout = jest.fn();

  public save_email_to_registry = jest.fn((email: string) => {
    this.email = email;
  });

  public save_remember_me_to_registry = jest.fn((rememberMe: boolean) => {
    this.rememberMe = rememberMe;
  });

  public save_nick_to_registry = jest.fn((nick: string) => {
    this.nick = nick;
  });

  public save_password_to_registry = jest.fn((password: string) => {
    this.password = password;
  });

  public set_unique_nick = jest.fn();

  public stop_login = jest.fn();

  public stop_setting_unique_nick = jest.fn();
}
