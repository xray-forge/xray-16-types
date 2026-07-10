# strip Plugin

Use `xray16/plugins/strip` to remove selected constructs from TypeScriptToLua output.

Use it to keep release Lua smaller and to erase imports that only exist for TypeScript typing. The plugin reads its options from the `luaPlugins` entry.

```json
{ "name": "xray16/plugins/strip", "luaLogger": true, "engineImports": true }
```

## Configuration

### `luaLogger`

Removes `LuaLogger` declarations and method calls.

When `luaLogger` is unset, the plugin falls back to `XR_NO_LUA_LOGS=true` or the `--no-lua-logs` CLI flag. If neither fallback is set, logger calls are kept.

What it removes:

- Variable declarations whose resolved type is `LuaLogger`.
- Method-call expression statements on a `LuaLogger` value, such as `logger.info("message")`.

In a multi-declaration statement, only the `LuaLogger` binding is removed. Other bindings are kept.

```ts
declare class LuaLogger {
  public info(message: string): void;
}

declare function getLogger(): LuaLogger;

export function run(): number {
  const logger = getLogger();
  const kept = 1;

  logger.info("removed");

  return kept;
}
```

The logger declaration and call are removed from the emitted Lua. `kept` and the return stay intact.

### `engineImports`

Removes runtime imports and star re-exports for engine declaration modules.

Defaults to `true`. This matters because `xray16` and `xray16/alias` describe engine globals and aliases; they do not have Lua modules that can be required in the game runtime.

The plugin erases:

- named imports from `xray16` and `xray16/alias`,
- namespace imports,
- side-effect imports,
- star re-exports.

Imports from other modules are left untouched.

```ts
import { game_object } from "xray16";
import { localValue } from "./local";

export const result = localValue;
export type Object = game_object;
```

The emitted Lua keeps the `./local` require and removes the `xray16` require.

## Limitations

- `luaLogger` is type-based. A value is stripped only when its type symbol resolves to `LuaLogger`.
- `engineImports` targets only `xray16` and `xray16/alias`.
