import { type vector } from "xray16";

type TReadonlyVector = Readonly<vector>;

/**
 * Mock of the X-Ray engine 3D `vector` class for jest/node.
 *
 * Pure-JS implementation of the subset of `vector` behaviour used by shared utilities, so code that calls
 * `new vector()` can run under jest when `vector` is bound to this mock.
 */
export class MockVector implements vector {
  public static create(x: number = 0, y: number = 0, z: number = 0): MockVector {
    return new MockVector().set(x, y, z);
  }

  public static mock(x: number = 0, y: number = 0, z: number = 0): vector {
    return new MockVector().set(x, y, z) as unknown as vector;
  }

  public static DEFAULT_DISTANCE: number = 20;

  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public set(x: number, y: number, z: number): MockVector;
  public set(x: TReadonlyVector): MockVector;
  public set(x: number | TReadonlyVector, y?: number, z?: number): MockVector {
    if (typeof x !== "number") {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;

      return this;
    }

    this.x = x;
    this.y = y ?? 0;
    this.z = z ?? 0;

    return this;
  }

  public abs(vector: TReadonlyVector): MockVector {
    this.x = Math.abs(vector.x);
    this.y = Math.abs(vector.y);
    this.z = Math.abs(vector.z);

    return this;
  }

  public add(first: TReadonlyVector | number, second?: TReadonlyVector | number): MockVector {
    if (typeof first === "number") {
      this.x += first;
      this.y += first;
      this.z += first;
    } else if (second === undefined) {
      this.x += first.x;
      this.y += first.y;
      this.z += first.z;
    } else if (typeof second === "number") {
      this.x = first.x + second;
      this.y = first.y + second;
      this.z = first.z + second;
    } else {
      this.x = first.x + second.x;
      this.y = first.y + second.y;
      this.z = first.z + second.z;
    }

    return this;
  }

  public align(): MockVector {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);

