import { jest } from "@jest/globals";
import { type CConsole } from "xray16";

/**
 * Mock of the X-Ray engine game console.
 */
export class MockConsole implements CConsole {
  public static instance: MockConsole | null = null;

  public static getInstance(): MockConsole {
    if (!this.instance) {
      this.instance = new MockConsole();
    }

    return this.instance;
  }

  public static getInstanceMock(): CConsole {
    return this.getInstance() as unknown as CConsole;
  }

  public static reset(): void {
    this.instance = null;
  }

  public readonly __name: string = "CConsole";

  public show = jest.fn();
  public hide = jest.fn();
  public execute = jest.fn();
  public execute_deferred = jest.fn();
  public execute_script = jest.fn();
  public get_bool = jest.fn(() => false);
  public get_float = jest.fn(() => 0.5);
  public get_integer = jest.fn(() => 1);
  public get_string = jest.fn(() => "test");
  public get_token = jest.fn(() => "token");
}
