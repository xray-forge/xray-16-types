import { transpileWithPlugins } from "../testing";

import { plugin } from "./plugin";

describe("optimize plugin", () => {
  it("should rewrite returned ternaries into branch returns", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function pick(value: boolean): number {
  return value ? 1 : 2;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.pick(self, value)
    if value then
        return 1
    else
        return 2
    end
end
return ____exports
`);
  });

  it("should recursively expand nested ternaries into nested branch returns", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function pick(a: number): string {
  return a > 2 ? "big" : a > 1 ? "mid" : "small";
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.pick(self, a)
    if a > 2 then
        return "big"
    else
        if a > 1 then
            return "mid"
        else
            return "small"
        end
    end
end
return ____exports
`);
  });

  it("should look through parenthesized and cast expressions to find the ternary", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function pick(a: boolean): number {
  return (a ? 1 : 2) as number;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.pick(self, a)
    if a then
        return 1
    else
        return 2
    end
end
return ____exports
`);
  });

  it("should leave non-ternary returns untouched", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
export function pick(a: number): number {
  return a + 1;
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.pick(self, a)
    return a + 1
end
return ____exports
`);
  });

  it("should not rewrite ternaries whose branches return lua multiple values", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "main.ts": `
declare type LuaMultiReturn<T extends any[]> = T & { readonly __tstlMultiReturn: any };
/** @noSelf */
declare function pair(): LuaMultiReturn<[number, number]>;

export function pick(a: boolean): LuaMultiReturn<[number, number]> {
  return a ? pair() : pair();
}
`,
      },
      { plugins: [plugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.pick(self, a)
    return unpack(a and ({pair()}) or ({pair()}))
end
return ____exports
`);
  });
});
