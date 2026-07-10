import { type Frect } from "xray16";

import { MockVector2D } from "./mock-vector-2d";

/**
 * Mock of the X-Ray engine `Frect` rectangle class.
 */
export class MockFrect implements Frect {
  public __name: string = "Frect";

  public x1: number;
  public y1: number;
  public x2: number;
  public y2: number;
  public lt: MockVector2D;
  public rb: MockVector2D;

  public constructor(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lt = MockVector2D.create(x1, y1);
    this.rb = MockVector2D.create(x2, y2);
  }

  public set(x1: number, y1: number, x2: number, y2: number): MockFrect {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lt.set(x1, y1);
    this.rb.set(x2, y2);

    return this;
  }
}
