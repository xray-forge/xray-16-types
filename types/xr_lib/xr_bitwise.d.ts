declare module "xray16" {
  /**
   * @group xr_bitwise
   */
  export function bit_and(this: void, left: i32, right: i32): i32;

  /**
   * @group xr_bitwise
   */
  export function bit_or(this: void, first: i32, second: i32): i32;

  /**
   * @group xr_bitwise
   */
  export function bit_not(this: void, value: i32): i32;

  /**
   * @group xr_bitwise
   */
  export function bit_xor(this: void, left: i32, right: i32): i32;
}
