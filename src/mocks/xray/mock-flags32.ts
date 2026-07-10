import { type flags32, type u32 } from "xray16";

/**
 * Mock of the X-Ray engine `flags32` bit-flags object.
 */
export class MockFlags32 implements flags32 {
  private value: u32 = 0;

  public static create(): MockFlags32 {
    return new MockFlags32();
  }

  public static mock(): flags32 {
    return new MockFlags32();
  }

  public and(source: flags32, mask: u32): MockFlags32;
  public and(mask: u32): MockFlags32;
  public and(source: flags32 | u32, mask?: u32): MockFlags32 {
    this.value = (typeof source === "number" ? this.value & source : source.get() & (mask ?? 0)) >>> 0;

    return this;
  }

  public assign(value: flags32 | u32): MockFlags32 {
    this.value = (typeof value === "number" ? value : value.get()) >>> 0;

    return this;
  }

  public equal(value: Readonly<flags32>, mask?: u32): boolean {
    return mask === undefined ? this.value === value.get() : (this.value & mask) === (value.get() & mask);
  }

  public get(): u32 {
    return this.value;
  }

  public invert(value?: flags32 | u32): MockFlags32 {
    this.value = (~(value === undefined ? this.value : typeof value === "number" ? value : value.get())) >>> 0;

    return this;
  }

  public is(value: flags32, mask: u32): boolean;
  public is(mask: u32): boolean;
  public is(value: flags32 | u32, mask?: u32): boolean {
    const source: u32 = typeof value === "number" ? this.value : value.get();
    const selected: u32 = typeof value === "number" ? value : mask ?? 0;

    return (source & selected) === selected;
  }

  public is_any(value: flags32, mask: u32): boolean;
  public is_any(mask: u32): boolean;
  public is_any(value: flags32 | u32, mask?: u32): boolean {
    const source: u32 = typeof value === "number" ? this.value : value.get();
    const selected: u32 = typeof value === "number" ? value : mask ?? 0;

    return (source & selected) !== 0;
  }

  public one(): MockFlags32 {
    this.value = 0xffffffff;

    return this;
  }

  public or(source: flags32, mask: u32): MockFlags32;
  public or(mask: u32): MockFlags32;
  public or(source: flags32 | u32, mask?: u32): MockFlags32 {
    this.value = (typeof source === "number" ? this.value | source : source.get() | (mask ?? 0)) >>> 0;

    return this;
  }

  public set(mask: u32, enabled: boolean): MockFlags32 {
    this.value = (enabled ? this.value | mask : this.value & ~mask) >>> 0;

    return this;
  }

  public test(mask: u32): boolean {
    return this.is_any(mask);
  }

  public zero(): MockFlags32 {
    this.value = 0;

    return this;
  }
}
