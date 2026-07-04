declare module "xray16" {
  /**
   * Current render device state.
   *
   * @source C++ class render_device
   * @customConstructor render_device
   * @group xr_render
   *
   * @remarks
   * Values are snapshots of the global engine `Device` for the current frame.
   */
  export class render_device {
    /**
     * Engine-owned render device state.
     */
    private constructor();

    /**
     * Camera forward direction.
     */
    public readonly cam_dir: vector;

    /**
     * Camera world position.
     */
    public readonly cam_pos: vector;

    /**
     * Camera right direction.
     */
    public readonly cam_right: vector;

    /**
     * Camera up direction.
     */
    public readonly cam_top: vector;

    /**
     * Current viewport aspect ratio.
     */
    public readonly aspect_ratio: f32;

    /**
     * Current field of view.
     */
    public readonly fov: f32;

    /**
     * Remaining precache frame count.
     */
    public readonly precache_frame: u32;

    /**
     * Current render frame number.
     */
    public readonly frame: u32;

    /**
     * Backbuffer height in pixels.
     */
    public readonly height: u32;

    /**
     * Last frame time delta in milliseconds.
     *
     * @remarks
     * This value is `0` while the game timer is paused.
     */
    public readonly time_delta: u32;

    /**
     * Last frame time delta in seconds.
     *
     * @remarks
     * This value is `0` while the game timer is paused.
     */
    public readonly f_time_delta: f32;

    /**
     * Backbuffer width in pixels.
     */
    public readonly width: u32;

    /**
     * Get current game timestamp.
     *
     * @remarks
     * Reads the frame-updated `Device.dwTimeGlobal` value.
     *
     * @example `29319`, `46297`
     *
     * @returns Milliseconds from game start.
     */
    public time_global(): u32;

    /**
     * Check whether the render device is paused.
     *
     * @returns Whether game rendering is paused.
     */
    public is_paused(): boolean;

    /**
     * Change game pause state.
     *
     * @remarks
     * Pauses the game timer but not sound emitters. Dedicated servers and benchmark mode ignore pause requests.
     *
     * @param paused - Whether the game should be paused.
     */
    public pause(paused: boolean): void;
  }

  /**
   * Get the global render device.
   *
   * @group xr_render
   *
   * @remarks
   * Returns the engine-owned `Device` singleton.
   *
   * @returns Render device.
   */
  export function device(this: void): render_device;

  /**
   * Check whether the game persistent state finished loading.
   *
   * @group xr_render
   *
   * @returns Whether the app is ready for gameplay/render logic.
   */
  export function app_ready(this: void): boolean;

  /**
   * Check whether R2 renderer hardware support is available.
   *
   * @group xr_render
   *
   * @remarks
   * In this binding the hardware test always returns `true`.
   *
   * @returns Whether R2 hardware test passes.
   */
  export function xrRender_test_r2_hw(this: void): boolean;

  /**
   * Get active renderer feature level.
   *
   * @group xr_render
   *
   * @returns Renderer DX level.
   */
  export function render_get_dx_level(this: void): number;

  /**
   * Check whether renderer setting can be changed at runtime.
   *
   * @group xr_global_declaration
   *
   * @remarks
   * Returns `false` after the renderer command is locked by command-line or config processing.
   *
   * @returns Whether renderer setting can be changed.
   */
  export function renderer_allow_override(this: void): boolean;
}
