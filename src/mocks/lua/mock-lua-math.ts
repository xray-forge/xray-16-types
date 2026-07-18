/**
 * Mock default lua math library.
 */
let randomGenerator: () => number = Math.random;

export const mockMath = {
  huge: Infinity,
  pi: Math.PI,
  max: (...args: Array<number>) => Math.max(...args),
  min: (...args: Array<number>) => Math.min(...args),
  abs: (value: number) => Math.abs(value),
  sqrt: (value: number) => Math.sqrt(value),
  cos: (value: number) => Math.cos(value),
  ceil: (value: number) => Math.ceil(value),
  sin: (value: number) => Math.sin(value),
  mod: (value: number, base: number) => value % base,
  random: (...args: Array<number>) => {
    // Assert all numbers are integers.
    for (const arg of args) {
      if (arg % 1 !== 0) {
        throw new Error(
          `Expected only integer values to be provided for lua math.random method, got [${args.join(", ")}].`
        );
      }
    }

    if (args.length === 0) {
      return randomGenerator();
    } else if (args.length === 1) {
      return Math.max(1, Math.round(randomGenerator() * args[0]));
    } else {
      if (args[1] < args[0]) {
        throw new Error(
          `Bad call for lua math.random method, second argument should be bigger than first (${args[1]} > ${args[0]}).`
        );
      }

      return args[0] + Math.round(randomGenerator() * (args[1] - args[0]));
    }
  },
  floor: (value: number) => Math.floor(value),
  /**
   * Value – a number representing a cosine, where x is between -1 and 1.
   */
  acos: (value: number) => Math.acos(value),
  asin: (value: number) => Math.asin(value),
  atan: (value: number) => Math.atan(value),
  atan2: (y: number, x: number) => Math.atan2(y, x),
  cosh: (value: number) => Math.cosh(value),
  deg: (radians: number) => (radians * 180) / Math.PI,
  exp: (value: number) => Math.exp(value),
  fmod: (value: number, base: number) => value % base,
  frexp: (value: number) => {
    if (value === 0) {
      return [0, 0];
    }

    const exponent: number = Math.floor(Math.log2(Math.abs(value))) + 1;

    return [value / 2 ** exponent, exponent];
  },
  ldexp: (mantissa: number, exponent: number) => mantissa * 2 ** exponent,
  log: (value: number) => Math.log(value),
  log10: (value: number) => Math.log10(value),
  modf: (value: number) => {
    const integer: number = Math.trunc(value);

    return [integer, value - integer];
  },
  pow: (value: number, exponent: number) => Math.pow(value, exponent),
  rad: (degrees: number) => (degrees * Math.PI) / 180,
  randomseed: (seed: number): void => {
    let state: number = seed >>> 0;

    randomGenerator = (): number => {
      state = (state * 1_664_525 + 1_013_904_223) >>> 0;

      return state / 4_294_967_296;
    };
  },
  sinh: (value: number) => Math.sinh(value),
  tan: (value: number) => Math.tan(value),
  tanh: (value: number) => Math.tanh(value),
};
