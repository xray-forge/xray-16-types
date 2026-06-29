declare module "xray16" {
  /**
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

    public Init3tButton(selector: string, parent: CUIWindow | null): CUI3tButton;

    public InitAnimStatic(selector: string, parent: CUIWindow | null): CUIStatic;

    public InitCDkey(selector: string, parent: CUIWindow | null): CUIEditBox;

    public InitCheck(selector: string, parent: CUIWindow | null): CUICheckButton;

    public InitComboBox(selector: string, parent: CUIWindow | null): CUIComboBox;

    public InitEditBox(selector: string, parent: CUIWindow | null): CUIEditBox;

    public InitFrame(selector: string, parent: CUIWindow | null): CUIFrameWindow;

    public InitFrameLine(selector: string, parent: CUIWindow | null): CUIFrameLineWnd;

    public InitKeyBinding(selector: string, parent: CUIWindow | null): CUIWindow;

    public InitLabel(selector: string, parent: CUIWindow | null): CUIStatic;

    public InitList(selector: string, parent: CUIWindow | null): CUIListWnd;

    public InitListBox<T extends CUIListBoxItem = CUIListBoxItem>(
      selector: string,
      parent: CUIWindow | null
    ): CUIListBox<T>;

    public InitMMShniaga(selector: string, parent: CUIWindow | null): CUIMMShniaga;

    public InitMPPlayerName(selector: string, parent: CUIWindow | null): CUIEditBox;

    public InitMapInfo(selector: string, parent: CUIWindow | null): CUIMapInfo;

    public InitMapList(selector: string, parent: CUIWindow | null): CUIMapList;

    public InitProgressBar(selector: string, parent: CUIWindow | null): CUIProgressBar;

    public InitScrollView(selector: string, parent: CUIWindow | null): CUIScrollView;

    public InitServerList(selector: string, parent: CUIWindow | null): CServerList;

    public InitSleepStatic(selector: string, parent: CUIWindow | null): CUISleepStatic;

    public InitSpinFlt(selector: string, parent: CUIWindow | null): CUISpinFlt;

    public InitSpinNum(selector: string, parent: CUIWindow | null): CUISpinNum;

    public InitSpinText(selector: string, parent: CUIWindow | null): CUISpinText;

    public InitStatic(selector: string, parent: CUIWindow | null): CUIStatic;

    public InitTab(selector: string, parent: CUIWindow | null): CUITabControl;

    public InitTextWnd(selector: string, parent: CUIWindow | null): CUITextWnd;

    public InitTrackBar(selector: string, parent: CUIWindow | null): CUITrackBar;

    public InitVerList(selector: string, parent: CUIWindow | null): CUIVersionList;

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
