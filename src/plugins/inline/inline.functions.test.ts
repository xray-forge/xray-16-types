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
require("lib")
function ____exports.use(self, x)
    return x + 5
end
return ____exports
`);
  });

  it("should fail when an imported inline function captures an unavailable runtime binding", () => {
    const { errors } = transpileWithPlugins(
      {
        "registry.ts": `
export const registry = { cache: 0 };
`,
        "lib.ts": `
import { registry } from "./registry";

/** @inline */
export function resetCache(): void {
  registry.cache = 1;
}
`,
        "main.ts": `
import { resetCache } from "./lib";

export function use(): void {
  resetCache();
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "Cannot inline function 'resetCache': its body captures runtime value 'registry', which this module does not import.",
    ]);
  });

  it("should inline through a matching caller import and preserve its Lua binding", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "registry.ts": `
export const registry = { cache: 0 };
`,
        "lib.ts": `
import { registry } from "./registry";

/** @inline */
export function resetCache(): void {
  registry.cache = 1;
}
`,
        "main.ts": `
import { resetCache } from "./lib";
import { registry as db } from "./registry";

export function use(): void {
  resetCache();
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
require("lib")
local db = require("registry").registry
function ____exports.use(self)
    db.cache = 1
    local ____ = 1
end
return ____exports
`);
  });

  it("should reject an unrelated same-name import for a captured binding", () => {
    const { errors } = transpileWithPlugins(
      {
        "registry.ts": `
export const registry = { cache: 0 };
`,
        "other-registry.ts": `
export const registry = { cache: 0 };
`,
        "lib.ts": `
import { registry } from "./registry";

/** @inline */
export function resetCache(): void {
  registry.cache = 1;
}
`,
        "main.ts": `
import { resetCache } from "./lib";
import { registry } from "./other-registry";

export function use(): void {
  resetCache();
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([
      "Cannot inline function 'resetCache': its body captures runtime value 'registry', which this module does not import.",
    ]);
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
      "'@inline' function 'clampBad' must have a single 'return <expression>' or 'void' expression-statement body, " +
        "or a single 'if (condition) { ... }' guard statement, and only plain parameters (a trailing rest is " +
        "allowed for guards; no destructuring) to be inlinable.",
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

  it("should inline a guard function into a statement-position 'if'", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function fail(this: void, msg: string): void;

/** @inline */
function assertPositive(value: number, msg: string): void {
  if (value < 0) {
    fail(msg);
  }
}

export function use(x: number): void {
  assertPositive(x, "must be positive");
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    // The guard folds into a bare `if`; the happy path is a branch, not a call.
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function assertPositive(self, value, msg)
    if value < 0 then
        fail(msg)
    end
end
function ____exports.use(self, x)
    if x < 0 then
        fail("must be positive")
    end
end
return ____exports
`);
  });

  it("should spread a trailing rest parameter of a guard function", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function fail(this: void, ...rest: Array<unknown>): void;

/** @inline */
function guard(condition: boolean, ...rest: Array<unknown>): void {
  if (!condition) {
    fail("prefix", ...rest);
  }
}

export function use(x: number): void {
  guard(x > 0, x, "extra");
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    // `...rest` expands to the caller's trailing arguments.
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function guard(self, condition, ...)
    if not condition then
        fail("prefix", ...)
    end
end
function ____exports.use(self, x)
    if not (x > 0) then
        fail("prefix", x, "extra")
    end
end
return ____exports
`);
  });

  it("should keep a real call when a guard function is not at statement position", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function fail(this: void, msg: string): void;

/** @inline */
function guard(condition: boolean, msg: string): void {
  if (!condition) {
    fail(msg);
  }
}

export function use(x: number): () => void {
  return () => guard(x > 0, "bad");
}
`,
      },
      { plugins: [plugin] }
    );

    // A concise-body arrow call is not Lua statement position, so the guard is not spliced. It stays a call.
    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function guard(self, condition, msg)
    if not condition then
        fail(msg)
    end
end
function ____exports.use(self, x)
    return function() return guard(nil, x > 0, "bad") end
end
return ____exports
`);
  });

  it("should inline a void expression-statement function at statement position", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @inline */
function poke(target: { set(this: void, key: string): void }, key: string): void {
  target.set(key);
}

export function use(data: { set(this: void, key: string): void }): void {
  poke(data, "flag");
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    // The call to the inlinable helper is spliced into `use`; only its definition remains.
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local function poke(self, target, key)
    target.set(key)
end
function ____exports.use(self, data)
    data.set("flag")
end
return ____exports
`);
  });
});
