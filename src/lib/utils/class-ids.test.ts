import { describe, expect, it } from "@jest/globals";

import { gameClassId } from "./class-ids";

describe("class_ids constants integrity", () => {
  it("should match key-value entries", () => {
    Object.entries(gameClassId).forEach(([key, value]) => expect(key).toBe(value));
  });
});
