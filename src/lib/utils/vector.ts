import { vector, vector2 } from "xray16";
import { type Vector, type Vector2D } from "xray16/alias";

import { NIL } from "../constants";
import { type TDistance, type TRate } from "../scalars";
import { type Nillable } from "../types";

import { PI_DEGREE, RADIAN } from "./number";

/**
 * Create a 3D vector with all coordinates set to zero.
 *
 * @inline
 *
 * @returns New zero vector.
 */
export function createEmptyVector(): Vector {
  return new vector().set(0, 0, 0);
}

/**
 * Create a 2D vector with all coordinates set to zero.
 *
 * @inline
 *
 * @returns New zero vector.
 */
export function createEmpty2dVector(): Vector2D {
  return new vector2().set(0, 0);
}

/**
 * Create a 3D vector.
 *
 * @inline
 *
 * @param x - X coordinate.
 * @param y - Y coordinate.
 * @param z - Z coordinate.
 * @returns New vector with the provided coordinates.
 */
export function createVector(x: number, y: number, z: number): Vector {
  return new vector().set(x, y, z);
}

/**
 * Create a 2D vector.
 *
 * @inline
 *
 * @param x - X coordinate.
 * @param y - Y coordinate.
 * @returns New vector with the provided coordinates.
 */
export function create2dVector(x: number, y: number): Vector2D {
  return new vector2().set(x, y);
}

/**
 * Add two vectors.
 *
 * @inline
 *
 * @param first - Left operand.
 * @param second - Right operand.
 * @returns New vector containing `first + second`.
 */
export function addVectors(first: Readonly<Vector>, second: Readonly<Vector>): Vector {
  return new vector().add(first, second);
}

/**
 * Subtract one vector from another.
 *
 * @inline
 *
 * @param first - Vector to subtract from.
 * @param second - Vector to subtract.
 * @returns New vector containing `first - second`.
 */
export function subVectors(first: Vector, second: Vector): Vector {
  return new vector().sub(first, second);
}

/**
 * Calculate the cross product of two vectors.
 *
 * @inline
 *
 * @param first - Left operand.
 * @param second - Right operand.
 * @returns New vector containing `first x second`.
 */
export function vectorCross(first: Readonly<Vector>, second: Readonly<Vector>): Vector {
  return new vector().set(
    first.y * second.z - first.z * second.y,
    first.z * second.x - first.x * second.z,
    first.x * second.y - first.y * second.x
  );
}

/**
 * Copy a vector.
 *
 * @inline
 *
 * @param source - Vector to copy.
 * @returns New vector with same coordinates.
 */
export function copyVector(source: Readonly<Vector>): Vector {
  return new vector().set(source);
}

/**
 * Calculate the yaw angle between two vectors on the XZ plane.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns Angle in radians.
 */
export function yaw(first: Readonly<Vector>, second: Readonly<Vector>): TRate {
  return math.acos(
    (first.x * second.x + first.z * second.z) /
      (math.sqrt(first.x * first.x + first.z * first.z) * math.sqrt(second.x * second.x + second.z * second.z))
  );
}

/**
 * Calculate the yaw angle between two vectors on the XZ plane.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns Angle in degrees.
 */
export function yawDegree(first: Readonly<Vector>, second: Readonly<Vector>): TRate {
  return (
    math.acos(
      (first.x * second.x + first.z * second.z) /
        (math.sqrt(first.x * first.x + first.z * first.z) * math.sqrt(second.x * second.x + second.z * second.z))
    ) * RADIAN
  );
}

/**
 * Calculate the angle between two vectors in 3D space.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns Angle in degrees.
 */
export function yawDegree3d(first: Readonly<Vector>, second: Readonly<Vector>): TRate {
  return (
    math.acos(
      (first.x * second.x + first.y * second.y + first.z * second.z) /
        (math.sqrt(first.x * first.x + first.y * first.y + first.z * first.z) *
          math.sqrt(second.x * second.x + second.y * second.y + second.z * second.z))
    ) * RADIAN
  );
}

