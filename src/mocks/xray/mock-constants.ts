/**
 * Default game-domain constants used by the X-Ray object mocks.
 */

/**
 * Actor server/client object id. The actor always occupies id `0` in the alife registry.
 *
 * @inline
 */
export const ACTOR_ID = 0 as const;

/**
 * Maximal alife object id (unsigned 16-bit max). Used as the "unset" sentinel for object/terrain ids.
 *
 * @inline
 */
export const MAX_ALIFE_ID = 65_535 as const;

/**
 * Default set of game communities (factions). The engine may extend this with additional ones.
 *
 * @inline
 */
export const defaultCommunities = {
  actor: "actor",
  army: "army",
  bandit: "bandit",
  dolg: "dolg",
  ecolog: "ecolog",
  freedom: "freedom",
  killer: "killer",
  monolith: "monolith",
  monster: "monster",
  monster_predatory_day: "monster_predatory_day",
  monster_predatory_night: "monster_predatory_night",
  monster_special: "monster_special",
  monster_vegetarian: "monster_vegetarian",
  monster_zombied_day: "monster_zombied_day",
  monster_zombied_night: "monster_zombied_night",
  none: "none",
  stalker: "stalker",
  zombied: "zombied",
} as const;

/** Single community (faction) name. */
export type TDefaultCommunity = (typeof defaultCommunities)[keyof typeof defaultCommunities];
