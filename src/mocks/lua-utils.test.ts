import { luaTableToArray, luaTableToObject, mapFromLua } from "./lua-utils";
import { MockLuaTable } from "./mock-lua-table";

describe("lua conversion utils", () => {
  describe("luaTableToArray", () => {
    it("should convert a flat lua array to a JS array", () => {
      expect(luaTableToArray(MockLuaTable.mockFromArray<number>([1, 2, 3]))).toEqual([1, 2, 3]);
    });

    it("should accept a plain JS array", () => {
      expect(luaTableToArray([1, 2, 3] as never)).toEqual([1, 2, 3]);
    });

    it("should recurse into nested tables", () => {
      const nested = MockLuaTable.mockFromArray([MockLuaTable.mockFromObject({ b: 1 })]);

      expect(luaTableToArray(nested)).toEqual([{ b: 1 }]);
    });

    it("should throw on unsupported input", () => {
      expect(() => luaTableToArray("bad" as never)).toThrow();
    });
  });

  describe("luaTableToObject", () => {
    it("should convert a flat lua table to a JS object", () => {
      expect(luaTableToObject(MockLuaTable.fromObject({ a: 1, b: 2 }))).toEqual({ a: 1, b: 2 });
    });

    it("should recurse into nested tables", () => {
      const nested = MockLuaTable.fromObject({ a: MockLuaTable.fromObject({ b: 1 }) });

      expect(luaTableToObject(nested)).toEqual({ a: { b: 1 } });
    });

    it("should pass null through", () => {
      expect(luaTableToObject(null)).toBeNull();
    });
  });

  describe("mapFromLua", () => {
    it("should turn a lua table into an object recursively", () => {
      const nested = MockLuaTable.fromObject({ a: 1, nested: MockLuaTable.fromObject({ b: 2 }) });

      expect(mapFromLua(nested)).toEqual({ a: 1, nested: { b: 2 } });
    });

    it("should pass primitives through unchanged", () => {
      expect(mapFromLua(5)).toBe(5);
      expect(mapFromLua("value")).toBe("value");
    });
  });
});
