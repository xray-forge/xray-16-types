/**
 * Radians in one degree (`PI / 180`).
 *
 * @inline
 */
export const PI_DEGREE: number = Math.PI / 180;

/**
 * Degrees in one radian (`180 / PI`).
 *
 * `@inline` so it folds to a literal at call sites — required for the `@inline` vector utils that reference
 * it (`yawDegree`, `yawDegree3d`); without it their inlined bodies emit a dangling `____exports.RADIAN`.
 *
 * @inline
 */
export const RADIAN: number = 180 / Math.PI;

/**
 * Clamp a number to inclusive bounds.
 *
 * @inline
 *
 * @param value - Number to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @returns Clamped number.
 */
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/**
 * Round a number to the nearest integer.
 *
 * @param value - Number to round.
 * @returns Rounded integer.
 */
export function round(value: number): number {
  const min: number = math.floor(value);
  const max: number = min + 1;

  return value - min >= max - value ? max : min;
}

/**
 * Round a number to a decimal precision.
 *
 * @param value - Number to round.
 * @param precision - Number of decimal places.
 * @returns Rounded number.
 */
export function roundWithPrecision(value: number, precision?: number): number {
  const magnitude: number = Math.pow(10, precision ?? 0);

  return value >= 0 ? math.floor(magnitude * value + 0.5) / magnitude : math.ceil(magnitude * value - 0.5) / magnitude;
}

/**
 * Create a numeric range.
 *
 * @param size - Number of items to create.
 * @param startAt - First value in range.
 * @returns Array containing range values.
 */
export function range(size: number, startAt: number = 0): ReadonlyArray<number> {
  const list = [];

  for (let index = 0; index < size; index++) {
    list.push(index + startAt);
  }

  return list;
}
