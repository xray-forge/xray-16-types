import { transpileWithPlugins } from "../testing";

import { createPlugin } from "./plugin";

const LUABIND_DECLARATION = `declare function LuabindClass(): ClassDecorator;`;

describe("transform_luabind_class plugin", () => {
  it("should transform decorated classes into luabind class declarations", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
export class Actor {
  public value = 1;

  public constructor(name: string) {
    this.value = 2;
  }

  public getValue(): number {
    return this.value;
  }
}

export function create(): Actor {
  return new Actor("test");
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Actor")
____exports.Actor = Actor
local Actor = ____exports.Actor
Actor.__name = "Actor"
function Actor.__init(self, name)
    self.value = 1
    self.value = 2
end
function Actor.getValue(self)
    return self.value
end
____exports.Actor = Actor
function ____exports.create(self)
    return ____exports.Actor("test")
end
return ____exports
`);
  });

  it("should chain luabind inheritance and route super() to the base constructor", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
class Base {
  public value = 1;

  public constructor(name: string) {
    this.value = 2;
  }
}

@LuabindClass()
export class Child extends Base {
  public constructor() {
    super("child");
  }

  public getValue(): number {
    return this.value;
  }
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Base")
local Base = Base
Base.__name = "Base"
function Base.__init(self, name)
    self.value = 1
    self.value = 2
end
class("Child")(Base)
____exports.Child = Child
local Child = ____exports.Child
Child.__name = "Child"
function Child.__init(self)
    Base.__init(self, "child")
end
function Child.getValue(self)
    return self.value
end
____exports.Child = Child
return ____exports
`);
  });

  it("should route super.method() calls to the base class and auto-generate a forwarding constructor", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
class Base {
  public act(): number {
    return 1;
  }
}

@LuabindClass()
export class Child extends Base {
  public act(): number {
    return super.act() + 1;
  }
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Base")
local Base = Base
Base.__name = "Base"
function Base.__init(self)
end
function Base.act(self)
    return 1
end
class("Child")(Base)
____exports.Child = Child
local Child = ____exports.Child
Child.__name = "Child"
function Child.__init(self, ...)
    Base.__init(self, ...)
end
function Child.act(self)
    return Base.act(self) + 1
end
____exports.Child = Child
return ____exports
`);
  });

  it("should transform get/set accessors via ObjectDefineProperty", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
export class Foo {
  private v = 1;

  public get value(): number {
    return this.v;
  }

  public set value(next: number) {
    this.v = next;
  }
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__ObjectDefineProperty = ____lualib.__TS__ObjectDefineProperty
local ____exports = {}
class("Foo")
____exports.Foo = Foo
local Foo = ____exports.Foo
Foo.__name = "Foo"
function Foo.__init(self)
    self.v = 1
end
__TS__ObjectDefineProperty(
    Foo,
    "value",
    {
        get = function(self)
            return self.v
        end,
        set = function(self, next)
            self.v = next
        end
    }
)
____exports.Foo = Foo
return ____exports
`);
  });

  it("should assign a default-exported luabind class to exports.default", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
export default class Foo {
  public value = 1;
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Foo")
____exports.default = Foo
local Foo = ____exports.default
Foo.__name = "Foo"
function Foo.__init(self)
    self.value = 1
end
____exports.default = Foo
return ____exports
`);
  });

  it("should report a diagnostic for static properties but keep instance transformation", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
export class Foo {
  public static shared = 1;

  public value = 2;
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual(["Unable transform static properties for luabind classes."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Foo")
____exports.Foo = Foo
local Foo = ____exports.Foo
Foo.__name = "Foo"
function Foo.__init(self)
    self.value = 2
end
____exports.Foo = Foo
return ____exports
`);
  });

  it("should report a diagnostic for method decorators on luabind classes", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
${LUABIND_DECLARATION}
declare function deco(target: unknown, key: string, desc: unknown): void;

@LuabindClass()
export class Foo {
  @deco
  public act(): number {
    return 1;
  }
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual(["Unable transform method decorator for luabind classes."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Foo")
____exports.Foo = Foo
local Foo = ____exports.Foo
Foo.__name = "Foo"
function Foo.__init(self)
end
function Foo.act(self)
    return 1
end
____exports.Foo = Foo
return ____exports
`);
  });

  it("should leave classes without the luabind decorator to the default class transform", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export class Plain {
  public value = 1;

  public getValue(): number {
    return this.value;
  }
}
`,
      },
      { plugins: [createPlugin()] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local ____exports = {}
____exports.Plain = __TS__Class()
local Plain = ____exports.Plain
Plain.name = "Plain"
function Plain.prototype.____constructor(self)
    self.value = 1
end
function Plain.prototype.getValue(self)
    return self.value
end
return ____exports
`);
  });

  describe("superCall configuration", () => {
    it("should default to the direct parent __init reference when no config is provided", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
${LUABIND_DECLARATION}

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
`,
        },
        { plugins: [createPlugin()] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toContain(`function Child.__init(self)
    Base.__init(self, "child")
end`);
    });

    it("should keep the direct parent __init reference when superCall is 'reference'", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
${LUABIND_DECLARATION}

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
`,
        },
        { plugins: [createPlugin({ superCall: "reference" })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toContain(`function Child.__init(self)
    Base.__init(self, "child")
end`);
    });

    it("should delegate explicit super() calls to the luabind super global when superCall is 'luabind'", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
class Base {
  public value = 1;

  public constructor(name: string) {
    this.value = 2;
  }
}

@LuabindClass()
export class Child extends Base {
  public constructor() {
    super("child");
  }

  public getValue(): number {
    return this.value;
  }
}
`,
        },
        { plugins: [createPlugin({ superCall: "luabind" })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Base")
local Base = Base
Base.__name = "Base"
function Base.__init(self, name)
    self.value = 1
    self.value = 2
end
class("Child")(Base)
____exports.Child = Child
local Child = ____exports.Child
Child.__name = "Child"
function Child.__init(self)
    super("child")
end
function Child.getValue(self)
    return self.value
end
____exports.Child = Child
return ____exports
`);
    });

    it("should emit super(...) for auto-generated constructors and keep super.method() base references in luabind mode", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
${LUABIND_DECLARATION}

@LuabindClass()
class Base {
  public act(): number {
    return 1;
  }
}

@LuabindClass()
export class Child extends Base {
  public act(): number {
    return super.act() + 1;
  }
}
`,
        },
        { plugins: [createPlugin({ superCall: "luabind" })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
class("Base")
local Base = Base
Base.__name = "Base"
function Base.__init(self)
end
function Base.act(self)
    return 1
end
class("Child")(Base)
____exports.Child = Child
local Child = ____exports.Child
Child.__name = "Child"
function Child.__init(self, ...)
    super(...)
end
function Child.act(self)
    return Base.act(self) + 1
end
____exports.Child = Child
return ____exports
`);
    });
  });
});
