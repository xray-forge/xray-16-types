import { describe, expect, it } from "@jest/globals";
import { MockLuaMap, MockLuaTable, mockLfs, mockMarshal, mockMath, mockString, mockTable } from "xray16/mocks";

import { setupLuaGlobals } from "./setup-lua-globals";

describe("setupLuaGlobals", () => {
  it("should inject the lua and OpenXRay runtime globals onto globalThis", () => {
    setupLuaGlobals();

    const target: Record<string, unknown> = globalThis as Record<string, unknown>;

    expect(target._G).toBe(globalThis);
    expect(target.LuaMap).toBe(MockLuaMap);
    expect(target.LuaTable).toBe(MockLuaTable);
    expect(target.string).toBe(mockString);
    expect(target.table).toBe(mockTable);
    expect(target.math).toBe(mockMath);
    expect(target.debug).toBeDefined();
    expect(target.lfs).toBe(mockLfs);
    expect(target.marshal).toBe(mockMarshal);

    expect(typeof target.$range).toBe("function");
    expect((target.$multi as (...args: Array<unknown>) => Array<unknown>)(1, 2)).toEqual([1, 2]);
    expect(typeof target.type).toBe("function");
    expect(() => (target.error as (message: string) => never)("boom")).toThrow("boom");
  });
});
