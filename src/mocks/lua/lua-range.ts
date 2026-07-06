/**
 * Mock of the `$range` TypeScriptToLua language-extension helper.
 *
 * @param start - Inclusive lower bound.
 * @param end - Inclusive upper bound.
 * @returns Numbers from `start` to `end` inclusive, empty when `start` exceeds `end`.
 */
export function mockRange(start: number, end: number): Array<number> {
  const data: Array<number> = [];

  for (let it = start; it <= end; it++) {
    data.push(it);
  }

  return data;
}
