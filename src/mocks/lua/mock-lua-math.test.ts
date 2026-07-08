import { mockMath } from "./mock-lua-math";

describe("mockMath", () => {
  it("should mirror plain math helpers", () => {
    expect(mockMath.pi).toBe(Math.PI);
    expect(mockMath.max(1, 5, 3)).toBe(5);
    expect(mockMath.min(1, 5, 3)).toBe(1);
    expect(mockMath.abs(-4)).toBe(4);
    expect(mockMath.sqrt(9)).toBe(3);
    expect(mockMath.ceil(1.2)).toBe(2);
    expect(mockMath.floor(1.8)).toBe(1);
    expect(mockMath.mod(7, 3)).toBe(1);
  });

  describe("random", () => {
    it("should return a fraction with no arguments", () => {
      const value = mockMath.random();

      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });

    it("should stay within [1, n] for a single argument", () => {
      for (let it = 0; it < 50; it++) {
        const value = mockMath.random(5);

        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(5);
      }
    });

    it("should stay within [a, b] for two arguments", () => {
      for (let it = 0; it < 50; it++) {
        const value = mockMath.random(3, 7);

        expect(value).toBeGreaterThanOrEqual(3);
        expect(value).toBeLessThanOrEqual(7);
      }
    });

    it("should reject non-integer arguments", () => {
      expect(() => mockMath.random(1.5)).toThrow();
    });

    it("should reject a smaller upper bound", () => {
      expect(() => mockMath.random(5, 1)).toThrow();
    });
  });
});
