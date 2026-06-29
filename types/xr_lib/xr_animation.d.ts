declare module "xray16" {
  /**
   * Post-process double-vision offsets.
   *
   * @source C++ class duality
   * @customConstructor duality
   * @group xr_animation
   */
  export class duality {
    /**
     * Vertical duality amount.
     */
    public v: f32;

    /**
     * Horizontal duality amount.
     */
    public h: f32;

    /**
     * Create zeroed duality settings.
     */
    public constructor();

    /**
     * Create duality settings with both offsets.
     *
     * @param v - Vertical duality amount.
     * @param h - Horizontal duality amount.
     */
    public constructor(v: f32, h: f32);

    /**
     * Set both duality values.
     *
     * @param v - Vertical duality amount.
     * @param h - Horizontal duality amount.
     * @returns This object for chained setup.
     */
    public set(v: f32, h: f32): duality;
  }

  /**
   * Post-process noise settings.
   *
   * @source C++ class noise
   * @customConstructor noise
   * @group xr_animation
   */
  export class noise {
    /**
     * Noise frame rate.
     */
    public fps: f32;

    /**
     * Noise grain size.
     */
    public grain: f32;

    /**
     * Noise intensity.
     */
    public intensity: f32;

    /**
     * Create zeroed noise settings.
     */
    public constructor();

    /**
     * Create noise settings with all values.
     *
     * @param fps - Noise frame rate.
     * @param grain - Noise grain size.
     * @param intensity - Noise intensity.
     */
    public constructor(fps: f32, grain: f32, intensity: f32);

    /**
     * Set all noise values.
     *
     * @param fps - Noise frame rate.
     * @param grain - Noise grain size.
     * @param intensity - Noise intensity.
     * @returns This object for chained setup.
     */
    public set(fps: f32, grain: f32, intensity: f32): noise;
  }

  /**
   * Script-controlled post-process effector.
   *
   * @source C++ class effector
   * @customConstructor effector
   * @group xr_animation
   */
  export class effector extends EngineBinding {
    /**
     * @param type - Unique post-process effector type id.
     * @param time - Effector lifetime in seconds.
     */
    public constructor(type: i32, time: f32);

    /**
     * Add the effector to the actor camera stack.
     */
    public start(): void;

    /**
     * Update post-process parameters for the current frame.
     *
     * @param params - Mutable post-process parameters.
     * @returns Whether the effector should continue running.
     */
    public process(params: effector_params): boolean;

    /**
     * Remove the effector from the actor camera stack.
     */
    public finish(): void;
  }

  /**
   * Mutable post-process state passed to effectors.
   *
   * @source C++ class effector_params
   * @customConstructor effector_params
   * @group xr_animation
   */
  export class effector_params extends EngineBinding {
    /**
     * Additive color applied over the frame.
     */
    public color_add: color;

    /**
     * Base color tint.
     */
    public color_base: color;

    /**
     * Grayscale color tint.
     */
    public color_gray: color;

    /**
     * Double-vision settings.
     */
    public dual: duality;

    /**
     * Blur amount.
     */
    public blur: f32;

    /**
     * Grayscale amount.
     */
    public gray: f32;

    /**
     * Noise settings.
     */
    public noise: noise;

    /**
     * Create default post-process parameters.
     */
    public constructor();

    /**
     * Copy all post-process values from another params object.
     *
     * @param params - Source values.
     */
    public assign(params: effector_params): void;
  }

  /**
   * Evaluate a color animation by time.
   *
   * @source C++ class color_animator
   * @customConstructor color_animator
   * @group xr_animation
   */
  export class color_animator extends EngineBinding {
    /**
     * @param name - Color animation name.
     */
    public constructor(name: string);

    /**
     * @returns Animation length in milliseconds.
     */
    public length(): u32;

    /**
     * Load another color animation.
     *
     * @param name - Color animation name.
     */
    public load(name: string): void;

    /**
     * Sample the animation.
     *
     * @param time - Animation time.
     * @returns Color at the requested time.
     */
    public calculate(time: f32): fcolor;
  }
}
