import type { Nullable } from "../internal";

declare module "xray16" {
  /**
   * Named integer token used by editor property lists.
   *
   * @source C++ class token
   * @customConstructor token
   * @group xr_properties
   */
  export class token {
    /**
     * Numeric value stored for this token.
     */
    public id: i32;

    /**
     * Display name used in editor lists.
     */
    public name: string;

    /**
     * Engine-created token.
     */
    private constructor();
  }

  /**
   * Ordered list of string tokens for runtime-selectable editor values.
   *
   * @source C++ class rtoken_list
   * @customConstructor rtoken_list
   * @group xr_properties
   *
   * @remarks
   * Used by editor property rows that need a list of strings computed at runtime.
   */
  export class rtoken_list {
    /**
     * Create an empty token list.
     */
    public constructor();

    /**
     * Remove token by zero-based index.
     *
     * @remarks
     * Out-of-range indexes are ignored.
     *
     * @param index - Token index.
     */
    public remove(index: u32): void;

    /**
     * Get token text by zero-based index.
     *
     * @param index - Token index.
     * @returns Token text, or `null` from native code when index is out of range.
     */
    public get(index: u32): Nullable<string>;

    /**
     * Get number of tokens in the list.
     *
     * @returns Token count.
     */
    public count(): u32;

    /**
     * Append a token.
     *
     * @param token - Token text.
     */
    public add(token: string): void;

    /**
     * Remove all tokens.
     */
    public clear(): void;
  }

  /**
   * Name-to-id token list for editor dropdown values.
   *
   * @source C++ class token_list
   * @customConstructor token_list
   * @group xr_properties
   *
   * @remarks
   * The native list keeps a trailing sentinel entry for editor APIs; script code only works with named entries.
   */
  export class token_list {
    /**
     * Create an empty token list.
     */
    public constructor();

    /**
     * Remove token by text.
     *
     * @remarks
     * Missing tokens are logged and otherwise ignored.
     *
     * @param token - Token text.
     */
    public remove(token: string): void;

    /**
     * Find numeric id for a token.
     *
     * @remarks
     * The token must exist. Native code verifies the lookup result.
     *
     * @param token - Token text.
     * @returns Token id.
     */
    public id(token: string): i32;

    /**
     * Find token text by numeric id.
     *
     * @remarks
     * The id must exist. Native code verifies the lookup result.
     *
     * @param id - Token id.
     * @returns Token text.
     */
    public name(id: i32): string;

    /**
     * Add a token/id pair.
     *
     * @remarks
     * Both token text and id must be unique in the list.
     *
     * @param token - Token text.
     * @param id - Numeric token id.
     */
    public add(token: string, id: i32): void;

    /**
     * Remove all tokens.
     */
    public clear(): void;
  }

  /**
   * Native editor property item collection.
   *
   * @source C++ class PropItemVec
   * @customConstructor prop_item_vec
   * @group xr_properties
   */
  export class prop_item_vec {
    /**
     * Engine-created property item vector.
     */
    private constructor();
  }

  /**
   * Editor asset chooser mode constants.
   *
   * @source `src/xrServerEntities/script_properties_list_helper_script.cpp`, `choose_type` binding.
   * @customConstructor choose_type
   * @group xr_properties
   */
  export class choose_type {
    public static readonly custom: u32;
    public static readonly sound_source: u32;
    public static readonly sound_environment: u32;
    public static readonly library_object: u32;
    public static readonly engine_shader: u32;
    public static readonly compiler_shader: u32;
    public static readonly particle_effect: u32;
    public static readonly particle_system: u32;
    public static readonly texture: u32;
    public static readonly entity: u32;
    public static readonly spawn_item: u32;
    public static readonly light_animation: u32;
    public static readonly visual: u32;
    public static readonly skeleton_animations: u32;
    public static readonly skeleton_bones: u32;
    public static readonly material: u32;
    public static readonly game_animation: u32;
    public static readonly game_motion: u32;

    /**
     * Engine-owned chooser constants.
     */
    private constructor();
  }

  /**
   * Editor asset chooser mode value.
   *
   * @group xr_properties
   */
  export type TXR_choose_type = EnumeratedStaticsValues<typeof choose_type>;

