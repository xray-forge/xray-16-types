/**
 * Mock of the X-Ray engine color class for jest/node.
 */
export class MockColor {}

/**
 * Mock of the engine `GetARGB` global.
 */
export function mockGetARGB(_a: number, _r: number, _g: number, _b: number): number {
  return 1;
}
