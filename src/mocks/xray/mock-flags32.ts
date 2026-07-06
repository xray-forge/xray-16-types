import { type flags32 } from "xray16";

/**
 * Mock of the X-Ray engine `flags32` bit-flags object.
 */
export class MockFlags32 {
  public static mock(): flags32 {
    return new MockFlags32() as unknown as flags32;
  }

  public assign(_value: number): void {}

  public get(): number {
    return 0;
  }
}
