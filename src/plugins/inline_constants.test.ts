import * as ts from "typescript";
import * as tstl from "typescript-to-lua";
import { createEmitOutputCollector } from "typescript-to-lua/dist/transpilation/output-collector";

import plugin from "./inline_constants";

const { createVirtualProgram } = tstl as unknown as {
  createVirtualProgram: (files: Record<string, string>, options: tstl.CompilerOptions) => ts.Program;
};

interface ITranspileResult {
  lua: Record<string, string>;
  errors: Array<string>;
}

/**
 * Transpile virtual project with inline constants plugin enabled.
 *
 * @param files - Map of file names to typescript sources.
 * @returns Map of emitted lua files and error diagnostic messages.
 */
function transpile(files: Record<string, string>): ITranspileResult {
  const options: tstl.CompilerOptions = {
    luaTarget: tstl.LuaTarget.LuaJIT,
    luaLibImport: tstl.LuaLibImportKind.Require,
    noHeader: true,
    skipLibCheck: true,
    strict: true,
  };

  const program: ts.Program = createVirtualProgram(files, options);
  const collector = createEmitOutputCollector();
  const { diagnostics } = new tstl.Transpiler().emit({ program, plugins: [plugin], writeFile: collector.writeFile });

  const lua: Record<string, string> = {};

  for (const file of collector.files) {
    lua[file.outPath.replace(/\\/g, "/").split("/").pop() as string] = file.lua ?? "";
  }

  return {
    lua,
    errors: [...ts.getPreEmitDiagnostics(program), ...diagnostics]
      .filter((it) => it.category === ts.DiagnosticCategory.Error)
      .map((it) => ts.flattenDiagnosticMessageText(it.messageText, "\n")),
  };
}

