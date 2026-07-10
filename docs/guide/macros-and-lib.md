# Macros and Shared Lib

## Macros

Use macros for code that should fold during compilation and still run under Jest or Node.

```ts
import { $filename, $fromObject, $isNil } from "xray16/macros";

export function readConfig(value: unknown): LuaTable<string, string> {
  if ($isNil(value)) {
    return $fromObject({ source: $filename });
  }

  return $fromObject(value as Record<string, string>);
}
```

The [`macros` plugin](../plugins/macros) removes the import and folds helper usage in game builds. The shipped runtime module supports the same imports under Jest and Node.

See the [macros API reference](../api/macros/) for every helper.

## Shared lib

`xray16/lib` provides shared aliases, constants, and utility helpers:

```ts
import { MAX_U16, clamp, type TSection } from "xray16/lib";

export function normalizeSection(section: TSection, value: number): string {
  return `${section}:${clamp(value, 0, MAX_U16)}`;
}
```

Type aliases erase at build time, and `@inline` constants can fold with the [`inline` plugin](../plugins/inline). Runtime helpers such as `round` and `range` need a Lua module in game builds; enable [`libcompile`](../plugins/libcompile) when compiling gamedata from `xray16/lib` source.

See the [lib API reference](../api/lib/) for the full surface.

## Next steps

- See the [`macros` plugin](../plugins/macros) for build options and helper behavior.
- See [`libcompile`](../plugins/libcompile) when game code imports runtime helpers from `xray16/lib`.
