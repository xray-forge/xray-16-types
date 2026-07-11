import { jest } from "@jest/globals";

import { $fromLuaTable } from "../../macros";
import { MockLuaTable } from "../mock-lua-table";

/**
 * Mock of the OpenXRay `marshal` global for jest/node.
 *
 * Backed by JSON for plain arrays/objects and mock Lua tables, matching the engine `marshal.encode`/`decode`
 * round-trip used by serialization helpers. Installed as `globalThis.marshal` by `setupLuaGlobals`.
 */
export const mockMarshal = {
  encode: jest.fn((data: unknown): string => {
    return JSON.stringify(
      data instanceof MockLuaTable ? $fromLuaTable(data as unknown as LuaTable<string | number, unknown>) : data
    );
  }),
  decode: jest.fn((data: string): unknown => JSON.parse(data)),
};
