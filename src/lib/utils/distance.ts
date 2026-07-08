import { type AnyGameObject, type GameObject, type ServerObject, type Vector } from "xray16/alias";
import { $isNotNil } from "xray16/macros";

import { type TDistance, type TNumberId } from "../scalars";
import { type Nillable } from "../types";

/**
 * Check whether object is inside another zone object.
 *
 * @inline
 *
 * @param object - Game object to check.
 * @param zone - Target zone to check.
 * @returns Whether object is inside zone object.
 */
export function isObjectInZone(object: Nillable<GameObject>, zone: Nillable<GameObject>): boolean {
  return $isNotNil(object) && $isNotNil(zone) && zone.inside(object.position());
}

/**
 * Check distance between objects.
 *
 * @inline
 *
 * @param first - Object distance from.
 * @param second - Object distance to.
 * @param distance - Distance in meters.
 * @returns Whether distance between objects greater or equal.
 */
export function isDistanceBetweenObjectsGreaterOrEqual(
  first: GameObject,
  second: GameObject,
  distance: TDistance
): boolean {
  return first.position().distance_to_sqr(second.position()) >= distance * distance;
}

/**
 * Check distance between objects.
 *
 * @inline
 *
 * @param first - Object distance from.
 * @param second - Object distance to.
 * @param distance - Distance in meters.
 * @returns Whether distance between objects less or equal.
 */
export function isDistanceBetweenObjectsLessOrEqual(
  first: GameObject,
  second: GameObject,
  distance: TDistance
): boolean {
  return first.position().distance_to_sqr(second.position()) <= distance * distance;
}

/**
 * Get distance for objects based on game vectors.
 *
 * @inline
 *
 * @param first - Object to check.
 * @param second - Object to check.
 * @returns Vector distance between two objects.
 */
export function getDistanceBetween(first: GameObject, second: GameObject): TDistance {
  return first.position().distance_to(second.position());
}

/**
 * Get squared distance for objects based on game vectors.
 *
 * @inline
 *
 * @param first - Object to check.
 * @param second - Object to check.
 * @returns Squared vector distance between two objects.
 */
export function getDistanceBetweenSqr(first: GameObject, second: GameObject): TDistance {
  return first.position().distance_to_sqr(second.position());
}

/**
 * @param object - Any game object used by the game engine.
 * @returns Tuple of object position details: id, gvi, lvi, position.
 */
export function getObjectPositioning(object: AnyGameObject): LuaMultiReturn<[TNumberId, TNumberId, TNumberId, Vector]> {
  if (type(object.id) === "number") {
    return $multi(
      (object as ServerObject).id,
      (object as ServerObject).m_game_vertex_id,
      (object as ServerObject).m_level_vertex_id,
      (object as ServerObject).position
    );
  } else {
    return $multi(
      (object as GameObject).id(),
      (object as GameObject).game_vertex_id(),
      (object as GameObject).level_vertex_id(),
      (object as GameObject).position()
    );
  }
}
