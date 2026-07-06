import { parse } from "ini";
import { type ini_file } from "xray16";

import { MockIniFile } from "./mock-ini-file";

/**
 * Mock of the engine `create_ini_file` global.
 *
 * Accepts JSON section data for tests that want exact object values. If JSON parsing fails, it parses the content as
 * INI/LTX text and returns an `ini_file` mock backed by that parsed data.
 *
 * @param content - JSON section data or INI/LTX content.
 * @returns Engine-typed `ini_file` mock.
 */
export function mockCreateIniFile(content: string): ini_file {
  try {
    return MockIniFile.mock("*****", JSON.parse(content), content);
  } catch {
    // Cannot parse LTX as JSON, fall back to parsing plain INI content.
    return MockIniFile.mock("#####", parse(content), content);
  }
}
