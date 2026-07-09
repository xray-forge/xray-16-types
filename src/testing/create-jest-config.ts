import * as path from "node:path";

/**
 * Consumer overrides merged into the generated Jest config.
 *
 * `moduleNameMapper` is merged with the SDK mapper, and duplicate mapper keys use the consumer value.
 * `setupFiles` and `setupFilesAfterEnv` are appended after the SDK entries. Any other key replaces the
 * default value.
 */
export interface IXrayJestConfigOverrides {
  moduleNameMapper?: Record<string, string>;
  setupFiles?: Array<string>;
  setupFilesAfterEnv?: Array<string>;
  [key: string]: unknown;
}

// Absolute path of the shipped `xray16/testing` directory, used to locate sibling package artifacts.
const TESTING_DIR: string = __dirname;

/**
 * Build a Jest configuration for testing X-Ray TypeScriptToLua script code.
 *
 * The generated config maps the bare `xray16` module to the shipped runtime stand-in and registers the SDK
 * setup files. The `setupFiles` entry installs Lua-like globals through {@link setupLuaGlobals} and registers
 * the `xray16` module mock through `setupXrayRuntime`; the `setupFilesAfterEnv` entry registers the custom
 * jest matchers through `extendJest` (add `xray16/typedefs/jest` to `compilerOptions.types` for their types).
 *
 * The `xray16/lib`, `xray16/mocks`, `xray16/alias`, and `xray16/macros` subpaths resolve through package
 * `exports` and need no mapper entry.
 *
 * @param overrides - Consumer Jest config values to merge over the SDK defaults.
 * @returns A Jest config object.
 */
export function createJestConfig(overrides: IXrayJestConfigOverrides = {}): Record<string, unknown> {
  const { moduleNameMapper = {}, setupFiles = [], setupFilesAfterEnv = [], ...rest } = overrides;

  return {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
      "^xray16$": path.join(TESTING_DIR, "..", "mocks", "xray16-runtime.js"),
      ...moduleNameMapper,
    },
    setupFiles: [path.join(TESTING_DIR, "setup.js"), ...setupFiles],
    setupFilesAfterEnv: [path.join(TESTING_DIR, "setup-after-env.js"), ...setupFilesAfterEnv],
    ...rest,
  };
}
