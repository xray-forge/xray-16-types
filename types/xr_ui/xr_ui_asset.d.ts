declare module "xray16" {
  /**
   * @source C++ class UIStyleManager
   * @customConstructor UIStyleManager
   * @group xr_ui_asset
   */
  export class UIStyleManager {
    private constructor();

    public GetAllStyles(): LuaIterable<token>;

    public DefaultStyleIsSet(): boolean;

    public GetCurrentStyleId(): u32;

    public SetStyle(id: u32, reload_ui?: boolean): void;
  }

  /**
   * @source C++ class CGameFont
   * @customConstructor CGameFont
   * @group xr_ui_asset
   */
  export class CGameFont {
    public static readonly alCenter: 2;
    public static readonly alLeft: 0;
    public static readonly alRight: 1;

    private constructor();
  }

  /**
   * EVTextAlignment.
   *
   * @group xr_ui_asset
   */
  export type TXR_CGameFont_alignment = EnumeratedStaticsValues<typeof CGameFont>;

  /**
   * @group xr_ui_asset
   */
  export function GetFontDI(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontGraffiti19Russian(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontGraffiti32Russian(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontGraffiti50Russian(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontLetterica16Russian(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontLetterica18Russian(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontLetterica25(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontMedium(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetFontSmall(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetTextureInfo(this: void, char: string, char2: string, tex_info: TEX_INFO): boolean;

  /**
   * @group xr_ui_asset
   */
  export function GetTextureName(this: void, char: string): string;

  /**
   * @group xr_ui_asset
   */
  export function GetFontGraffiti22Russian(this: void): CGameFont;

  /**
   * @group xr_ui_asset
   */
  export function GetDefaultUIPath(this: void): string;

  /**
   * @group xr_ui_asset
   */
  export function GetDefaultUIPathWithDelimiter(this: void): string;

  /**
   * @group xr_ui_asset
   */
  export function GetUIPath(this: void): string;

  /**
   * @group xr_ui_asset
   */
  export function GetUIPathWithDelimiter(this: void): string;

  /**
   * @group xr_ui_asset
   */
  export function GetUIStyleManager(this: void): UIStyleManager;
}
