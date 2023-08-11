declare module "xray16" {
  /**
   * @source C++ class fcolor
   * @customConstructor fcolor
   * @group xr_utils
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
   * @source C++ class flags8
   * @customConstructor flags8
   * @group xr_utils
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
   * @group xr_utils
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
   * @group xr_utils
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

  /**
   * @source C++ class color
   * @customConstructor color
   * @group xr_utils
   */
  export class color {
    public b: f32;
    public g: f32;
    public r: f32;

    public constructor();
    public constructor(r: f32, g: f32, b: f32);

    public set(r: f32, g: f32, b: f32): void;
  }

  /**
   * @source C++ class duality
   * @customConstructor duality
   * @group xr_utils
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
   * @group xr_utils
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
   * @source C++ class object_params
   * @customConstructor object_params
   * @group xr_utils
   */
  export class object_params {
    public level_vertex: u32;
    public position: vector;

    private constructor();
  }

  /**
   * @source C++ class token
   * @customConstructor token
   * @group xr_utils
   */
  export class token {
    public id: i32;
    public name: string;

    private constructor();
  }

  /**
   * @source C++ class rtoken_list
   * @customConstructor rtoken_list
   * @group xr_utils
   */
  export class rtoken_list {
    public constructor();

    public remove(index: u32): void;
    public get(index: u32): string;
    public count(): u32;
    public add(token: string): void;
    public clear(): void;
  }

  /**
   * @source C++ class token_list
   * @customConstructor token_list
   * @group xr_utils
   */
  export class token_list {
    public constructor();

    public remove(token: string): void;
    public id(token: string): i32;
    public name(int: i32): string;
    public add(token: string, index: i32): void;
    public clear(): void;
  }

  /**
   * @source C++ class CGameGraph
   * @customConstructor CGameGraph
   * @group xr_utils
   */
  export class CGameGraph {
    public valid_vertex_id(value: u32): boolean;
    public vertex(vertexId: u32): GameGraph__CVertex;
    public vertex_id(graph: CGameGraph): u16;

    public accessible(value: u32): boolean;
    public accessible(value1: u32, value2: boolean): void;

    public levels(): LuaIterable<cse_abstract>;
  }

  /**
   * @source C++ class act
   * @customConstructor act
   * @group xr_utils
   */
  export class act {
    public static readonly attack: 2;
    public static readonly eat: 1;
    public static readonly panic: 3;
    public static readonly rest: 0;

    public constructor();
    public constructor(EScriptMonsterGlobalAction: number);
    public constructor(EScriptMonsterGlobalAction: number, game_object: game_object);
  }

  /**
   * @source C++ class MonsterHitInfo
   * @customConstructor MonsterHitInfo
   * @group xr_utils
   */
  export class MonsterHitInfo extends EngineBinding {
    private constructor();

    public direction: vector;
    public time: i32;
    public who: game_object;
  }

  /**
   * @source C++ class color_animator
   * @customConstructor color_animator
   * @group xr_utils
   */
  export class color_animator extends EngineBinding {
    public constructor(value: string);

    public length(): u32;
    public load(value: string): void;
    public calculate(value: f32): fcolor;
  }

  /**
   * @source C++ class profile_timer
   * @customConstructor profile_timer
   * @group xr_utils
   */
  export class profile_timer extends EngineBinding {
    public constructor();
    public constructor(profile_timer: profile_timer);

    public stop(): void;
    public start(): void;
    public time(): f32;

    /**
     * Overridden string cast is implemented for profiling timer.
     *
     * @returns serialized profile time.
     */
    public __tostring(): string;
  }

  /**
   * @source C++ class effector
   * @customConstructor effector
   * @group xr_utils
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
   * @group xr_utils
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
   * @source C++ class properties_list_helper
   * @customConstructor properties_list_helper
   * @group xr_utils
   */
  export class properties_list_helper extends EngineBinding {
    public create_vangle(): unknown;
    public create_angle(): unknown;
    public create_time(): unknown;

    public create_color(): unknown;
    public create_vcolor(): unknown;
    public create_fcolor(): unknown;

    public create_list(): unknown;

    public create_token8(): unknown;
    public create_token16(): unknown;
    public create_token32(): unknown;

    public create_flag8(): unknown;
    public create_flag16(): unknown;
    public create_flag32(): unknown;

    public create_vector(): unknown;

    public create_bool(
      items: LuaTable<number>,
      path: string,
      object: cse_abstract,
      value: unknown,
      id: number | string
    ): boolean;

    public create_float(): unknown;

    public create_u8(): unknown;
    public create_u16(): unknown;
    public create_u32(): unknown;
    public create_s32(): unknown;
    public create_s16(): unknown;

    public create_choose(): unknown;
    public create_button(): unknown;
    public create_canvas(): unknown;
    public create_caption(): unknown;

    public float_on_after_edit(): unknown;
    public float_on_before_edit(): unknown;
    public name_after_edit(): unknown;
    public name_before_edit(): unknown;
    public vector_on_before_edit(): unknown;
    public vector_on_after_edit(): unknown;
  }

  /**
   * @source C++ class properties_helper
   * @customConstructor properties_helper
   * @group xr_utils
   */
  export class properties_helper extends properties_list_helper {}

  /**
   * @source C++ class prop_value
   * @customConstructor prop_value
   * @group xr_utils
   */
  export class prop_value {
    public token16_value(): unknown;
    public flag32_value(): unknown;
    public text_value(): unknown;
    public bool_value(): unknown;
    public u16_value(): unknown;
    public s16_value(): unknown;
    public button_value(): unknown;
    public caption_value(): unknown;
  }

  /**
   * @source C++ class TEX_INFO
   * @customConstructor TEX_INFO
   * @group xr_utils
   */
  export class TEX_INFO {
    public get_rect(): Frect;
    public get_file_name(): string;
  }
}
