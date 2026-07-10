import { jest } from "@jest/globals";
import { type hanging_lamp } from "xray16";

/**
 * Mock of the X-Ray engine hanging lamp object.
 */
export class MockHangingLamp {
  public static create(): MockHangingLamp {
    return new MockHangingLamp();
  }

  public static mock(): hanging_lamp {
    return new MockHangingLamp() as unknown as hanging_lamp;
  }

  public turn_on = jest.fn();
  public turn_off = jest.fn();
}
