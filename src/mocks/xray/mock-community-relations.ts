import { defaultCommunities } from "./mock-constants";

/**
 * Mocked community relations registry.
 */
export const communityGoodwill: Record<string, Record<string, number>> = {
  [defaultCommunities.actor]: {
    [defaultCommunities.actor]: 1000,
    [defaultCommunities.stalker]: 250,
    [defaultCommunities.bandit]: 0,
    [defaultCommunities.army]: 1000,
    [defaultCommunities.monolith]: -1000,
    [defaultCommunities.monster]: -1000,
  },
  [defaultCommunities.stalker]: {
    [defaultCommunities.stalker]: 1000,
    [defaultCommunities.ecolog]: 500,
    [defaultCommunities.actor]: 200,
    [defaultCommunities.bandit]: -1000,
    [defaultCommunities.army]: 0,
    [defaultCommunities.monolith]: -1000,
    [defaultCommunities.monster]: -1000,
    [defaultCommunities.dolg]: 1000,
    [defaultCommunities.zombied]: -5000,
  },
  [defaultCommunities.bandit]: {
    [defaultCommunities.bandit]: 1000,
    [defaultCommunities.stalker]: -1000,
    [defaultCommunities.actor]: -500,
    [defaultCommunities.army]: -1000,
    [defaultCommunities.monolith]: -1000,
    [defaultCommunities.monster]: -1000,
  },
  [defaultCommunities.dolg]: {
    [defaultCommunities.stalker]: 500,
  },
  [defaultCommunities.ecolog]: {
    [defaultCommunities.stalker]: 500,
  },
  [defaultCommunities.monolith]: {
    [defaultCommunities.monolith]: 1000,
    [defaultCommunities.actor]: -1000,
    [defaultCommunities.stalker]: -1000,
    [defaultCommunities.bandit]: -1000,
    [defaultCommunities.army]: -1000,
    [defaultCommunities.monster]: -1000,
  },
  [defaultCommunities.army]: {
    [defaultCommunities.army]: 1000,
    [defaultCommunities.actor]: 1000,
    [defaultCommunities.stalker]: 0,
    [defaultCommunities.bandit]: -1000,
    [defaultCommunities.monolith]: -1000,
    [defaultCommunities.monster]: -1000,
  },
  [defaultCommunities.monster]: {
    [defaultCommunities.monster]: 3000,
    [defaultCommunities.actor]: -5000,
    [defaultCommunities.army]: -5000,
    [defaultCommunities.stalker]: -5000,
    [defaultCommunities.bandit]: -5000,
    [defaultCommunities.monolith]: -5000,
  },
};

/**
 * Mocked characters relations registry.
 */
export const charactersGoodwill: Record<number, Record<number, number>> = {};

/**
 * Mock goodwill between characters by id.
 */
export function mockCharactersGoodwill(from: number, to: number, goodwill: number): void {
  if (!charactersGoodwill[from]) {
    charactersGoodwill[from] = {};
  }

  charactersGoodwill[from][to] = goodwill;
}
