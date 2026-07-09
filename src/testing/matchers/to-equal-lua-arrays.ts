import { expect } from "@jest/globals";
import { type ExpectationResult } from "expect";
import { luaTableToArray } from "xray16/mocks";

/**
 * Compare two Lua array tables for loose equality.
 *
 * @param received - Received array table.
 * @param actual - Expected array table.
 * @returns Jest matcher result.
 */
export function toEqualLuaArrays(
  received: LuaTable<number, unknown>,
  actual: LuaTable<number, unknown>
): ExpectationResult {
  expect(luaTableToArray(received)).toEqual(luaTableToArray(actual));

  return { pass: true, message: () => "Expect two lua array tables to match." };
}
