declare module "xray16" {
  /**
   * @source C++ class render_device
   * @customConstructor render_device
   * @group xr_render
   */
  export class render_device {
    private constructor();

    public readonly cam_dir: vector;
    public readonly cam_pos: vector;
    public readonly cam_right: vector;
    public readonly cam_top: vector;
    public readonly aspect_ratio: f32;
    public readonly fov: f32;
    public readonly precache_frame: u32;
    public readonly frame: u32;
    public readonly height: u32;
    public readonly time_delta: u32;
    public readonly f_time_delta: f32;
    public readonly width: u32;

    /**
     * Get current game timestamp.
     *
     * @example `29319`,`46297`
     * @returns milliseconds from game start
     */
    public time_global(): u32;

    /**
     * @returns whether game is paused
     */
    public is_paused(): boolean;

    /**
     * Change game pause state.
     *
     * @param paused - whether game should be paused
     */
    public pause(paused: boolean): void;
  }

  /**
   * @group xr_render
   */
  export function device(this: void): render_device;

  /**
   * @group xr_render
   */
  export function app_ready(this: void): boolean;

  /**
   * @group xr_render
   */
  export function xrRender_test_r2_hw(this: void): boolean;

  /**
   * @group xr_render
   */
  export function render_get_dx_level(this: void): number;

  /**
   * @group xr_global_declaration
   * @returns whether renderer setting can be changed
   */
  export function renderer_allow_override(this: void): boolean;

}
