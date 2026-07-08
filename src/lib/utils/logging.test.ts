import { beforeAll, describe, expect, it, jest } from "@jest/globals";

import { mockString } from "../../mocks/lua/mock-lua-string";
import { mockToString } from "../../mocks/lua/mock-lua-tostring";
import { mockType } from "../../mocks/lua/mock-lua-type";

import { toLogValue } from "./logging";

// `toLogValue` calls the Lua `type` / `tostring` / `string` globals; provide the mocks before the specs run.
beforeAll(() => {
  (globalThis as Record<string, unknown>).type = mockType;
  (globalThis as Record<string, unknown>).tostring = mockToString;
  (globalThis as Record<string, unknown>).string = mockString;
});

describe("toLogValue", () => {
  it("should correctly cast values", () => {
    expect(toLogValue(null)).toBe("<nil>");
    expect(toLogValue("")).toBe("<empty_str>");
    expect(toLogValue("abc")).toBe("abc");
    expect(toLogValue(1234)).toBe("1234");
    expect(toLogValue(true)).toBe("<boolean: true>");
    expect(toLogValue(false)).toBe("<boolean: false>");
    expect(toLogValue(Symbol.for("test"))).toBe("<object: Symbol(test)>");

    jest.spyOn(globalThis, "type").mockReturnValueOnce("userdata");
    expect(toLogValue("mock")).toBe("<userdata>");
  });
});
