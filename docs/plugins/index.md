# TypeScriptToLua Plugins

Plugins are opt-in TypeScriptToLua build transforms. Enable only the plugins your project uses. An XRF build that needs every SDK transformation uses this order:

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

| Plugin                       | Use it when you need                                                   |
| ---------------------------- | ---------------------------------------------------------------------- |
| [`luabind`](./luabind)       | Emit `class("Name")` declarations for `@LuabindClass()` classes.       |
| [`strip`](./strip)           | Remove Lua logger calls and imports for engine-only typedef modules.   |
| [`macros`](./macros)         | Fold filename, dirname, nil-check, cast, and build-header helpers.     |
| [`optimize`](./optimize)     | Rewrite returned ternaries into direct Lua `if` / `else` returns.      |
| [`inline`](./inline)         | Inline tagged constants, functions, and `$inline` / `$noInline` hints. |
| [`libcompile`](./libcompile) | Emit `xray16/lib` source as a flat `xray_bundle` module.               |
| [`tracy`](./tracy)           | Inject Tracy profiler zones.                                           |

When their config fields are unset, `strip.luaLogger` falls back to `XR_NO_LUA_LOGS=true` or `--no-lua-logs`, and `tracy.enabled` falls back to `XR_INJECT_TRACY_ZONES=true` or `--inject-tracy-zones`.

## Luabind classes

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

See the [`luabind` plugin page](./luabind.md) for constructor and inheritance rules.
