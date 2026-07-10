import { type Fbox } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `Fbox` bounding box for jest/node.
 */
export class MockFbox implements Fbox {
  public static create(): MockFbox {
    return new MockFbox();
  }

  public static mock(): Fbox {
    return new MockFbox();
  }

  public max: MockVector = MockVector.create(2000, 2000, 2000);
  public min: MockVector = MockVector.create(-2000, -2000, -2000);
}
