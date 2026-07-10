import { jest } from "@jest/globals";
import { type hanging_lamp } from "xray16";

import { MockCGameObject } from "./mock-c-game-object";

/**
 * Mock of the X-Ray engine hanging lamp object.
 */
export class MockHangingLamp extends MockCGameObject implements hanging_lamp {
  public static create(): MockHangingLamp {
    return new MockHangingLamp();
  }

  public static mock(): hanging_lamp {
    return new MockHangingLamp() as unknown as hanging_lamp;
  }

  public turn_on = jest.fn();
  public turn_off = jest.fn();
}
