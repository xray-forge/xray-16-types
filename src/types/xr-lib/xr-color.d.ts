declare module "xray16" {
  /**
   * Mutable RGBA color with float components.
   *
   * Components are exposed as `r`, `g`, `b`, and `a`.
   *
   * @source C++ class fcolor
   * @customConstructor fcolor
   * @group xr_color
   *
   * @remarks
   * Float components are normally used in the `0..1` range. `set()` mutates this color and returns it.
   */
  export class fcolor extends EngineBinding {
    /**
     * Alpha component.
     */
    public a: f32;

    /**
     * Blue component.
     */
    public b: f32;

    /**
     * Green component.
     */
    public g: f32;

    /**
     * Red component.
     */
    public r: f32;

    /**
     * Create an empty color.
     *
     * @remarks
     * Call `set()` before reading components when you need a known value.
     */
    public constructor();

    /**
     * Set RGBA components.
     *
     * @param r - Red component.
     * @param g - Green component.
     * @param b - Blue component.
     * @param a - Alpha component.
     * @returns This color.
     */
    public set(r: f32, g: f32, b: f32, a: f32): fcolor;

    /**
     * Copy another float color.
     *
     * @param color - Source color.
     * @returns This color.
     */
    public set(color: fcolor): fcolor;

    /**
     * Decode packed ARGB color into float components.
     *
     * @remarks
     * Channels are decoded from 8-bit ARGB into normalized float components.
     *
     * @param value - Packed ARGB value.
     * @returns This color.
     */
    public set(value: u32): fcolor;
  }

  /**
   * Mutable RGB color with float components.
   *
   * @source C++ class color
   * @customConstructor color
   * @group xr_color
   *
   * @remarks
   * This is the postprocess RGB color helper used by effector parameters. It has no alpha channel.
   */
  export class color {
    /**
     * Blue component.
     */
    public b: f32;

    /**
     * Green component.
     */
    public g: f32;

    /**
     * Red component.
     */
    public r: f32;

    /**
     * Create a black color.
     *
     * @remarks
     * Use the RGB constructor or `set()` when you need explicit component values.
     */
    public constructor();

    /**
     * Create color from RGB components.
     *
     * @param r - Red component.
     * @param g - Green component.
     * @param b - Blue component.
     */
    public constructor(r: f32, g: f32, b: f32);

    /**
     * Set RGB components.
     *
     * @param r - Red component.
     * @param g - Green component.
     * @param b - Blue component.
     */
    public set(r: f32, g: f32, b: f32): void;
  }

  /**
   * Pack alpha, red, green, and blue channels into an engine color value.
   *
   * @group xr_color
   *
   * @remarks
   * Channels are packed as 8-bit ARGB. Values outside `0..255` keep only their low 8 bits.
   *
   * @param a - Alpha channel.
   * @param r - Red channel.
   * @param g - Green channel.
   * @param b - Blue channel.
   * @returns Packed ARGB color.
   */
  export function GetARGB(this: void, a: u16, r: u16, g: u16, b: u16): i32;
}
