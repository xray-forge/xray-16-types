/**
 * List of types that are all cast to similar number type in lua / ts.
 * Main purpose is to indicate what is used with C++ side for better documentation.
 */
declare module "xray16" {
  /**
   * @group xr_type
   */
  type i8 = number;

  /**
   * @group xr_type
   */
  type u8 = number;

  /**
   * @group xr_type
   */
  type i16 = number;

  /**
   * @group xr_type
   */
  type u16 = number;

  /**
   * @group xr_type
   */
  type f32 = number;

  /**
   * @group xr_type
   */
  type i32 = number;

  /**
   * @group xr_type
   */
  type u32 = number;

  /**
   * @group xr_type
   */
  type f64 = number;

  /**
   * @group xr_type
   */
  type i64 = number;

  /**
   * @group xr_type
   */
  type u64 = number;

  /**
   * @group xr_type
   */
  type Maybe<T> = T | null | undefined;

  /**
   * @group xr_type
   */
  type EnumeratedStaticsKeys<T> = Exclude<keyof T, "constructor" | TEngineBindingStaticMethods>;

  /**
   * @group xr_type
   */
  type EnumeratedStaticsValues<T> = T[Exclude<keyof T, "constructor" | TEngineBindingStaticMethods>];
}
