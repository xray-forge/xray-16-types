import * as xray16Runtime from "xray16/mocks/xray16-runtime";

/**
 * Register the `xray16` runtime stand-in as a Jest module mock.
 *
 * The `createJestConfig` factory maps `^xray16$` to the runtime stand-in so a bare `import` from `xray16`
 * resolves under Jest. This helper also registers an explicit `jest.mock("xray16")` factory that returns the
 * same runtime export values. Use it when setup code needs to spy on or configure the same mock objects that
 * code under test imports from `xray16`.
 *
 * `overrides` replaces or adds exports on top of the stand-in. Use it for engine globals a consumer has not
 * migrated into `xray16/mocks` yet. With a complete stub, call with no arguments.
 *
 * The stand-in is imported eagerly, before the mock factory is registered. A lazy `require` inside the
 * factory would re-enter the `xray16` mock while the stand-in loads its own `xray16/mocks` graph. This
 * module loads Jest-only code and must not be imported from a Jest config file; import it only from a
 * `setupFiles` module or test setup module.
 *
 * @param overrides - Extra or replacement `xray16` module exports.
 */
export function setupXrayRuntime(overrides: Record<string, unknown> = {}): void {
  jest.mock("xray16", () => ({ ...xray16Runtime, ...overrides }));
}
