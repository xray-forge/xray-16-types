# strip

TypeScriptToLua plugin that removes selected constructs from the emitted Lua.

The plugin takes a configuration object from the `luaPlugins` entry and strips only what you enable. Nothing is
removed unless the matching flag is on.

```json
{ "name": "xray16/plugins/strip", "luaLogger": true, "engineImports": true }
```

## Configuration

### `luaLogger`

Removes `LuaLogger` declarations and calls from the runtime. Logging can consume processing time that does not
benefit the player, so release builds can drop it entirely.

When the field is unset, the plugin falls back to the `XR_NO_LUA_LOGS` environment variable / `--no-lua-logs` CLI
flag (stripping happens when logging is disabled through either).

What it removes:

- Variable declarations whose type is `LuaLogger`. In a multi-declaration statement, only the `LuaLogger` binding is
  dropped and the rest is kept.
- Expression statements that call a method on a `LuaLogger` value (e.g. `logger.info("...")`).

```typescript
declare class LuaLogger {
  public info(message: string): void;
}

declare function getLogger(): LuaLogger;

export function run(): number {
  const logger = getLogger();
  const kept = 1;

  logger.info("removed"); // dropped

  return kept;
}

// Emits only `local kept = 1; return kept` inside `run`.
```

### `engineImports`

Removes runtime imports of engine typedef modules (`xray16`). These modules are ambient type declarations with no
runtime counterpart, so a `require` for them would fail. Default `tstl` behavior does not handle engine imports well
and can produce implicit globals.

Defaults to `true`. Named, namespace (`import * as x`) and side-effect (`import "xray16"`) imports of `xray16` are
all erased; imports of other modules are left untouched.

```typescript
import { engineValue } from "xray16";

import { localValue } from "./local";

export const result = engineValue + localValue;

// The `xray16` import is erased; `engineValue` stays as a global reference. `./local` still requires normally.
```

## Limitations

- `luaLogger` detection is type-based: a value is stripped only when its type symbol resolves to `LuaLogger`.
- `engineImports` targets the `xray16` module specifier only.
