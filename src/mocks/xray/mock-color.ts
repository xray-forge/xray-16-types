import type { color } from "xray16";

/**
 * Mock of the X-Ray engine color class for jest/node.
 */
export class MockColor implements color {
  public r: number;
  public g: number;
  public b: number;

  public constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public set(r: number, g: number, b: number): void {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

/**
 * Mock of the engine `GetARGB` global.
 */
export const mockGetARGB = jest.fn((_a: number, _r: number, _g: number, _b: number): number => {
  return 1;
});
