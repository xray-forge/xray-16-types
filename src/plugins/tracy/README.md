# tracy Plugin

`xray16/plugins/tracy` injects [Tracy profiler](https://github.com/wolfpld/tracy) zone markers into emitted Lua.

Enable it for profiling builds. Keep it disabled for release builds.

```json
{ "name": "xray16/plugins/tracy", "enabled": true }
```

## Configuration

### `enabled`

Turns zone injection on or off.

When `enabled` is unset, the plugin falls back to `XR_INJECT_TRACY_ZONES=true` or the `--inject-tracy-zones` CLI flag. When disabled, it emits normal Lua.

## What It Injects

- File zones: `lua::file::<name>.script` around the whole module. `index.*` files are named `<dir>@index.script`.
- Function zones: `lua::function::<name>` at the start of each function body.
- Method zones: `lua::method::<Class>::<name>` for class methods.
- `extern("name", ...)` zones for inline arrow functions and object-literal properties passed to `extern`.

```ts
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

Zones close before early exits, including returns inside `if`, `for`, and `switch` blocks.

## Limitations

- Single-expression return function bodies are skipped. Profiling them would require rewriting the return into a temporary.
- The emitted Lua assumes a global `tracy` object exists at runtime.
