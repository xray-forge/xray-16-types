/**
 * `xray16/mocks` — runtime Lua environment mocks for testing X-Ray TypeScriptToLua code under jest/node.
 *
 * Individual mocks (e.g. {@link mockRange}, {@link mockTonumber}, {@link MockLuaTable}) can be imported
 * directly to assemble a custom setup. String and `tonumber` semantics are backed by a real Lua VM
 * (fengari) for 1-1 behaviour, so consumers do not need to depend on fengari themselves.
 */

export { MockLuaTable, mockFromLuaTable } from "./mock-lua-table";
export { MockLuaMap, mockFromLuaMap } from "./mock-lua-map";

export { mockString } from "./lua/lua-string";
export { mockTable } from "./lua/lua-table";
export { mockMath } from "./lua/lua-math";
export { mockJit } from "./lua/lua-jit";
export { mockIo, MockIoFile } from "./lua/lua-io";
export { mockDebug } from "./lua/lua-debug";
export { mockType } from "./lua/lua-type";
export { mockToString } from "./lua/lua-tostring";
export { mockRange } from "./lua/lua-range";
export { mockTonumber } from "./lua/lua-tonumber";
export { luaTableToArray, luaTableToObject, mapFromLua } from "./lua/lua-utils";

export { MockVector } from "./xray/mock-vector";
export { MockVector2D } from "./xray/mock-vector-2d";
