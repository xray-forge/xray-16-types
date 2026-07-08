import { beforeEach, describe, expect, it } from "@jest/globals";

import { type AnyObject } from "../types";

import { extern, getExtern } from "./binding";

// `extern`/`getExtern` default to the Lua `_G` global; provide a fresh one before each spec.
beforeEach(() => {
  (globalThis as Record<string, unknown>)._G = {};
});

describe("extern/getExtern", () => {
  it("binding utils should correctly work in pair with simple examples", () => {
    extern("sample1", 10);
    expect(getExtern("sample1")).toBe(10);

    extern("sample2", true);
    expect(getExtern("sample2")).toBe(true);

    extern("sample3", { a: 1, b: 2, c: 3 });
    expect(getExtern("sample3")).toStrictEqual({ a: 1, b: 2, c: 3 });
  });

  it("binding utils should correctly handle externing few times", () => {
    const first: AnyObject = {};

    extern("object1", first);
    expect(getExtern("object1")).toBe(first);

    extern("object1", {});
    expect(getExtern("object1")).not.toBe(first);
  });

  it("binding utils should correctly work in pair with complex examples", () => {
    extern("sample4.deep.nested", 10);
    expect(getExtern("nested", getExtern("deep", getExtern("sample4")))).toBe(10);

    extern("sample5.deep.nested", { a: 1, b: 2, c: 3 });
    expect(getExtern("nested", getExtern("deep", getExtern("sample5")))).toStrictEqual({ a: 1, b: 2, c: 3 });
  });
});
