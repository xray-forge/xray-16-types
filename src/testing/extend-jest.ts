import { expect } from "@jest/globals";

import {
  toBeNil,
  toEqualLuaArrays,
  toEqualLuaTables,
  toStrictEqualLuaArrays,
  toStrictEqualLuaTables,
} from "./matchers";

/**
 * Register the X-Ray custom jest matchers (`toBeNil`, `toEqualLuaTables`, …).
 *
 * Must run after the test framework is installed — from a `setupFilesAfterEnv` module. `createJestConfig`
 * wires this automatically; add `xray16/typedefs/jest` to `compilerOptions.types` for the matcher types.
 */
export function extendJest(): void {
  expect.extend({
    toBeNil,
    toEqualLuaArrays,
    toEqualLuaTables,
    toStrictEqualLuaArrays,
    toStrictEqualLuaTables,
  });
}
