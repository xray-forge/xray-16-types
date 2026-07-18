import { type ExpectationResult, type MatcherContext } from "expect";
import { type LuaArray } from "xray16/lib";
import { luaTableToArray } from "xray16/mocks";

/**
 * Compare two Lua array tables for strict equality.
 *
 * @param received - Received array table.
 * @param actual - Expected array table.
 * @returns Jest matcher result.
 */
export function toStrictEqualLuaArrays(
  this: MatcherContext,
  received: LuaArray<unknown>,
  actual: LuaArray<unknown>
): ExpectationResult {
  const pass: boolean = this.equals(
    luaTableToArray(received),
    luaTableToArray(actual),
    [...this.customTesters, this.utils.iterableEquality],
    true
  );

  return { pass, message: () => "Expect two lua array tables to match." };
}
