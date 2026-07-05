# libcompile Plugin

`xray16/plugins/libcompile` emits `xray16/lib` as a flat Lua module named `xray_bundle`.

Use it when a game build maps `xray16/lib` to the package TypeScript source. That lets the `inline` plugin fold
`@inline` helpers, but TypeScriptToLua may still generate requires for non-inlined helpers such as `round` or `range`.
This plugin makes those requires resolve at runtime.

## Setup

Map `xray16/lib` to source and run `libcompile` after `inline`.

```jsonc
{
  "compilerOptions": {
    "paths": {
      "xray16/lib": ["../../node_modules/xray16/lib/index"]
    }
  },
  "tstl": {
    "luaPlugins": [
      { "name": "xray16/plugins/inline" },
      { "name": "xray16/plugins/libcompile" }
    ]
  }
}
```

Node and Jest imports still resolve through package exports to `lib/index.js`.

## Behavior

At emit time the plugin:

1. Finds the `xray16/lib/index.ts` source file in the TypeScript program.
2. Transpiles it with the standard TypeScriptToLua transform.
3. Emits it at the output root as `xray_bundle.<extension>`.
4. Rewrites generated `require("lua_modules.xray16.lib.index")` calls to `require("xray_bundle")`.
5. Removes the stray `lua_modules/xray16/lib/index.<extension>` copy if TypeScriptToLua wrote one.

Example:

```ts
import { clamp, round } from "xray16/lib";

export function normalize(value: number): number {
  return clamp(round(value), 0, 100);
}
```

With `inline` and `libcompile` enabled, `clamp` can be folded at the call site and `round` resolves from
`xray_bundle`.

## No-op Cases

The plugin does nothing when:

- `xray16/lib` is not part of the TypeScript program,
- `outDir` is not configured,
- the bundle was already emitted by another plugin pass.

## Limitations

- Only handles the `xray16/lib` entry.
- Does not bundle arbitrary packages.
- Emits one flat root module. Internal `xray16/lib` files are expected to be bundled into that source entry before
  publish.
