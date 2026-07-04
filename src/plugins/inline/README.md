# inline

TypeScriptToLua plugin that replaces tagged constant references with Lua literals at build time.

The plugin only touches declarations tagged with `@inline` or `@virtual`. If a tagged declaration cannot be
folded safely, the build fails instead of emitting a runtime lookup.

## Annotations

### `@inline`

Use `@inline` when consumers should get literal values, but the exported declaration should still exist at runtime.
The original table, enum or scalar is emitted, so iteration, enum reverse mapping and whole-object usages keep working.

```typescript
/**
 * @inline
 */
export const medkits = {
  medkit: "medkit",
  medkit_army: "medkit_army",
} as const;

// medkits.medkit_army   -> "medkit_army"
// medkits["medkit-x"]   -> "medkit-x"
// pairs(medkits)        -> still works because the table is emitted
```

### `@virtual`

Use `@virtual` when the declaration is only a compile-time source for constants. It includes `@inline` behavior and
removes the declaration from emitted Lua.

Every value reference must be computable at build time. If not, the build error points at the reference. Change the
declaration to `@inline` when runtime consumers need the object, enum or scalar to exist.

```typescript
/**
 * @virtual
 */
export const weapons = { ...pistols, wpn_knife: "wpn_knife" } as const;

// weapons.wpn_knife      -> "wpn_knife", and no weapons table is emitted
// { ...weapons, x: "x" } -> spread is expanded to literal entries in place
// pairs(weapons)         -> build error, demote to '@inline'
```

## Supported targets

- Enums with compile-time constant members.
- Module-level scalar `const` declarations.
- Module-level flat object literals with an `as const` assertion.

## Computed values

Values may use expressions that can be folded at build time with JavaScript semantics:

- Arithmetic and bitwise operators: `+ - * / % ** & | ^ << >> >>>`, unary `- + ~ !`.
- String concatenation and template literals.
- References to other constant declarations: enum members, module-level const scalars and `as const` object properties.
  Referenced declarations do not need their own inline tags.
- Whitelisted namespace constants: `math.pi`, `Math.PI` and other `Math` constants
  with identical IEEE 754 double values in the build environment and LuaJIT runtime.
- Engine constant references from ambient `xray16` typings, substituted as expressions (see below).

```typescript
/** @inline */
export const MINUTE = 60 * 1000;

/** @inline */
export const HOUR = 60 * MINUTE; // -> 3600000

/** @inline */
export const PI_DEGREE = math.pi / 180; // -> 0.017453292519943295
```

The plugin rejects values that would change runtime behavior: function calls, properties of mutable objects,
values that produce `NaN` or `Infinity`, and non-integer numbers in string concatenation contexts. Non-integer
numbers are rejected there because JavaScript `String()` and LuaJIT `tostring` format them differently.

## Engine constants

`static readonly` class members declared inside ambient `declare module "xray16"` typings qualify as
runtime-constant engine references. The engine registers these values once, so tagged declarations may
reference them freely.

Engine references are substituted as global access expressions instead of baked literals. The literal types
declared in typings stay documentation - emitted code always reads the live engine value, so builds stay
correct even when engine versions diverge from the typings.

```typescript
import { stalker_ids } from "xray16";

/**
 * @virtual
 */
export enum EActionId {
  DYING = stalker_ids.action_dying,
  SHIFTED = stalker_ids.action_base + 2,
}

// EActionId.DYING   -> stalker_ids.action_dying, no enum table is emitted
// EActionId.SHIFTED -> stalker_ids.action_base + 2
```

Expression trees with engine references allow numeric operators `+ - * / **` and unary minus.
`%`, bitwise operators and string concatenation are rejected for trees because emitted Lua could
diverge from TSTL operator lowering. Instance members do not qualify - only statics are engine constants.

Imports from ambient modules count as pure, so `@virtual` modules may import `xray16` values
for use inside erased declarations.

## Import cleanup

Import bindings for tagged declarations are removed when all references in the importing file are erased or inlined.
When no runtime bindings remain, the plugin handles the module load in one of two ways:

- If the imported module is proven pure, the `require` is removed.
- If the imported module may have side effects, the `require` is kept as a side-effect import.

This also applies to `@inline`. A module that exports only constants can stop loading for consumers that only read
inlined members, even when none of its declarations are `@virtual`.

## Virtual module purity

Modules containing `@virtual` declarations must be side-effect free on load. They may contain only type-only imports,
`@inline` or `@virtual` constants, constant enums, type aliases, interfaces and ambient declarations. This keeps
erased declarations from silently removing required runtime work.

## Limitations

- Objects must be flat; nested object values are rejected.
- Namespace imports (`import * as x`) are not stripped; whole-namespace value usages of modules
  with `@virtual` declarations are not detected (member accesses through namespaces are).
- Erased `@virtual` declarations disappear from the runtime API of emitted modules. External
  scripts requiring those modules will not see the constants. In-project consumers are checked at compile time.
- `Math` function calls (`Math.sqrt`, etc.) are not folded because libm implementations may differ
  between build machine and game runtime.
