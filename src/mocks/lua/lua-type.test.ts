import { mockType } from "./lua-type";

describe("mockType", () => {
  it("should report nil for null and undefined", () => {
    expect(mockType(null)).toBe("nil");
    expect(mockType(undefined)).toBe("nil");
  });

  it("should report table for objects and symbols", () => {
    expect(mockType({})).toBe("table");
    expect(mockType([])).toBe("table");
    expect(mockType(Symbol("x"))).toBe("object");
  });

  it("should report number for numbers and bigint", () => {
    expect(mockType(1)).toBe("number");
    expect(mockType(BigInt(1))).toBe("number");
  });

  it("should report string, boolean and function", () => {
    expect(mockType("value")).toBe("string");
    expect(mockType(true)).toBe("boolean");
    expect(mockType(() => {})).toBe("function");
  });
});
