import { jest } from "@jest/globals";

import { MockCTime } from "./mock-ctime";

/**
 * Mock of the X-Ray engine `game` namespace for jest/node (subset used by time utilities).
 */
export const mockGameInterface = {
  CTime: jest.fn(() => MockCTime.now()),
  get_game_time: jest.fn(() => MockCTime.now()),
  time: jest.fn(() => MockCTime.now().toTimestamp()),
};
