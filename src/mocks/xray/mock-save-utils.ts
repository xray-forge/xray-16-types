import { jest } from "@jest/globals";

/**
 * Mock save validity check.
 *
 * Returns `false` by default because the mock runtime has no save metadata. Override it when a test supplies a valid
 * save fixture.
 */
export const mockValidSavedGame = jest.fn((_filename: string): boolean => false);
