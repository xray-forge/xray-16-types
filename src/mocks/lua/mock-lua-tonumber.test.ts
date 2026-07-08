import { mockTonumber } from "./mock-lua-tonumber";

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

  it("should parse integers in a given base", () => {
    expect(mockTonumber("ff", 16)).toBe(255);
    expect(mockTonumber("10", 2)).toBe(2);
    expect(mockTonumber("777", 8)).toBe(511);
    expect(mockTonumber("z", 36)).toBe(35);
  });

  it("should return null for digits invalid in the given base", () => {
    expect(mockTonumber("2", 2)).toBeNull();
    expect(mockTonumber("g", 16)).toBeNull();
  });
});
