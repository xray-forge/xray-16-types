import { jest } from "@jest/globals";

/**
 * Mock of the X-Ray engine `level` namespace for jest/node (subset used by time utilities).
 */
export const mockLevelInterface = {
  get_time_factor: jest.fn(() => 10),
  get_time_hours: jest.fn(() => 12),
  set_time_factor: jest.fn((_factor: number): void => {}),
};
