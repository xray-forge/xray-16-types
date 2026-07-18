import { type ExpectationResult, type MatcherContext } from "expect";
import { luaTableToObject } from "xray16/mocks";

/**
 * Compare two Lua tables for strict equality.
 *
 * @param received - Received table.
 * @param actual - Expected table.
 * @returns Jest matcher result.
 */
export function toStrictEqualLuaTables(
  this: MatcherContext,
  received: LuaTable<string | number>,
  actual: LuaTable<string | number>
): ExpectationResult {
  const pass: boolean = this.equals(
    luaTableToObject(received),
    luaTableToObject(actual),
    [...this.customTesters, this.utils.iterableEquality],
    true
  );

  return { pass, message: () => "Expect two lua tables to match." };
}