  /** @group xr_properties */
  export class caption_value extends prop_value {}
  /** @group xr_properties */
  export class canvas_value extends prop_value {}
  /** @group xr_properties */
  export class button_value extends prop_value {}
  /** @group xr_properties */
  export class text_value extends prop_value {}
  /** @group xr_properties */
  export class choose_value extends text_value {}
  /** @group xr_properties */
  export class bool_value extends prop_value {}
  /** @group xr_properties */
  export class vector_value extends prop_value {}
  /** @group xr_properties */
  export class color_value extends prop_value {}
  /** @group xr_properties */
  export class float_value extends prop_value {}
  /** @group xr_properties */
  export class s8_value extends prop_value {}
  /** @group xr_properties */
  export class s16_value extends prop_value {}
  /** @group xr_properties */
  export class s32_value extends prop_value {}
  /** @group xr_properties */
  export class u8_value extends prop_value {}
  /** @group xr_properties */
  export class u16_value extends prop_value {}
  /** @group xr_properties */
  export class u32_value extends prop_value {}
  /** @group xr_properties */
  export class flag8_value extends prop_value {}
  /** @group xr_properties */
  export class flag16_value extends prop_value {}
  /** @group xr_properties */
  export class flag32_value extends prop_value {}
  /** @group xr_properties */
  export class token8_value extends prop_value {}
  /** @group xr_properties */
  export class token16_value extends prop_value {}
  /** @group xr_properties */
  export class token32_value extends prop_value {}
  /** @group xr_properties */
  export class list_value extends text_value {}
  /**
   * Helper for building editor property rows for spawned objects.
   *
   * @source C++ class properties_list_helper
   * @customConstructor properties_list_helper
   * @group xr_properties
   *
   * @remarks
   * This is an editor bridge. Most methods require a real editor property item list and a server object that owns
   * the wrapped field; they are not useful in ordinary gameplay scripts.
   */
  export class properties_list_helper extends EngineBinding {
    /**
     * Create a 3-axis angle property bound to an `Fvector` field.
     */
    public create_vangle(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: f32,
      max?: f32,
      increment?: f32,
      decimals?: i32
    ): vector_value;

    /**
     * Create an angle property bound to a float field.
     */
    public create_angle(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: f32,
      max?: f32,
      increment?: f32,
      decimals?: i32
    ): float_value;

    /**
     * Create a time property bound to a float field.
     */
    public create_time(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: f32,
      max?: f32
    ): float_value;

    /**
     * Create a 32-bit packed color property bound to an unsigned integer field.
     */
    public create_color(items: prop_item_vec, key: string, object: object, name: string): u32_value;

    /**
     * Create a vector color property bound to an `Fvector` field.
     */
    public create_vcolor(items: prop_item_vec, key: string, object: object, name: string): vector_value;

    /**
     * Create a float color property bound to an `Fcolor` field.
     */
    public create_fcolor(items: prop_item_vec, key: string, object: object, name: string): color_value;

    /**
     * Create a runtime token list property bound to a string field.
     */
    public create_list(items: prop_item_vec, key: string, object: object, name: string, tokens: rtoken_list): list_value;

    /**
     * Create token properties bound to integer fields.
     */
    public create_token8(items: prop_item_vec, key: string, object: object, name: string, tokens: token_list): token8_value;
    public create_token16(items: prop_item_vec, key: string, object: object, name: string, tokens: token_list): token16_value;
    public create_token32(items: prop_item_vec, key: string, object: object, name: string, tokens: token_list): token32_value;

    /**
     * Create flag properties bound to integer flag fields.
     */
    public create_flag8(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      mask: u8,
      offCaption?: string,
      onCaption?: string,
      flags?: u32
    ): flag8_value;
    public create_flag16(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      mask: u16,
      offCaption?: string,
      onCaption?: string,
      flags?: u32
    ): flag16_value;
    public create_flag32(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      mask: u32,
      offCaption?: string,
      onCaption?: string,
      flags?: u32
    ): flag32_value;

    /**
     * Create a vector property bound to an `Fvector` field.
     */
    public create_vector(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: f32,
      max?: f32,
      increment?: f32,
      decimals?: i32
    ): vector_value;

    /**
     * Create a boolean property bound to `table[name]` and owned by `object`.
     */
    public create_bool(items: prop_item_vec, key: string, object: object, table: object, name: string): bool_value;

    /**
     * Create numeric properties bound to object fields.
     */
    public create_float(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: f32,
      max?: f32,
      increment?: f32,
      decimals?: i32
    ): float_value;
    public create_u8(items: prop_item_vec, key: string, object: object, name: string, min?: u8, max?: u8, increment?: u8): u8_value;
    public create_u16(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: u16,
      max?: u16,
      increment?: u16
    ): u16_value;
    public create_u32(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: u32,
      max?: u32,
      increment?: u32
    ): u32_value;
    public create_s32(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: i32,
      max?: i32,
      increment?: i32
    ): s32_value;
    public create_s16(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      min?: i16,
      max?: i16,
      increment?: i16
    ): s16_value;

