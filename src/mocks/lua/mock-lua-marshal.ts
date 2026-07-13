import { jest } from "@jest/globals";

import { mapFromLua } from "./mock-lua-utils";

/**
 * Mock of the OpenXRay `marshal` global for jest/node.
 *
 * Backed by JSON for plain arrays/objects and mock Lua tables, matching the engine `marshal.encode`/`decode`
 * round-trip used by serialization helpers. Installed as `globalThis.marshal` by `setupLuaGlobals`.
 */
export const mockMarshal = {
  encode: jest.fn((data: unknown): string => {
    return JSON.stringify(data instanceof Map ? mapFromLua(data) : data);
  }),
  decode: jest.fn((data: string): unknown => JSON.parse(data)),
};
