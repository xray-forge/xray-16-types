import { mockRange } from "./mock-lua-range";

describe("mockRange", () => {
  it("should produce an inclusive ascending range", () => {
    expect(mockRange(1, 4)).toEqual([1, 2, 3, 4]);
    expect(mockRange(3, 3)).toEqual([3]);
  });

  it("should return an empty range when start exceeds end", () => {
    expect(mockRange(5, 1)).toEqual([]);
  });

  it("should support negative bounds", () => {
    expect(mockRange(-2, 1)).toEqual([-2, -1, 0, 1]);
  });
});
