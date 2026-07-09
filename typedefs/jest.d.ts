/**
 * Ambient type augmentation for the X-Ray custom jest matchers registered by `xray16/testing` `extendJest`
 * (wired automatically by `createJestConfig`). Also widens the built-in call matchers to variadic arguments.
 *
 * Add `xray16/typedefs/jest` to `compilerOptions.types` so `expect(value).toBeNil()` and the
 * `toEqual*Lua*` matchers type-check.
 */

export * from "expect";

declare module "expect" {
  export interface Matchers<R extends void | Promise<void>> {
    toHaveBeenCalledWith(...expected: Array<unknown>): R;
    toHaveBeenLastCalledWith(...expected: Array<unknown>): R;
    toHaveBeenNthCalledWith(nthCall: number, ...expected: Array<unknown>): R;
    toEqualLuaTables(expected: Record<string, any> | LuaTable | null | undefined): ExpectationResult;
    toStrictEqualLuaTables(expected: Record<string, any> | LuaTable | null | undefined): ExpectationResult;
    toEqualLuaArrays(expected: Array<unknown> | LuaTable<number, unknown> | null | undefined): ExpectationResult;
    toStrictEqualLuaArrays(expected: Array<unknown> | LuaTable<number, unknown> | null | undefined): ExpectationResult;
    toBeNil(): ExpectationResult;
  }
}
