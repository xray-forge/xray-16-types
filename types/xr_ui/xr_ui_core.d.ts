declare module "xray16" {
  /**
   * @source C++ class CScriptXmlInit
   * @customConstructor CScriptXmlInit
   * @group xr_ui_core
   */
  export class CScriptXmlInit {
    public constructor();

    public ParseFile(path: string): void;

    public ParseShTexInfo(path: string): void;

    public Init3tButton(selector: string, window: CUIWindow | null): CUI3tButton;

    public InitAnimStatic(selector: string, window: CUIWindow | null): CUIStatic;

    public InitCDkey(selector: string, window: CUIWindow | null): CUIEditBox;

    public InitCheck(selector: string, window: CUIWindow | null): CUICheckButton;

    public InitComboBox(selector: string, window: CUIWindow | null): CUIComboBox;

    public InitEditBox(selector: string, window: CUIWindow | null): CUIEditBox;

    public InitFrame(selector: string, window: CUIWindow | null): CUIFrameWindow;

    public InitFrameLine(selector: string, window: CUIWindow | null): CUIFrameLineWnd;

    public InitKeyBinding(selector: string, window: CUIWindow | null): CUIWindow;

    public InitLabel(selector: string, window: CUIWindow | null): CUIStatic;

    public InitList(selector: string, window: CUIWindow | null): CUIListWnd;

    public InitListBox<T extends CUIListBoxItem = CUIListBoxItem>(
      selector: string,
      window: CUIWindow | null
    ): CUIListBox<T>;

    public InitMMShniaga(selector: string, window: CUIWindow | null): CUIMMShniaga;

    public InitMPPlayerName(selector: string, window: CUIWindow | null): CUIEditBox;

    public InitMapInfo(selector: string, window: CUIWindow | null): CUIMapInfo;

    public InitMapList(selector: string, window: CUIWindow | null): CUIMapList;

    public InitProgressBar(selector: string, window: CUIWindow | null): CUIProgressBar;

    public InitScrollView(selector: string, window: CUIWindow | null): CUIScrollView;

    public InitServerList(selector: string, window: CUIWindow | null): CServerList;

    public InitSleepStatic(selector: string, window: CUIWindow | null): CUISleepStatic;

    public InitSpinFlt(selector: string, window: CUIWindow | null): CUISpinFlt;

    public InitSpinNum(selector: string, window: CUIWindow | null): CUISpinNum;

    public InitSpinText(selector: string, window: CUIWindow | null): CUISpinText;

    public InitStatic(selector: string, window: CUIWindow | null): CUIStatic;

    public InitTab(selector: string, window: CUIWindow | null): CUITabControl;

    public InitTextWnd(selector: string, window: CUIWindow | null): CUITextWnd;

    public InitTrackBar(selector: string, window: CUIWindow | null): CUITrackBar;

    public InitVerList(selector: string, window: CUIWindow | null): CUIVersionList;

    public InitWindow(selector: string, index: i32, window: CUIWindow | null): void;
  }

  /**
   * @group xr_ui_core
   */
  export function FitInRect(this: void, window: CUIWindow, rect: Frect, a: number, b: number): boolean;

  /**
   * @group xr_ui_core
   */
  export function GetTextureRect(this: void, str: string): Frect;

  /**
   * @group xr_ui_core
   */
  export function GetCursorPosition(this: void): vector2;

  /**
   * @group xr_ui_core
   */
  export function SetCursorPosition(this: void, vector: vector2): void;
}
