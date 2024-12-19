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

    public InitWindow(selector: string, index: i32, parent: CUIWindow | null): void;
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
