/**
 * `xray16/jest` — runtime Lua environment mocks for testing X-Ray TypeScriptToLua code under jest/node.
 *
 * Wire {@link mockLuaEnvironment} (or {@link mockLuaGlobals}) into a jest setup file to install the mocked
 * `table`/`string`/`math`/`io`/`debug` libraries, `LuaTable`/`LuaMap` runtimes, and the `pairs`/`ipairs`/
 * `tonumber`/`tostring`/`type` globals. String pattern methods are backed by a real Lua VM (fengari) for
 * 1-1 behaviour, so consumers do not need to depend on fengari themselves.
 */

export { mockLuaGlobals, mockLuaEnvironment } from "./lua-globals";
export { MockLuaTable, mockFromLuaTable } from "./mock-lua-table";
export { MockLuaMap, mockFromLuaMap } from "./mock-lua-map";
export { mockString } from "./lua-string";
export { mockTable } from "./lua-table";
export { mockMath } from "./lua-math";
export { mockJit } from "./lua-jit";
export { mockIo, MockIoFile } from "./lua-io";
export { mockDebug } from "./lua-debug";
export { mockType } from "./lua-type";
export { mockToString } from "./lua-tostring";
export { luaTableToArray, luaTableToObject, mapFromLua } from "./lua-utils";
