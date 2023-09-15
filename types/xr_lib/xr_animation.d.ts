declare module "xray16" {
  /**
   * @source C++ class duality
   * @customConstructor duality
   * @group xr_animation
   */
  export class duality {
    public v: f32;
    public h: f32;

    public constructor();
    public constructor(v: f32, h: f32);

    public set(v: f32, h: f32): duality;
  }

  /**
   * @source C++ class noise
   * @customConstructor noise
   * @group xr_animation
   */
  export class noise {
    public fps: f32;
    public grain: f32;
    public intensity: f32;

    public constructor();
    public constructor(fps: f32, grain: f32, intensity: f32);

    public set(fps: f32, grain: f32, intensity: f32): noise;
  }

  /**
   * @source C++ class effector
   * @customConstructor effector
   * @group xr_animation
   */
  export class effector extends EngineBinding {
    public constructor(int: i32, float: f32);

    public start(): void;

    public process(effector_params: effector_params): boolean;

    public finish(): void;
  }

  /**
   * @source C++ class effector_params
   * @customConstructor effector_params
   * @group xr_animation
   */
  export class effector_params extends EngineBinding {
    public color_add: color;
    public color_base: color;
    public color_gray: color;
    public dual: duality;
    public blur: f32;
    public gray: f32;
    public noise: noise;

    public constructor();

    public assign(effector_params: effector_params): void;
  }

  /**
   * @source C++ class color_animator
   * @customConstructor color_animator
   * @group xr_animation
   */
  export class color_animator extends EngineBinding {
    public constructor(value: string);

    public length(): u32;

    public load(value: string): void;

    public calculate(value: f32): fcolor;
  }
}
