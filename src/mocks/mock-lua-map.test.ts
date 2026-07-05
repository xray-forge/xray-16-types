import { MockLuaMap, mockFromLuaMap } from "./mock-lua-map";

describe("MockLuaMap", () => {
  it("should build from and convert to objects, parsing numeric-string keys", () => {
    const map = MockLuaMap.fromObject({ x: 1, "2": "two" });

    expect(map.get("x")).toBe(1);
    // Numeric-string keys are parsed to numbers, so read back with a numeric key.
    expect((map as MockLuaMap).get(2)).toBe("two");
    expect(MockLuaMap.toObject(map)).toEqual({ x: 1, "2": "two" });
  });

  it("should build from arrays with 1-based keys", () => {
    const map = MockLuaMap.fromArray(["a", "b"]);

    expect(map.get(1)).toBe("a");
    expect(map.get(2)).toBe("b");
    expect(map.length()).toBe(2);
  });

  it("should treat has as a nil check", () => {
    const map = new MockLuaMap<string, number>();

    expect(map.has("a")).toBe(false);

    map.set("a", 1);

    expect(map.has("a")).toBe(true);
  });

  it("should report emptiness, length and reset", () => {
    const map = MockLuaMap.fromArray([1, 2]);

    expect(map.isEmpty()).toBe(false);
    expect(map.length()).toBe(2);

    map.reset();

    expect(map.isEmpty()).toBe(true);
  });

  it("should expose key/value/entry arrays and map", () => {
    const map = MockLuaMap.fromArray(["a", "b"]);

    expect(map.getKeysArray()).toEqual([1, 2]);
    expect(map.getValuesArray()).toEqual(["a", "b"]);
    expect(map.map((value) => value.toUpperCase())).toEqual(["A", "B"]);
  });

  it("should measure size for maps and plain objects", () => {
    expect(MockLuaMap.getSizeOf(MockLuaMap.fromArray([1, 2, 3]))).toBe(3);
    expect(MockLuaMap.getSizeOf({ a: 1 })).toBe(1);
  });

  it("should provide mock/create/mockFrom helpers", () => {
    expect(MockLuaMap.mock([["a", 1]]) instanceof MockLuaMap).toBe(true);
    expect(MockLuaMap.create() instanceof MockLuaMap).toBe(true);

    const object = MockLuaMap.mockFromObject({ a: 1 });

    expect(MockLuaMap.mockToObject(object)).toEqual({ a: 1 });
    expect(mockFromLuaMap(object as unknown as LuaMap<string, number>) instanceof MockLuaMap).toBe(true);
  });
});
