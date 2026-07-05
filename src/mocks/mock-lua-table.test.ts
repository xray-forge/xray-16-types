import { MockLuaTable, mockFromLuaTable } from "./mock-lua-table";

describe("MockLuaTable", () => {
  it("should build from and convert to arrays with 1-based keys", () => {
    const table = MockLuaTable.fromArray(["a", "b", "c"]);

    expect(table.get(1)).toBe("a");
    expect(table.get(3)).toBe("c");
    expect(table.length()).toBe(3);
    expect(MockLuaTable.toArray(table)).toEqual(["a", "b", "c"]);
  });

  it("should build from and convert to objects, parsing numeric-string keys", () => {
    const table = MockLuaTable.fromObject({ x: 1, "2": "two" });

    expect(table.get("x")).toBe(1);
    // Numeric-string keys are parsed to numbers, so read back with a numeric key.
    expect((table as MockLuaTable).get(2)).toBe("two");
    expect(MockLuaTable.toObject(table)).toEqual({ x: 1, "2": "two" });
  });

  it("should return null from get for missing keys, mirroring lua nil", () => {
    const table = new MockLuaTable<string, number>();

    expect(table.get("missing")).toBeNull();

    table.set("a", 1);

    expect(table.get("a")).toBe(1);
  });

  it("should treat has as a nil check", () => {
    const table = new MockLuaTable<string, number>();

    expect(table.has("a")).toBe(false);

    table.set("a", 1);

    expect(table.has("a")).toBe(true);
  });

  it("should report emptiness, length and reset", () => {
    const table = MockLuaTable.fromArray([1, 2]);

    expect(table.isEmpty()).toBe(false);
    expect(table.length()).toBe(2);

    table.reset();

    expect(table.isEmpty()).toBe(true);
    expect(table.length()).toBe(0);
  });

  it("should expose key/value/entry arrays and map", () => {
    const table = MockLuaTable.fromArray(["a", "b"]);

    expect(table.getKeysArray()).toEqual([1, 2]);
    expect(table.getValuesArray()).toEqual(["a", "b"]);
    expect(table.getEntriesArray()).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
    expect(table.map((value) => value.toUpperCase())).toEqual(["A", "B"]);
  });

  it("should measure size for tables and plain objects", () => {
    expect(MockLuaTable.getSizeOf(MockLuaTable.fromArray([1, 2, 3]))).toBe(3);
    expect(MockLuaTable.getSizeOf({ a: 1, b: 2 })).toBe(2);
  });

  it("should provide mock/create/mockFrom helpers", () => {
    expect(MockLuaTable.mock([["a", 1]]) instanceof MockLuaTable).toBe(true);
    expect(MockLuaTable.create() instanceof MockLuaTable).toBe(true);

    const array = MockLuaTable.mockFromArray<number>([1, 2]);
    const object = MockLuaTable.mockFromObject({ a: 1 });

    expect(MockLuaTable.mockToArray(array)).toEqual([1, 2]);
    expect(MockLuaTable.mockToObject(object)).toEqual({ a: 1 });
    expect(mockFromLuaTable(object) instanceof MockLuaTable).toBe(true);
  });
});
