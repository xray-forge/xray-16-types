import { type vector2 } from "xray16";

/**
 * Mock of the X-Ray engine 2D `vector2` class for jest/node.
 *
 * Pure-JS implementation of the subset of `vector2` behaviour used by shared utilities, so code that calls
 * `new vector2()` can run under jest when `vector2` is bound to this mock.
 */
export class MockVector2D implements vector2 {
  public static create(x: number = 0, y: number = 0): MockVector2D {
    return new MockVector2D().set(x, y);
  }

  public static mock(x: number = 0, y: number = 0): vector2 {
    return new MockVector2D().set(x, y) as unknown as vector2;
  }

  public static DEFAULT_DISTANCE: number = 20;

  public x: number = 0;
  public y: number = 0;

  public set(x: number, y: number): MockVector2D;
  public set(x: vector2): MockVector2D;
  public set(x: number | vector2, y?: number): MockVector2D {
    if (typeof x !== "number") {
      this.x = x.x;
      this.y = x.y;

      return this;
    }

    this.x = x;
    this.y = y ?? 0;

    return this;
  }

  public add(first: vector2 | number, second?: vector2): MockVector2D {
    if (typeof first === "number") {
      this.x += first;
      this.y += first;
    } else if (second === undefined) {
      this.x += first.x;
      this.y += first.y;
    } else {
      this.x = first.x + second.x;
      this.y = first.y + second.y;
    }

    return this;
  }

  public sub(first: vector2, second?: vector2): MockVector2D {
    if (second) {
      this.x = first.x - second.x;
      this.y = first.y - second.y;
    } else {
      this.x -= first.x;
      this.y -= first.y;
    }

    return this;
  }

  public mul(by: number | vector2): MockVector2D {
    if (typeof by === "number") {
      this.x *= by;
      this.y *= by;

      return this;
    }

    throw new Error("Not mocked overload used.");
  }

  public distance_to(): number {
    return MockVector2D.DEFAULT_DISTANCE;
  }

  public distance_to_sqr(): number {
    return this.distance_to() * this.distance_to();
  }

  public dotproduct(target: vector2): number {
    return this.x * target.x + this.y * target.y;
  }

  public normalize(): MockVector2D {
    if (this.x === 0 && this.y === 0) {
      return this;
    }

    const magnitude: number = Math.sqrt(1 / (this.x * this.x + this.y * this.y));

    this.x *= magnitude;
    this.y *= magnitude;

    return this;
  }
}
