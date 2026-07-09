import { expect } from "@jest/globals";
import { type ExpectationResult } from "expect";
import { $isNil } from "xray16/macros";

/**
 * Assert a value matches Lua `nil` — `null` or `undefined`.
 *
 * @param received - Value to check.
 * @returns Jest matcher result.
 */
export function toBeNil(received: LuaTable<number, unknown>): ExpectationResult {
  expect($isNil(received)).toBe(true);

  return { pass: true, message: () => "Expect value to match LUA nil ('null' or 'undefined')." };
}
