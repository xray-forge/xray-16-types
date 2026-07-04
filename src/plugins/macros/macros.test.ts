import { transpileWithPlugins } from "../testing";

import { createPlugin } from "./plugin";

describe("macros plugin", () => {
  describe("file metadata", () => {
    it("should replace file metadata placeholders", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "scripts/main.ts": `
declare const $filename: string;
declare const $dirname: string;

export const meta = [$filename, $dirname];
`,
        },
        { plugins: [createPlugin({ buildTimestamp: false })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
____exports.meta = {"main", "scripts"}
return ____exports
`);
    });

    it("should resolve placeholders relative to the current file for nested index files", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "scripts/sub/index.ts": `
declare const $filename: string;
declare const $dirname: string;

export const meta = $filename + "/" + $dirname;
`,
        },
        { plugins: [createPlugin({ buildTimestamp: false })] }
      );

      expect(errors).toEqual([]);
      expect(lua["index.lua"]).toBe(`local ____exports = {}
____exports.meta = ("index" .. "/") .. "sub"
return ____exports
`);
    });

    it("should only replace the placeholder identifiers and leave similarly named locals alone", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "a/b.ts": `
declare const $filename: string;

const filename = "keep";

export const meta = [filename, $filename];
`,
        },
        { plugins: [createPlugin({ buildTimestamp: false })] }
      );

      expect(errors).toEqual([]);
      expect(lua["b.lua"]).toBe(`local ____exports = {}
local filename = "keep"
____exports.meta = {filename, "b"}
return ____exports
`);
    });
  });

  describe("cast helpers", () => {
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
        { plugins: [createPlugin({ buildTimestamp: false })] }
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
        { plugins: [createPlugin({ buildTimestamp: false })] }
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
        { plugins: [createPlugin({ buildTimestamp: false })] }
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
        { plugins: [createPlugin({ buildTimestamp: false })] }
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
        { plugins: [createPlugin({ buildTimestamp: false })] }
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

  describe("build timestamp", () => {
    it("should prepend the timestamp comment to every emitted file", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "first.ts": `export const a = 1;`,
          "second.ts": `export const b = 2;`,
        },
        { plugins: [createPlugin()] }
      );
      const stamp = /^-- Generated by xrf util at: .+\n\n/;

      expect(errors).toEqual([]);
      expect(lua["first.lua"]).toMatch(stamp);
      expect(lua["second.lua"]).toMatch(stamp);
      expect(lua["first.lua"].replace(stamp, "")).toBe(`local ____exports = {}
____exports.a = 1
return ____exports
`);
      expect(lua["second.lua"].replace(stamp, "")).toBe(`local ____exports = {}
____exports.b = 2
return ____exports
`);
    });

    it("should not prepend a timestamp when disabled", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "main.ts": `export const value = 1;`,
        },
        { plugins: [createPlugin({ buildTimestamp: false })] }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
____exports.value = 1
return ____exports
`);
    });
  });

  describe("xray16/macros import", () => {
    it("should strip xray16/macros imports and fold their usages", () => {
      const { errors, lua } = transpileWithPlugins(
        {
          "macros.d.ts": `declare module "xray16/macros" {
  export const $filename: string;
  export function $isNil(value: unknown): boolean;
  export function $fromObject<T>(value: unknown): T;
}`,
          "scripts/main.ts": `
import { $filename, $fromObject, $isNil } from "xray16/macros";

export function run(value: unknown): unknown {
  return [$filename, $isNil(value), $fromObject<number>(value)];
}
`,
        },
        {
          plugins: [createPlugin({ buildTimestamp: false })],
          compilerOptions: { noResolvePaths: ["xray16", "xray16/macros"] },
        }
      );

      expect(errors).toEqual([]);
      expect(lua["main.lua"]).toBe(`local ____exports = {}
function ____exports.run(self, value)
    return {"main", value == nil, value}
end
return ____exports
`);
    });
  });
});
