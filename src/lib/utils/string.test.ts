import { beforeAll, describe, expect, it } from "@jest/globals";

import { mockString } from "../../mocks/lua/mock-lua-string";

import { containsSubstring } from "./string";

// `containsSubstring` calls the Lua `string` global; provide the mock before the specs run.
beforeAll(() => {
  (globalThis as Record<string, unknown>).string = mockString;
});

describe("containsSubstring", () => {
  it("should correctly check substrings", () => {
    expect(containsSubstring("", "")).toBe(false);
    expect(containsSubstring("abc", "")).toBe(false);
    expect(containsSubstring("", "abc")).toBe(false);

    expect(containsSubstring("abc", "a")).toBe(true);
    expect(containsSubstring("abc", "B")).toBe(true);
    expect(containsSubstring("Some Value", "value")).toBe(true);
    expect(containsSubstring("Some Value", "missing")).toBe(false);

    expect(containsSubstring("abc", "a.c")).toBe(true);
    expect(containsSubstring("abc", ".")).toBe(true);
  });
});
