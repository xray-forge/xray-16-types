declare module "xray16" {
  /**
   * @source C++ class COptionsManager
   * @customConstructor COptionsManager
   * @group xr_ui_core
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
   * @group xr_ui_core
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
   * @group xr_ui_core
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
   * @source C++ class UIStyleManager
   * @customConstructor UIStyleManager
   * @group xr_ui_core
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
   * @group xr_ui_core
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
   * @group xr_ui_core
   */
  export type TXR_CGameFont_alignment = EnumeratedStaticsValues<typeof CGameFont>;

  /**
   * @source C++ class ui_events
   * @customConstructor ui_events
   * @group xr_ui_core
   */
  export class ui_events {
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
  type TXR_ui_event = EnumeratedStaticsValues<typeof ui_events>;

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

  /**
   * Transforms dik key enumeration code to key binding code.
   *
   * @group xr_ui_core
   */
  export function dik_to_bind(this: void, keycode: i32): i32;
}
