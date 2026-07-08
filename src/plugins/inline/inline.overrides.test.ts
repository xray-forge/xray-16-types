import { createPlugin as createMacrosPlugin } from "../macros/plugin";
import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

const INLINE_HINTS_DECLARATION: string = `
declare function $inline<T>(value: T): T;
declare function $noInline<T>(value: T): T;
`;

describe("inline plugin $inline macro", () => {
  it("should force-inline a call to an untagged single-return function", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
function add(a: number, b: number): number {
  return a + b;
}

export function use(x: number): number {
  return $inline(add(x, 5));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function add(self, a, b)
    return a + b
end
function ____exports.use(self, x)
    return x + 5
end
return ____exports
`);
  });

  it("should fold untagged constants and computable expressions", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
const MINUTE: number = 60 * 1000;
const HOUR: number = 60 * MINUTE;

export function use(): number {
  return $inline(HOUR) + $inline(MINUTE * 2);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local MINUTE = 60 * 1000
local HOUR = 60 * MINUTE
function ____exports.use(self)
    return 3600000 + 120000
end
return ____exports
`);
  });

  it("should force-inline an imported untagged function and keep the import binding", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "lib.ts": `
export function add(a: number, b: number): number {
  return a + b;
}
`,
        "main.ts": `${INLINE_HINTS_DECLARATION}
import { add } from "./lib";

export function use(x: number): number {
  return $inline(add(x, 5));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____lib = require("lib")
local add = ____lib.add
function ____exports.use(self, x)
    return x + 5
end
return ____exports
`);
  });

  it("should splice void and guard bodies at statement position", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
declare function log(message: string): void;

function notify(message: string): void {
  log(message);
}

function guard(value: number): void {
  if (value > 0) {
    log("positive");
  }
}

export function use(value: number): void {
  $inline(notify("called"));
  $inline(guard(value));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function notify(self, message)
    log(nil, message)
end
local function guard(self, value)
    if value > 0 then
        log(nil, "positive")
    end
end
function ____exports.use(self, value)
    log(nil, "called")
    if value > 0 then
        log(nil, "positive")
    end
end
return ____exports
`);
  });

  it("should fail the build when the target function is not inlinable", () => {
    const { errors } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
function heavy(a: number): number {
  const doubled: number = a * 2;

  return doubled;
}

export function use(x: number): number {
  return $inline(heavy(x));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([expect.stringContaining("'$inline' function 'heavy' must have a single")]);
  });

  it("should fail the build when the target expression is not computable", () => {
    const { errors } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
let counter: number = 0;

export function use(): number {
  return $inline(counter);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([expect.stringContaining("'$inline' target must be a call to a module-level function")]);
  });

  it("should fail the build on wrong argument count", () => {
    const { errors } = transpileWithPlugins(
      {
        "main.ts": `
declare function $inline(...values: Array<unknown>): unknown;

export function use(): unknown {
  return $inline();
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([expect.stringContaining("'$inline' macro expects exactly 1 argument")]);
  });
});

describe("inline plugin $noInline macro", () => {
  it("should keep a direct call to an '@inline' function", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
/** @inline */
function add(a: number, b: number): number {
  return a + b;
}

export function use(x: number): number {
  return $noInline(add(x, 5));
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
    return add(nil, x, 5)
end
return ____exports
`);
  });

  it("should keep a direct reference to an '@inline' constant and object member", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
/** @inline */
const TIMEOUT: number = 500;

/** @inline */
const medkits = {
  medkit: "medkit",
} as const;

export function use(): unknown {
  return [$noInline(TIMEOUT), $noInline(medkits.medkit), TIMEOUT];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local TIMEOUT = 500
---
-- @inline
local medkits = {medkit = "medkit"}
function ____exports.use(self)
    return {TIMEOUT, medkits.medkit, 500}
end
return ____exports
`);
  });

  it("should keep the import binding for a suppressed imported '@inline' function", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "lib.ts": `
/** @inline */
export function add(a: number, b: number): number {
  return a + b;
}
`,
        "main.ts": `${INLINE_HINTS_DECLARATION}
import { add } from "./lib";

export function use(x: number): number {
  return $noInline(add(x, 5));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local ____lib = require("lib")
local add = ____lib.add
function ____exports.use(self, x)
    return add(nil, x, 5)
end
return ____exports
`);
  });

  it("should still inline tagged constants inside suppressed call arguments", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
/** @inline */
const TIMEOUT: number = 500;

/** @inline */
function wait(value: number): number {
  return value * 2;
}

export function use(): number {
  return $noInline(wait(TIMEOUT));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
---
-- @inline
local TIMEOUT = 500
---
-- @inline
local function wait(self, value)
    return value * 2
end
function ____exports.use(self)
    return wait(nil, 500)
end
return ____exports
`);
  });

  it("should be a no-op for untagged targets", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
function add(a: number, b: number): number {
  return a + b;
}

export function use(x: number): number {
  return $noInline(add(x, 5));
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function add(self, a, b)
    return a + b
end
function ____exports.use(self, x)
    return add(nil, x, 5)
end
return ____exports
`);
  });

  it("should fail the build when suppressing a '@virtual' constant", () => {
    const { errors } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
/** @virtual */
const TIMEOUT: number = 500;

export function use(): number {
  return $noInline(TIMEOUT);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([expect.stringContaining("'$noInline' cannot reference '@virtual' declaration 'TIMEOUT'")]);
  });

  it("should fail the build when suppressing a '@virtual' enum member access", () => {
    const { errors } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
/** @virtual */
enum EWeapon {
  KNIFE = "wpn_knife",
}

export function use(): string {
  return $noInline(EWeapon.KNIFE);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([expect.stringContaining("'$noInline' cannot reference '@virtual' declaration 'KNIFE'")]);
  });
});

describe("inline plugin hints combined with macros plugin", () => {
  it("should consume hints before the macros plugin in the recommended order", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
function add(a: number, b: number): number {
  return a + b;
}

/** @inline */
const TIMEOUT: number = 500;

export function use(x: number): number {
  return $inline(add(x, 5)) + $noInline(TIMEOUT);
}
`,
      },
      // Consumer configs list macros before inline; later plugins run first, so inline consumes the hints.
      { plugins: [createMacrosPlugin({ buildTimestamp: false }), plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function add(self, a, b)
    return a + b
end
---
-- @inline
local TIMEOUT = 500
function ____exports.use(self, x)
    return x + 5 + TIMEOUT
end
return ____exports
`);
  });

  it("should unwrap hints as identity when only the macros plugin is enabled", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `${INLINE_HINTS_DECLARATION}
function add(a: number, b: number): number {
  return a + b;
}

export function use(x: number): number {
  return $inline(add(x, 5));
}
`,
      },
      { plugins: [createMacrosPlugin({ buildTimestamp: false })] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
local function add(self, a, b)
    return a + b
end
function ____exports.use(self, x)
    return add(nil, x, 5)
end
return ____exports
`);
  });
});
