import { jest } from "@jest/globals";

/**
 * Mock of the X-Ray engine actor-stats interface (subset).
 */
export const mockActorStatsInterface = {
  remove_from_ranking: jest.fn(),
};
