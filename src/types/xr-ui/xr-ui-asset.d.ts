declare module "xray16" {
  /**
   * UI style manager binding.
   *
   * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
   *
   * @source C++ class UIStyleManager
   * @customConstructor UIStyleManager
   * @group xr_ui_asset
   *
   * @remarks
   * Use `GetUIStyleManager()` to access the engine singleton. Style changes may require UI reload to affect existing
   * windows. Available styles are discovered from UI style folders at startup.
   */
  export class UIStyleManager {
    /**
     * Engine-owned UI style manager.
     */
    private constructor();

    /**
     * Iterate over available UI styles.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @remarks
     * The returned value is a Lua iterator over engine style tokens. The default style is always present.
     *
     * @returns Style tokens.
     */
    public GetAllStyles(): LuaIterable<token>;

    /**
     * Check whether the default UI style is active.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @returns Whether the default style is set.
     */
    public DefaultStyleIsSet(): boolean;

    /**
     * Get the active UI style id.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @returns Current style id.
     */
    public GetCurrentStyleId(): u32;

    /**
     * Get the active UI style name.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @returns Current style name.
     */
    public GetCurrentStyleName(): string;

    /**
     * Switch to a UI style by name.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @remarks
     * Pass `reload_ui` to run the engine UI reset sequence after switching. Unknown names return `false`.
     *
     * @param name - Style name.
     * @param reload_ui - Whether to reload UI after switching.
     * @returns Whether the style was applied.
     */
    public SetStyle(name: string, reload_ui?: boolean): boolean;

    /**
     * Switch to a UI style by id.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @remarks
     * Use an id from {@link GetAllStyles}. Unknown ids are accepted here, but later style-name lookup can fail native
     * verification.
     *
     * @param id - Style id.
     */
    public SetupStyle(id: u32): void;

    /**
     * Reset cached UI style data.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @remarks
     * Runs the engine UI reset sequence. It does not change the current style id by itself.
     */
    public ResetUI(): void;

    /**
     * Switch to a UI style by id.
     *
     * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
     *
     * @deprecated Use {@link UIStyleManager.SetupStyle}; the engine binding accepts names in `SetStyle`.
     *
     * @param id - Style id.
     * @param reload_ui - Whether to reload UI after switching.
     */
    public SetStyle(id: u32, reload_ui?: boolean): void;
  }

  /**
   * Game font binding used by UI widgets.
   *
   * @source C++ class CGameFont
   * @customConstructor CGameFont
   * @group xr_ui_asset
   *
   * @remarks
   * Font instances are owned by the UI subsystem and returned by the `GetFont*` helpers. Do not construct or retain
   * them outside the lifetime of the UI subsystem.
   */
  export class CGameFont {
    /**
     * Engine enum value for `CGameFont.alCenter`.
     */
    public static readonly alCenter: 2;
    /**
     * Engine enum value for `CGameFont.alLeft`.
     */
    public static readonly alLeft: 0;
    /**
     * Engine enum value for `CGameFont.alRight`.
     */
    public static readonly alRight: 1;

    /**
     * Engine-owned font constants.
     */
    private constructor();
  }

  /**
   * EVTextAlignment.
   *
   * @group xr_ui_asset
   */
  export type TXR_CGameFont_alignment = EnumeratedStaticsValues<typeof CGameFont>;

  /**
   * Get the small digital/interface font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontDI(this: void): CGameFont;

  /**
   * Get the 19px Graffiti Russian UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontGraffiti19Russian(this: void): CGameFont;

  /**
   * Get the 32px Graffiti Russian UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontGraffiti32Russian(this: void): CGameFont;

  /**
   * Get the 50px Graffiti Russian UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontGraffiti50Russian(this: void): CGameFont;

  /**
   * Get the 16px Letterica Russian UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontLetterica16Russian(this: void): CGameFont;

  /**
   * Get the 18px Letterica Russian UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontLetterica18Russian(this: void): CGameFont;

  /**
   * Get the 25px Letterica UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontLetterica25(this: void): CGameFont;

  /**
   * Get the medium HUD font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontMedium(this: void): CGameFont;

  /**
   * Get the small HUD font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontSmall(this: void): CGameFont;

  /**
   * Get texture metadata and throw if it is missing.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * This overload verifies that the texture exists. Use an output-object overload when missing textures are expected.
   *
   * @param name - Texture atlas entry name.
   * @returns Texture metadata.
   */
  export function GetTextureInfo(this: void, name: string): TEX_INFO;

  /**
   * Get texture metadata, falling back to another texture name.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * This overload verifies that either `name` or `default_name` exists.
   *
   * @param name - Texture atlas entry name.
   * @param default_name - Fallback texture name.
   * @returns Texture metadata.
   */
  export function GetTextureInfo(this: void, name: string, default_name: string): TEX_INFO;

  /**
   * Try to get texture metadata into an output object.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * The passed `tex_info` object is overwritten when the texture is found. Missing textures return `false` instead of
   * failing native verification.
   *
   * @param name - Texture atlas entry name.
   * @param tex_info - Output texture metadata.
   * @returns Whether the texture was found.
   */
  export function GetTextureInfo(this: void, name: string, tex_info: TEX_INFO): boolean;

  /**
   * Try to get texture metadata into an output object, with a fallback texture name.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * The passed `tex_info` object is overwritten when either texture is found. Missing primary and fallback textures
   * return `false`.
   *
   * @param name - Texture atlas entry name.
   * @param default_name - Fallback texture name.
   * @param tex_info - Output texture metadata.
   * @returns Whether the texture or fallback was found.
   */
  export function GetTextureInfo(this: void, name: string, default_name: string, tex_info: TEX_INFO): boolean;

  /**
   * Get source texture file name for an atlas entry.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * Uses the same verified lookup path as `GetTextureInfo(name)`.
   *
   * @param name - Texture atlas entry name.
   * @returns Texture file name.
   */
  export function GetTextureName(this: void, name: string): string;

  /**
   * Get the 22px Graffiti Russian UI font.
   *
   * @group xr_ui_asset
   *
   * @returns Font instance.
   */
  export function GetFontGraffiti22Russian(this: void): CGameFont;

  /**
   * Get the default UI path.
   *
   * @group xr_ui_asset
   *
   * @returns Default UI path, usually the base `ui` config folder.
   */
  export function GetDefaultUIPath(this: void): string;

  /**
   * Get the default UI path with trailing delimiter.
   *
   * @group xr_ui_asset
   *
   * @returns Default UI path with delimiter.
   */
  export function GetDefaultUIPathWithDelimiter(this: void): string;

  /**
   * Get the active UI path.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * Differs from the default path after a non-default UI style is selected.
   *
   * @returns Active UI path.
   */
  export function GetUIPath(this: void): string;

  /**
   * Get the active UI path with trailing delimiter.
   *
   * @group xr_ui_asset
   *
   * @remarks
   * Differs from the default path after a non-default UI style is selected.
   *
   * @returns Active UI path with delimiter.
   */
  export function GetUIPathWithDelimiter(this: void): string;

  /**
   * Get the global UI style manager.
   *
   * @since OpenXRay 2023-03-31, 8c4f1500, PR #1114
   *
   * @group xr_ui_asset
   *
   * @remarks
   * Returns the engine-owned singleton.
   *
   * @returns UI style manager singleton.
   */
  export function GetUIStyleManager(this: void): UIStyleManager;
}
