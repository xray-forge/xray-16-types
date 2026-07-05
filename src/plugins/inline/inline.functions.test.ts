import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("inline plugin functions handling", () => {
  it("should inline a single-return function call in the same file", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
function add(a: number, b: number): number {
  return a + b;
}

export function use(x: number): number {
  return add(x, 5);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function add(self, a, b)
    return a + b
end
function ____exports.use(self, x)
    return x + 5
end
return ____exports
`);
  });

  it("should inline an imported single-return function", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "lib.ts": `
/** @inline */
export function add(a: number, b: number): number {
  return a + b;
}
`,
        "main.ts": `
import { add } from "./lib";

export function use(x: number): number {
  return add(x, 5);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["lib.lua"]).toBe(`local ____exports = {}
---
-- @inline
function ____exports.add(self, a, b)
    return a + b
end
return ____exports
`);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____lib = require("lib")
local add = ____lib.add
function ____exports.use(self, x)
    return x + 5
end
return ____exports
`);
  });

  it("should substitute default parameter values for omitted arguments", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
function withDefault(a: number, b: number = 10): number {
  return a + b;
}

export function use(x: number): number {
  return withDefault(x);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function withDefault(self, a, b)
    if b == nil then
        b = 10
    end
    return a + b
end
function ____exports.use(self, x)
    return x + 10
end
return ____exports
`);
  });

  it("should inline when a reused parameter argument is side-effect free", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
function double(value: number): number {
  return value + value;
}

export function use(x: number): number {
  return double(x);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function double(self, value)
    return value + value
end
function ____exports.use(self, x)
    return x + x
end
return ____exports
`);
  });

  it("should fall back to a real call when a reused parameter argument has side effects", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
function sideEffect(): number {
  return 1;
}

/** @inline */
function double(value: number): number {
  return value + value;
}

export function use(): number {
  return double(sideEffect());
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    // Duplicating sideEffect() would call it twice, so the call is kept instead of inlined.
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function sideEffect(self)
    return 1
end
---
-- @inline
local function double(self, value)
    return value + value
end
function ____exports.use(self)
    return double(
        nil,
        sideEffect(nil)
    )
end
return ____exports
`);
  });

  it("should error when an @inline function is not a single-return expression", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
function clampBad(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }

  return value;
}

export function use(x: number): number {
  return clampBad(x, 0, 10);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "'@inline' function 'clampBad' must have a single 'return <expression>' body and only plain parameters " +
        "(no rest or destructuring) to be inlinable.",
    ]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function clampBad(self, value, min, max)
    if value < min then
        return min
    end
    return value
end
function ____exports.use(self, x)
    return clampBad(nil, x, 0, 10)
end
return ____exports
`);
  });
});
