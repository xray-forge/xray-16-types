// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- `lfs` is an ambient non-module declaration.
/// <reference path="../../../typedefs/lfs.d.ts" />

import { jest } from "@jest/globals";

/**
 * Minimal mock of the optional OpenXRay LuaFileSystem global for jest/node.
 */
export const mockLfs = {
  mkdir: jest.fn((_path: string): void => {}),
  attributes: jest.fn((_path: string): LuaTable | null => null),
  dir: jest.fn(
    (_path: string): LuaMultiReturn<[LuaIterable<string, unknown>, { next: () => string | null }]> =>
      [(() => null) as unknown as LuaIterable<string, unknown>, { close: () => {}, next: () => null }] as unknown as LuaMultiReturn<[
        LuaIterable<string, unknown>,
        { next: () => string | null },
      ]>
  ),
} satisfies Pick<typeof lfs, "attributes" | "dir" | "mkdir">;
