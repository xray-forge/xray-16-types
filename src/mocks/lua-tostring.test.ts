import { mockToString } from "./lua-tostring";

describe("mockToString", () => {
  it("should stringify nil values", () => {
    expect(mockToString(null)).toBe("nil");
    expect(mockToString(undefined)).toBe("nil");
  });

  it("should stringify tables and functions with placeholder addresses", () => {
    expect(mockToString({})).toBe("table: 0x000000");
    expect(mockToString(() => {})).toBe("function: 0x000000");
  });

  it("should stringify primitives", () => {
    expect(mockToString(5)).toBe("5");
    expect(mockToString(true)).toBe("true");
    expect(mockToString("value")).toBe("value");
  });
});
