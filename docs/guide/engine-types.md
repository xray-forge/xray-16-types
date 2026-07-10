# Engine Types and Aliases

## Engine declarations

Import from `xray16` when you want names that match the Lua binding dump.

```ts
import { game_object, level } from "xray16";

export function isActorVisible(object: game_object): boolean {
  return object.see(level.get_target_obj());
}
```

Declarations describe the TypeScript-visible API shape; C++ engine bindings define runtime behavior. Check the engine source when declaration syntax is ambiguous.

Browse the full surface in the [engine types API reference](../api/types/).

## Aliases

Use `xray16/alias` when application code benefits from shorter, more TypeScript-friendly names.

```ts
import type { GameObject, ServerObject, Vector } from "xray16/alias";

export interface SpawnPoint {
  object: ServerObject;
  position: Vector;
  owner: GameObject;
}
```

Aliases erase at build time. Virtual enums are folded by the [`inline` plugin](../plugins/inline.md) in game builds; Jest and Node can import their runtime objects from `alias.js`.

Browse the exported names in the [alias API reference](../api/alias/).

## Refreshing binding dumps

To compare declarations with a live engine, run the game engine with `-dump_bindings`, open the generated `scriptbindings_*.txt` files in the user data directory, and diff them against this package's declarations.
