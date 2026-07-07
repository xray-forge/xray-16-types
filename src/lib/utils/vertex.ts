import { alife, game_graph } from "xray16";
import { type GameObject } from "xray16/alias";
import { $isNotNil } from "xray16/macros";

import { MAX_U32 } from "../constants";
import { type TDistance, type TName, type TNumberId } from "../scalars";
import { type Nillable } from "../types";

/**
 * Check whether a game vertex belongs to a level.
 *
 * @inline
 *
 * @param levelName - Expected level name.
 * @param gameVertexId - Game vertex ID to check.
 * @returns Whether `gameVertexId` belongs to `levelName`.
 */
export function isGameVertexFromLevel(levelName: TName, gameVertexId: TNumberId): boolean {
  return levelName === alife().level_name(game_graph().vertex(gameVertexId).level_id());
}

/**
 * Get graph distance between two vertices.
 *
 * @inline
 *
 * @param firstVertexId - Source game vertex ID.
 * @param secondVertexId - Target game vertex ID.
 * @returns Distance between vertices.
 */
export function graphDistance(firstVertexId: TNumberId, secondVertexId: TNumberId): TDistance {
  return game_graph().vertex(firstVertexId).game_point().distance_to(game_graph().vertex(secondVertexId).game_point());
}

/**
 * Get squared graph distance between two vertices.
 *
 * @inline
 *
 * @param firstVertexId - Source game vertex ID.
 * @param secondVertexId - Target game vertex ID.
 * @returns Squared distance between vertices.
 */
export function graphDistanceSqr(firstVertexId: TNumberId, secondVertexId: TNumberId): TDistance {
  return game_graph()
    .vertex(firstVertexId)
    .game_point()
    .distance_to_sqr(game_graph().vertex(secondVertexId).game_point());
}

/**
 * Check whether an object can access a game vertex.
 *
 * @inline
 *
 * @param object - Object to validate vertex against.
 * @param vertexId - Game vertex ID to check.
 * @returns Whether `vertexId` is not nil, is below `MAX_U32`, and is accessible by `object`.
 */
export function isValidAccessibleVertex(object: GameObject, vertexId: Nillable<TNumberId>): boolean {
  return $isNotNil(vertexId) && vertexId < MAX_U32 && object.accessible(vertexId);
}
