declare module "xray16" {
  /**
   * @source C++ class token
   * @customConstructor token
   * @group xr_properties
   */
  export class token {
    public id: i32;
    public name: string;

    private constructor();
  }

  /**
   * @source C++ class rtoken_list
   * @customConstructor rtoken_list
   * @group xr_properties
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
   * @group xr_properties
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
   * @source C++ class properties_list_helper
   * @customConstructor properties_list_helper
   * @group xr_properties
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
   * @group xr_properties
   */
  export class properties_helper extends properties_list_helper {}

  /**
   * @source C++ class prop_value
   * @customConstructor prop_value
   * @group xr_properties
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
   * @group xr_properties
   */
  export class TEX_INFO {
    public get_rect(): Frect;

    public get_file_name(): string;
  }
}
