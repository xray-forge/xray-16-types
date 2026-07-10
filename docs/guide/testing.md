# Testing

Run X-Ray script code under Node with jest. Requires the optional peer dependencies `jest` and `ts-jest`.

## Jest configuration

`createJestConfig()` returns a `ts-jest` configuration that maps bare `xray16` imports to the SDK runtime stand-in.

```js
// jest.config.js
const { createJestConfig } = require("xray16/testing");

module.exports = createJestConfig({
  roots: ["<rootDir>/src"],
  moduleNameMapper: { "^@/(.*)": "<rootDir>/src/$1" },
});
```

It installs Lua-like globals and the `xray16` module mock before each test file, then registers Jest matchers such as `toBeNil`, `toEqualLuaTables`, and `toEqualLuaArrays`. Add `xray16/typedefs/jest` to `compilerOptions.types` to type-check those matchers.

Consumer `moduleNameMapper` entries override SDK entries. Consumer `setupFiles` and `setupFilesAfterEnv` entries run after the SDK setup; other top-level options replace their defaults.

## Custom setup

For a custom setup, call `setupLuaGlobals()` from `xray16/testing`. Import `setupXrayRuntime()` only from a Jest setup file or test setup module because it eagerly loads the mock runtime and calls `jest.mock`.

```ts
import { setupLuaGlobals } from "xray16/testing";
import { setupXrayRuntime } from "xray16/testing/setup-xray-runtime";

setupLuaGlobals();
setupXrayRuntime({
  editor: jest.fn(() => true),
});
```

Jest mock helpers are available from `xray16/testing/utils`:

```ts
import { replaceFunctionMock, resetFunctionMock } from "xray16/testing/utils";
```

## Mocks

`xray16/mocks` ships Lua-like runtime helpers and engine class mocks for Node-based tests — Lua table/map emulation, `string`/`math` shims backed by a real Lua VM, and `Mock*` classes for engine objects.

See the [testing API reference](../api/testing/) and the [mocks API reference](../api/mocks/).
