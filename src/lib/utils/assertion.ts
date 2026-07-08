import { log, print_stack } from "xray16";
import { $isNil, $isNotNil } from "xray16/macros";

import { type TCount } from "../scalars";
import { type AnyArgs, type Nillable } from "../types";

/**
 * Call game abort and print reason.
 * Way to throw exceptions from lua code in x-ray engine.
 *
 * Error message should start with capitalized letter and end with period.
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
 * Call 'abort' in case of invalid condition.
 *
 * @param condition - Condition to call assertion abort.
 * @param format - C-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function assert<T = boolean>(condition: T, format: string, ...rest: AnyArgs): asserts condition {
  if (!condition) {
    abort(string.format(format, ...rest));
  }
}

/**
 * Assertion function to ensure provided value is not null.
 *
 * @param value - Value to check.
 * @param format - Optional c-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function assertDefined<T>(
  value: Nillable<T>,
  format: string = "Type assertion failed, unexpected 'nil' value provided.",
  ...rest: AnyArgs
): asserts value is T {
  if ($isNil(value)) {
    abort(string.format(format, ...rest));
  }
}

/**
 * Assertion function to ensure provided value is boolean.
 *
 * @param value - Value to check.
 * @param format - Optional c-like formatted string for interpolation.
 * @param rest - Rest parameters to interpolate into format string.
 */
export function assertNonEmptyString(
  value: Nillable<string>,
  format: string = "Type assertion failed, expected boolean value.",
  ...rest: AnyArgs
): asserts value is string {
  if ($isNil(value) || value === "") {
    abort(string.format(format, ...rest));
  }
}

/**
 * Print callstack for debugging purposes.
 *
 * @param level - Stack levels to print in trace logs.
 */
export function callstack(level: TCount = 5): void {
  if ($isNotNil(debug) && $isNotNil(log)) {
    log("[callstack][traceback]" + debug.traceback(level));
  }
}
