import { jest } from "@jest/globals";
import { type CZoneCampfire } from "xray16";

import { MockCGameObject } from "./mock-c-game-object";

/**
 * Mock of the X-Ray engine campfire object.
 */
export class MockCZoneCampfire extends MockCGameObject implements CZoneCampfire {
  public static override create(state: boolean = false): MockCZoneCampfire {
    return new MockCZoneCampfire(state);
  }

  public static override mock(state: boolean = false): CZoneCampfire {
    return new MockCZoneCampfire(state) as unknown as CZoneCampfire;
  }

  public state: boolean;

  public constructor(state: boolean = false) {
    super();
    this.state = state;
  }

  public is_on = jest.fn((): boolean => this.state);

  public turn_on = jest.fn((): void => {
    this.state = true;
  });

  public turn_off = jest.fn((): void => {
    this.state = false;
  });
}
