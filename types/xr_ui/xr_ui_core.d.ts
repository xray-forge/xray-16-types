declare module "xray16" {
  /**
   * XML UI initialization helper.
   *
   * @source C++ class CScriptXmlInit
   * @customConstructor CScriptXmlInit
   * @group xr_ui_core
   */
  export class CScriptXmlInit {
    /**
     * Create an XML initializer.
     */
    public constructor();

    /**
     * Load a UI XML file from the configured UI paths.
     *
     * @param path - XML file path.
     */
    public ParseFile(path: string): void;

    /**
     * Load shared texture metadata from an XML file.
     *
     * @param path - XML file path.
     */
    public ParseShTexInfo(path: string): void;

    /**
     * Create and initialize a button from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created button.
     */
    public InitButton(selector: string, parent: CUIWindow | null): CUIButton;

    /**
     * Create and initialize a three-state button from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created button.
     */
    public Init3tButton(selector: string, parent: CUIWindow | null): CUI3tButton;

    /**
     * Create and initialize an animated static from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created static control.
     */
    public InitAnimStatic(selector: string, parent: CUIWindow | null): CUIStatic;

    /**
     * Create and initialize a CD key edit box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created edit box.
     */
    public InitCDkey(selector: string, parent: CUIWindow | null): CUIEditBox;

    /**
     * Create and initialize a check button from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created check button.
     */
    public InitCheck(selector: string, parent: CUIWindow | null): CUICheckButton;

    /**
     * Create and initialize a combo box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created combo box.
     */
    public InitComboBox(selector: string, parent: CUIWindow | null): CUIComboBox;

    /**
     * Create and initialize an edit box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created edit box.
     */
    public InitEditBox(selector: string, parent: CUIWindow | null): CUIEditBox;

    /**
     * Create and initialize a frame window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created frame window.
     */
    public InitFrame(selector: string, parent: CUIWindow | null): CUIFrameWindow;

    /**
     * Create and initialize a frame line from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created frame line.
     */
    public InitFrameLine(selector: string, parent: CUIWindow | null): CUIFrameLineWnd;

    /**
     * Create and initialize a key binding control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created key binding window.
     */
    public InitKeyBinding(selector: string, parent: CUIWindow | null): CUIWindow;

    /**
     * Create and initialize a label from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created label static.
     */
    public InitLabel(selector: string, parent: CUIWindow | null): CUIStatic;

    /**
     * Create and initialize a list window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created list window.
     */
    public InitList(selector: string, parent: CUIWindow | null): CUIListWnd;

    /**
     * Create and initialize a list box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created list box.
     */
    public InitListBox<T extends CUIListBoxItem = CUIListBoxItem>(
      selector: string,
      parent: CUIWindow | null
    ): CUIListBox<T>;

    /**
     * Create and initialize a main-menu shniaga control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created main-menu shniaga control.
     */
    public InitMMShniaga(selector: string, parent: CUIWindow | null): CUIMMShniaga;

    /**
     * Create and initialize a multiplayer player-name edit box from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created edit box.
     */
    public InitMPPlayerName(selector: string, parent: CUIWindow | null): CUIEditBox;

    /**
     * Create and initialize a map info control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created map info control.
     */
    public InitMapInfo(selector: string, parent: CUIWindow | null): CUIMapInfo;

    /**
     * Create and initialize a map list control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created map list control.
     */
    public InitMapList(selector: string, parent: CUIWindow | null): CUIMapList;

    /**
     * Create and initialize a progress bar from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created progress bar.
     */
    public InitProgressBar(selector: string, parent: CUIWindow | null): CUIProgressBar;

    /**
     * Create and initialize a scroll view from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created scroll view.
     */
    public InitScrollView(selector: string, parent: CUIWindow | null): CUIScrollView;

    /**
     * Create and initialize a server list from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created server list.
     */
    public InitServerList(selector: string, parent: CUIWindow | null): CServerList;

    /**
     * Create and initialize a sleep static from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created sleep static.
     */
    public InitSleepStatic(selector: string, parent: CUIWindow | null): CUISleepStatic;

    /**
     * Create and initialize a float spin control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created spin control.
     */
    public InitSpinFlt(selector: string, parent: CUIWindow | null): CUISpinFlt;

    /**
     * Create and initialize an integer spin control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created spin control.
     */
    public InitSpinNum(selector: string, parent: CUIWindow | null): CUISpinNum;

    /**
     * Create and initialize a text spin control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created spin control.
     */
    public InitSpinText(selector: string, parent: CUIWindow | null): CUISpinText;

    /**
     * Create and initialize a static control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created static control.
     */
    public InitStatic(selector: string, parent: CUIWindow | null): CUIStatic;

    /**
     * Create and initialize a tab control from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created tab control.
     */
    public InitTab(selector: string, parent: CUIWindow | null): CUITabControl;

    /**
     * Create and initialize a text window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created text window.
     */
    public InitTextWnd(selector: string, parent: CUIWindow | null): CUITextWnd;

    /**
     * Create and initialize a track bar from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created track bar.
     */
    public InitTrackBar(selector: string, parent: CUIWindow | null): CUITrackBar;

    /**
     * Create and initialize a version list from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created version list.
     */
    public InitVerList(selector: string, parent: CUIWindow | null): CUIVersionList;

    /**
     * Create and initialize a hint window from XML.
     *
     * @param selector - XML node path.
     * @param parent - Optional parent window.
     * @returns Created hint window.
     */
    public InitHint(selector: string, parent: CUIWindow | null): UIHint;

    /**
     * Initialize a window already created by script.
     *
     * @param selector - XML node path.
     * @param index - XML node index.
     * @param parent - Window to initialize.
     */
    public InitWindow(selector: string, index: i32, parent: CUIWindow | null): void;

    /**
     * Initialize a group of auto-created static controls under an existing window.
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
   * @param name - Texture atlas entry name.
   * @returns Texture rectangle.
   */
  export function GetTextureRect(this: void, name: string): Frect;

  /**
   * Get current UI cursor position.
   *
   * @group xr_ui_core
   *
   * @returns Cursor position.
   */
  export function GetCursorPosition(this: void): vector2;

  /**
   * Set current UI cursor position.
   *
   * @group xr_ui_core
   *
   * @param position - Cursor position.
   */
  export function SetCursorPosition(this: void, position: vector2): void;
}
