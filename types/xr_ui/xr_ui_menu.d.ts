declare module "xray16" {
  /**
   * @source C++ class COptionsManager
   * @customConstructor COptionsManager
   * @group xr_ui_menu
   */
  export class COptionsManager {
    public constructor();

    public SendMessage2Group(group: string, message: string): void;

    public UndoGroup(group: string): void;

    public SaveBackupValues(group: string): void;

    public IsGroupChanged(group: string): boolean;

    public SaveValues(group: string): void;

    public SetCurrentValues(group: string): void;

    public NeedSystemRestart(): boolean;

    public NeedVidRestart(): boolean;

    public OptionsPostAccept(): void;
  }

  /**
   * @source C++ class CMainMenu
   * @customConstructor CMainMenu
   * @group xr_ui_menu
   */
  export class CMainMenu {
    public GetCDKey(): string;

    public GetAccountMngr(): account_manager;

    public GetDemoInfo(fileName: string): demo_info | null;

    public GetPatchProgress(): Patch_Dawnload_Progress;

    public GetProfileStore(): profile_store;

    public GetGSVer(): string;

    public GetLoginMngr(): login_manager;

    public GetPlayerName(): string;

    public CancelDownload(): void;

    public ValidateCDKey(): boolean;
  }

  /**
   * @source C++ class CUIGameCustom
   * @customConstructor CUIGameCustom
   * @group xr_ui_menu
   */
  export class CUIGameCustom {
    public AddCustomStatic(id: string, b: boolean): StaticDrawableWrapper;

    public AddCustomStatic(id: string, b: boolean, n: f32): StaticDrawableWrapper;

    public AddDialogToRender(window: CUIWindow): void;

    public CurrentItemAtCell(): game_object;

    public GetCustomStatic(value: string): StaticDrawableWrapper | null;

    public HideActorMenu(): void;

    public ShowActorMenu(): boolean;

    public HidePdaMenu(): void;

    public RemoveCustomStatic(id: string): void;

    public RemoveDialogToRender(window: CUIWindow): void;

    public UpdateActorMenu(): void;

    public enable_fake_indicators(enabled: boolean): void;

    public hide_messages(): void;

    public show_messages(): void;

    public update_fake_indicators(u8: number, enabled: boolean): void;

    public update_fake_indicators(u8: number, value: f32): void;
  }

  /**
   * @source namespace main_menu
   * @group xr_ui_menu
   */
  export interface IXR_main_menu {
    /**
     * @returns main game menu c++ controller singleton
     */
    get_main_menu(this: void): CMainMenu;
  }

  /**
   * @source namespace ActorMenu
   * @group xr_ui_menu
   */
  export interface IXR_ActorMenu {
    get_pda_menu(this: void): CUIPdaWnd;
    get_actor_menu(this: void): CUIActorMenu;

    /**
     * enum EMenuMode
     * {
     *     mmUndefined,
     *     mmInventory,
     *     mmTrade,
     *     mmUpgrade,
     *     mmDeadBodySearch,
     * };
     */
    get_menu_mode(this: void): number;
    // get_maingame(this: void): unknown; // CUIMainIngameWnd - not registered, throws exception
  }

  /**
   * @group xr_ui_menu
   */
  export const ActorMenu: IXR_ActorMenu;

  /**
   * @group xr_ui_menu
   */
  export const main_menu: IXR_main_menu;

  /**
   * @group xr_ui_menu
   */
  export function get_hud(this: void): CUIGameCustom;
}
