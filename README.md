# XRF X-Ray 16 SDK

[![npm version](https://img.shields.io/npm/v/xray16)](https://www.npmjs.com/package/xray16)
[![types](https://img.shields.io/badge/docs-types-blue.svg?style=flat)](https://xray-forge.github.io/stalker-xrf-xray16-sdk/api/types/)
[![book](https://img.shields.io/badge/docs-book-blue.svg?style=flat)](https://xray-forge.github.io/stalker-xrf-book)
[![Node.js CI](https://github.com/xray-forge/stalker-xrf-xray16-sdk/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/xray-forge/stalker-xrf-xray16-sdk/actions/workflows/build_and_test.yml)

`xray16` provides TypeScript declarations, test helpers, and TypeScriptToLua plugins for Lua-visible X-Ray 16 APIs. Use it when compiling XRF game scripts from TypeScript, including with [stalker-xrf-engine](https://github.com/xray-forge/stalker-xrf-engine).

[X-Ray 16 engine API](https://xray-forge.github.io/stalker-xrf-xray16-sdk/api/types/) documents game globals, luabind classes, UI and GOAP classes, and script objects.

## Quick start

Install the SDK and its required TypeScriptToLua peer dependency:

```sh
npm install xray16 typescript-to-lua
```

`typescript-to-lua` is the only required peer dependency. `jest`, `ts-jest`, and `typescript` are optional peers for `xray16/testing`. The `fengari` and `ini` dependencies required by `xray16/mocks` install automatically.

Add the base declarations to `compilerOptions.types`. Include only the ambient typedef packages your project uses.

```jsonc
{
  "compilerOptions": {
    "types": [
      "@typescript-to-lua/language-extensions",
      "xray16",
      "xray16/typedefs/extensions",
      "xray16/typedefs/luajit",
    ],
  },
}
```

For an unreleased build, install `xray16@experimental` from npm, or use the rolling [nightly GitHub release](https://github.com/xray-forge/stalker-xrf-xray16-sdk/releases/tag/nightly):

```sh
npm install https://github.com/xray-forge/stalker-xrf-xray16-sdk/releases/download/nightly/xray16-nightly.tgz
```

## Entry points

| Import              | Use it for                                                                |
| ------------------- | ------------------------------------------------------------------------- |
| `xray16`            | Engine globals, luabind classes, UI and GOAP classes, and script objects. |
| `xray16/alias`      | Readable aliases for engine declaration names and virtual engine enums.   |
| `xray16/macros`     | Compile-time helpers with a Node/Jest fallback.                           |
| `xray16/lib`        | Shared aliases, constants, and small runtime helpers.                     |
| `xray16/testing`    | Jest configuration and setup helpers.                                     |
| `xray16/mocks`      | Lua-like runtime helpers for Node-based tests.                            |
| `xray16/typedefs/*` | Opt-in ambient declarations for X-Ray and bundled Lua libraries.          |
| `xray16/plugins/*`  | TypeScriptToLua build plugins.                                            |

## Engine types and aliases

Import from `xray16` when you want names that match the Lua binding dump.

```ts
import { game_object, level } from "xray16";

export function isActorVisible(object: game_object): boolean {
  return object.see(level.get_target_obj());
}
```

Use `xray16/alias` when application code benefits from shorter more Typescript-friendly names.

```ts
import type { GameObject, ServerObject, Vector } from "xray16/alias";

export interface SpawnPoint {
  object: ServerObject;
  position: Vector;
  owner: GameObject;
}
```

Aliases erase at build time. Virtual enums are folded by the `inline` plugin in game builds; Jest and Node can import their runtime objects from `alias.js`.

## Macros and shared helpers

Use macros for code that should fold during compilation but still run under Jest or Node.

```ts
import { $filename, $fromObject, $isNil } from "xray16/macros";

export function readConfig(value: unknown): LuaTable<string, string> {
  if ($isNil(value)) {
    return $fromObject({ source: $filename });
  }

  return $fromObject(value as Record<string, string>);
}
```

The `macros` plugin removes the import and folds helper usage in game builds. The shipped runtime module supports the same imports under Jest and Node.

`xray16/lib` provides shared aliases, constants, and utility helpers:

```ts
import { MAX_U16, clamp, type TSection } from "xray16/lib";

export function normalizeSection(section: TSection, value: number): string {
  return `${section}:${clamp(value, 0, MAX_U16)}`;
}
```

Type aliases erase at build time, and `@inline` constants can be folded by the `inline` plugin. Runtime helpers such as `round` and `range` need a Lua module in game builds; enable `libcompile` when compiling gamedata from `xray16/lib` source.

## Test X-Ray code under Node

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

## Ambient typedefs

Ambient typedefs describe X-Ray globals and bundled Lua libraries. They are not modules to import; add them to `compilerOptions.types` or reference them with `/// <reference types="..." />`.

| Typedef                      | Provides                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `xray16/typedefs/extensions` | OpenXRay `table` and `string` extensions, including `table.random`, `table.size`, and `string.trim` variants. |
| `xray16/typedefs/luajit`     | LuaJIT globals and methods missing from the default TSTL typings.                                             |
| `xray16/typedefs/lfs`        | LuaFileSystem (`lfs`).                                                                                        |
| `xray16/typedefs/marshal`    | `marshal` serialization helpers.                                                                              |
| `xray16/typedefs/jest`       | Types for the custom Jest matchers.                                                                           |

## TypeScriptToLua plugins

Plugins are opt-in. An XRF build that needs every SDK transformation enables them in this order:

```jsonc
{
  "tstl": {
    "luaPlugins": [
      { "name": "xray16/plugins/luabind" },
      { "name": "xray16/plugins/strip" },
      { "name": "xray16/plugins/macros" },
      { "name": "xray16/plugins/optimize" },
      { "name": "xray16/plugins/inline" },
      { "name": "xray16/plugins/libcompile" },
      { "name": "xray16/plugins/tracy" },
    ],
  },
}
```

| Plugin                                     | Purpose                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| [`luabind`](docs/plugins/luabind.md)       | Emits `class("Name")` declarations for `@LuabindClass()` classes.             |
| [`strip`](docs/plugins/strip.md)           | Removes Lua logger calls and runtime imports for engine-only typedef modules. |
| [`macros`](docs/plugins/macros.md)         | Folds filename, dirname, nil-check, cast, and build-header helpers.           |
| [`optimize`](docs/plugins/optimize.md)     | Rewrites returned ternaries into direct Lua `if` / `else` returns.            |
| [`inline`](docs/plugins/inline.md)         | Inlines tagged constants, functions, and `$inline` / `$noInline` hints.       |
| [`libcompile`](docs/plugins/libcompile.md) | Emits `xray16/lib` source as a flat `xray_bundle` module.                     |
| [`tracy`](docs/plugins/tracy.md)           | Injects Tracy profiler zones when enabled.                                    |

When their config fields are unset, `strip.luaLogger` falls back to `XR_NO_LUA_LOGS=true` or `--no-lua-logs`, and `tracy.enabled` falls back to `XR_INJECT_TRACY_ZONES=true` or `--inject-tracy-zones`.

Classes that extend C++ objects need luabind registration rather than default TypeScriptToLua prototype output:

```ts
import { LuabindClass, object_binder } from "xray16";

@LuabindClass()
export class ActorBinder extends object_binder {
  public override net_spawn(object: unknown): boolean {
    return super.net_spawn(object);
  }
}
```

See the [`luabind` plugin README](docs/plugins/luabind.md) for constructor and inheritance rules.

## API documentation and development

The documentation website is available at [xray-forge.github.io/stalker-xrf-xray16-sdk](https://xray-forge.github.io/stalker-xrf-xray16-sdk/index.html) — guides, plugin pages, and a generated API reference per package surface. Declarations describe the TypeScript-visible API shape; C++ engine bindings define runtime behavior. Check the engine source when declaration syntax is ambiguous.

To refresh local binding dumps, run the game engine with `-dump_bindings`, open the generated `scriptbindings_*.txt` files in the user data directory, and compare them with this package's declarations.

Useful package scripts:

```sh
npm run typecheck
npm run lint
npm run test
npm run build
npm run docs
```

`npm run build` stages the publishable package in `target/pkg/xray16`; `npm run docs` builds the VitePress website (with TypeDoc API sections) into `target/docs`, and `npm run docs:dev` serves it locally. Website content lives in `docs/`, build and tooling configuration in `cli/`, and the published manifest is [`src/package.json`](src/package.json).
