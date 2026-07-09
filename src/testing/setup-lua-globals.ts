import type * as XrayMocks from "xray16/mocks";

/**
 * Inject the Lua standard-library globals that X-Ray script code relies on (`string`, `table`, `math`,
 * `debug`, `LuaTable`, `$range`, `error`, and related helpers) onto `globalThis`, backed by `xray16/mocks`.
 *
 * Call once per test file. A Jest `setupFiles` entry is the usual place, and {@link createJestConfig}
 * wires it there automatically. Re-invoking is safe (it just re-assigns the globals).
 *
 * `xray16/mocks` is required lazily so importing the `xray16/testing` barrel from a Jest config file does
 * not load the Jest-only mock graph. This function itself must run in a Jest environment because it uses
 * the ambient `jest` global.
 */
export function setupLuaGlobals(): void {
  const mocks: typeof XrayMocks = require("xray16/mocks");
  const target: Record<string, unknown> = globalThis as Record<string, unknown>;

  target._G = globalThis;
  target._VERSION = "xray16-jest";

  target.LuaMap = mocks.MockLuaMap;
  target.LuaTable = mocks.MockLuaTable;

  target.string = mocks.mockString;
  target.table = mocks.mockTable;
  target.math = mocks.mockMath;
  target.debug = mocks.mockDebug;
  target.io = mocks.mockIo;
  target.jit = mocks.mockJit;

  target.$range = jest.fn(mocks.mockRange);
  target.$multi = (...args: Array<unknown>): Array<unknown> => [...args];

  target.tonumber = jest.fn(mocks.mockTonumber);
  target.tostring = jest.fn(mocks.mockToString);
  target.collectgarbage = jest.fn(() => 1024);
  target.type = jest.fn(mocks.mockType);
  target.pairs = jest.fn((value: object) => Object.entries(value));
  target.ipairs = jest.fn((value: object) => Object.entries(value));
  target.error = jest.fn((message: string): never => {
    throw new Error(message);
  });
}
