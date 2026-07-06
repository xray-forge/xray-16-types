import * as fs from "node:fs";
import * as path from "node:path";

import { jest } from "@jest/globals";
import { parse } from "ini";
import { type ini_file } from "xray16";

/**
 * Loosely typed INI data store (section -> field -> value).
 */
type AnyObject = Record<string, any>;

/**
 * Normalize an externally provided path (Windows separators -> current OS).
 *
 * Inlined from the engine `normalizeParameterPath` util to keep this mock engine-agnostic.
 */
function normalizeParameterPath(externalPath: string): string {
  return externalPath.replace(/\\/g, path.sep);
}

/**
 * Mock of the X-Ray engine `ini_file` for jest/node.
 *
 * The mock stores sections in plain objects. Tests can pass data directly, pre-register data for a path, or configure a
 * base config directory for loading real `.ltx` or `.ini` files. Unknown paths resolve to an empty store when no base
 * directory is configured.
 *
 * @remarks
 * This is a focused test helper, not a full engine parser. It does not implement section inheritance or `#include`
 * expansion beyond what the `ini` package parses from a single file.
 */
export class MockIniFile<T extends AnyObject = AnyObject> {
  private static configsDir: string | null = null;
  private static registry: Record<string, AnyObject> = {};

  /**
   * Configure the base directory used to read real `.ltx` or `.ini` files for unregistered paths, and
   * optionally inject the registry object holding pre-registered data.
   *
   * The consumer (engine) passes its `FILES_MOCKS` object here **by reference**, so paths registered via
   * {@link MockIniFile.register} — or mutated directly on that object by tests — are seen by the mock.
   */
  public static setup(options: { configsDir?: string | null; files?: Record<string, AnyObject> }): void {
    MockIniFile.configsDir = options.configsDir ?? null;

    if (options.files) {
      MockIniFile.registry = options.files;
    }
  }

  /**
   * Reset injected configuration and registered data.
   *
   * Call this between suites when tests mutate the shared registry.
   */
  public static reset(): void {
    MockIniFile.configsDir = null;
    MockIniFile.registry = {};
  }

  /**
   * Create an engine-typed `ini_file` mock.
   *
   * @param iniPath - Config path returned by `fname`.
   * @param data - Optional pre-parsed section data.
   * @param content - Optional original source content.
   * @returns Mock typed as the engine `ini_file`.
   */
  public static mock(iniPath: string, data?: AnyObject, content?: string): ini_file {
    return new MockIniFile(iniPath, data, content) as unknown as ini_file;
  }

  /**
   * Create a strongly typed mock instance.
   *
   * @param iniPath - Config path returned by `fname`.
   * @param data - Optional pre-parsed section data.
   * @param content - Optional original source content.
   * @returns Mock instance with access to jest spies and stored data.
   */
  public static create<T extends AnyObject = AnyObject>(iniPath: string, data?: T, content?: string): MockIniFile<T> {
    return new MockIniFile<T>(iniPath, data, content);
  }

  /**
   * Register pre-parsed section data for later construction by path.
   *
   * @param iniPath - Config path to match in the constructor.
   * @param data - Parsed section data to reuse.
   */
  public static register(iniPath: string, data: AnyObject): void {
    MockIniFile.registry[iniPath] = data;
  }

  /**
   * Register an existing mock instance by its `fname` value.
   *
   * @param ini - Engine-typed mock returned by {@link MockIniFile.mock}.
   */
  public static registerIni(ini: ini_file): void {
    MockIniFile.registry[ini.fname()] = (ini as unknown as MockIniFile).data;
  }

  public path: string;
  public content: string;
  public data: T;

  /**
   * Create an INI mock from direct data, registered data, or a configured config directory.
   *
   * @param iniPath - Config path returned by `fname`.
   * @param data - Optional pre-parsed section data.
   * @param content - Optional original source content.
   */
  public constructor(iniPath: string, data?: T, content: string = "") {
    this.path = iniPath;
    this.content = content;
    this.data = data || (MockIniFile.registry[iniPath] as unknown as T);

    if (!this.data) {
      if (MockIniFile.configsDir) {
        const absolutePath: string = path.resolve(MockIniFile.configsDir, normalizeParameterPath(iniPath));

        this.data = (fs.existsSync(absolutePath) ? parse(fs.readFileSync(absolutePath).toString()) : {}) as T;
      } else {
        this.data = {} as T;
      }
    }
  }

  public w_string = jest.fn((section: string, field: string, value: string) => {
    if (!this.data[section]) {
      (this.data as AnyObject)[section] = {};
    }

    this.data[section][field] = value;
  });

  public r_float = jest.fn((section: string, field: string) => +this.data[section][field]);

  public r_u32 = jest.fn((section: string, field: string) => {
    if (!(section in this.data)) {
      throw new Error(`Section '${section}' does not exist in '${this.path}'.`);
    }

    return this.data[section][field];
  });

  public r_s32 = jest.fn((section: string, field: string) => this.data[section][field]);

  public r_string = jest.fn((section: string, field: string) => this.data[section][field]);

  public r_string_wb = jest.fn((section: string, field: string) => {
    return (this.data[section][field] as string).trim().replace(/^"(.*)"$/, "$1");
  });

  public r_bool = jest.fn((section: string, field: string) => {
    if (typeof this.data[section][field] === "string") {
      return this.data[section][field] === "true";
    } else {
      return Boolean(this.data[section][field]);
    }
  });

  public line_count = jest.fn((section: string) => {
    const data = this.data[section];

    if (Array.isArray(data)) {
      return data.length;
    }

    return Object.keys(data || {}).length;
  });

  public section_count = jest.fn(() => Object.keys(this.data).length);

  public section_exist = jest.fn((section: string) => this.data[section] !== undefined);

  public r_line = jest.fn((section: string, lineNumber: number) => {
    const data = this.data[section];

    if (Array.isArray(data)) {
      return [true, data[lineNumber], null];
    }

    const entry = Object.entries(data)[lineNumber];

    return [true, entry[0], entry[1]];
  });

  public line_exist = jest.fn((section: string, param: string) => {
    return this.data[section]?.[param] !== undefined;
  });

  public fname = jest.fn(() => this.path);

  public set_readonly = jest.fn();

  public set_override_names = jest.fn();

  public save_as = jest.fn();

  public save_at_end = jest.fn();

  public section_for_each = jest.fn((cb: (section: string) => void) => {
    Object.keys(this.data).forEach((it) => cb(it));
  });

  /**
   * Cast this mock to the engine `ini_file` type.
   */
  public asMock(): ini_file {
    return this as unknown as ini_file;
  }
}
