import { jest } from "@jest/globals";

import { MockCTime } from "./mock-ctime";

/**
 * Mock of the X-Ray engine `game` namespace for jest/node.
 */
export const mockGameInterface = {
  CTime: jest.fn(() => MockCTime.now()),
  get_game_time: jest.fn(() => MockCTime.now()),
  time: jest.fn(() => MockCTime.now().toTimestamp()),
  start_tutorial: jest.fn(() => {}),
  stop_tutorial: jest.fn(() => {}),
  has_active_tutorial: jest.fn(() => false),
  translate_string: jest.fn((key: string) => "translated_" + key),
};
