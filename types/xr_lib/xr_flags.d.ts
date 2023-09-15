declare module "xray16" {
  /**
   * @source C++ class flags8
   * @customConstructor flags8
   * @group xr_flags
   */
  export class flags8 {
    public constructor();

    public and(value1: flags8, value2: u8): flags8;

    public and(value: u8): flags8;

    public assign(value: flags8): flags8;

    public assign(value: u8): flags8;

    public equal(value2: Readonly<flags8>): boolean;

    public equal(value2: Readonly<flags8>, value3: u8): boolean;

    public get(): u8;

    public invert(): flags8;

    public invert(value: flags8): flags8;

    public invert(value: u8): flags8;

    public is(value: flags8, value2: u8): boolean;

    public is(value: u8): boolean;

    public is_any(value1: flags8, value2: u8): boolean;

    public is_any(value: u8): boolean;

    public one(): flags8;

    public or(value: flags8, value2: u8): flags8;

    public or(value: u8): flags8;

    public set(value: u8, value2: boolean): flags8;

    public test(value: u8): boolean;

    public zero(): flags8;
  }

  /**
   * @source C++ class flags16
   * @customConstructor flags16
   * @group xr_flags
   */
  export class flags16 {
    public constructor();

    public and(value1: flags16, value2: u16): flags16;

    public and(value: u16): flags16;

    public assign(value: flags16): flags16;

    public assign(value: u16): flags16;

    public equal(value2: Readonly<flags16>): boolean;

    public equal(value2: Readonly<flags16>, value3: u16): boolean;

    public get(): u16;

    public invert(): flags16;

    public invert(value: flags16): flags16;

    public invert(value: u16): flags16;

    public is(value: flags16, value2: u16): boolean;

    public is(value: u16): boolean;

    public is_any(value1: flags16, value2: u16): boolean;

    public is_any(value: u16): boolean;

    public one(): flags16;

    public or(value: flags16, value2: u16): flags16;

    public or(value: u16): flags16;

    public set(value: u16, value2: boolean): flags16;

    public test(value: u16): boolean;

    public zero(): flags16;
  }

  /**
   * @source C++ class flags32
   * @customConstructor flags32
   * @group xr_flags
   */
  export class flags32 {
    public constructor();

    public and(value1: flags32, value2: u32): flags32;

    public and(value: u32): flags32;

    public assign(value: flags32): flags32;

    public assign(value: u32): flags32;

    public equal(value2: Readonly<flags32>): boolean;

    public equal(value2: Readonly<flags32>, value3: u32): boolean;

    public get(): u32;

    public invert(): flags32;

    public invert(value: flags32): flags32;

    public invert(value: u32): flags32;

    public is(value: flags32, value2: u32): boolean;

    public is(value: u32): boolean;

    public is_any(value1: flags32, value2: u32): boolean;

    public is_any(value: u32): boolean;

    public one(): flags32;

    public or(value: flags32, value2: u32): flags32;

    public or(value: u32): flags32;

    public set(value: u32, value2: boolean): flags32;

    public test(value: u32): boolean;

    public zero(): flags32;
  }
}
