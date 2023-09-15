declare module "xray16" {
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
