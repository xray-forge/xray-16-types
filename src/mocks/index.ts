/**
 * `xray16/mocks` — runtime Lua environment mocks for testing X-Ray TypeScriptToLua code under jest/node.
 */

export { MockLuaMap, mockFromLuaMap } from "./mock-lua-map";
export { MockLuaTable, mockFromLuaTable } from "./mock-lua-table";

export { luaTableToArray, luaTableToObject, mapFromLua } from "./lua/lua-utils";
export { mockDebug } from "./lua/lua-debug";
export { mockIo, MockIoFile } from "./lua/lua-io";
export { mockJit } from "./lua/lua-jit";
export { mockMarshal } from "./lua/lua-marshal";
export { mockMath } from "./lua/lua-math";
export { mockRange } from "./lua/lua-range";
export { mockString } from "./lua/lua-string";
export { mockTable } from "./lua/lua-table";
export { mockToString } from "./lua/lua-tostring";
export { mockTonumber } from "./lua/lua-tonumber";
export { mockType } from "./lua/lua-type";

export { EMockPacketDataType, MockNetProcessor } from "./xray/net-processor";
export { MockAnim } from "./xray/mock-anim";
export { MockCAlifeMonsterBrain } from "./xray/mock-alife-monster-brain";
export { MockCGameFont } from "./xray/mock-game-font";
export { MockCSightParams } from "./xray/mock-sight-params";
export { MockCTime } from "./xray/mock-ctime";
export { MockCVertex } from "./xray/mock-cvertex";
export { MockColor, mockGetARGB } from "./xray/mock-color";
export { MockCond } from "./xray/mock-cond";
export { MockDevice } from "./xray/mock-device";
export { MockEffector } from "./xray/mock-effector";
export { MockEntityAction } from "./xray/mock-entity-action";
export { MockFbox } from "./xray/mock-fbox";
export { MockFlags32 } from "./xray/mock-flags32";
export { MockFrect } from "./xray/mock-frect";
export { MockHit } from "./xray/mock-hit";
export { MockLook } from "./xray/mock-look";
export { MockLuabindClass } from "./xray/mock-luabind";
export { MockNoise } from "./xray/mock-noise";
export { MockObject } from "./xray/mock-object";
export { MockPropertiesHelper } from "./xray/mock-properties-helper";
export { MockSound } from "./xray/mock-sound";
export { MockVector } from "./xray/mock-vector";
export { MockVector2D } from "./xray/mock-vector-2d";
export { mockActorStatsInterface } from "./xray/mock-actor-stats";
export { mockCommandLine } from "./xray/mock-command-line";
export { mockGameInterface } from "./xray/mock-game";
export { mockLevelInterface } from "./xray/mock-level";
