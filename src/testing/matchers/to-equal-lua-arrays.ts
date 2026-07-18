import { type ExpectationResult, type MatcherContext } from "expect";
import { luaTableToArray } from "xray16/mocks";

/**
 * Compare two Lua array tables for loose equality.
 *
 * @param received - Received array table.
 * @param actual - Expected array table.
 * @returns Jest matcher result.
 */
export function toEqualLuaArrays(
  this: MatcherContext,
  received: LuaTable<number, unknown>,
  actual: LuaTable<number, unknown>
): ExpectationResult {
  const pass: boolean = this.equals(luaTableToArray(received), luaTableToArray(actual), [
    ...this.customTesters,
    this.utils.iterableEquality,
  ]);

  return { pass, message: () => "Expect two lua array tables to match." };
}
