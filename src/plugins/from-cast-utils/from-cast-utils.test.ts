import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("from-cast-utils plugin", () => {
  it("should transform cast helpers and nil checks", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function $fromObject<T>(value: unknown): T;
declare function $isNil(value: unknown): boolean;
declare function $isNotNil(value: unknown): boolean;

export function run(value: unknown): unknown {
  const casted = $fromObject<number>(value);

  return [$isNil(casted), $isNotNil(casted), casted];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self, value)
    local casted = value
    return {casted == nil, casted ~= nil, casted}
end
return ____exports
`);
  });

  it("should unwrap every cast helper to its single argument", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function $fromObject<T>(value: unknown): T;
declare function $fromArray<T>(value: unknown): T;
declare function $fromLuaArray<T>(value: unknown): T;
declare function $fromLuaTable<T>(value: unknown): T;

export function run(value: unknown): unknown {
  return [
    $fromObject<number>(value),
    $fromArray<number>(value),
    $fromLuaArray<number>(value),
    $fromLuaTable<number>(value),
  ];
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self, value)
    return {value, value, value, value}
end
return ____exports
`);
  });

  it("should compile nil checks to lua equality against nil for nested expressions", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function $isNil(value: unknown): boolean;
declare function $isNotNil(value: unknown): boolean;

export function run(a: unknown, b: { x: unknown }): boolean {
  return $isNil(a) || $isNotNil(b.x);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self, a, b)
    return a == nil or b.x ~= nil
end
return ____exports
`);
  });

  it("should report a diagnostic and still unwrap when a cast helper has the wrong arity", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare function $fromObject<T>(value: unknown, extra?: unknown): T;

export function run(a: unknown, b: unknown): unknown {
  return $fromObject<number>(a, b);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual(["Invalid transformer call, expected function to have exactly 1 argument."]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self, a, b)
    return a
end
return ____exports
`);
  });

  it("should leave unrelated function calls untouched", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
/** @noSelf */
declare function other(value: unknown): unknown;

export function run(value: unknown): unknown {
  return other(value);
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self, value)
    return other(value)
end
return ____exports
`);
  });
});
