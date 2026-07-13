import { jest } from "@jest/globals";

import { MockLuaTable } from "../mock-lua-table";

import { mockMarshal } from "./mock-lua-marshal";

describe("mockMarshal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should encode and decode plain values", () => {
    const encoded: string = mockMarshal.encode({ key: "value" });

    expect(encoded).toBe('{"key":"value"}');
    expect(mockMarshal.decode(encoded)).toEqual({ key: "value" });
  });

  it("should encode mock Lua tables as objects", () => {
    const table: MockLuaTable<string, string> = new MockLuaTable([["key", "value"]]);

    expect(mockMarshal.encode(table)).toBe('{"key":"value"}');
  });

  it("should encode native maps as objects", () => {
    const map = new Map([["key", "value"]]);

    expect(mockMarshal.encode(map)).toBe('{"key":"value"}');
  });
});
