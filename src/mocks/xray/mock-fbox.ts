import { type Fbox } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `Fbox` bounding box for jest/node.
 */
export class MockFbox implements Fbox {
  public static mock(): Fbox {
    return new MockFbox() as unknown as Fbox;
  }

  public max: MockVector = MockVector.create(2000, 2000, 2000);
  public min: MockVector = MockVector.create(-2000, -2000, -2000);
}
