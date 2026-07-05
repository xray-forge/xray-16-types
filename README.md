# X-Ray 16 TypeScript Bindings

[![npm version](https://img.shields.io/npm/v/xray16)](https://www.npmjs.com/package/xray16)
[![types](https://img.shields.io/badge/docs-types-blue.svg?style=flat)](https://xray-forge.github.io/xray-16-types/index.html)
[![book](https://img.shields.io/badge/docs-book-blue.svg?style=flat)](https://xray-forge.github.io/stalker-xrf-book)
[![Node.js CI](https://github.com/xray-forge/xray-16-types/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/xray-forge/xray-16-types/actions/workflows/build_and_test.yml)

`xray16` provides TypeScript declarations for Lua-visible X-Ray 16 engine APIs. It is built for projects that compile TypeScript to Lua with [TypeScriptToLua](https://typescripttolua.github.io/docs/getting-started), such as [stalker-xrf-engine](https://github.com/xray-forge/stalker-xrf-engine).

The package includes:

- `xray16`: engine globals, luabind classes, UI classes, GOAP classes, and script objects.
- `xray16/alias`: friendlier type aliases over raw engine declaration names, plus virtual engine enums.
- `xray16/lib`: shared scalar aliases, utility types, constants, and small runtime helpers.
- `xray16/macros`: compile-time helper functions with a Node/Jest runtime fallback.
- `xray16/typedefs/*`: opt-in ambient declarations for LuaJIT and bundled Lua libraries.
- `xray16/plugins/*`: TypeScriptToLua plugins used by XRF builds.
- `xray16/mocks`: test/runtime helpers for code that needs Lua-like behavior under Node.

## Install

```sh
npm install xray16 typescript-to-lua
```

Pre-release builds are available through two channels: `xray16@experimental` on npm for manually published release candidates, and a rolling [nightly GitHub release](https://github.com/xray-forge/xray-16-types/releases/tag/nightly) with a tarball uploaded after every successful `main` build:

```sh
npm install https://github.com/xray-forge/xray-16-types/releases/download/nightly/xray16-nightly.tgz
```

Add the base declarations to the TypeScript `types` array. Add only the ambient typedef packages your project uses.

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

## Engine Types

Import engine declarations from `xray16` when you want names that match the Lua binding dump.

```ts
import { game_object, level } from "xray16";

export function isActorVisible(object: game_object): boolean {
  return object.see(level.get_target_obj());
}
```

Use `xray16/alias` when application code benefits from shorter names.

```ts
import type { GameObject, ServerObject, Vector } from "xray16/alias";

export interface SpawnPoint {
  object: ServerObject;
  position: Vector;
  owner: GameObject;
}
```

The alias module contains type aliases and `@virtual` enums. Type aliases have no runtime cost. Virtual enums are folded by the `inline` plugin in game builds, while Jest/Node can import real enum objects from `alias.js`.

## Macros

Import macro helpers from `xray16/macros`.

```ts
import { $filename, $fromObject, $isNil } from "xray16/macros";

export function readConfig(value: unknown): LuaTable<string, string> {
  if ($isNil(value)) {
    return $fromObject({ source: $filename });
  }

  return $fromObject(value as Record<string, string>);
}
```

At build time the `macros` plugin strips the import and folds helper usage. Under Jest or Node, the same import resolves to the shipped runtime module, so tests do not need hand-written globals.

## Shared Lib

Import shared aliases, constants, and utility helpers from `xray16/lib`.

```ts
import { MAX_U16, clamp, type TSection } from "xray16/lib";

export function normalizeSection(section: TSection, value: number): string {
  return `${section}:${clamp(value, 0, MAX_U16)}`;
}
```

Type aliases erase at build time. Constants tagged with `@inline` can be folded by the `inline` plugin. Runtime helpers such as `round` and `range` need a real Lua module in game builds; use the `libcompile` plugin when compiling gamedata from `xray16/lib` source.

## Ambient Typedefs

Ambient typedefs describe globals from the X-Ray Lua runtime and bundled Lua libraries. They are not modules to import. Add them to `compilerOptions.types` or reference them with `/// <reference types="..." />`.

| Typedef                      | Provides                                                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `xray16/typedefs/extensions` | OpenXRay `table` and `string` extensions, such as `table.random`, `table.size`, and `string.trim` variants. |
| `xray16/typedefs/luajit`     | LuaJIT globals and methods missing from the default TSTL typings.                                           |
| `xray16/typedefs/lfs`        | LuaFileSystem (`lfs`).                                                                                      |
| `xray16/typedefs/marshal`    | `marshal` serialization helpers.                                                                            |

## TypeScriptToLua Plugins

Add plugins through the TypeScriptToLua `luaPlugins` config. A typical XRF build enables them in this order:

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

| Plugin       | Purpose                                                                              | Docs                                        |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------- |
| `luabind`    | Emits `class("Name")` declarations for classes marked with `@LuabindClass()`.        | [README](src/plugins/luabind/README.md)     |
| `strip`      | Removes Lua logger calls and runtime imports for engine-only typedef modules.        | [README](src/plugins/strip/README.md)       |
| `macros`     | Folds `$filename`, `$dirname`, nil checks, cast helpers, and optional build headers. | [README](src/plugins/macros/README.md)      |
| `optimize`   | Rewrites returned ternaries into direct Lua `if` / `else` returns.                   | [README](src/plugins/optimize/README.md)    |
| `inline`     | Inlines constants tagged with `@inline` or `@virtual`.                               | [README](src/plugins/inline/README.md)      |
| `libcompile` | Emits `xray16/lib` source as a flat `xray_bundle` module for game builds.            | [README](src/plugins/libcompile/README.md)  |
| `tracy`      | Injects Tracy profiler zones when enabled.                                           | [README](src/plugins/tracy/README.md)       |

The `strip` and `tracy` plugins also support build toggles when their config fields are unset:

| Plugin option     | Fallback                                               |
| ----------------- | ------------------------------------------------------ |
| `strip.luaLogger` | `XR_NO_LUA_LOGS=true` or `--no-lua-logs`               |
| `tracy.enabled`   | `XR_INJECT_TRACY_ZONES=true` or `--inject-tracy-zones` |

## Luabind Classes

Engine classes that extend C++ objects need luabind class registration, not the default TypeScriptToLua prototype output. Mark those classes with `@LuabindClass()` and enable the `luabind` plugin.

```ts
import { LuabindClass, object_binder } from "xray16";

@LuabindClass()
export class ActorBinder extends object_binder {
  public override net_spawn(object: unknown): boolean {
    return super.net_spawn(object);
  }
}
```

See [src/plugins/luabind/README.md](src/plugins/luabind/README.md) for constructor and inheritance details.

## API Documentation

Generated TypeDoc output is published at [xray-forge.github.io/xray-16-types](https://xray-forge.github.io/xray-16-types/index.html).

The declarations document TypeScript-visible API shape. Runtime behavior is still defined by the engine C++ bindings. For ambiguous behavior, check the X-Ray source before relying on declaration syntax alone.

To refresh local binding dumps from an engine build:

1. Run the game engine with `-dump_bindings`.
2. Open the generated `scriptbindings_*.txt` files in the user data directory.
3. Compare the dump with the declarations in this package.

## Development

Useful package scripts:

```sh
npm run typecheck
npm run lint
npm run test
npm run build
npm run docs
```

`npm run build` regenerates the packaged declarations, plugin output, macros runtime declarations, alias module, and mocks, then stages the publishable package in `target/pkg/xray16`. `npm run docs` builds TypeDoc output into `target/docs`.

Build and tooling configuration lives in `cli/` (`cli/build` for compiler/bundler configs, `cli/test` for jest, `cli/deploy` for package staging, `cli/docs` for TypeDoc). The published `package.json` manifest is maintained at `src/package.json`; the root manifest is a private project shell.
