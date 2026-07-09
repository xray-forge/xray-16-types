import { expect } from "@jest/globals";
import { type ExpectationResult } from "expect";
import { type LuaArray } from "xray16/lib";
import { luaTableToArray } from "xray16/mocks";

/**
 * Compare two Lua array tables for strict equality.
 *
 * @param received - Received array table.
 * @param actual - Expected array table.
 * @returns Jest matcher result.
 */
export function toStrictEqualLuaArrays(received: LuaArray<unknown>, actual: LuaArray<unknown>): ExpectationResult {
  expect(luaTableToArray(received)).toStrictEqual(luaTableToArray(actual));

  return { pass: true, message: () => "Expect two lua array tables to match." };
}
