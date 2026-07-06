import { MockLuaTable } from "../mock-lua-table";

import { mockTable } from "./lua-table";

describe("mockTable", () => {
  it("should insert appending to the next index", () => {
    const table = new MockLuaTable<number, string>();

    mockTable.insert(table as never, "a");
    mockTable.insert(table as never, "b");

    expect(table.get(1)).toBe("a");
    expect(table.get(2)).toBe("b");
  });

  it("should report size for tables, arrays and objects", () => {
    expect(mockTable.size(MockLuaTable.fromArray([1, 2, 3]))).toBe(3);
    expect(mockTable.size([1, 2])).toBe(2);
    expect(mockTable.size({ a: 1 })).toBe(1);
    expect(() => mockTable.size(5)).toThrow();
  });

  it("should remove by index and shift following elements", () => {
    const table = MockLuaTable.fromArray(["a", "b", "c"]);

    mockTable.remove(table, 1);

    expect(MockLuaTable.toArray(table)).toEqual(["b", "c"]);
  });

  it("should concat values with a separator", () => {
    expect(mockTable.concat(MockLuaTable.fromArray(["a", "b", "c"]), "-")).toBe("a-b-c");
    expect(mockTable.concat(["a", "b"], ",")).toBe("a,b");
  });

  it("should pick a random entry", () => {
    const table = MockLuaTable.fromArray(["only"]);

    expect(mockTable.random(table as unknown as MockLuaTable)).toEqual([1, "only"]);
  });

  it("should sort an array-style table with a comparator", () => {
    const table = MockLuaTable.fromArray([3, 1, 2]);

    mockTable.sort(table, (left, right) => left - right);

    expect(MockLuaTable.toArray(table)).toEqual([1, 2, 3]);
  });

  it("should sort using lua boolean comparator semantics", () => {
    const table = MockLuaTable.fromArray([3, 1, 2]);

    mockTable.sort(table, ((left: number, right: number) => left < right) as never);

    expect(MockLuaTable.toArray(table)).toEqual([1, 2, 3]);
  });
});
