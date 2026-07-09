import { describe, expect, it, jest } from "@jest/globals";

import {
  expectCallsToEqual,
  getFunctionMock,
  replaceFunctionMock,
  replaceFunctionMockOnce,
  resetFunctionMock,
} from "./function-mock";

describe("resetFunctionMock", () => {
  it("should reset a mock and throw for a non-mock", () => {
    const callback = jest.fn();

    callback(123);
    callback(456);
    expect(callback.mock.calls).toEqual([[123], [456]]);

    resetFunctionMock(callback);
    expect(callback.mock.calls).toEqual([]);

    expect(() => resetFunctionMock(() => {})).toThrow("Possibly not mocked function provided for mock reset.");
  });
});

describe("getFunctionMock", () => {
  it("should return the mock and throw for a non-mock", () => {
    const callback = jest.fn();

    expect(getFunctionMock(callback)).toBe(callback);
    expect(() => getFunctionMock(() => {})).toThrow("Possibly not mocked function provided for mock assertion.");
  });
});

describe("replaceFunctionMock", () => {
  it("should replace the implementation and throw for a non-mock", () => {
    const callback = jest.fn();
    let counter = 0;

    replaceFunctionMock(callback, () => (counter += 1));
    callback();
    callback();
    expect(counter).toBe(2);

    expect(() =>
      replaceFunctionMock(
        () => {},
        () => {}
      )
    ).toThrow("Possibly not mocked function provided for mock replace.");
  });
});

describe("replaceFunctionMockOnce", () => {
  it("should replace the implementation for a single call", () => {
    const callback = jest.fn();
    let counter = 0;

    replaceFunctionMockOnce(callback, () => (counter += 1));
    callback();
    callback();
    expect(counter).toBe(1);
  });
});

describe("expectCallsToEqual", () => {
  it("should assert recorded calls and throw for a non-mock", () => {
    const callback = jest.fn();

    callback(123);
    callback(456, 789);
    expectCallsToEqual(callback, [[123], [456, 789]]);

    expect(() => expectCallsToEqual(() => {}, [])).toThrow("Possibly not mocked function provided for mock check.");
  });
});
