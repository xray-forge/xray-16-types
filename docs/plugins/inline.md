# inline Plugin

Use `xray16/plugins/inline` to replace tagged constants and function calls with Lua expressions at build time.

The plugin only touches declarations tagged with `@inline` or `@virtual`, plus call sites wrapped in the `$inline` / `$noInline` macros. If a tagged declaration cannot be folded safely, the build fails instead of emitting a runtime lookup.

## Choose an annotation

### `@inline`

Use `@inline` when consumers should get folded values or spliced function bodies, while the exported declaration still exists at runtime.

```ts
/** @inline */
export const medkits = {
  medkit: "medkit",
  medkit_army: "medkit_army",
} as const;
```

Effects:

- `medkits.medkit_army` emits `"medkit_army"`.
- `medkits["medkit_army"]` emits `"medkit_army"`.
- `pairs(medkits)` still works because the table is emitted.

### `@virtual`

Use `@virtual` when the declaration is only a compile-time source for constants.

`@virtual` includes `@inline` behavior and removes the declaration from emitted Lua. Every value reference must be computable at build time.

```ts
/** @virtual */
export const weapons = { wpn_knife: "wpn_knife" } as const;
```

Effects:

- `weapons.wpn_knife` emits `"wpn_knife"`.
- No `weapons` table is emitted.
- Runtime object usage, such as `pairs(weapons)`, fails the build. Use `@inline` instead when runtime code needs the object.

## Supported declarations

- Enums with compile-time constant members.
- Module-level scalar `const` declarations.
- Module-level flat object literals with an `as const` assertion.
- Module-level functions with a supported body shape.

## Override one call site

`$inline` and `$noInline` from `xray16/macros` override inlining decisions for one call site. Both are identity functions at runtime, so the same code runs under Jest and Node.

### `$inline`

Use `$inline(target)` to force inlining of a call or constant expression whose declaration carries no tag.

```ts
import { $inline } from "xray16/macros";

function add(a: number, b: number): number {
  return a + b;
}

const MINUTE = 60 * 1000;

export function use(x: number): number {
  return $inline(add(x, 5)) + $inline(MINUTE);
}
// Emits: return x + 5 + 60000
```

The macro is an explicit demand. When the target cannot be inlined, the build fails instead of falling back to a runtime call. Common causes are unsupported function body shapes, values that cannot be computed at build time, and side-effecting arguments passed to parameters used more than once.

Function targets follow the same rules as `@inline` functions. A single `return <expression>` body and a `void` expression-statement body inline where an expression is allowed. A single guard `if` body inlines only at statement position.

Unlike `@inline` function declarations with erased call sites, the import binding of a force-inlined function is kept, since the declaration itself stays untagged and may have other runtime users.

### `$noInline`

Use `$noInline(target)` to keep a direct runtime call or reference to a declaration tagged with `@inline`.

```ts
import { $noInline } from "xray16/macros";

/** @inline */
const TIMEOUT: number = 500;

export function use(): number {
  return $noInline(TIMEOUT); // Emits: return TIMEOUT
}
```

Suppression applies only to the wrapped target itself. Tagged constants inside call arguments still inline, so `@virtual` values remain usable there.

`$noInline` of a `@virtual` declaration fails the build: virtual declarations are erased from emitted output, so no runtime value exists to reference. Demote the declaration to `@inline` when runtime access is needed.

Plugin order matters. The recommended `luaPlugins` list places `xray16/plugins/macros` before `xray16/plugins/inline`; TypeScriptToLua runs the later inline plugin first, so it consumes the hints. When only the macros plugin is enabled, the hints unwrap as identity calls and no forcing or suppression happens.

## Computed Values

Values may use expressions that can be folded with JavaScript semantics:

- arithmetic and bitwise operators: `+ - * / % ** & | ^ << >> >>>`, unary `- + ~ !`,
- string concatenation and template literals,
- references to enum members, module-level scalar constants, and flat `as const` object properties,
- selected namespace constants such as `math.pi`, `Math.PI`, and other `Math` constants with matching LuaJIT values,
- engine constant references from ambient `xray16` typings.

```ts
/** @inline */
export const MINUTE = 60 * 1000;

/** @inline */
export const HOUR = 60 * MINUTE;

/** @inline */
export const PI_DEGREE = math.pi / 180;
```

The plugin rejects values that would change runtime behavior: function calls, mutable object properties, `NaN`, `Infinity`, and non-integer numbers in string concatenation contexts.

## Engine Constants

`static readonly` class members declared inside ambient `declare module "xray16"` typings qualify as engine constants.

Engine constants are emitted as global access expressions, not baked numeric literals. This keeps output compatible with engine builds whose runtime values differ from the typings.

```ts
import { stalker_ids } from "xray16";

/** @virtual */
export enum EActionId {
  DYING = stalker_ids.action_dying,
  SHIFTED = stalker_ids.action_base + 2,
}
```

Effects:

- `EActionId.DYING` emits `stalker_ids.action_dying`.
- `EActionId.SHIFTED` emits `stalker_ids.action_base + 2`.
- No enum table is emitted.

Expression trees with engine references allow `+ - * / **` and unary minus. `%`, bitwise operators, and string concatenation are rejected for these trees because emitted Lua could diverge from TypeScriptToLua operator lowering.

## Import Cleanup

Import bindings for tagged declarations are removed when every reference in the importing file is erased or inlined.

When no runtime bindings remain:

- imports from proven-pure modules are removed,
- imports from modules that may have side effects are kept as side-effect imports.

This applies to both `@inline` and `@virtual` declarations.

## Limitations

- Object values must be flat. Nested object values are rejected.
- Namespace imports (`import * as constants`) are not stripped.
- Whole-namespace usages of modules with `@virtual` declarations are not detected, though member accesses through namespaces are.
- Erased `@virtual` declarations disappear from emitted runtime modules. External Lua code requiring those modules will not see them.
- `Math` function calls such as `Math.sqrt` are not folded because libm implementations can differ between the build machine and game runtime.
