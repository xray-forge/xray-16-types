import { type ExpectationResult, type MatcherContext } from "expect";
import { luaTableToObject } from "xray16/mocks";

/**
 * Compare two Lua tables for loose equality.
 *
 * @param received - Received table.
 * @param actual - Expected table.
 * @returns Jest matcher result.
 */
export function toEqualLuaTables(
  this: MatcherContext,
  received: LuaTable<string | number>,
  actual: LuaTable<string | number>
): ExpectationResult {
  const pass: boolean = this.equals(luaTableToObject(received), luaTableToObject(actual), [
    ...this.customTesters,
    this.utils.iterableEquality,
  ]);

  return { pass, message: () => "Expect two lua tables to match." };
}
