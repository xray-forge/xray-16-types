import type { Nullable } from "../internal";

declare module "xray16" {
  /**
   * Main-menu options manager binding.
   *
   * @source C++ class COptionsManager
   * @customConstructor COptionsManager
   * @group xr_ui_menu
   *
   * @remarks
   * Operates on option item groups registered by the options UI.
   */
  export class COptionsManager {
    /**
     * Create an options manager script proxy.
     */
    public constructor();

    /**
     * Send a UI options message to every option item in a group.
     *
     * @param group - Options group name.
     * @param message - Message name.
     */
    public SendMessage2Group(group: string, message: string): void;

    /**
     * Restore options in a group from their backup values.
     *
     * @param group - Options group name.
     */
    public UndoGroup(group: string): void;

    /**
     * Save current option values as the backup for a group.
     *
     * @param group - Options group name.
     */
    public SaveBackupValues(group: string): void;

    /**
     * Persist current option values for a group.
     *
     * @param group - Options group name.
     */
    public SaveValues(group: string): void;

    /**
     * Apply current engine option values to controls in a group.
     *
     * @param group - Options group name.
     */
    public SetCurrentValues(group: string): void;

    /**
     * Check whether accepted options require a system restart.
     *
     * @returns Whether a system restart is needed.
     */
    public NeedSystemRestart(): boolean;

    /**
     * Check whether accepted options require a video restart.
     *
     * @returns Whether a video restart is needed.
     */
    public NeedVidRestart(): boolean;

    /**
     * Run post-accept handling after options are saved.
     */
    public OptionsPostAccept(): void;
  }

  /**
   * Main menu binding.
   *
   * @source C++ class CMainMenu
   * @customConstructor CMainMenu
   * @group xr_ui_menu
   *
   * @remarks
   * Engine-owned singleton returned by `main_menu.get_main_menu()`.
   */
  export class CMainMenu {
    /**
     * Get the CD key stored by the game.
     *
     * @returns CD key string.
     */
    public GetCDKey(): string;

    /**
     * Get the multiplayer account manager.
     *
     * @returns Account manager.
     */
    public GetAccountMngr(): account_manager;

    /**
     * Read metadata for a recorded demo file.
     *
     * @param fileName - Demo file name.
     * @returns Demo info, or `null` when it cannot be read.
     */
    public GetDemoInfo(fileName: string): Nullable<demo_info>;

    /**
     * Get patch download progress.
     *
     * @returns Patch progress object.
     */
    public GetPatchProgress(): Patch_Dawnload_Progress;

    /**
     * Get the multiplayer profile store.
     *
     * @returns Profile store.
     */
    public GetProfileStore(): profile_store;

    /**
     * Get GameSpy protocol version string.
     *
     * @returns GameSpy version.
     */
    public GetGSVer(): string;

    /**
     * Get the multiplayer login manager.
     *
     * @returns Login manager.
     */
    public GetLoginMngr(): login_manager;

    /**
     * Get the current player name.
     *
     * @returns Player name.
     */
    public GetPlayerName(): string;

    /**
     * Cancel the active multiplayer map download.
     */
    public CancelDownload(): void;

    /**
     * Validate the stored CD key.
     *
     * @returns Whether the CD key is valid.
     */
    public ValidateCDKey(): boolean;
  }

  /**
   * In-game UI root binding.
   *
   * @source C++ class CUIGameCustom
   * @customConstructor CUIGameCustom
   * @group xr_ui_menu
   *
   * @remarks
   * Current in-game HUD UI. Global helpers dereference the current game UI, so call them only while a level UI exists.
   */
  export class CUIGameCustom {
    /**
     * Add a custom HUD static by XML id.
     *
     * @remarks
     * If `singleInstance` is true and an active static with this id already exists, that wrapper is returned.
     *
     * @param id - Static descriptor id.
     * @param singleInstance - Whether an existing static with the same id should be reused.
     * @returns Drawable wrapper for the static.
     */
    public AddCustomStatic(id: string, singleInstance: boolean): StaticDrawableWrapper;

    /**
     * Add a custom HUD static by XML id and lifetime.
     *
     * @remarks
     * The static is initialized from `ui_custom_msgs.xml`. Positive lifetime values remove it automatically after
     * that many seconds unless the XML entry overrides `ttl`.
     *
     * @param id - Static descriptor id.
     * @param singleInstance - Whether an existing static with the same id should be reused.
     * @param lifetime - Time before the static is removed.
     * @returns Drawable wrapper for the static.
     */
    public AddCustomStatic(id: string, singleInstance: boolean, lifetime: f32): StaticDrawableWrapper;

    /**
     * Add a dialog window to the HUD render list.
     *
     * @remarks
     * Adds the window to the HUD dialog holder. It shows the window but does not take ownership of it.
     *
     * @param window - Dialog window.
     */
    public AddDialogToRender(window: CUIWindow): void;

