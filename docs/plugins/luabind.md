# luabind Plugin

`xray16/plugins/luabind` transforms classes marked with `@LuabindClass()` into luabind class declarations.

Default TypeScriptToLua classes use prototype tables and metatables. Engine classes that extend C++ objects need the luabind `class()` API so virtual overrides are registered with the engine. This plugin emits that form for decorated classes and leaves other classes to the default transform.

```ts
declare function LuabindClass(): ClassDecorator;

@LuabindClass()
export class Actor {
  public value = 1;

  public getValue(): number {
    return this.value;
  }
}
```

```lua
class("Actor")
____exports.Actor = Actor
local Actor = ____exports.Actor
Actor.__name = "Actor"
function Actor.__init(self)
    self.value = 1
end
function Actor.getValue(self)
    return self.value
end
```

## Configuration

### `superCall`

Controls how constructor `super(...)` calls are emitted. Defaults to `"reference"`.

- `"reference"` calls the parent constructor directly: `Base.__init(self, ...)`.
- `"luabind"` delegates to the luabind global: `super(...)`.

```json
{ "name": "xray16/plugins/luabind", "superCall": "luabind" }
```

```ts
@LuabindClass()
class Base {
  public constructor(name: string) {}
}

@LuabindClass()
export class Child extends Base {
  public constructor() {
    super("child");
  }
}
```

With `"reference"`, `Child.__init` calls `Base.__init(self, "child")`. With `"luabind"`, it calls `super("child")`.

The setting only affects constructor calls. `super.method()` always emits a direct base class reference, such as `Base.method(self)`, because luabind has no global for arbitrary parent methods.

## What It Handles

- Class setup through `class("Name")` and `class("Name")(Base)`.
- Constructor bodies, instance field initialization, and generated constructors.
- Get/set accessors via `ObjectDefineProperty`.
- Default exports assigned to `exports.default`.
- `new Expr(...)` calls for luabind classes.

## Unsupported Constructs

These produce build errors instead of silent miscompiles:

- Static properties.
- Static accessors.
- Method, property, parameter, and class decorators other than `@LuabindClass()`.

## Limitations

- Inheritance and `super` require the base class to be a non-exported local identifier in the same module. An exported base fails with `Super without identifier - not supported with luabind`.
- The decorator is matched by name. Renaming or aliasing `@LuabindClass()` is not detected.
