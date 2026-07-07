import { jest } from "@jest/globals";
import { type profile } from "xray16";

export class MockProfile {
  public static mock(name: string = ""): profile {
    return new MockProfile(name) as unknown as profile;
  }

  public name: string;

  public constructor(name: string = "") {
    this.name = name;
  }

  public unique_nick = jest.fn(() => this.name);
}
