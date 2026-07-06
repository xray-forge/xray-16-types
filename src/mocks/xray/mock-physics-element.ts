import { jest } from "@jest/globals";
import { type physics_element } from "xray16";

/**
 * Mock of the X-Ray engine physics element.
 */
export class MockPhysicsElement {
  public static mock(): physics_element {
    return new MockPhysicsElement() as unknown as physics_element;
  }

  public is_fixed = jest.fn(() => false);

  public fix = jest.fn(() => {});
}
