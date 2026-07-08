import { type GameObject, type Patrol, type Vector } from "xray16/alias";

import { type TDistance, type TIndex } from "../scalars";
import { type Nillable } from "../types";

/**
 * @param object - Target object to check.
 * @param patrolPath - Target patrol to check.
 * @param patrolPointIndex - Index of patrol to check.
 * @returns Whether object reached patrol point with provided index.
 */
export function isObjectAtWaypoint(object: GameObject, patrolPath: Patrol, patrolPointIndex: TIndex): boolean {
  const objectPosition: Vector = object.position();
  const distance: TDistance = objectPosition.distance_to_sqr(patrolPath.point(patrolPointIndex));

  return distance <= 0.13;
}

/**
 * Check if object standing on terminal patrol waypoint.
 * Verifies that object is on one of terminal waypoints.
 *
 * @param object - Game object to check.
 * @param patrol - Target patrol object to check.
 * @returns [whether on terminal point, terminal point index].
 */
export function isObjectAtTerminalWaypoint(
  object: GameObject,
  patrol: Patrol
): LuaMultiReturn<[boolean, Nillable<TIndex>]> {
  for (const index of $range(0, patrol.count() - 1)) {
    // Check if point is terminal, then compare object position against it.
    if (patrol.terminal(index) && isObjectAtWaypoint(object, patrol, index)) {
      return $multi(true, index);
    }
  }

  return $multi(false, null);
}

/**
 * @param patrol - Target patrol to check.
 * @param index - Point index of the patrol to check.
 * @returns Flag 32 bit index or null if patrol is not flagged at all.
 */
export function getPatrolFlag(patrol: Patrol, index: TIndex): Nillable<TIndex> {
  for (const flag of $range(0, 31)) {
    if (patrol.flag(index, flag)) {
      return flag;
    }
  }

  return null;
}
