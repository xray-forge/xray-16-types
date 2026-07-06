declare module "xray16" {
  /**
   * Mutable 8-bit flag mask.
   *
   * @source C++ class flags8
   * @customConstructor flags8
   * @group xr_flags
   *
   * @remarks
   * Use `zero()`, `one()`, or `assign()` when you need an explicit initial state.
   */
  export class flags8 {
    /**
     * Create a flag mask.
     */
    public constructor();

    /**
     * Replace this mask with `source & mask`.
     *
     * @param source - Source mask.
     * @param mask - Bits to keep.
     * @returns This mask.
     */
    public and(source: flags8, mask: u8): flags8;

    /**
     * Apply bitwise AND to this mask.
     *
     * @param mask - Bits to keep.
     * @returns This mask.
     */
    public and(mask: u8): flags8;

    /**
     * Copy another flag mask.
     *
     * @param value - Source mask.
     * @returns This mask.
     */
    public assign(value: flags8): flags8;

    /**
     * Replace this mask with a raw value.
     *
     * @param value - Raw mask value.
     * @returns This mask.
     */
    public assign(value: u8): flags8;

    /**
     * Compare this mask with another mask.
     *
     * @param value - Mask to compare.
     * @returns Whether masks are equal.
     */
    public equal(value: Readonly<flags8>): boolean;

    /**
     * Compare selected bits with another mask.
     *
     * @param value - Mask to compare.
     * @param mask - Bits to compare.
     * @returns Whether selected bits are equal.
     */
    public equal(value: Readonly<flags8>, mask: u8): boolean;

    /**
     * Get raw mask value.
     *
     * @returns Raw mask value.
     */
    public get(): u8;

    /**
     * Invert all bits in this mask.
     *
     * @returns This mask.
     */
    public invert(): flags8;

    /**
     * Replace this mask with inverted source mask.
     *
     * @param value - Source mask.
     * @returns This mask.
     */
    public invert(value: flags8): flags8;

    /**
     * Toggle selected bits in this mask.
     *
     * @param value - Bits to toggle.
     * @returns This mask.
     */
    public invert(value: u8): flags8;

    /**
     * Check whether all selected bits are set in a source mask.
     *
     * @remarks
     * This is stricter than `is_any()` and `test()`: every bit from `mask` must be present.
     *
     * @param value - Source mask.
     * @param mask - Bits to test.
     * @returns Whether all bits are set.
     */
    public is(value: flags8, mask: u8): boolean;

    /**
     * Check whether all selected bits are set in this mask.
     *
     * @remarks
     * This is stricter than `is_any()` and `test()`: every bit from `mask` must be present.
     *
     * @param mask - Bits to test.
     * @returns Whether all bits are set.
     */
    public is(mask: u8): boolean;

    /**
     * Check whether any selected bit is set in a source mask.
     *
     * @remarks
     * Use this for overlap checks. For an all-bits check, use `is()`.
     *
     * @param value - Source mask.
     * @param mask - Bits to test.
     * @returns Whether any bit is set.
     */
    public is_any(value: flags8, mask: u8): boolean;

    /**
     * Check whether any selected bit is set in this mask.
     *
     * @remarks
     * Use this for overlap checks. For an all-bits check, use `is()`.
     *
     * @param mask - Bits to test.
     * @returns Whether any bit is set.
     */
    public is_any(mask: u8): boolean;

    /**
     * Set all bits.
     *
     * @remarks
     * Sets all 8 bits to `1`.
     *
     * @returns This mask.
     */
    public one(): flags8;

    /**
     * Replace this mask with `source | mask`.
     *
     * @param source - Source mask.
     * @param mask - Bits to set.
     * @returns This mask.
     */
    public or(source: flags8, mask: u8): flags8;

    /**
     * Apply bitwise OR to this mask.
     *
     * @param mask - Bits to set.
     * @returns This mask.
     */
    public or(mask: u8): flags8;

    /**
     * Set or clear selected bits.
     *
     * @param mask - Bits to update.
     * @param enabled - Whether bits should be set.
     * @returns This mask.
     */
    public set(mask: u8, enabled: boolean): flags8;

    /**
     * Test whether any selected bit is set.
     *
     * @remarks
     * Equivalent to `is_any(mask)`.
     *
     * @param mask - Bits to test.
     * @returns Whether any selected bit is set.
     */
    public test(mask: u8): boolean;

    /**
     * Clear all bits.
     *
     * @returns This mask.
     */
    public zero(): flags8;
  }

  /**
   * Mutable 16-bit flag mask.
   *
   * @source C++ class flags16
   * @customConstructor flags16
   * @group xr_flags
   *
   * @remarks
   * Use `zero()`, `one()`, or `assign()` when you need an explicit initial state.
   */
  export class flags16 {
    /**
     * Create a flag mask.
     */
    public constructor();

    /**
     * Replace this mask with `source & mask`.
     *
     * @param source - Source mask.
     * @param mask - Bits to keep.
     * @returns This mask.
     */
    public and(source: flags16, mask: u16): flags16;

    /**
     * Apply bitwise AND to this mask.
     *
     * @param mask - Bits to keep.
     * @returns This mask.
     */
    public and(mask: u16): flags16;

    /**
     * Copy another flag mask.
     *
     * @param value - Source mask.
     * @returns This mask.
     */
    public assign(value: flags16): flags16;

    /**
     * Replace this mask with a raw value.
     *
     * @param value - Raw mask value.
     * @returns This mask.
     */
    public assign(value: u16): flags16;

    /**
     * Compare this mask with another mask.
     *
     * @param value - Mask to compare.
     * @returns Whether masks are equal.
     */
    public equal(value: Readonly<flags16>): boolean;

    /**
     * Compare selected bits with another mask.
     *
     * @param value - Mask to compare.
     * @param mask - Bits to compare.
     * @returns Whether selected bits are equal.
     */
    public equal(value: Readonly<flags16>, mask: u16): boolean;

    /**
     * Get raw mask value.
     *
     * @returns Raw mask value.
     */
    public get(): u16;

    /**
     * Invert all bits in this mask.
     *
     * @returns This mask.
     */
    public invert(): flags16;

    /**
     * Replace this mask with inverted source mask.
     *
     * @param value - Source mask.
     * @returns This mask.
     */
    public invert(value: flags16): flags16;

    /**
     * Toggle selected bits in this mask.
     *
     * @param value - Bits to toggle.
     * @returns This mask.
     */
    public invert(value: u16): flags16;

    /**
     * Check whether all selected bits are set in a source mask.
     *
     * @remarks
     * This is stricter than `is_any()` and `test()`: every bit from `mask` must be present.
     *
     * @param value - Source mask.
     * @param mask - Bits to test.
     * @returns Whether all bits are set.
     */
    public is(value: flags16, mask: u16): boolean;

    /**
     * Check whether all selected bits are set in this mask.
     *
     * @remarks
     * This is stricter than `is_any()` and `test()`: every bit from `mask` must be present.
     *
     * @param mask - Bits to test.
     * @returns Whether all bits are set.
     */
    public is(mask: u16): boolean;

    /**
     * Check whether any selected bit is set in a source mask.
     *
     * @remarks
     * Use this for overlap checks. For an all-bits check, use `is()`.
     *
     * @param value - Source mask.
     * @param mask - Bits to test.
     * @returns Whether any bit is set.
     */
    public is_any(value: flags16, mask: u16): boolean;

    /**
     * Check whether any selected bit is set in this mask.
     *
     * @remarks
     * Use this for overlap checks. For an all-bits check, use `is()`.
     *
     * @param mask - Bits to test.
     * @returns Whether any bit is set.
     */
    public is_any(mask: u16): boolean;

    /**
     * Set all bits.
     *
     * @remarks
     * Sets all 16 bits to `1`.
     *
     * @returns This mask.
     */
    public one(): flags16;

    /**
     * Replace this mask with `source | mask`.
     *
     * @param source - Source mask.
     * @param mask - Bits to set.
     * @returns This mask.
     */
    public or(source: flags16, mask: u16): flags16;

    /**
     * Apply bitwise OR to this mask.
     *
     * @param mask - Bits to set.
     * @returns This mask.
     */
    public or(mask: u16): flags16;

    /**
     * Set or clear selected bits.
     *
     * @param mask - Bits to update.
     * @param enabled - Whether bits should be set.
     * @returns This mask.
     */
    public set(mask: u16, enabled: boolean): flags16;

    /**
     * Test whether any selected bit is set.
     *
     * @remarks
     * Equivalent to `is_any(mask)`.
     *
     * @param mask - Bits to test.
     * @returns Whether any selected bit is set.
     */
    public test(mask: u16): boolean;

    /**
     * Clear all bits.
     *
     * @returns This mask.
     */
    public zero(): flags16;
  }

  /**
   * Mutable 32-bit flag mask.
   *
   * @source C++ class flags32
   * @customConstructor flags32
   * @group xr_flags
   *
   * @remarks
   * Use `zero()`, `one()`, or `assign()` when you need an explicit initial state.
   */
  export class flags32 {
    /**
     * Create a flag mask.
     */
    public constructor();

    /**
     * Replace this mask with `source & mask`.
     *
     * @param source - Source mask.
     * @param mask - Bits to keep.
     * @returns This mask.
     */
    public and(source: flags32, mask: u32): flags32;

    /**
     * Apply bitwise AND to this mask.
     *
     * @param mask - Bits to keep.
     * @returns This mask.
     */
    public and(mask: u32): flags32;

    /**
     * Copy another flag mask.
     *
     * @param value - Source mask.
     * @returns This mask.
     */
    public assign(value: flags32): flags32;

    /**
     * Replace this mask with a raw value.
     *
     * @param value - Raw mask value.
     * @returns This mask.
     */
    public assign(value: u32): flags32;

    /**
     * Compare this mask with another mask.
     *
     * @param value - Mask to compare.
     * @returns Whether masks are equal.
     */
    public equal(value: Readonly<flags32>): boolean;

    /**
     * Compare selected bits with another mask.
     *
     * @param value - Mask to compare.
     * @param mask - Bits to compare.
     * @returns Whether selected bits are equal.
     */
    public equal(value: Readonly<flags32>, mask: u32): boolean;

    /**
     * Get raw mask value.
     *
     * @returns Raw mask value.
     */
    public get(): u32;

    /**
     * Invert all bits in this mask.
     *
     * @returns This mask.
     */
    public invert(): flags32;

    /**
     * Replace this mask with inverted source mask.
     *
     * @param value - Source mask.
     * @returns This mask.
     */
    public invert(value: flags32): flags32;

    /**
     * Toggle selected bits in this mask.
     *
     * @param value - Bits to toggle.
     * @returns This mask.
     */
    public invert(value: u32): flags32;

    /**
     * Check whether all selected bits are set in a source mask.
     *
     * @remarks
     * This is stricter than `is_any()` and `test()`: every bit from `mask` must be present.
     *
     * @param value - Source mask.
     * @param mask - Bits to test.
     * @returns Whether all bits are set.
     */
    public is(value: flags32, mask: u32): boolean;

    /**
     * Check whether all selected bits are set in this mask.
     *
     * @remarks
     * This is stricter than `is_any()` and `test()`: every bit from `mask` must be present.
     *
     * @param mask - Bits to test.
     * @returns Whether all bits are set.
     */
    public is(mask: u32): boolean;

    /**
     * Check whether any selected bit is set in a source mask.
     *
     * @remarks
     * Use this for overlap checks. For an all-bits check, use `is()`.
     *
     * @param value - Source mask.
     * @param mask - Bits to test.
     * @returns Whether any bit is set.
     */
    public is_any(value: flags32, mask: u32): boolean;

    /**
     * Check whether any selected bit is set in this mask.
     *
     * @remarks
     * Use this for overlap checks. For an all-bits check, use `is()`.
     *
     * @param mask - Bits to test.
     * @returns Whether any bit is set.
     */
    public is_any(mask: u32): boolean;

    /**
     * Set all bits.
     *
     * @remarks
     * Sets all 32 bits to `1`.
     *
     * @returns This mask.
     */
    public one(): flags32;

    /**
     * Replace this mask with `source | mask`.
     *
     * @param source - Source mask.
     * @param mask - Bits to set.
     * @returns This mask.
     */
    public or(source: flags32, mask: u32): flags32;

    /**
     * Apply bitwise OR to this mask.
     *
     * @param mask - Bits to set.
     * @returns This mask.
     */
    public or(mask: u32): flags32;

    /**
     * Set or clear selected bits.
     *
     * @param mask - Bits to update.
     * @param enabled - Whether bits should be set.
     * @returns This mask.
     */
    public set(mask: u32, enabled: boolean): flags32;

    /**
     * Test whether any selected bit is set.
     *
     * @remarks
     * Equivalent to `is_any(mask)`.
     *
     * @param mask - Bits to test.
     * @returns Whether any selected bit is set.
     */
    public test(mask: u32): boolean;

    /**
     * Clear all bits.
     *
     * @returns This mask.
     */
    public zero(): flags32;
  }
}
