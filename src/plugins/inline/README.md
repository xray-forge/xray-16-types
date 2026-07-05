# inline Plugin

`xray16/plugins/inline` replaces tagged constant references with Lua literals at build time.

The plugin only touches declarations tagged with `@inline` or `@virtual`. If a tagged declaration cannot be folded safely, the build fails instead of emitting a runtime lookup.

## Annotations

### `@inline`

Use `@inline` when consumers should get literal values and the exported declaration should still exist at runtime.

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

## Supported Targets

- Enums with compile-time constant members.
- Module-level scalar `const` declarations.
- Module-level flat object literals with an `as const` assertion.

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
