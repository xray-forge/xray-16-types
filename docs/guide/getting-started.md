# Getting Started

`xray16` provides TypeScript declarations, test helpers, and TypeScriptToLua plugins for Lua-visible X-Ray 16 APIs. Use it when compiling XRF game scripts from TypeScript, including with [stalker-xrf-engine](https://github.com/xray-forge/stalker-xrf-engine).

## Install

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

## Where to go next

- [Engine types and aliases](./engine-types.md) — import declarations that match the Lua binding dump, or TypeScript-friendly aliases.
- [Macros and shared lib](./macros-and-lib.md) — compile-time helpers and shared constants.
- [Testing](./testing.md) — run X-Ray script code under Node with jest.
- [Ambient typedefs](./typedefs.md) — opt-in globals for bundled Lua libraries.
- [TypeScriptToLua plugins](../plugins/index.md) — build transforms for game builds.
