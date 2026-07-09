import { expect } from "@jest/globals";
import { type ExpectationResult } from "expect";
import { luaTableToObject } from "xray16/mocks";

/**
 * Compare two Lua tables for loose equality.
 *
 * @param received - Received table.
 * @param actual - Expected table.
 * @returns Jest matcher result.
 */
export function toEqualLuaTables(
  received: LuaTable<string | number>,
  actual: LuaTable<string | number>
): ExpectationResult {
  expect(luaTableToObject(received)).toEqual(luaTableToObject(actual));

  return { pass: true, message: () => "Expect two lua tables to match." };
}
