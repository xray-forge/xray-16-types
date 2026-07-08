import { jest } from "@jest/globals";
import { type profile } from "xray16";

export class MockProfile implements profile {
  public static mock(name: string = ""): profile {
    return new this(name) as unknown as profile;
  }

  public static create(name: string = ""): MockProfile {
    return new this(name);
  }

  public name: string;

  public constructor(name: string = "") {
    this.name = name;
  }

  public unique_nick = jest.fn(() => this.name);

  public online = jest.fn(() => false);
}
