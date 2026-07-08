import { log, print_stack } from "xray16";
import { $isNil, $isNotNil } from "xray16/macros";

import { type TCount } from "../scalars";
import { type AnyArgs, type Nillable } from "../types";

/**
 * Print the current stack and raise a formatted Lua error.
 *
 * Error messages should start with a capital letter and end with a period.
 *
 * @param format - C-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function abort(format: string, ...rest: AnyArgs): never {
  print_stack();
  error(string.format(format, ...rest), 2);
}

/**
 * Assertion function to ensure provided condition is truthy.
 * Raises a formatted error when the condition is falsy.
 *
 * @remarks
 * `@inline` keeps the happy path as a local `if` check and avoids a function call at runtime.
 *
 * @inline
 *
 * @param condition - Condition to assert.
 * @param format - C-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function assert<T = boolean>(condition: T, format: string, ...rest: AnyArgs): asserts condition {
  if (!condition) {
    error(string.format(format, ...rest), 2);
  }
}

/**
 * Assertion function to ensure provided value is not nil.
 *
 * @remarks
 * `@inline` keeps the happy path as a local `if` check and avoids a function call at runtime.
 *
 * @inline
 *
 * @param value - Value to check.
 * @param format - Optional C-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function assertDefined<T>(
  value: Nillable<T>,
  format: string = "Type assertion failed, unexpected 'nil' value provided.",
  ...rest: AnyArgs
): asserts value is T {
  if ($isNil(value)) {
    error(string.format(format, ...rest), 2);
  }
}

/**
 * Assertion function to ensure provided value is a non-empty string.
 *
 * @remarks
 * `@inline` keeps the happy path as a local `if` check and avoids a function call at runtime.
 *
 * @inline
 *
 * @param value - Value to check.
 * @param format - Optional C-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function assertNonEmptyString(
  value: Nillable<string>,
  format: string = "Type assertion failed, expected non-empty string value.",
  ...rest: AnyArgs
): asserts value is string {
  if ($isNil(value) || value === "") {
    error(string.format(format, ...rest), 2);
  }
}

/**
 * Print callstack for debugging purposes.
 *
 * @inline
 *
 * @param level - Stack levels to print in trace logs.
 */
export function callstack(level: TCount = 5): void {
  if ($isNotNil(debug) && $isNotNil(log)) {
    log("[callstack][traceback]" + debug.traceback(level));
  }
}
