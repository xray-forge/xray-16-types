import { mockTonumber } from "./lua-tonumber";

describe("mockTonumber", () => {
  it("should parse numeric strings", () => {
    expect(mockTonumber("1")).toBe(1);
    expect(mockTonumber("1.5")).toBe(1.5);
    expect(mockTonumber("-1.5")).toBe(-1.5);
  });

  it("should parse actual numbers", () => {
    expect(mockTonumber(42)).toBe(42);
  });

  it("should return null for non-numeric input", () => {
    expect(mockTonumber("-1.5a")).toBeNull();
    expect(mockTonumber("abc")).toBeNull();
    expect(mockTonumber("")).toBeNull();
    expect(mockTonumber(true)).toBeNull();
    expect(mockTonumber(false)).toBeNull();
    expect(mockTonumber(null)).toBeNull();
    expect(mockTonumber(undefined)).toBeNull();
    expect(mockTonumber(NaN)).toBeNull();
  });
});
