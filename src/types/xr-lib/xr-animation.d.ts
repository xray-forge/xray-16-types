declare module "xray16" {
  /**
   * Post-process double-vision offsets.
   *
   * @source C++ class duality
   * @customConstructor duality
   * @group xr_animation
   *
   * @remarks
   * These values are accumulated when several post-process effectors are active.
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
     * @param h - Horizontal duality amount.
     * @param v - Vertical duality amount.
     */
    public constructor(h: f32, v: f32);

    /**
     * Set both duality values.
     *
     * @param h - Horizontal duality amount.
     * @param v - Vertical duality amount.
     * @returns This object for chained setup.
     */
    public set(h: f32, v: f32): duality;
  }

  /**
   * Post-process noise settings.
   *
   * @source C++ class noise
   * @customConstructor noise
   * @group xr_animation
   *
   * @remarks
   * Combined effectors keep the maximum intensity, grain, and FPS values.
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
     * Create default noise settings.
     *
     * @remarks
     * Defaults are intensity 0, grain 1, and 10 FPS.
     */
    public constructor();

    /**
     * Create noise settings with all values.
     *
     * @param intensity - Noise intensity.
     * @param grain - Noise grain size.
     * @param fps - Noise frame rate.
     */
    public constructor(intensity: f32, grain: f32, fps: f32);

    /**
     * Set all noise values.
     *
     * @param intensity - Noise intensity.
     * @param grain - Noise grain size.
     * @param fps - Noise frame rate.
     * @returns This object for chained setup.
     */
    public set(intensity: f32, grain: f32, fps: f32): noise;
  }

  /**
   * Script-controlled post-process effector.
   *
   * @source C++ class effector
   * @customConstructor effector
   * @group xr_animation
   *
   * @remarks
   * Subclass it from script and override {@link process}. The effector is tied to the actor camera stack.
   */
  export class effector extends EngineBinding {
    /**
     * @remarks
     * Use a stable custom type id. {@link finish} removes the active effector by this type.
     *
     * @param type - Unique post-process effector type id.
     * @param time - Effector lifetime in seconds.
     */
    public constructor(type: i32, time: f32);

    /**
     * Add the effector to the actor camera stack.
     *
     * @remarks
     * Requires an active actor. This is intended for in-game actor post-processing, not menu/editor code.
     */
    public start(): void;

    /**
     * Update post-process parameters for the current frame.
     *
     * @remarks
     * Override this in script. Mutate `params` for the current frame and return `false` to stop the effector.
     *
     * @param params - Mutable post-process parameters.
     * @returns Whether the effector should continue running.
     */
    public process(params: effector_params): boolean;

    /**
     * Remove the effector from the actor camera stack.
     *
     * @remarks
     * Removes by effector type, so sharing a type id with another active effector can remove the wrong effect.
     */
    public finish(): void;
  }

  /**
   * Mutable post-process state passed to effectors.
   *
   * @source C++ class effector_params
   * @customConstructor effector_params
   * @group xr_animation
   *
   * @remarks
   * Defaults match the neutral post-process state: no blur, gray, duality, or noise intensity.
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
     * @remarks
     * Copies the current values. Later changes to `params` are not linked back to this object.
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
   *
   * @remarks
   * Animations are looked up in the loaded light-animation library (`lanims.xr`).
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
     * @remarks
     * The native binding asserts when the animation name is missing or unknown.
     *
     * @param name - Color animation name.
     */
    public load(name: string): void;

    /**
     * Sample the animation.
     *
     * @remarks
     * Time wraps over the animation length.
     *
     * @param time - Animation time in seconds.
     * @returns Color at the requested time.
     */
    public calculate(time: f32): fcolor;
  }
}
