import { type ILuaState, lauxlib, lua, lualib, to_jsstring, to_luastring } from "fengari";

/**
 * Mock lua `tonumber` global, backed by a real Lua VM for 1-1 parsing behaviour.
 *
 * Keeps the fengari dependency inside this package so consumers do not need it to reproduce Lua's
 * `tonumber` semantics under jest/node.
 *
 * @param value - Value to coerce to a number.
 * @param base - Optional radix (2-36) used to parse `value` as an integer, matching `tonumber(e, base)`.
 * @returns Parsed number, or `null` when the value is not numeric.
 */
export function mockTonumber(value: unknown, base?: number): number | null {
  const L: ILuaState = lauxlib.luaL_newstate();

  lualib.luaL_openlibs(L);

  lua.lua_getglobal(L, "tonumber");
  lua.lua_pushstring(L, to_luastring(String(value)));

  if (base === undefined || base === null) {
    lua.lua_call(L, 1, 1);
  } else {
    lua.lua_pushinteger(L, base);
    lua.lua_call(L, 2, 1);
  }

  const result: string = to_jsstring(lauxlib.luaL_tolstring(L, -1));
  const parsed: number = Number.parseFloat(result);

  return Number.isNaN(parsed) ? null : parsed;
}
