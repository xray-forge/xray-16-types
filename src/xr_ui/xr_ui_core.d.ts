declare module "xray16" {
  /**
   * @source C++ class COptionsManager
   * @customConstructor COptionsManager
   * @group xr_ui_core
   */
  export class XR_COptionsManager {
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
   * @group xr_ui_core
   */
  export class XR_CMainMenu {
    public GetCDKey(): string;
    public GetAccountMngr(): XR_account_manager;
    public GetDemoInfo(fileName: string): XR_demo_info | null;
    public GetPatchProgress(): XR_Patch_Dawnload_Progress;
    public GetProfileStore(): XR_profile_store;
    public GetGSVer(): string;
    public GetLoginMngr(): XR_login_manager;
    public GetPlayerName(): string;
    public CancelDownload(): void;
    public ValidateCDKey(): boolean;
  }

  /**
   * @source C++ class CUIGameCustom
   * @customConstructor CUIGameCustom
   * @group xr_ui_core
   */
  export class XR_CUIGameCustom {
    public AddCustomStatic(id: string, b: boolean): XR_StaticDrawableWrapper;
    public AddCustomStatic(id: string, b: boolean, n: f32): XR_StaticDrawableWrapper;
    public AddDialogToRender(window: XR_CUIWindow): void;
    public CurrentItemAtCell(): XR_game_object;
    public GetCustomStatic(value: string): XR_StaticDrawableWrapper | null;
    public HideActorMenu(): void;
    public HidePdaMenu(): void;
    public RemoveCustomStatic(id: string): void;
    public RemoveDialogToRender(window: XR_CUIWindow): void;
    public UpdateActorMenu(): void;
    public enable_fake_indicators(enabled: boolean): void;
    public hide_messages(): void;
    public show_messages(): void;
    public update_fake_indicators(u8: number, enabled: boolean): void;
    public update_fake_indicators(u8: number, value: f32): void;
  }

  /**
   * @source C++ class CScriptXmlInit
   * @customConstructor CScriptXmlInit
   * @group xr_ui_core
   */
  export class XR_CScriptXmlInit {
    public constructor();

    public ParseFile(path: string): void;
    public ParseShTexInfo(path: string): void;

    public Init3tButton(selector: string, window: XR_CUIWindow | null): XR_CUI3tButton;
    public InitAnimStatic(selector: string, window: XR_CUIWindow | null): XR_CUIStatic;
    public InitCDkey(selector: string, window: XR_CUIWindow | null): XR_CUIEditBox;
    public InitCheck(selector: string, window: XR_CUIWindow | null): XR_CUICheckButton;
    public InitComboBox(selector: string, window: XR_CUIWindow | null): XR_CUIComboBox;
    public InitEditBox(selector: string, window: XR_CUIWindow | null): XR_CUIEditBox;
    public InitFrame(selector: string, window: XR_CUIWindow | null): XR_CUIFrameWindow;
    public InitFrameLine(selector: string, window: XR_CUIWindow | null): XR_CUIFrameLineWnd;
    public InitKeyBinding(selector: string, window: XR_CUIWindow | null): XR_CUIWindow;
    public InitLabel(selector: string, window: XR_CUIWindow | null): XR_CUIStatic;
    public InitList(selector: string, window: XR_CUIWindow | null): XR_CUIListWnd;
    public InitListBox<T extends XR_CUIListBoxItem = XR_CUIListBoxItem>(
      selector: string,
      window: XR_CUIWindow | null
    ): XR_CUIListBox<T>;
    public InitMMShniaga(selector: string, window: XR_CUIWindow | null): XR_CUIMMShniaga;
    public InitMPPlayerName(selector: string, window: XR_CUIWindow | null): XR_CUIEditBox;
    public InitMapInfo(selector: string, window: XR_CUIWindow | null): XR_CUIMapInfo;
    public InitMapList(selector: string, window: XR_CUIWindow | null): XR_CUIMapList;
    public InitProgressBar(selector: string, window: XR_CUIWindow | null): XR_CUIProgressBar;
    public InitScrollView(selector: string, window: XR_CUIWindow | null): XR_CUIScrollView;
    public InitServerList(selector: string, window: XR_CUIWindow | null): XR_CServerList;
    public InitSleepStatic(selector: string, window: XR_CUIWindow | null): XR_CUISleepStatic;
    public InitSpinFlt(selector: string, window: XR_CUIWindow | null): XR_CUISpinFlt;
    public InitSpinNum(selector: string, window: XR_CUIWindow | null): XR_CUISpinNum;
    public InitSpinText(selector: string, window: XR_CUIWindow | null): XR_CUISpinText;
    public InitStatic(selector: string, window: XR_CUIWindow | null): XR_CUIStatic;
    public InitTab(selector: string, window: XR_CUIWindow | null): XR_CUITabControl;
    public InitTextWnd(selector: string, window: XR_CUIWindow | null): XR_CUITextWnd;
    public InitTrackBar(selector: string, window: XR_CUIWindow | null): XR_CUITrackBar;
    public InitVerList(selector: string, window: XR_CUIWindow | null): XR_CUIVersionList;
    public InitWindow(selector: string, index: i32, window: XR_CUIWindow | null): void;
  }

  /**
   * @source C++ class CGameFont
   * @group xr_ui_core
   */
  export class XR_CGameFont {
    public static readonly alCenter: 2;
    public static readonly alLeft: 0;
    public static readonly alRight: 1;

    private constructor();
  }

  /**
   * EVTextAlignment.
   *
   * @group xr_ui_core
   */
  export type TXR_CGameFont_alignment = EnumeratedStaticsValues<typeof XR_CGameFont>;

  /**
   * @source C++ class ui_events
   * @group xr_ui_core
   */
  export class XR_ui_events {
    public static readonly BUTTON_CLICKED: 19;
    public static readonly BUTTON_DOWN: 20;
    public static readonly CHECK_BUTTON_RESET: 23;
    public static readonly CHECK_BUTTON_SET: 22;
    public static readonly EDIT_TEXT_COMMIT: 79;
    public static readonly LIST_ITEM_CLICKED: 37;
    public static readonly LIST_ITEM_SELECT: 38;
    public static readonly LIST_ITEM_UNSELECT: 39;
    public static readonly MAIN_MENU_RELOADED: 84;
    public static readonly MESSAGE_BOX_CANCEL_CLICKED: 47;
    public static readonly MESSAGE_BOX_COPY_CLICKED: 48;
    public static readonly MESSAGE_BOX_NO_CLICKED: 46;
    public static readonly MESSAGE_BOX_OK_CLICKED: 42;
    public static readonly MESSAGE_BOX_QUIT_GAME_CLICKED: 45;
    public static readonly MESSAGE_BOX_QUIT_WIN_CLICKED: 44;
    public static readonly MESSAGE_BOX_YES_CLICKED: 43;
    public static readonly PROPERTY_CLICKED: 41;
    public static readonly RADIOBUTTON_SET: 24;
    public static readonly SCROLLBAR_HSCROLL: 34;
    public static readonly SCROLLBAR_VSCROLL: 33;
    public static readonly SCROLLBOX_MOVE: 32;
    public static readonly TAB_CHANGED: 21;
    public static readonly WINDOW_KEYBOARD_CAPTURE_LOST: 16;
    public static readonly WINDOW_KEY_PRESSED: 12;
    public static readonly WINDOW_KEY_RELEASED: 13;
    public static readonly WINDOW_LBUTTON_DB_CLICK: 11;
    public static readonly WINDOW_LBUTTON_DOWN: 0;
    public static readonly WINDOW_LBUTTON_UP: 3;
    public static readonly WINDOW_MOUSE_MOVE: 6;
    public static readonly WINDOW_RBUTTON_DOWN: 1;
    public static readonly WINDOW_RBUTTON_UP: 4;
  }

  /**
   * @group xr_ui_core
   */
  type TXR_ui_event = EnumeratedStaticsValues<typeof XR_ui_events>;
}