describe("inline_constants plugin", () => {
  it("should inline property and element access on tagged as-const objects across modules", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/**
 * List of medkits.
 *
 * @inline
 */
export const medkits = {
  medkit: "medkit",
  medkit_army: "medkit_army",
  "medkit-x": "medkit-x",
} as const;
`,
      "main.ts": `
import { medkits } from "./constants";

export function pick(): string {
  return medkits.medkit_army;
}

export function pickDashed(): string {
  return medkits["medkit-x"];
}

export function pickDynamic(key: keyof typeof medkits): string {
  return medkits[key];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('return "medkit_army"');
    expect(lua["main.lua"]).toContain('return "medkit-x"');
    expect(lua["main.lua"]).not.toContain("medkits.medkit_army");
    expect(lua["main.lua"]).toContain("medkits[key]");
    expect(lua["constants.lua"]).toContain('medkit_army = "medkit_army"');
  });

  it("should inline tagged enum members and keep enum tables emitted", () => {
    const { lua, errors } = transpile({
      "enums.ts": `
/**
 * @inline
 */
export enum EStringEnum {
  FIRST = "first",
  SECOND = "second",
}

/**
 * @inline
 */
export enum ENumericEnum {
  FIRST,
  SECOND,
  TENTH = 10,
  NEXT,
}
`,
      "main.ts": `
import { ENumericEnum, EStringEnum } from "./enums";

export function get(): unknown {
  return [EStringEnum.SECOND, ENumericEnum.NEXT, ENumericEnum["TENTH"]];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('"second"');
    expect(lua["main.lua"]).toContain("11");
    expect(lua["main.lua"]).toContain("10");
    expect(lua["main.lua"]).not.toContain("EStringEnum.SECOND");
    expect(lua["main.lua"]).not.toContain("ENumericEnum.NEXT");
    expect(lua["enums.lua"]).toContain('EStringEnum.FIRST = "first"');
    expect(lua["enums.lua"]).toContain("ENumericEnum.TENTH = 10");
  });

  it("should inline tagged scalar constants including namespace access", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const MAX_VALUE = 255;

/** @inline */
export const MIN_OFFSET = -16;

/** @inline */
export const IS_ENABLED = true;

/** @inline */
export const DEFAULT_NAME = "default";
`,
      "main.ts": `
import * as constants from "./constants";

import { DEFAULT_NAME, IS_ENABLED, MAX_VALUE, MIN_OFFSET } from "./constants";

export function get(): unknown {
  return [MAX_VALUE, MIN_OFFSET, IS_ENABLED, DEFAULT_NAME];
}

export function getFromNamespace(): number {
  return constants.MAX_VALUE;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("255");
    expect(lua["main.lua"]).toMatch(/-\s*16/);
    expect(lua["main.lua"]).toContain("true");
    expect(lua["main.lua"]).toContain('"default"');
    expect(lua["main.lua"]).toContain("return 255");
    expect(lua["main.lua"]).not.toContain("return constants.MAX_VALUE");
  });

  it("should not inline untagged declarations", () => {
    const { lua, errors } = transpile({
      "main.ts": `
export const values = { a: "a" } as const;

export enum EUntagged {
  FIRST = "first",
}

export const UNTAGGED_SCALAR = 10;

export function get(): string {
  return values.a + EUntagged.FIRST + UNTAGGED_SCALAR;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("values.a");
    expect(lua["main.lua"]).toContain("EUntagged.FIRST");
    expect(lua["main.lua"]).toContain("UNTAGGED_SCALAR");
  });

  it("should inline through spread merges of tagged objects", () => {
    const { lua, errors } = transpile({
      "weapons.ts": `
/** @inline */
export const pistols = { wpn_pm: "wpn_pm", wpn_fort: "wpn_fort" } as const;

/** @inline */
export const rifles = { wpn_ak74: "wpn_ak74" } as const;

/** @inline */
export const weapons = { ...pistols, ...rifles, wpn_knife: "wpn_knife" } as const;
`,
      "main.ts": `
import { weapons } from "./weapons";

export function get(): unknown {
  return [weapons.wpn_pm, weapons.wpn_ak74, weapons.wpn_knife];
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain('"wpn_pm"');
    expect(lua["main.lua"]).toContain('"wpn_ak74"');
    expect(lua["main.lua"]).toContain('"wpn_knife"');
    expect(lua["main.lua"]).not.toContain("weapons.wpn_pm");
  });

  it("should inline properties declared in tagged objects when accessed through untagged spreads", () => {
    const { lua, errors } = transpile({
      "main.ts": `
/** @inline */
export const medkits = { medkit: "medkit" } as const;

export const drugs = { ...medkits, antirad: "antirad" } as const;

export function get(): unknown {
  return [drugs.medkit, drugs.antirad];
}
`,
    });

    expect(errors).toEqual([]);
    // Value is declared inside tagged statement, so access through untagged spread is inlined:
    expect(lua["main.lua"]).toContain('"medkit"');
    expect(lua["main.lua"]).not.toContain("drugs.medkit");
    // Own property of untagged object is not inlined:
    expect(lua["main.lua"]).toContain("drugs.antirad");
  });

  it("should keep tables emitted and whole-object usages functional", () => {
    const { lua, errors } = transpile({
      "constants.ts": `
/** @inline */
export const detectors = { detector_simple: "detector_simple" } as const;
`,
      "main.ts": `
import { detectors } from "./constants";

export function all(): unknown {
  return detectors;
}

export function one(): string {
  return detectors.detector_simple;
}
`,
    });

    expect(errors).toEqual([]);
    expect(lua["main.lua"]).toContain("return detectors");
    expect(lua["main.lua"]).toContain('return "detector_simple"');
    expect(lua["constants.lua"]).toContain('detector_simple = "detector_simple"');
  });

  it("should error when tagged object spreads untagged object", () => {
    const { errors } = transpile({
      "weapons.ts": `
export const pistols = { wpn_pm: "wpn_pm" } as const;

/** @inline */
export const weapons = { ...pistols, wpn_knife: "wpn_knife" } as const;

export function keep(): unknown {
  return weapons;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'wpn_pm'");
    expect(errors[0]).toContain("mark the source declaration with '@inline'");
  });

  it("should error when tagged object is missing as const assertion", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export const values = { a: "a" };

export function get(): string {
  return values.a;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("did you forget 'as const' assertion?");
  });

  it("should error when tagged declaration is not const", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export let value = 10;
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("must use 'const' keyword");
  });

  it("should error when tagged declaration is not module-level", () => {
    const { errors } = transpile({
      "main.ts": `
export function get(): number {
  /** @inline */
  const localValue = 10;

  return localValue;
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("must be module-level statements");
  });

  it("should error when tagged scalar has no literal type", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export const COMPUTED_VALUE: number = 60 * 1000;
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'COMPUTED_VALUE' must have a literal string/number/boolean type");
  });

  it("should error when tag is used on unsupported declarations", () => {
    const { errors } = transpile({
      "main.ts": `
/** @inline */
export class Something {}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("supported only for enums and module-level 'const' declarations");
  });

  it("should error when tagged enum has computed members", () => {
    const { errors } = transpile({
      "main.ts": `
function computeValue(): number {
  return 10;
}

/** @inline */
export enum EComputed {
  STATIC = 1,
  DYNAMIC = computeValue(),
}
`,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("'DYNAMIC' must have a compile-time constant value");
  });
});
