import { type ExpectationResult } from "expect";
import { $isNil } from "xray16/macros";

/**
 * Assert a value matches Lua `nil` — `null` or `undefined`.
 *
 * @param received - Value to check.
 * @returns Jest matcher result.
 */
export function toBeNil(received: unknown): ExpectationResult {
  return {
    pass: $isNil(received),
    message: () => "Expect value to match LUA nil ('null' or 'undefined').",
  };
}
