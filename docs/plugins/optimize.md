# optimize Plugin

`xray16/plugins/optimize` rewrites returned ternary expressions into direct Lua `if` / `else` returns.

Default TypeScriptToLua output for `return condition ? first : second` introduces a temporary local. This plugin avoids that local while preserving ternary behavior. It has no configuration.

```ts
export function pick(value: boolean): number {
  return value ? 1 : 2;
}
```

```lua
function ____exports.pick(self, value)
    if value then
        return 1
    else
        return 2
    end
end
```

## Behavior

- Only `return` statements are affected.
- Nested ternaries in return branches are expanded recursively.
- Parentheses, `as` assertions, angle-bracket assertions, non-null assertions, and `satisfies` are unwrapped before checking for a ternary.
- Branch expressions that emit preceding statements keep those statements inside the matching branch.
- Assignment compatibility against the function return type is still checked.

## Limitations

- Ternaries whose branches return Lua multiple values (`LuaMultiReturn`) are left to the default TypeScriptToLua transform. Those still emit the standard `unpack(condition and ({...}) or ({...}))` form.
