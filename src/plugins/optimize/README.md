# optimize

TypeScriptToLua plugin that rewrites returned ternary expressions into direct `if` / `else` branch returns.

For `return condition ? first : second`, the default TSTL output introduces a temporary local to hold the ternary
result. This plugin emits the branches as direct returns instead, while preserving ternary semantics. It has no
configuration.

```typescript
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

- Only `return` statements are affected. Ternaries in other positions are left to the default transform.
- Nested ternaries in a branch are expanded recursively into nested `if` / `else` returns.
- The returned expression is unwrapped through parentheses, `as` assertions, angle-bracket type assertions,
  non-null assertions (`!`), and `satisfies` before checking for a ternary, so `return (a ? 1 : 2) as number` is
  still rewritten.
- Branch expressions that need preceding statements are handled; the branch keeps its own emitted statements.
- Assignment compatibility against the function return type is still validated, so type errors are not lost.

## Limitations

- Ternaries whose branches return Lua multiple values (`LuaMultiReturn`) are left untouched, because the multi-value
  return is handled by the default transform. Such a case emits the standard `unpack(condition and ({...}) or ({...}))`
  form instead of `if` / `else`.
