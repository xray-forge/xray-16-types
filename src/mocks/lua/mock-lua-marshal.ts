import { jest } from "@jest/globals";

/**
 * Mock of the OpenXRay `marshal` global for jest/node.
 *
 * Backed by JSON for plain arrays/objects, matching the engine `marshal.encode`/`decode` round-trip used by
 * serialization helpers. Install as `globalThis.marshal` before running specs that serialize data.
 */
export const mockMarshal = {
  encode: jest.fn((data: unknown): string => JSON.stringify(data)),
  decode: jest.fn((data: string): unknown => JSON.parse(data)),
};
