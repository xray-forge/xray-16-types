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
    public get(index: u32): string | null;

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
     * Create a 3-axis angle property.
     *
     * @remarks
     * Bound object field must be an `Fvector`.
     *
     * @returns Engine property value handle.
     */
    public create_vangle(): unknown;

    /**
     * Create an angle property.
     *
     * @remarks
     * Bound object field must be a float.
     *
     * @returns Engine property value handle.
     */
    public create_angle(): unknown;

    /**
     * Create a time property.
     *
     * @remarks
     * Bound object field must be a float.
     *
     * @returns Engine property value handle.
     */
    public create_time(): unknown;

    /**
     * Create a color property.
     *
     * @remarks
     * Bound object field must be a 32-bit color value.
     *
     * @returns Engine property value handle.
     */
    public create_color(): unknown;

    /**
     * Create a vector color property.
     *
     * @remarks
     * Bound object field must be an `Fvector`.
     *
     * @returns Engine property value handle.
     */
    public create_vcolor(): unknown;

    /**
     * Create a float color property.
     *
     * @remarks
     * Bound object field must be an `Fcolor`.
     *
     * @returns Engine property value handle.
     */
    public create_fcolor(): unknown;

    /**
     * Create a runtime token list property.
     *
     * @remarks
     * Requires an `rtoken_list`; keep it alive while the editor property uses it.
     *
     * @returns Engine property value handle.
     */
    public create_list(): unknown;

    /**
     * Create an 8-bit token property.
     *
     * @remarks
     * Requires a `token_list`; ids must fit into an unsigned 8-bit value.
     *
     * @returns Engine property value handle.
     */
    public create_token8(): unknown;

    /**
     * Create a 16-bit token property.
     *
     * @remarks
     * Requires a `token_list`; ids must fit into an unsigned 16-bit value.
     *
     * @returns Engine property value handle.
     */
    public create_token16(): unknown;

    /**
     * Create a 32-bit token property.
     *
     * @remarks
     * Requires a `token_list`; ids are stored as unsigned 32-bit values.
     *
     * @returns Engine property value handle.
     */
    public create_token32(): unknown;

    /**
     * Create an 8-bit flag property.
     *
     * @returns Engine property value handle.
     */
    public create_flag8(): unknown;

    /**
     * Create a 16-bit flag property.
     *
     * @returns Engine property value handle.
     */
    public create_flag16(): unknown;

    /**
     * Create a 32-bit flag property.
     *
     * @returns Engine property value handle.
     */
    public create_flag32(): unknown;

    /**
     * Create a vector property.
     *
     * @returns Engine property value handle.
     */
    public create_vector(): unknown;

    /**
     * Create a boolean property bound to an object field.
     *
     * @remarks
     * The native helper wraps `value[id]` and attaches the wrapper to `object`, so `object` must be a server object.
     *
     * @param items - Property item list to append to.
     * @param path - Property path or caption.
     * @param object - Spawn object owning the property.
     * @param value - Property storage descriptor.
     * @param id - Field identifier used by the editor bridge.
     * @returns Whether the property was created.
     */
    public create_bool(
      items: LuaTable<number>,
      path: string,
      object: cse_abstract,
      value: unknown,
      id: number | string
    ): boolean;

    /**
     * Create a float property.
     *
     * @returns Engine property value handle.
     */
    public create_float(): unknown;

    /**
     * Create an unsigned 8-bit integer property.
     *
     * @returns Engine property value handle.
     */
    public create_u8(): unknown;

    /**
     * Create an unsigned 16-bit integer property.
     *
     * @returns Engine property value handle.
     */
    public create_u16(): unknown;

    /**
     * Create an unsigned 32-bit integer property.
     *
     * @returns Engine property value handle.
     */
    public create_u32(): unknown;

    /**
     * Create a signed 32-bit integer property.
     *
     * @returns Engine property value handle.
     */
    public create_s32(): unknown;

    /**
     * Create a signed 16-bit integer property.
     *
     * @returns Engine property value handle.
     */
    public create_s16(): unknown;

    /**
     * Create an asset/object chooser property.
     *
     * @returns Engine property value handle.
     */
    public create_choose(): unknown;

    /**
     * Create a button property.
     *
     * @returns Engine property value handle.
     */
    public create_button(): unknown;

    /**
     * Create a custom canvas property.
     *
     * @returns Engine property value handle.
     */
    public create_canvas(): unknown;

    /**
     * Create a read-only caption row.
     *
     * @returns Engine property value handle.
     */
    public create_caption(): unknown;

    /**
     * Callback used after editing a float property.
     *
     * @returns Engine callback result.
     */
    public float_on_after_edit(): unknown;

    /**
     * Callback used before editing a float property.
     *
     * @returns Engine callback result.
     */
    public float_on_before_edit(): unknown;

    /**
     * Callback used after editing an object name.
     *
     * @returns Engine callback result.
     */
    public name_after_edit(): unknown;

    /**
     * Callback used before editing an object name.
     *
     * @returns Engine callback result.
     */
    public name_before_edit(): unknown;

    /**
     * Callback used before editing a vector property.
     *
     * @returns Engine callback result.
     */
    public vector_on_before_edit(): unknown;

    /**
     * Callback used after editing a vector property.
     *
     * @returns Engine callback result.
     */
    public vector_on_after_edit(): unknown;
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
     * @returns Engine property value handle.
     */
    public token16_value(): unknown;

    /**
     * Treat this property value as a 32-bit flag value.
     *
     * @returns Engine property value handle.
     */
    public flag32_value(): unknown;

    /**
     * Treat this property value as text.
     *
     * @returns Engine property value handle.
     */
    public text_value(): unknown;

    /**
     * Treat this property value as a boolean.
     *
     * @returns Engine property value handle.
     */
    public bool_value(): unknown;

    /**
     * Treat this property value as an unsigned 16-bit integer.
     *
     * @returns Engine property value handle.
     */
    public u16_value(): unknown;

    /**
     * Treat this property value as a signed 16-bit integer.
     *
     * @returns Engine property value handle.
     */
    public s16_value(): unknown;

    /**
     * Treat this property value as a button.
     *
     * @returns Engine property value handle.
     */
    public button_value(): unknown;

    /**
     * Treat this property value as a caption.
     *
     * @returns Engine property value handle.
     */
    public caption_value(): unknown;
  }

  /**
   * Texture atlas entry exposed by UI texture metadata.
   *
   * @source C++ class TEX_INFO
   * @customConstructor TEX_INFO
   * @group xr_properties
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
