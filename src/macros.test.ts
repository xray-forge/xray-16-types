import { $fromArray, $fromLuaArray, $fromLuaTable, $fromObject, $isNil, $isNotNil } from "./macros";

describe("macros runtime module", () => {
  // Minimal Map-based `LuaTable` runtime, like the one a consumer provides via `globalThis.LuaTable`.
  class LuaTableDouble extends Map<unknown, unknown> {}

  const originalLuaTable = (globalThis as Record<string, unknown>).LuaTable;

  beforeAll(() => {
    (globalThis as Record<string, unknown>).LuaTable = LuaTableDouble;
  });

  afterAll(() => {
    (globalThis as Record<string, unknown>).LuaTable = originalLuaTable;
  });

  it("nil checks match Lua semantics without globals or mocks", () => {
    expect($isNil(null)).toBe(true);
    expect($isNil(undefined)).toBe(true);
    expect($isNil(0)).toBe(false);
    expect($isNotNil(5)).toBe(true);
    expect($isNotNil(null)).toBe(false);
  });

  it("converts arrays to/from a LuaTable via the environment runtime", () => {
    const luaArray = $fromArray(["a", "b"]) as unknown as Map<number, string>;

    expect(luaArray instanceof LuaTableDouble).toBe(true);
    expect(luaArray.get(1)).toBe("a");
    expect(luaArray.get(2)).toBe("b");
    expect($fromLuaArray(luaArray as unknown as LuaTable<number, string>)).toEqual(["a", "b"]);
  });

  it("converts objects to/from a LuaTable, parsing numeric-string keys", () => {
    const luaTable = $fromObject<string | number, unknown>({ x: 1, "2": "two" }) as unknown as Map<unknown, unknown>;

    expect(luaTable.get("x")).toBe(1);
    expect(luaTable.get(2)).toBe("two");

    expect($fromLuaTable(luaTable as unknown as LuaTable<string | number, unknown>)).toEqual({ x: 1, "2": "two" });
  });
});
