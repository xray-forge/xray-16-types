import type { Nillable } from "../internal";

declare module "xray16" {
  /**
   * XML UI initialization helper.
   *
   * @source C++ class CScriptXmlInit
   * @customConstructor CScriptXmlInit
   * @group xr_ui_core
   *
   * @remarks
   * Call `ParseFile()` before `Init*` helpers. Created controls are attached to `parent` when it is provided; scroll
   * views receive them through `AddWindow()`, other windows through `AttachChild()`. Controls created without a parent
   * are not attached by this helper.
   */
  export class CScriptXmlInit {
    /**
     * Create an XML initializer.
     */
    public constructor();

    /**
     * Load a UI XML file from the configured UI paths.
     *
     * @remarks
     * Paths are resolved through the engine config/UI path stack, including the active and default UI paths.
     *
     * @param path - XML file path.
     */
    public ParseFile(path: string): void;

    /**
     * Load shared texture metadata from an XML file.
     *
     * @remarks
     * Missing files are ignored by the native loader. Duplicate texture ids from this file replace existing entries.
     *
     * @param path - XML file path.
     */
    public ParseShTexInfo(path: string): void;

    /**
     * Create and initialize a button from XML.
     *
     * @remarks
     * The created button is marked for auto-delete by the native binding.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created button.
     */
    public InitButton(selector: string, parent: Nillable<CUIWindow>): CUIButton;

    /**
     * Create and initialize a three-state button from XML.
     *
     * @remarks
     * When `parent` is provided, the created control is marked for parent-owned deletion.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created button.
     */
    public Init3tButton(selector: string, parent: Nillable<CUIWindow>): CUI3tButton;

    /**
     * Create and initialize an animated static from XML.
     *
     * @remarks
     * When `parent` is provided, the created control is marked for parent-owned deletion.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created static control.
     */
    public InitAnimStatic(selector: string, parent: Nillable<CUIWindow>): CUIStatic;

    /**
     * Create and initialize a CD key edit box from XML.
     *
     * @remarks
     * Assigns CD-key callbacks and applies the current option value after initialization.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created edit box.
     */
    public InitCDkey(selector: string, parent: Nillable<CUIWindow>): CUIEditBox;

    /**
     * Create and initialize a check button from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created check button.
     */
    public InitCheck(selector: string, parent: Nillable<CUIWindow>): CUICheckButton;

    /**
     * Create and initialize a combo box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created combo box.
     */
    public InitComboBox(selector: string, parent: Nillable<CUIWindow>): CUIComboBox;

    /**
     * Create and initialize an edit box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created edit box.
     */
    public InitEditBox(selector: string, parent: Nillable<CUIWindow>): CUIEditBox;

    /**
     * Create and initialize a frame window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created frame window.
     */
    public InitFrame(selector: string, parent: Nillable<CUIWindow>): CUIFrameWindow;

    /**
     * Create and initialize a frame line from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created frame line.
     */
    public InitFrameLine(selector: string, parent: Nillable<CUIWindow>): CUIFrameLineWnd;

    /**
     * Create and initialize a key binding control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created key binding window.
     */
    public InitKeyBinding(selector: string, parent: Nillable<CUIWindow>): CUIWindow;

    /**
     * Create and initialize a label from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created label static.
     */
    public InitLabel(selector: string, parent: Nillable<CUIWindow>): CUIStatic;

    /**
     * Create and initialize a list window from XML.
     *
     * @remarks
     * When `parent` is provided, the created control is marked for parent-owned deletion.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created list window.
     */
    public InitList(selector: string, parent: Nillable<CUIWindow>): CUIListWnd;

    /**
     * Create and initialize a list box from XML.
     *
     * @remarks
     * When `parent` is provided, the created control is marked for parent-owned deletion.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created list box.
     */
    public InitListBox<T extends CUIListBoxItem = CUIListBoxItem>(
      selector: string,
      parent: Nillable<CUIWindow>
    ): CUIListBox<T>;

    /**
     * Create and initialize a main-menu shniaga control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created main-menu shniaga control.
     */
    public InitMMShniaga(selector: string, parent: Nillable<CUIWindow>): CUIMMShniaga;

    /**
     * Create and initialize a multiplayer player-name edit box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created edit box.
     */
    public InitMPPlayerName(selector: string, parent: Nillable<CUIWindow>): CUIEditBox;

    /**
     * Create and initialize a map info control from XML.
     *
     * @remarks
     * Initializes both the base window rect and the map-info content area from the XML node.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created map info control.
     */
    public InitMapInfo(selector: string, parent: Nillable<CUIWindow>): CUIMapInfo;

