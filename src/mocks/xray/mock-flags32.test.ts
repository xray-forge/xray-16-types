import { MockFlags32 } from "./mock-flags32";

describe("MockFlags32", () => {
  it("should store and query individual flag bits", () => {
    const flags = new MockFlags32().set(0b0010, true).set(0b1000, true);

    expect(flags.get()).toBe(0b1010);
    expect(flags.is(0b0010)).toBe(true);
    expect(flags.is(0b0110)).toBe(false);
    expect(flags.is_any(0b0100)).toBe(false);
    expect(flags.is_any(0b1000)).toBe(true);
  });

  it("should combine, copy, and clear masks", () => {
    const source = new MockFlags32().assign(0b1100);
    const flags = new MockFlags32().assign(0b0110).and(source, 0b0100).or(0b0001);

    expect(flags.get()).toBe(0b0101);
    expect(flags.equal(new MockFlags32().assign(0b0101))).toBe(true);
    expect(flags.invert().get()).toBe(0xfffffffa);
    expect(flags.zero().get()).toBe(0);
  });
});
