declare module "xray16" {
  /**
   * @source C++ class fcolor
   * @customConstructor fcolor
   * @group xr_color
   */
  export class fcolor extends EngineBinding {
    public a: f32;
    public b: f32;
    public g: f32;
    public r: f32;

    public set(a: f32, b: f32, c: f32, d: f32): fcolor;

    public set(it: fcolor): fcolor;

    public set(value: u32): fcolor;
  }

  /**
   * @source C++ class color
   * @customConstructor color
   * @group xr_color
   */
  export class color {
    public b: f32;
    public g: f32;
    public r: f32;

    public constructor();
    public constructor(r: f32, g: f32, b: f32);

    public set(r: f32, g: f32, b: f32): void;
  }
}
