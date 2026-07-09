import { ENV_XR_INJECT_TRACY_ZONES } from "../constants";
import { transpileWithPlugins } from "../testing";

import { createPlugin } from "./plugin";

describe("tracy plugin", () => {
  it("should inject Tracy file and function zones when enabled", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function run(): number {
  const value = 1;

  return value;
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self)
    tracy:ZoneBeginN("lua::function::run")
    local value = 1
    tracy:ZoneEnd()
    return value
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should not inject anything when disabled", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function run(): number {
  const a = 1;

  return a;
}
`,
      },
      { plugins: [createPlugin({ enabled: false })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self)
    local a = 1
    return a
end
return ____exports
`);
  });

  it("should close zones before every nested return statement", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function run(a: number): number {
  if (a > 1) {
    return 1;
  }

  for (let i = 0; i < a; i++) {
    a += i;
  }

  return a;
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self, a)
    tracy:ZoneBeginN("lua::function::run")
    if a > 1 then
        tracy:ZoneEnd()
        return 1
    end
    do
        local i = 0
        while i < a do
            a = a + i
            i = i + 1
        end
    end
    tracy:ZoneEnd()
    return a
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should inject method zones qualified by the class name", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export class Foo {
  public bar(a: number): number {
    const b = a;

    return b;
  }
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
____exports.Foo = __TS__Class()
local Foo = ____exports.Foo
Foo.name = "Foo"
function Foo.prototype.____constructor(self)
end
function Foo.prototype.bar(self, a)
    tracy:ZoneBeginN("lua::method::Foo::bar")
    local b = a
    tracy:ZoneEnd()
    return b
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should inject zones into arrow functions passed to extern object literals", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @noSelf */
declare function extern(name: string, module: Record<string, unknown>): void;
/** @noSelf */
declare function log(v: unknown): void;

extern("mod", {
  handler: () => {
    const a = 1;

    log(a);
  },
});
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`tracy:ZoneBeginN("lua::file::main.script")
extern(
    "mod",
    {handler = function()
        tracy:ZoneBeginN("lua::function::mod.handler")
        local a = 1
        log(a)
        tracy:ZoneEnd()
    end}
)
tracy:ZoneEnd()
`);
  });

  it("should skip function zone injection for single return statement bodies", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function run(a: number): number {
  return a;
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self, a)
    return a
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should hoist return expression work into the zone through a local", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function compute(a: number): number;

export function run(a: number): number {
  const b = a + 1;

  return compute(b) * 2;
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self, a)
    tracy:ZoneBeginN("lua::function::run")
    local b = a + 1
    local ____tracyZoneResult = compute(nil, b) * 2
    tracy:ZoneEnd()
    return ____tracyZoneResult
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should measure single return statement bodies with computed expressions", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function compute(a: number): number;

export function run(a: number): number {
  return compute(a);
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self, a)
    tracy:ZoneBeginN("lua::function::run")
    local ____tracyZoneResult = compute(nil, a)
    tracy:ZoneEnd()
    return ____tracyZoneResult
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should close zones for returns inside while loops and unbraced if bodies", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function compute(a: number): number;

export function run(a: number): number {
  while (a < 100) {
    if (a > 50) {
      return compute(a);
    }

    a += 1;
  }

  if (a === 100) return compute(a);

  return a;
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self, a)
    tracy:ZoneBeginN("lua::function::run")
    while a < 100 do
        if a > 50 then
            local ____tracyZoneResult = compute(nil, a)
            tracy:ZoneEnd()
            return ____tracyZoneResult
        end
        a = a + 1
    end
    if a == 100 then
        local ____tracyZoneResult = compute(nil, a)
        tracy:ZoneEnd()
        return ____tracyZoneResult
    end
    tracy:ZoneEnd()
    return a
end
tracy:ZoneEnd()
return ____exports
`);
  });

  it("should not hoist multi-return expressions and keep them unmeasured", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare type LuaMultiReturn<T extends unknown[]> = T & { readonly __luaMultiReturnBrand: unique symbol };
declare function pack(a: number, b: number): LuaMultiReturn<[number, number]>;

export function run(a: number): LuaMultiReturn<[number, number]> {
  const b = a + 1;

  return pack(a, b);
}
`,
      },
      { plugins: [createPlugin({ enabled: true })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self, a)
    tracy:ZoneBeginN("lua::function::run")
    local b = a + 1
    tracy:ZoneEnd()
    return pack(nil, a, b)
end
tracy:ZoneEnd()
return ____exports
`);
  });

  describe("env fallback", () => {
    const originalInjectTracyZones = process.env[ENV_XR_INJECT_TRACY_ZONES];

    afterEach(() => {
      if (originalInjectTracyZones === undefined) {
        delete process.env[ENV_XR_INJECT_TRACY_ZONES];
      } else {
        process.env[ENV_XR_INJECT_TRACY_ZONES] = originalInjectTracyZones;
      }
    });

    it("should fall back to the env variable when enabled is unset", () => {
      process.env[ENV_XR_INJECT_TRACY_ZONES] = "true";

      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `
export function run(): number {
  const value = 1;

  return value;
}
`,
        },
        { plugins: [createPlugin()] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
tracy:ZoneBeginN("lua::file::main.script")
function ____exports.run(self)
    tracy:ZoneBeginN("lua::function::run")
    local value = 1
    tracy:ZoneEnd()
    return value
end
tracy:ZoneEnd()
return ____exports
`);
    });
  });
});
