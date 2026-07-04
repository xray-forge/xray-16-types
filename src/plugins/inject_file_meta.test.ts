import injectFileMetaPlugin from "./inject_file_meta";
import { transpileWithPlugins } from "./testing";

describe("inject_file_meta plugin", () => {
  it("should replace file metadata placeholders", () => {
    const { errors, lua } = transpileWithPlugins(
      {
        "scripts/main.ts": `
declare const $filename: string;
declare const $dirname: string;

export const meta = [$filename, $dirname];
`,
      },
      { plugins: [injectFileMetaPlugin] }
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
      { plugins: [injectFileMetaPlugin] }
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
      { plugins: [injectFileMetaPlugin] }
    );

    expect(errors).toEqual([]);
    expect(lua["b.lua"]).toBe(`local ____exports = {}
local filename = "keep"
____exports.meta = {filename, "b"}
return ____exports
`);
  });
});
