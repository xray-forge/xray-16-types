/**
 * Shared alife object id constants.
 */

/**
 * Actor server/client object id. The actor always occupies id `0` in the alife registry.
 *
 * @inline
 */
export const ACTOR_ID: 0 = 0 as const;

/**
 * Maximal alife object id (unsigned 16-bit max). Used as the "unset" sentinel for object/terrain ids.
 *
 * @inline
 */
export const MAX_ALIFE_ID: 65_535 = 65_535 as const;
