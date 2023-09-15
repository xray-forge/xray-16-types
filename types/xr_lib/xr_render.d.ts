declare module "xray16" {
  /**
   * @source C++ class render_device
   * @customConstructor render_device
   * @group xr_core
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

}