    /**
     * Create an asset/object chooser property bound to a string field.
     */
    public create_choose(
      items: prop_item_vec,
      key: string,
      object: object,
      name: string,
      mode: TXR_choose_type,
      path?: string,
      fillParam?: string,
      subItemCount?: u32
    ): choose_value;

    /**
     * Create editor-only utility rows.
     */
    public create_button(items: prop_item_vec, key: string, value: string, flags: u32): button_value;
    public create_canvas(items: prop_item_vec, key: string, value: string, height: i32): canvas_value;
    public create_caption(items: prop_item_vec, key: string, value: string): caption_value;
    public create_text(items: prop_item_vec, key: string, object: object, name: string): text_value;

    /**
     * Standard editor callbacks used by property rows with luabind out-parameters.
     */
    public float_on_after_edit(sender: prop_value, value: f32): LuaMultiReturn<[boolean, f32]>;
    public float_on_before_edit(sender: prop_value, value: f32): f32;
    public name_after_edit(sender: prop_value, value: string): LuaMultiReturn<[boolean, string]>;
    public name_before_edit(sender: prop_value, value: string): string;
    public vector_on_before_edit(sender: prop_value, value: vector): vector;
    public vector_on_after_edit(sender: prop_value, value: vector): boolean;
  }
  /**
   * Global editor properties helper.
   *
   * @source C++ class properties_helper
   * @customConstructor properties_helper
   * @group xr_properties
   *
   * @remarks
   * Only available when the editor property helper library is loaded. Outside that context the native accessor logs
   * an error and returns no usable helper.
   */
  export class properties_helper extends properties_list_helper {}

  /**
   * Base editor property value wrapper.
   *
   * @source C++ class prop_value
   * @customConstructor prop_value
   * @group xr_properties
   *
   * @remarks
   * These helpers are downcasts to concrete editor property value types. Use only when the property was created as
   * that matching kind.
   */
  export class prop_value {
    /**
     * Treat this property value as a 16-bit token value.
     *
     * @remarks
     * Use only for properties originally created as 16-bit token values.
     *
     * @returns Engine property value handle.
     */
    public token16_value(): token16_value;

    /**
     * Treat this property value as a 32-bit flag value.
     *
     * @remarks
     * Use only for properties originally created as 32-bit flag values.
     *
     * @returns Engine property value handle.
     */
    public flag32_value(): flag32_value;

    /**
     * Treat this property value as text.
     *
     * @remarks
     * Use only for properties originally created as text values.
     *
     * @returns Engine property value handle.
     */
    public text_value(): text_value;

    /**
     * Treat this property value as a boolean.
     *
     * @remarks
     * Use only for properties originally created as boolean values.
     *
     * @returns Engine property value handle.
     */
    public bool_value(): bool_value;

    /**
     * Treat this property value as an unsigned 16-bit integer.
     *
     * @remarks
     * Use only for properties originally created as unsigned 16-bit values.
     *
     * @returns Engine property value handle.
     */
    public u16_value(): u16_value;

    /**
     * Treat this property value as a signed 16-bit integer.
     *
     * @remarks
     * Use only for properties originally created as signed 16-bit values.
     *
     * @returns Engine property value handle.
     */
    public s16_value(): s16_value;

    /**
     * Treat this property value as a button.
     *
     * @remarks
     * Use only for properties originally created as button rows.
     *
     * @returns Engine property value handle.
     */
    public button_value(): button_value;

    /**
     * Treat this property value as a caption.
     *
     * @remarks
     * Use only for properties originally created as caption rows.
     *
     * @returns Engine property value handle.
     */
    public caption_value(): caption_value;
  }

  /**
   * Texture atlas entry exposed by UI texture metadata.
   *
   * @source C++ class TEX_INFO
   * @customConstructor TEX_INFO
   * @group xr_properties
   *
   * @remarks
   * Metadata is borrowed from the engine UI texture atlas; use it for inspection, not ownership.
   */
  export class TEX_INFO {
    /**
     * Get rectangle occupied by this texture in the atlas.
     *
     * @returns Texture rectangle.
     */
    public get_rect(): Frect;

    /**
     * Get source texture file name.
     *
     * @returns Texture file name.
     */
    public get_file_name(): string;
  }
}
