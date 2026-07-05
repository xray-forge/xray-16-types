# [📡 XRay-16 script engine SDK](https://github.com/xray-forge/xray-16-types)

[![npm version](https://img.shields.io/npm/v/xray16)](https://www.npmjs.com/package/xray16)
[![types](https://img.shields.io/badge/docs-types-blue.svg?style=flat)](https://xray-forge.github.io/xray-16-types/index.html)
[![book](https://img.shields.io/badge/docs-book-blue.svg?style=flat)](https://xray-forge.github.io/stalker-xrf-book)
<br/>
[![Node.js CI](https://github.com/xray-forge/xray-16-types/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/xray-forge/xray-16-types/actions/workflows/build_and_test.yml)

X-Ray16 engine bindings documentation and types. <br/>
For usage with [TypeScriptToLua](https://typescripttolua.github.io/docs/getting-started).

<p>
Module contains xray engine globals typedefs for typescript. <br/>
By default x-ray export bindings that can be accessed from lua scripts, but without any API documentation.

To check more details / correct typing you always can reference X-Ray source code.

</p>

## 🗻 Docs

Types documentation can be checked [here](https://xray-forge.github.io/xray-16-types/modules.html).

## 🧱 Usage

Types are used with [xrf template](https://github.com/xray-forge/stalker-xrf-engine) and can be referenced as an example.

### Engine types and macros

- `xray16` (the package `types` entry) declares the `xray16` engine module. It has no dependency on the plugins.
- `xray16/macros` is a real module (types **and** runtime) exporting the compile-time helpers: `$filename`,
  `$dirname`, `$fromObject`, `$fromArray`, `$fromLuaArray`, `$fromLuaTable`, `$isNil`, `$isNotNil`.

Import the helpers instead of relying on globals:

```typescript
import { $filename, $isNil, $fromObject } from "xray16/macros";
```

At build time the `macros` plugin strips the import and folds each usage (identifiers to literals, `$isNil(x)` to
`x == nil`, casts unwrapped). Under jest/node the same import resolves to the shipped runtime, so the code runs
unmodified — no hand-written mocks and nothing added to the global scope. `$filename`/`$dirname` are per-file
literals at build time and stable stubs at runtime.

### Ambient runtime typedefs

The ambient Lua runtime an X-Ray script executes in (open-xray standard library extensions and bundled Lua
libraries) ships as opt-in ambient declarations. They are globals, so add the ones you use to the `types`
array of your tsconfig (or reference them with `/// <reference types="..." />`) rather than importing them:

- `xray16/typedefs/extensions` — open-xray `table` (`random`, `size`, `keys`, `values`) and `string` (`trim*`) extensions.
- `xray16/typedefs/luajit` — base Lua `table`/`string`/`math` methods and `ipairs` that TSTL's typings omit.
- `xray16/typedefs/lfs` — the LuaFileSystem (`lfs`) library.
- `xray16/typedefs/marshal` — the `marshal` serialization library.

```jsonc
// tsconfig.json
"types": ["@typescript-to-lua/language-extensions", "xray16", "xray16/typedefs/extensions", "xray16/typedefs/luajit"]
```

## 📦Extending C++ classes and overriding virtual methods

### Lua

<p>
C++ classes can be extended in Lua code with 'class' keyword.
Class declaration registers table as userdata and adds constructor/destructor metamethods. <br/>
</p>

### Typescript

<p>
In TS codebase 'LuabindClass' decorator can be used to modify transformation and enable virtual calls. <br/>
Separate transformer is needed to build luabind classes instead of table-based classes.
</p>

## 🧱 Getting up-to-date LUA bindings

- Run game engine with `-dump_bindings` flag
- Check userdata folder _(where game saves are stored)_ `scriptbindings_*.txt` files

## 🧲 Plugins

Package includes plugins for typescript-to-lua for easier work with xray16 typings.\
Plugins can be included in [tstl tsconfig](https://typescripttolua.github.io/docs/configuration) file as following section:

```json
{
  "tstl": {
    "luaPlugins": [
      { "name": "xray16/plugins/luabind" },
      { "name": "xray16/plugins/strip", "engineImports": true },
      { "name": "xray16/plugins/macros" },
      { "name": "xray16/plugins/optimize" },
      { "name": "xray16/plugins/inline" },
      { "name": "xray16/plugins/tracy" }
    ]
  }
}
```

Toggles that are configurable per-plugin also accept environment / CLI fallbacks when the config field is left unset:

- `strip` `luaLogger` ← `XR_NO_LUA_LOGS` env / `--no-lua-logs` CLI
- `tracy` `enabled` ← `XR_INJECT_TRACY_ZONES` env / `--inject-tracy-zones` CLI

### luabind

Custom plugin overriding transformation of classes marked with `@LuabindClass()` decorator.\
Instead of using prototypes and metatables use luabind API to declare such classes.

Accepts an optional `superCall` field controlling how parent constructor `super(...)` calls are emitted:

- `"reference"` (default) - call the parent constructor directly, e.g. `Base.__init(self, ...)`.
- `"luabind"` - delegate to the luabind `super(...)` global, e.g. `super(...)`.

```json
{ "name": "xray16/plugins/luabind", "superCall": "luabind" }
```

See [src/plugins/luabind/README.md](src/plugins/luabind/README.md) for full documentation.

### strip

Plugin that removes selected constructs from the emitted Lua. Accepts a config object selecting what to strip:

- `luaLogger` - remove all `LuaLogger` declarations and calls (they can consume processing time that does not
  benefit the player). When unset, falls back to the `XR_NO_LUA_LOGS` env / `--no-lua-logs` CLI flag.
- `engineImports` (default `true`) - remove runtime imports of engine typedef modules (`xray16`), which have no
  runtime counterpart. Default `tstl` behaviour does not work well with engine imports and produces implicit globals.

```json
{ "name": "xray16/plugins/strip", "luaLogger": true, "engineImports": true }
```

See [src/plugins/strip/README.md](src/plugins/strip/README.md) for full documentation.

### macros

Plugin applying compile-time macros. The helpers are imported from [`xray16/macros`](#engine-types-and-macros)
(a real module with runtime, so jest/node need no mocks); this plugin strips that import and folds the usages.
Accepts a config object toggling each feature (all default to `true`; the token-driven ones are inert unless the
matching `$` token is used):

- `buildTimestamp` - prepend a build time / metadata comment on top of every emitted Lua file.
- `fileName` / `dirName` - replace the `$filename` / `$dirname` tokens with the compile-time file / directory name
  (Lua provides no convenient runtime API for this, so a static step is simpler).
- `castHelpers` - expand `$fromObject`/`$fromArray`/`$fromLuaArray`/`$fromLuaTable` (unwrapped, removed from runtime)
  and `$isNil`/`$isNotNil` (compiled to `== nil` / `~= nil`) to simplify `LuaTable` interoperation.

```json
{ "name": "xray16/plugins/macros", "buildTimestamp": true, "fileName": true, "dirName": true, "castHelpers": true }
```

See [src/plugins/macros/README.md](src/plugins/macros/README.md) for full documentation.

### optimize

Plugin rewrites returned ternary expressions into direct `if` / `else` branch returns when it is safe.\
This avoids temporary result locals for patterns like `return condition ? first : second` while preserving general ternary semantics.

See [src/plugins/optimize/README.md](src/plugins/optimize/README.md) for full documentation.

### inline

Plugin that inlines compile-time constants from declarations tagged with `@inline` or `@virtual`.\
Supported targets are enums, module-level `as const` object literals and module-level scalar constants.\
Values may be literals or expressions that can be folded at build time: arithmetic, string concatenation,
template literals and references to other constant declarations.\
Tagged declarations act as an explicit whitelist and produce build errors when they cannot be inlined.

- `@inline` replaces accesses with literal values but still emits the original declaration, so iteration,
  reverse mapping and whole-object usages keep working. Import bindings that are no longer used at runtime
  are stripped; if the target module is proven pure, its `require` is dropped too.
- `@virtual` includes `@inline` behavior and also removes the declaration from emitted output. Every value
  reference must be computable at build time. Object spreads of virtual objects are expanded to table literals.

```typescript
/**
 * @inline
 */
export const medkits = {
  medkit: "medkit",
  medkit_army: "medkit_army",
} as const;

/**
 * @virtual
 */
export const TIMEOUT: number = 60 * 1000;

// Build time: `medkits.medkit_army` access is emitted as plain "medkit_army" string literal.
// Build time: `TIMEOUT` reference is emitted as 60000 and the declaration is erased from output.
```

See [src/plugins/inline/README.md](src/plugins/inline/README.md) for full documentation.

### tracy

Plugin designed to work specifically with [tracy profiler](https://github.com/wolfpld/tracy).\
Once enabled, tracy zone marking calls are injected for every file, function and method, letting you build a
profiling bundle to understand bottlenecks and what takes CPU time.

Accepts an `enabled` config field; when unset, falls back to the `XR_INJECT_TRACY_ZONES` env / `--inject-tracy-zones` CLI flag.

```json
{ "name": "xray16/plugins/tracy", "enabled": true }
```

See [src/plugins/tracy/README.md](src/plugins/tracy/README.md) for full documentation.