    /**
     * Create and initialize a map list control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created map list control.
     */
    public InitMapList(selector: string, parent: Nillable<CUIWindow>): CUIMapList;

    /**
     * Create and initialize a progress bar from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created progress bar.
     */
    public InitProgressBar(selector: string, parent: Nillable<CUIWindow>): CUIProgressBar;

    /**
     * Create and initialize a scroll view from XML.
     *
     * @remarks
     * Child controls created under this parent are added through `AddWindow()`.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created scroll view.
     */
    public InitScrollView(selector: string, parent: Nillable<CUIWindow>): CUIScrollView;

    /**
     * Create and initialize a server list from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created server list.
     */
    public InitServerList(selector: string, parent: Nillable<CUIWindow>): CServerList;

    /**
     * Create and initialize a sleep static from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created sleep static.
     */
    public InitSleepStatic(selector: string, parent: Nillable<CUIWindow>): CUISleepStatic;

    /**
     * Create and initialize a float spin control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created spin control.
     */
    public InitSpinFlt(selector: string, parent: Nillable<CUIWindow>): CUISpinFlt;

    /**
     * Create and initialize an integer spin control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created spin control.
     */
    public InitSpinNum(selector: string, parent: Nillable<CUIWindow>): CUISpinNum;

    /**
     * Create and initialize a text spin control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created spin control.
     */
    public InitSpinText(selector: string, parent: Nillable<CUIWindow>): CUISpinText;

    /**
     * Create and initialize a static control from XML.
     *
     * @remarks
     * `InitLabel()` is bound to the same native initializer as this method.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created static control.
     */
    public InitStatic(selector: string, parent: Nillable<CUIWindow>): CUIStatic;

    /**
     * Create and initialize a tab control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created tab control.
     */
    public InitTab(selector: string, parent: Nillable<CUIWindow>): CUITabControl;

    /**
     * Create and initialize a text window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created text window.
     */
    public InitTextWnd(selector: string, parent: Nillable<CUIWindow>): CUITextWnd;

    /**
     * Create and initialize a track bar from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created track bar.
     */
    public InitTrackBar(selector: string, parent: Nillable<CUIWindow>): CUITrackBar;

    /**
     * Create and initialize a version list from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created version list.
     */
    public InitVerList(selector: string, parent: Nillable<CUIWindow>): CUIVersionList;

    /**
     * Create and initialize a hint window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created hint window.
     */
    public InitHint(selector: string, parent: Nillable<CUIWindow>): UIHint;

    /**
     * Initialize a window already created by script.
     *
     * @remarks
     * This does not create a child window. It applies XML properties to the passed window and does not attach it to a
     * parent.
     *
     * @param selector - XML node path.
     * @param index - XML node index.
     * @param parent - Window to initialize.
     */
    public InitWindow(selector: string, index: i32, parent: Nillable<CUIWindow>): void;

    /**
     * Initialize a group of auto-created static controls under an existing window.
     *
     * @remarks
     * Reads static child definitions from the selected XML node and attaches them to `parent`. Requires a non-null
     * parent window.
     *
     * @param selector - XML node path.
     * @param parent - Parent window.
     */
    public InitAutoStaticGroup(selector: string, parent: CUIWindow): void;
  }

  /**
   * Move a window so it fits inside a rectangle.
   *
   * @group xr_ui_core
   *
   * @remarks
   * The window may be moved; its size is not changed.
   *
   * @param window - Window to fit.
   * @param rect - Bounding rectangle.
   * @param horizontal_align - Horizontal alignment hint.
   * @param vertical_align - Vertical alignment hint.
   * @returns Whether the window was adjusted.
   */
  export function FitInRect(
    this: void,
    window: CUIWindow,
    rect: Frect,
    horizontal_align: number,
    vertical_align: number
  ): boolean;

  /**
   * Get the texture rectangle for a UI atlas entry.
   *
   * @group xr_ui_core
   *
   * @remarks
   * Uses the engine's fatal texture lookup path when the atlas entry is missing.
   *
   * @param name - Texture atlas entry name.
   * @returns Texture rectangle.
   */
  export function GetTextureRect(this: void, name: string): Frect;

  /**
   * Get current UI cursor position.
   *
   * @group xr_ui_core
   *
   * @remarks
   * Coordinates are in the engine UI coordinate space, not raw window pixels.
   *
   * @returns Cursor position.
   */
  export function GetCursorPosition(this: void): vector2;

  /**
   * Set current UI cursor position.
   *
   * @group xr_ui_core
   *
   * @remarks
   * The engine also moves the system cursor when the UI cursor is bound to it.
   *
   * @param position - Cursor position.
   */
  export function SetCursorPosition(this: void, position: vector2): void;
}
