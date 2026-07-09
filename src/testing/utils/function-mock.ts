import { expect, jest } from "@jest/globals";
import { type Mock } from "jest-mock";
import { type AnyCallable } from "xray16/lib";

/**
 * Reset a jest mock function.
 *
 * @param callable - Function expected to be a jest mock.
 */
export function resetFunctionMock(callable: AnyCallable): void {
  if (jest.isMockFunction(callable)) {
    callable.mockReset();
  } else {
    throw new Error("Possibly not mocked function provided for mock reset.");
  }
}

/**
 * Get a callable as its jest mock.
 *
 * @param callable - Function expected to be a jest mock.
 * @returns The jest mock.
 */
export function getFunctionMock(callable: AnyCallable): Mock {
  if (jest.isMockFunction(callable)) {
    return callable;
  } else {
    throw new Error("Possibly not mocked function provided for mock assertion.");
  }
}

/**
 * Replace a jest mock function implementation.
 *
 * @param callable - Function expected to be a jest mock.
 * @param newImplementation - New implementation to use.
 */
export function replaceFunctionMock(callable: AnyCallable, newImplementation: AnyCallable): void {
  if (jest.isMockFunction(callable)) {
    callable.mockImplementation(newImplementation);
  } else {
    throw new Error("Possibly not mocked function provided for mock replace.");
  }
}

/**
 * Replace a jest mock function implementation for a single call.
 *
 * @param callable - Function expected to be a jest mock.
 * @param newImplementation - New implementation to use once.
 */
export function replaceFunctionMockOnce(callable: AnyCallable, newImplementation: AnyCallable): void {
  if (jest.isMockFunction(callable)) {
    callable.mockImplementationOnce(newImplementation);
  } else {
    throw new Error("Possibly not mocked function provided for mock replace.");
  }
}

/**
 * Assert a jest mock function's recorded calls.
 *
 * @param callable - Function expected to be a jest mock.
 * @param calls - Expected list of call argument tuples.
 */
export function expectCallsToEqual(callable: AnyCallable, calls: Array<Array<unknown>>): void {
  if (jest.isMockFunction(callable)) {
    expect(callable.mock.calls).toEqual(calls);
  } else {
    throw new Error("Possibly not mocked function provided for mock check.");
  }
}
