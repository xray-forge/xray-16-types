import { describe, expect, it } from "@jest/globals";

import { gameDifficulties } from "./game-difficulties";

describe("game_difficulties constants integrity", () => {
  it("should match key-value entries", () => {
    Object.entries(gameDifficulties).forEach(([key, value]) => expect(key).toBe(value));
  });
});
