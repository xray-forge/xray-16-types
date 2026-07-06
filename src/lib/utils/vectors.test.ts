import { describe, expect, it } from "@jest/globals";

import {
  MX_VECTOR,
  MY_VECTOR,
  MZ_VECTOR,
  ONE_VECTOR,
  X_VECTOR,
  Y_VECTOR,
  Z_VECTOR,
  ZERO_VECTOR,
} from "./vectors";

describe("shared vector constants", () => {
  it("should expose the expected coordinates", () => {
    expect([ZERO_VECTOR.x, ZERO_VECTOR.y, ZERO_VECTOR.z]).toEqual([0, 0, 0]);
    expect([ONE_VECTOR.x, ONE_VECTOR.y, ONE_VECTOR.z]).toEqual([1, 1, 1]);

    expect([X_VECTOR.x, X_VECTOR.y, X_VECTOR.z]).toEqual([1, 0, 0]);
    expect([MX_VECTOR.x, MX_VECTOR.y, MX_VECTOR.z]).toEqual([-1, 0, 0]);

    expect([Y_VECTOR.x, Y_VECTOR.y, Y_VECTOR.z]).toEqual([0, 1, 0]);
    expect([MY_VECTOR.x, MY_VECTOR.y, MY_VECTOR.z]).toEqual([0, -1, 0]);

    expect([Z_VECTOR.x, Z_VECTOR.y, Z_VECTOR.z]).toEqual([0, 0, 1]);
    expect([MZ_VECTOR.x, MZ_VECTOR.y, MZ_VECTOR.z]).toEqual([0, 0, -1]);
  });
});
