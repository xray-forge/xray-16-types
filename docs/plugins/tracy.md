# tracy Plugin

Use `xray16/plugins/tracy` to inject [Tracy profiler](https://github.com/wolfpld/tracy) zone markers into emitted Lua.

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

Zones close before early exits, including returns inside `if`, `for`, `while`, `do`, `try`, and `switch` blocks.

## Return Expression Timing

Work performed inside a `return` expression is measured. Returns with computed expressions hoist the expression into a local declared before the zone closes:

```ts
export function run(a: number): number {
  return compute(a);
}
```

```lua
function ____exports.run(self, a)
    tracy:ZoneBeginN("lua::function::run")
    local ____tracyZoneResult = compute(a)
    tracy:ZoneEnd()
    return ____tracyZoneResult
end
```

Trivial returns (identifiers, literals, `this`) are not hoisted - there is no work to measure, so they keep the plain `ZoneEnd(); return value` order. Functions whose whole body is one trivial return are skipped entirely, since a zone would only measure its own overhead.

## Limitations

- `LuaMultiReturn` return expressions are not hoisted - a single local would truncate the value list - so their work is not measured; the zone still closes before the return.
- The emitted Lua assumes a global `tracy` object exists at runtime.
