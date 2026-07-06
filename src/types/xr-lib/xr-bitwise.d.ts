declare module "xray16" {
  /**
   * Apply bitwise AND to two signed integers.
   *
   * @group xr_bitwise
   *
   * @param left - Left operand.
   * @param right - Right operand.
   * @returns Result of `left & right`.
   */
  export function bit_and(this: void, left: i32, right: i32): i32;

  /**
   * Apply bitwise OR to two signed integers.
   *
   * @group xr_bitwise
   *
   * @param left - Left operand.
   * @param right - Right operand.
   * @returns Result of `left | right`.
   */
  export function bit_or(this: void, left: i32, right: i32): i32;

  /**
   * Invert all bits in a signed integer.
   *
   * @group xr_bitwise
   *
   * @param value - Value to invert.
   * @returns Result of `~value`.
   */
  export function bit_not(this: void, value: i32): i32;

  /**
   * Apply bitwise XOR to two signed integers.
   *
   * @group xr_bitwise
   *
   * @param left - Left operand.
   * @param right - Right operand.
   * @returns Result of `left ^ right`.
   */
  export function bit_xor(this: void, left: i32, right: i32): i32;
}
