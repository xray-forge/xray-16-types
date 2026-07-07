import { jest } from "@jest/globals";

import { MockCUIGameCustom } from "./ui/mock-cui-game-custom";

let mockHudSingleton: MockCUIGameCustom | null = null;

/**
 * Get game hud mock (memoized singleton, mirrors the engine `get_hud` global).
 */
export const mockGetGameHud = jest.fn(() => {
  if (!mockHudSingleton) {
    mockHudSingleton = new MockCUIGameCustom();
  }

  return mockHudSingleton;
});