    /**
     * Get the inventory item currently under the actor menu cursor.
     *
     * @since OpenXRay 2015-07-07, 6e703b4c
     *
     * @remarks
     * Requires the actor menu to have a current inventory cell.
     *
     * @returns Game object for the item, or `null` when the cell has no item.
     */
    public CurrentItemAtCell(): Nullable<game_object>;

    /**
     * Get an active custom HUD static by id.
     *
     * @param id - Static descriptor id.
     * @returns Drawable wrapper, or `null` when missing.
     */
    public GetCustomStatic(id: string): Nullable<StaticDrawableWrapper>;

    /**
     * Hide the actor inventory menu.
     *
     * @remarks
     * No-op when the actor menu is already hidden.
     */
    public HideActorMenu(): void;

    /**
     * Show the actor inventory menu.
     *
     * @remarks
     * Toggles the actor menu. If it is already shown, the call hides it instead.
     *
     * @returns `true` after handling the toggle.
     */
    public ShowActorMenu(): boolean;

    /**
     * Hide the PDA menu.
     *
     * @remarks
     * No-op when the PDA menu is already hidden.
     */
    public HidePdaMenu(): void;

    /**
     * Remove a custom HUD static.
     *
     * @remarks
     * Destroys the matching HUD-owned wrapper when it exists.
     *
     * @param id - Static descriptor id.
     */
    public RemoveCustomStatic(id: string): void;

    /**
     * Remove a dialog window from the HUD render list.
     *
     * @remarks
     * Hides and disables the window in the HUD dialog holder. It does not destroy the window.
     *
     * @param window - Dialog window.
     */
    public RemoveDialogToRender(window: CUIWindow): void;

    /**
     * Refresh actor menu state.
     *
     * @since OpenXRay 2015-07-07, 6e703b4c
     *
     * @remarks
     * Updates the actor menu only when it is currently shown.
     */
    public UpdateActorMenu(): void;

    /**
     * Enable or disable fake HUD indicators.
     *
     * @param enabled - New fake-indicator state.
     */
    public enable_fake_indicators(enabled: boolean): void;

    /**
     * Hide HUD messages.
     */
    public hide_messages(): void;

    /**
     * Show HUD messages.
     */
    public show_messages(): void;

    /**
     * Update fake indicator visibility.
     *
     * @param indicator - Indicator id.
     * @param enabled - New indicator state.
     */
    public update_fake_indicators(indicator: number, enabled: boolean): void;

    /**
     * Update fake indicator value.
     *
     * @param indicator - Indicator id.
     * @param value - New indicator value.
     */
    public update_fake_indicators(indicator: number, value: f32): void;
  }

  /**
   * Main menu namespace exposed to scripts.
   *
   * @source namespace main_menu
   * @group xr_ui_menu
   */
  export interface IXR_main_menu {
    /**
     * @returns Main game menu c++ controller singleton.
     */
    get_main_menu(this: void): CMainMenu;
  }

  /**
   * Actor/PDA menu namespace exposed to scripts.
   *
   * @source namespace ActorMenu
   * @group xr_ui_menu
   *
   * @remarks
   * These helpers dereference `CurrentGameUI()` directly. Use them only in-game after the HUD UI has been created.
   */
  export interface IXR_ActorMenu {
    /**
     * Get the current PDA menu window.
     *
     * @throws When called without an active current game UI.
     *
     * @returns PDA menu window.
     */
    get_pda_menu(this: void): CUIPdaWnd;

    /**
     * Get the current actor menu window.
     *
     * @throws When called without an active current game UI.
     *
     * @returns Actor menu window.
     */
    get_actor_menu(this: void): CUIActorMenu;

    /**
     * Get current actor menu mode.
     *
     * @throws When called without an active current game UI.
     *
     * @returns Numeric `EMenuMode` value.
     */
    get_menu_mode(this: void): number;

    /**
     * Get the current main in-game HUD window.
     *
     * @source `src/xrGame/ui/UIActorMenu_script.cpp`, `ActorMenu.get_maingame`.
     *
     * @remarks
     * The concrete `CUIMainIngameWnd` class is not declared as a Lua binding, so the returned pointer is typed as
     * `unknown`.
     *
     * @throws When called without an active current game UI.
     *
     * @returns Main in-game HUD window pointer.
     */
    get_maingame(this: void): unknown;
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
   * Get the current game HUD UI.
   *
   * @group xr_ui_menu
   *
   * @remarks
   * The binding returns `CurrentGameUI()`. Call it only while a level HUD exists.
   *
   * @returns Current HUD UI controller.
   */
  export function get_hud(this: void): CUIGameCustom;
}
