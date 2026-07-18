import { mockMath } from "./mock-lua-math";

describe("mockMath", () => {
  describe("constants", () => {
    it("should expose LuaJIT numeric constants", () => {
      expect(mockMath.pi).toBe(Math.PI);
      expect(mockMath.huge).toBe(Infinity);
      expect(mockMath.huge).toBeGreaterThan(mockMath.pi);
    });
  });

  describe("abs", () => {
    it("should return a number magnitude", () => {
      expect(mockMath.abs(-4)).toBe(4);
      expect(mockMath.abs(0)).toBe(0);
      expect(mockMath.abs(4)).toBe(4);
    });
  });

  describe("acos", () => {
    it("should return angles in radians", () => {
      expect(mockMath.acos(1)).toBe(0);
      expect(mockMath.acos(0)).toBeCloseTo(Math.PI / 2);
      expect(mockMath.acos(-1)).toBeCloseTo(Math.PI);
    });
  });

  describe("asin", () => {
    it("should return angles in radians", () => {
      expect(mockMath.asin(-1)).toBeCloseTo(-Math.PI / 2);
      expect(mockMath.asin(0)).toBe(0);
      expect(mockMath.asin(1)).toBeCloseTo(Math.PI / 2);
    });
  });

  describe("atan", () => {
    it("should return angles in radians", () => {
      expect(mockMath.atan(-1)).toBeCloseTo(-Math.PI / 4);
      expect(mockMath.atan(0)).toBe(0);
      expect(mockMath.atan(1)).toBeCloseTo(Math.PI / 4);
    });
  });

  describe("atan2", () => {
    it("should use both coordinates to determine the quadrant", () => {
      expect(mockMath.atan2(1, 0)).toBeCloseTo(Math.PI / 2);
      expect(mockMath.atan2(0, -1)).toBeCloseTo(Math.PI);
      expect(mockMath.atan2(-1, 0)).toBeCloseTo(-Math.PI / 2);
    });
  });

  describe("ceil", () => {
    it("should round values toward positive infinity", () => {
      expect(mockMath.ceil(-1.8)).toBe(-1);
      expect(mockMath.ceil(1)).toBe(1);
      expect(mockMath.ceil(1.2)).toBe(2);
    });
  });

  describe("cos", () => {
    it("should calculate cosine from radians", () => {
      expect(mockMath.cos(0)).toBe(1);
      expect(mockMath.cos(Math.PI / 2)).toBeCloseTo(0);
      expect(mockMath.cos(Math.PI)).toBeCloseTo(-1);
    });
  });

  describe("cosh", () => {
    it("should calculate hyperbolic cosine", () => {
      expect(mockMath.cosh(0)).toBe(1);
      expect(mockMath.cosh(1)).toBeCloseTo(Math.cosh(1));
      expect(mockMath.cosh(-1)).toBeCloseTo(Math.cosh(1));
    });
  });

  describe("deg", () => {
    it("should convert radians to degrees", () => {
      expect(mockMath.deg(0)).toBe(0);
      expect(mockMath.deg(Math.PI / 2)).toBe(90);
      expect(mockMath.deg(-Math.PI)).toBe(-180);
    });
  });

  describe("exp", () => {
    it("should raise Euler's number to the supplied power", () => {
      expect(mockMath.exp(0)).toBe(1);
      expect(mockMath.exp(1)).toBe(Math.E);
      expect(mockMath.exp(Math.log(2))).toBeCloseTo(2);
    });
  });

  describe("floor", () => {
    it("should round values toward negative infinity", () => {
      expect(mockMath.floor(-1.2)).toBe(-2);
      expect(mockMath.floor(1)).toBe(1);
      expect(mockMath.floor(1.8)).toBe(1);
    });
  });

  describe("fmod", () => {
    it("should preserve the dividend sign in a remainder", () => {
      expect(mockMath.fmod(7, 3)).toBe(1);
      expect(mockMath.fmod(-7, 3)).toBe(-1);
      expect(mockMath.fmod(7, -3)).toBe(1);
    });
  });

  describe("frexp", () => {
    it("should split a number into a mantissa and a base-two exponent", () => {
      expect(mockMath.frexp(0)).toEqual([0, 0]);
      expect(mockMath.frexp(12)).toEqual([0.75, 4]);
      expect(mockMath.frexp(-0.25)).toEqual([-0.5, -1]);
    });
  });

  describe("ldexp", () => {
    it("should reconstruct a number from a mantissa and base-two exponent", () => {
      expect(mockMath.ldexp(0, 10)).toBe(0);
      expect(mockMath.ldexp(0.75, 4)).toBe(12);
      expect(mockMath.ldexp(-0.5, -1)).toBe(-0.25);
    });
  });

  describe("log", () => {
    it("should calculate natural logarithms", () => {
      expect(mockMath.log(1)).toBe(0);
      expect(mockMath.log(Math.E)).toBe(1);
      expect(mockMath.log(Math.E ** 2)).toBeCloseTo(2);
    });
  });

  describe("log10", () => {
    it("should calculate base-ten logarithms", () => {
      expect(mockMath.log10(1)).toBe(0);
      expect(mockMath.log10(10)).toBe(1);
      expect(mockMath.log10(100)).toBe(2);
    });
  });

  describe("max", () => {
    it("should select the greatest value", () => {
      expect(mockMath.max(1, 5, 3)).toBe(5);
      expect(mockMath.max(-5, -1, -3)).toBe(-1);
      expect(mockMath.max(2, 2)).toBe(2);
    });
  });

  describe("min", () => {
    it("should select the smallest value", () => {
      expect(mockMath.min(1, 5, 3)).toBe(1);
      expect(mockMath.min(-5, -1, -3)).toBe(-5);
      expect(mockMath.min(2, 2)).toBe(2);
    });
  });

  describe("mod", () => {
    it("should preserve the dividend sign in a remainder", () => {
      expect(mockMath.mod(7, 3)).toBe(1);
      expect(mockMath.mod(-7, 3)).toBe(-1);
      expect(mockMath.mod(7, -3)).toBe(1);
    });
  });

  describe("modf", () => {
    it("should split a number into integer and fractional parts", () => {
      expect(mockMath.modf(1.25)).toEqual([1, 0.25]);
      expect(mockMath.modf(-1.25)).toEqual([-1, -0.25]);
      expect(mockMath.modf(5)).toEqual([5, 0]);
    });
  });

  describe("pow", () => {
    it("should raise a value to a power", () => {
      expect(mockMath.pow(2, 3)).toBe(8);
      expect(mockMath.pow(2, -1)).toBe(0.5);
      expect(mockMath.pow(-2, 3)).toBe(-8);
    });
  });

  describe("rad", () => {
    it("should convert degrees to radians", () => {
      expect(mockMath.rad(0)).toBe(0);
      expect(mockMath.rad(90)).toBeCloseTo(Math.PI / 2);
      expect(mockMath.rad(-180)).toBeCloseTo(-Math.PI);
    });
  });

  describe("random", () => {
    it("should return fractions without bounds", () => {
      mockMath.randomseed(1);

      const first: number = mockMath.random();
      const second: number = mockMath.random();
      const third: number = mockMath.random();

      expect(first).toBeGreaterThanOrEqual(0);
      expect(second).toBeLessThan(1);
      expect(third).not.toBe(first);
    });

    it("should return integers in a one-based upper-bounded range", () => {
      mockMath.randomseed(2);

      expect(mockMath.random(1)).toBe(1);
      expect(mockMath.random(5)).toBeGreaterThanOrEqual(1);
      expect(mockMath.random(5)).toBeLessThanOrEqual(5);
    });

    it("should return integers in an inclusive bounded range", () => {
      mockMath.randomseed(3);

      expect(mockMath.random(3, 3)).toBe(3);
      expect(mockMath.random(3, 7)).toBeGreaterThanOrEqual(3);
      expect(mockMath.random(3, 7)).toBeLessThanOrEqual(7);
    });

    it("should reject invalid bounds", () => {
      expect(() => mockMath.random(1.5)).toThrow();
      expect(() => mockMath.random(1, 2.5)).toThrow();
      expect(() => mockMath.random(5, 1)).toThrow();
    });
  });

  describe("randomseed", () => {
    it("should make random sequences reproducible", () => {
      mockMath.randomseed(12345);

      const firstSequence: Array<number> = [mockMath.random(), mockMath.random(), mockMath.random()];

      mockMath.randomseed(12345);

      expect(mockMath.random()).toBe(firstSequence[0]);
      expect(mockMath.random()).toBe(firstSequence[1]);
      expect(mockMath.random()).toBe(firstSequence[2]);
    });
  });

  describe("sin", () => {
    it("should calculate sine from radians", () => {
      expect(mockMath.sin(-Math.PI / 2)).toBeCloseTo(-1);
      expect(mockMath.sin(0)).toBe(0);
      expect(mockMath.sin(Math.PI / 2)).toBeCloseTo(1);
    });
  });

  describe("sinh", () => {
    it("should calculate hyperbolic sine", () => {
      expect(mockMath.sinh(-1)).toBeCloseTo(-Math.sinh(1));
      expect(mockMath.sinh(0)).toBe(0);
      expect(mockMath.sinh(1)).toBeCloseTo(Math.sinh(1));
    });
  });

  describe("sqrt", () => {
    it("should calculate non-negative square roots", () => {
      expect(mockMath.sqrt(0)).toBe(0);
      expect(mockMath.sqrt(1)).toBe(1);
      expect(mockMath.sqrt(9)).toBe(3);
    });
  });

  describe("tan", () => {
    it("should calculate tangent from radians", () => {
      expect(mockMath.tan(-Math.PI / 4)).toBeCloseTo(-1);
      expect(mockMath.tan(0)).toBe(0);
      expect(mockMath.tan(Math.PI / 4)).toBeCloseTo(1);
    });
  });

  describe("tanh", () => {
    it("should calculate hyperbolic tangent", () => {
      expect(mockMath.tanh(-1)).toBeCloseTo(-Math.tanh(1));
      expect(mockMath.tanh(0)).toBe(0);
      expect(mockMath.tanh(1)).toBeCloseTo(Math.tanh(1));
    });
  });
});
