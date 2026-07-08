import { beforeAll, describe, expect, it } from "@jest/globals";
import { print_stack } from "xray16";

import { mockDebug } from "../../mocks/lua/mock-lua-debug";
import { mockError } from "../../mocks/lua/mock-lua-error";
import { mockString } from "../../mocks/lua/mock-lua-string";
import { mockToString } from "../../mocks/lua/mock-lua-tostring";

import { abort, assert, assertDefined, assertNonEmptyString, callstack } from "./assertion";

// Assertion utils call the Lua `string` / `tostring` / `error` / `debug` globals; provide the mocks before the specs run.
beforeAll(() => {
  (globalThis as Record<string, unknown>).string = mockString;
  (globalThis as Record<string, unknown>).tostring = mockToString;
  (globalThis as Record<string, unknown>).error = mockError;
  (globalThis as Record<string, unknown>).debug = mockDebug;
});

describe("abort", () => {
  it("abort should correctly throw exceptions", () => {
    expect(() => abort("Basic.")).toThrow("Basic.");
    expect(print_stack).toHaveBeenCalledTimes(1);

    expect(() => abort("Basic: %s.", "reason")).toThrow("Basic: reason.");
    expect(print_stack).toHaveBeenCalledTimes(2);

    expect(() => abort("Complex: %s, %s, %s.", "reason", 1, true)).toThrow("Complex: reason, 1, true.");
    expect(print_stack).toHaveBeenCalledTimes(3);
  });
});

describe("assert", () => {
  it("assert should correctly check and throw exceptions", () => {
    expect(() => assert(false, "Basic.")).toThrow("Basic.");
    expect(() => assert(2 + 2 === 5, "Basic: %s.", "reason")).toThrow("Basic: reason.");
    expect(() => assert(false, "Complex: %s, %s, %s.", "reason", 1, true)).toThrow("Complex: reason, 1, true.");

    expect(() => assert(true, "Basic.")).not.toThrow();
    expect(() => assert(1 === 1, "Basic: %s.")).not.toThrow();
    expect(() => assert("a" === "a", "Complex: %s, %s, %s.", "reason", 1, true)).not.toThrow();
  });
});

describe("assertDefined", () => {
  it("assertDefined should correctly check and throw exceptions", () => {
    expect(() => assertDefined(null)).toThrow("Type assertion failed, unexpected 'nil' value provided.");
    expect(() => assertDefined(null, "Test message.")).toThrow("Test message.");
    expect(() => assertDefined("abc")).not.toThrow();
    expect(() => assertDefined(123)).not.toThrow();
    expect(() => assertDefined(true)).not.toThrow();
    expect(() => assertDefined({})).not.toThrow();
    expect(() => assertDefined([])).not.toThrow();
  });
});

describe("assertNonEmptyString", () => {
  it("assertNonEmptyString should correctly check and throw exceptions", () => {
    expect(() => assertNonEmptyString(null)).toThrow("Type assertion failed, expected non-empty string value.");
    expect(() => assertNonEmptyString(null, "Test message.")).toThrow("Test message.");
    expect(() => assertNonEmptyString("")).toThrow();
    expect(() => assertNonEmptyString("a")).not.toThrow();
    expect(() => assertNonEmptyString("abc")).not.toThrow();
    expect(() => assertNonEmptyString("dgef")).not.toThrow();
    expect(() => assertNonEmptyString("abcdefg")).not.toThrow();
  });
});

describe("callstack", () => {
  it("callstack should correctly print debug stack", () => {
    callstack();
    callstack(6);
    callstack(4);

    expect(mockDebug.traceback).toHaveBeenNthCalledWith(1, 5);
    expect(mockDebug.traceback).toHaveBeenNthCalledWith(2, 6);
    expect(mockDebug.traceback).toHaveBeenNthCalledWith(3, 4);
  });
});