    return this;
  }

  public average(first: TReadonlyVector, second?: TReadonlyVector): MockVector {
    if (second) {
      this.x = (first.x + second.x) / 2;
      this.y = (first.y + second.y) / 2;
      this.z = (first.z + second.z) / 2;
    } else {
      this.x = (this.x + first.x) / 2;
      this.y = (this.y + first.y) / 2;
      this.z = (this.z + first.z) / 2;
    }

    return this;
  }

  public clamp(min: TReadonlyVector, max?: TReadonlyVector): MockVector {
    const lower: TReadonlyVector = max ? min : MockVector.create(-Math.abs(min.x), -Math.abs(min.y), -Math.abs(min.z));
    const upper: TReadonlyVector = max ?? MockVector.create(Math.abs(min.x), Math.abs(min.y), Math.abs(min.z));

    this.x = Math.max(lower.x, Math.min(upper.x, this.x));
    this.y = Math.max(lower.y, Math.min(upper.y, this.y));
    this.z = Math.max(lower.z, Math.min(upper.z, this.z));

    return this;
  }

  public crossproduct(first: TReadonlyVector, second: TReadonlyVector): MockVector {
    this.x = first.y * second.z - first.z * second.y;
    this.y = first.z * second.x - first.x * second.z;
    this.z = first.x * second.y - first.y * second.x;

    return this;
  }

  public sub(first: TReadonlyVector | number, second?: TReadonlyVector | number): MockVector {
    if (typeof first === "number") {
      this.x -= first;
      this.y -= first;
      this.z -= first;
    } else if (typeof second === "number") {
      this.x = first.x - second;
      this.y = first.y - second;
      this.z = first.z - second;
    } else if (second) {
      this.x = first.x - second.x;
      this.y = first.y - second.y;
      this.z = first.z - second.z;
    } else {
      this.x -= first.x;
      this.y -= first.y;
      this.z -= first.z;
    }

    return this;
  }

  public mul(first: number | TReadonlyVector, second?: TReadonlyVector | number): MockVector {
    if (typeof first === "number") {
      this.x *= first;
      this.y *= first;
      this.z *= first;
    } else if (typeof second === "number") {
      this.x = first.x * second;
      this.y = first.y * second;
      this.z = first.z * second;
    } else if (second) {
      this.x = first.x * second.x;
      this.y = first.y * second.y;
      this.z = first.z * second.z;
    } else {
      this.x *= first.x;
      this.y *= first.y;
      this.z *= first.z;
    }

    return this;
  }

  public div(first: number | TReadonlyVector, second?: TReadonlyVector | number): MockVector {
    if (typeof first === "number") {
      this.x /= first;
      this.y /= first;
      this.z /= first;
    } else if (typeof second === "number") {
      this.x = first.x / second;
      this.y = first.y / second;
      this.z = first.z / second;
    } else if (second) {
      this.x = first.x / second.x;
      this.y = first.y / second.y;
      this.z = first.z / second.z;
    } else {
      this.x /= first.x;
      this.y /= first.y;
      this.z /= first.z;
    }

    return this;
  }

  public distance_to(target: TReadonlyVector): number;
  public distance_to(): number;
  public distance_to(target?: TReadonlyVector): number {
    if (!target) {
      return MockVector.DEFAULT_DISTANCE;
    }

    const isThisOrigin = this.x === 0 && this.y === 0 && this.z === 0;
    const isTargetOrigin = target.x === 0 && target.y === 0 && target.z === 0;

    if ((isThisOrigin && isTargetOrigin) || (!isThisOrigin && !isTargetOrigin)) {
      return MockVector.DEFAULT_DISTANCE;
    }

    return Math.sqrt(
      (this.x - target.x) * (this.x - target.x) +
        (this.y - target.y) * (this.y - target.y) +
        (this.z - target.z) * (this.z - target.z)
    );
  }

  public distance_to_sqr(target: TReadonlyVector): number;
  public distance_to_sqr(): number;
  public distance_to_sqr(target?: TReadonlyVector): number {
    const distance: number = target ? this.distance_to(target) : this.distance_to();

    return distance * distance;
  }

  public distance_to_xz(target: TReadonlyVector): number {
    const isThisOrigin = this.x === 0 && this.z === 0;
    const isTargetOrigin = target.x === 0 && target.z === 0;

    if ((isThisOrigin && isTargetOrigin) || (!isThisOrigin && !isTargetOrigin)) {
      return MockVector.DEFAULT_DISTANCE;
    }

    return Math.sqrt((this.x - target.x) * (this.x - target.x) + (this.z - target.z) * (this.z - target.z));
  }

  public dotproduct(target: TReadonlyVector): number {
    return this.x * target.x + this.y * target.y + this.z * target.z;
  }

  public magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public normalize(): MockVector {
    return this.normalize_safe();
  }

  public normalize_safe(vector?: TReadonlyVector): MockVector {
    if (vector) {
      this.set(vector);
    }

    if (this.x === 0 && this.y === 0 && this.z === 0) {
      return this;
    }

    const magnitude: number = Math.sqrt(1 / (this.x * this.x + this.y * this.y + this.z * this.z));

    this.x *= magnitude;
    this.y *= magnitude;
    this.z *= magnitude;

    return this;
  }

  public inertion(vector: TReadonlyVector, value: number): MockVector {
    return this.lerp(this, vector, value);
  }

  public invert(vector?: TReadonlyVector): MockVector {
    if (vector) {
      this.set(vector);
    }

    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
  }

  public lerp(from: TReadonlyVector, to: TReadonlyVector, factor: number): MockVector {
    this.x = from.x + (to.x - from.x) * factor;
    this.y = from.y + (to.y - from.y) * factor;
    this.z = from.z + (to.z - from.z) * factor;

    return this;
  }

  public mad(first: TReadonlyVector, second: TReadonlyVector | number, third?: TReadonlyVector | number): MockVector {
    if (typeof second === "number") {
      this.x += first.x * second;
      this.y += first.y * second;
      this.z += first.z * second;
    } else if (typeof third === "number") {
      this.x = first.x + second.x * third;
      this.y = first.y + second.y * third;
      this.z = first.z + second.z * third;
    } else if (third) {
      this.x = first.x + second.x * third.x;
      this.y = first.y + second.y * third.y;
      this.z = first.z + second.z * third.z;
    } else {
      this.x = first.x + second.x;
      this.y = first.y + second.y;
      this.z = first.z + second.z;
    }

    return this;
  }

  public max(first: TReadonlyVector, second?: TReadonlyVector): MockVector {
    const target: TReadonlyVector = second ?? this;
    const source: TReadonlyVector = first;

    this.x = Math.max(target.x, source.x);
    this.y = Math.max(target.y, source.y);
    this.z = Math.max(target.z, source.z);

    return this;
  }

  public min(first: TReadonlyVector, second?: TReadonlyVector): MockVector {
    const target: TReadonlyVector = second ?? this;
    const source: TReadonlyVector = first;

    this.x = Math.min(target.x, source.x);
    this.y = Math.min(target.y, source.y);
    this.z = Math.min(target.z, source.z);

    return this;
  }

  public reflect(direction: TReadonlyVector, normal: TReadonlyVector): MockVector {
    const projection: number = 2 * direction.dotproduct(normal);

    this.x = direction.x - projection * normal.x;
    this.y = direction.y - projection * normal.y;
    this.z = direction.z - projection * normal.z;

    return this;
  }

  public set_length(value: number): MockVector {
    return this.normalize_safe().mul(value);
  }

  public similar(vector: TReadonlyVector, epsilon: number): boolean {
    return (
      Math.abs(this.x - vector.x) <= epsilon &&
      Math.abs(this.y - vector.y) <= epsilon &&
      Math.abs(this.z - vector.z) <= epsilon
    );
  }

  public slide(direction: TReadonlyVector, normal: TReadonlyVector): MockVector {
    const projection: number = direction.dotproduct(normal);

    this.x = direction.x - projection * normal.x;
    this.y = direction.y - projection * normal.y;
    this.z = direction.z - projection * normal.z;

    return this;
  }

  public getH(): number {
    if (this.x === 0 && this.z === 0) {
      return 0.0;
    }

    if (this.z === 0) {
      return this.x > 0 ? -(Math.PI / 2) : Math.PI / 2;
    } else if (this.z < 0) {
      return -(Math.atan(this.x / this.z) - Math.PI);
    }

    return -Math.atan(this.x / this.z);
  }

  public getP(): number {
    return -Math.atan2(this.y, Math.sqrt(this.x * this.x + this.z * this.z));
  }

  public setHP(h: number, p: number): MockVector {
    const ch: number = Math.cos(h);
    const cp: number = Math.cos(p);
    const sh: number = Math.sin(h);
    const sp: number = Math.sin(p);

    this.x = -cp * sh;
    this.y = sp;
    this.z = cp * ch;

    return this;
  }

  public asMock(): vector {
    return this as unknown as vector;
  }
}