/**
 * Rotate a vector around the Y axis.
 *
 * Not inlinable: reuses the computed `cos` / `sin` values, so it needs a statement body.
 *
 * @param target - Vector to rotate.
 * @param angleBase - Rotation angle in degrees.
 * @returns New rotated vector.
 */
export function vectorRotateY(target: Readonly<Vector>, angleBase: TRate): Vector {
  const angle: TRate = angleBase * PI_DEGREE;
  const cos: number = math.cos(angle);
  const sin: number = math.sin(angle);

  return new vector().set(target.x * cos - target.z * sin, target.y, target.x * sin + target.z * cos);
}

/**
 * Convert radians to degrees.
 *
 * @inline
 *
 * @param radian - Angle in radians.
 * @returns Value in degrees.
 */
export function radianToDegree(radian: number): number {
  return (radian * 180) / math.pi;
}

/**
 * Convert degrees to radians.
 *
 * @inline
 *
 * @param degree - Angle in degrees.
 * @returns Value in radians.
 */
export function degreeToRadian(degree: number): number {
  return (degree * math.pi) / 180;
}

/**
 * Calculate the absolute angle difference between two vectors.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns Angle difference in degrees.
 */
export function angleDiff(first: Readonly<Vector>, second: Readonly<Vector>): number {
  return radianToDegree(math.acos(math.abs(first.normalize().dotproduct(second.normalize()))));
}

/**
 * Convert an angle vector to a normalized direction vector.
 *
 * @inline
 *
 * @param angle - Angle vector where `x` is pitch and `y` is yaw.
 * @returns Normalized direction vector.
 */
export function angleToDirection(angle: Readonly<Vector>): Vector {
  return new vector().setHP(angle.y, angle.x).normalize();
}

/**
 * Calculate distance between two vectors on the XZ plane.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns 2D distance using X and Z coordinates.
 */
export function distanceBetween2d(first: Readonly<Vector>, second: Readonly<Vector>): TDistance {
  return math.sqrt((second.x - first.x) ** 2 + (second.z - first.z) ** 2);
}

/**
 * Check whether two 3D vectors have exactly equal coordinates.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns Whether all coordinates are equal with `===`.
 */
export function areSameVectors(first: Readonly<Vector>, second: Readonly<Vector>): boolean {
  return first.x === second.x && first.y === second.y && first.z === second.z;
}

/**
 * Check whether two 2D vectors have exactly equal coordinates.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @returns Whether all coordinates are equal with `===`.
 */
export function areSame2dVectors(first: Readonly<Vector2D>, second: Readonly<Vector2D>): boolean {
  return first.x === second.x && first.y === second.y;
}

/**
 * Check whether two 3D vectors are equal within a tolerance.
 *
 * @inline
 *
 * @param first - First vector.
 * @param second - Second vector.
 * @param eps - Maximum allowed coordinate difference.
 * @returns Whether all coordinate differences are less than or equal to `eps`.
 */
export function areSameVectorsByPrecision(first: Readonly<Vector>, second: Readonly<Vector>, eps: TRate): boolean {
  return (
    math.abs(first.x - second.x) <= eps && math.abs(first.y - second.y) <= eps && math.abs(first.z - second.z) <= eps
  );
}

/**
 * Convert a vector to the engine debug string format.
 *
 * Not `@inline`: the `target ? … : NIL` truthiness test on a non-boolean object folds to a `condition and …
 * or …` at every call site, which tstl flags ("Only false and nil evaluate to 'false'"). As a debug/logging
 * formatter it gains nothing from inlining, so it stays a regular call.
 *
 * @param target - Vector to stringify, or nil-like value.
 * @returns String in `[x:y:z]` format, or `nil`.
 */
export function vectorToString(target: Nillable<Readonly<Vector>>): string {
  return target ? string.format("[%s:%s:%s]", target.x, target.y, target.z) : NIL;
}
