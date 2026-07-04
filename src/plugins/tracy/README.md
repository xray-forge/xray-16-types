# tracy

TypeScriptToLua plugin that injects [Tracy profiler](https://github.com/wolfpld/tracy) zone markers into the emitted
Lua.

When enabled, the plugin wraps files, functions, and methods in `tracy:ZoneBeginN(...)` / `tracy:ZoneEnd()` calls.
Build a profiling bundle with this plugin on to see where runtime is spent, and keep it off for release builds.

```json
{ "name": "xray16/plugins/tracy", "enabled": true }
```

## Configuration

### `enabled`

Turns zone injection on or off. When unset, the plugin falls back to the `XR_INJECT_TRACY_ZONES` environment
variable / `--inject-tracy-zones` CLI flag. When disabled, the plugin is a no-op and emits normal Lua.

## What it injects

- File zones: `lua::file::<name>.script` around the whole module. `index.*` files are named
  `<dir>@index.script` to keep them distinct.
- Function zones: `lua::function::<name>` at the start of each function body.
- Method zones: `lua::method::<Class>::<name>`, qualified by the containing class name.
- `extern("name", ...)` registrations: arrow functions passed directly or as object-literal properties are wrapped
  with `lua::function::<name>` / `lua::function::<name>.<prop>` zones.

```typescript
export function run(): number {
  const value = 1;

  return value;
}
```

```lua
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self)
    tracy:ZoneBeginN("lua::function::run")
    local value = 1
    tracy:ZoneEnd()
    return value
end
tracy:ZoneEnd()
```

Zones close correctly around early exits: a `tracy:ZoneEnd()` is inserted before every `return` in a body, including
returns nested in `if`, `for`, and `switch` blocks.

## Limitations

- Single-statement `return` function bodies are skipped. There is nothing to profile between begin and end without
  rewriting the return into a temporary, so the zone is omitted.
- The injected calls assume a global `tracy` object is available in the runtime.
