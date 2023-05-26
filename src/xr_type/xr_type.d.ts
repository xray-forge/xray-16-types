/**
 * List of types that are all cast to similar number type in lua / ts.
 * Main purpose is to indicate what is used with C++ side for better documentation.
 */
declare module "xray16" {
  /**
   * @group xr_types
   */
  type i8 = number;

  /**
   * @group xr_types
   */
  type u8 = number;

  /**
   * @group xr_types
   */
  type i16 = number;

  /**
   * @group xr_types
   */
  type u16 = number;

  /**
   * @group xr_types
   */
  type f32 = number;

  /**
   * @group xr_types
   */
  type i32 = number;

  /**
   * @group xr_types
   */
  type u32 = number;

  /**
   * @group xr_types
   */
  type f64 = number;

  /**
   * @group xr_types
   */
  type i64 = number;

  /**
   * @group xr_types
   */
  type u64 = number;

  /**
   * @group xr_types
   */
  type Maybe<T> = T | null | undefined;

  /**
   * @group xr_types
   */
  type EnumeratedStaticsKeys<T> = Exclude<keyof T, "constructor" | TEngineBindingStaticMethods>;

  /**
   * @group xr_types
   */
  type EnumeratedStaticsValues<T> = T[Exclude<keyof T, "constructor" | TEngineBindingStaticMethods>];
}
