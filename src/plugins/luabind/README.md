# luabind

TypeScriptToLua plugin that transforms classes marked with the `@LuabindClass()` decorator into luabind class
declarations.

By default TSTL builds classes with prototype tables and metatables. Engine classes that extend C++ types must use
the luabind `class()` API instead so virtual method overrides are registered with the engine. This plugin emits that
form for decorated classes and leaves undecorated classes to the default transform.

```typescript
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

Controls how a parent constructor `super(...)` call is emitted. Defaults to `"reference"`.

- `"reference"` calls the parent constructor directly: `Base.__init(self, ...)`.
- `"luabind"` delegates to the luabind global `super(...)`, which binds `self` implicitly.

```json
{ "name": "xray16/plugins/luabind", "superCall": "luabind" }
```

```typescript
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

// "reference": Child.__init calls Base.__init(self, "child")
// "luabind":   Child.__init calls super("child")
```

The setting applies to the constructor call only. `super.method()` always resolves to a direct base class reference
(`Base.method(self)`), because luabind has no global for arbitrary parent methods.

## What it handles

- Class setup as `class("Name")` and `class("Name")(Base)` for inheritance.
- Constructor bodies, instance field initialization, and generated constructors for classes that omit one.
- Get/set accessors via `ObjectDefineProperty`.
- Default exports, assigned to `exports.default`.
- `new Expr(...)` on luabind classes.

## Unsupported constructs

These produce build errors instead of silent miscompiles:

- Static properties: `Unable transform static properties for luabind classes`.
- Method, property, parameter, and class decorators other than `@LuabindClass()`: `Unable transform method decorator
  for luabind classes` (and the property / parameter / class variants).
- Static accessors: `Unable transform static accessors for luabind classes`.

## Limitations

- Inheritance and `super` require the base class to be a non-exported local identifier in the same module. An
  exported base fails with `Super without identifier - not supported with luabind`.
- The decorator is matched by name (`@LuabindClass()`); renaming or aliasing the decorator is not detected.
