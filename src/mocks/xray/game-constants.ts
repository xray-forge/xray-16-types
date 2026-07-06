/**
 * Default game-domain constants used by the X-Ray object mocks.
 *
 * These are baseline values for test fixtures — the engine keeps its own production constants (which may
 * define additional communities); `defaultCommunities` is the default set the mocks build against.
 */

/**
 * Actor server/client object id.
 *
 * @inline
 */
export const ACTOR_ID = 0 as const;

/**
 * Maximal alife object id (u16 max).
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
export type TCommunity = (typeof defaultCommunities)[keyof typeof defaultCommunities];
