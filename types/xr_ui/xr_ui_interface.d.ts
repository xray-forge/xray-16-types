declare module "xray16" {
  /**
   * @source C++ class CUIWindow
   * @customConstructor CUIWindow
   * @group xr_ui_interface
   */
  export class CUIWindow extends EngineBinding {
    public constructor();

    public IsShown(): boolean;
    public IsEnabled(): boolean;
    public IsAutoDelete(): boolean;
    public IsCursorOverWindow(): boolean;

    public GetFont(): CGameFont;
    public GetHeight(): f32;
    public GetWidth(): f32;
    public GetWndPos(): vector2;
    public GetAbsoluteRect(): Frect;

    public SetFont(font: CGameFont): void;
    public SetWndSize(vector2: vector2): void;
    public SetWndSize(width: f32, height: f32): void;
    public SetWindowName(name: string): void;
    public SetWndPos(vector2: vector2): void;
    public SetWndPos(x1: f32, y1: f32): void;
    public SetAutoDelete(auto_delete: boolean): void;
    public SetPPMode(): void;
    public SetHeight(height: f32): void;
    public SetWidth(width: f32): void;
    public SetWndRect(rect: Frect): void;
    public SetWndRect(x1: f32, y1: f32, x2: f32, y2: f32): void;

    public FocusReceiveTime(): u32;
    public Init(frect: Frect): void;
    public Init(x1: f32, y1: f32, x2: f32, y2: f32): void;
    public Enable(is_enabled: boolean): void;
    public AttachChild(child: CUIWindow): void;
    public DetachChild(child: CUIWindow): void;
    public WindowName(): string;
    public ResetPPMode(): void;
    public Show(show: boolean): void;
  }

  /**
   * @source C++ class CServerList : CUIWindow
   * @customConstructor CServerList
   * @group xr_ui_interface
   */
  export class CServerList extends CUIWindow {
    public static readonly ece_unique_nick_expired: 2;
    public static readonly ece_unique_nick_not_registred: 1;

    public SetPlayerName(name: string): void;
    public SetFilters(filters: SServerFilters): void;
    public RefreshList(value: boolean): void;
    public SetSortFunc(a: string, b: boolean): void;
    public NetRadioChanged(value: boolean): void;
    public ShowServerInfo(): void;
    public RefreshQuick(): void;
    public ConnectToSelected(): void;
    public SetConnectionErrCb(cb: connect_error_cb): void;
  }

  /**
   * @source C++ class CUIButton : CUIStatic
   * @customConstructor CUIButton
   * @group xr_ui_interface
   */
  export class CUIButton extends CUIStatic {}

  /**
   * @source C++ class CUI3tButton : CUIButton
   * @customConstructor CUI3tButton
   * @group xr_ui_interface
   */
  export class CUI3tButton extends CUIButton {}

  /**
   * @source C++ class CUICheckButton : CUI3tButton
   * @customConstructor CUICheckButton
   * @group xr_ui_interface
   */
  export class CUICheckButton extends CUI3tButton {
    public SetCheck(value: boolean): void;
    public GetCheck(): boolean;
    public SetDependControl(window: CUIWindow): void;
  }

  /**
   * @source C++ class CUIComboBox : CUIWindow
   * @customConstructor CUIComboBox
   * @group xr_ui_interface
   */
  export class CUIComboBox extends CUIWindow {
    public enable_id(id: i32): void;
    public disable_id(id: i32): void;
    public ClearList(): void;
    public SetText(text: string): void;
    public AddItem(label: string, id: i32): void;
    public GetText(): string;
    public SetListLength(length: i32): void;
    public CurrentID(): i32;
    public GetTextOf(id: i32): string;
    public SetCurrentOptValue(): void;
    public SetVertScroll(enabled: boolean): void;
    public SetCurrentID(id: i32): void;
  }

  /**
   * @source C++ class CUICustomEdit : CUIWindow
   * @customConstructor CUICustomEdit
   * @group xr_ui_interface
   */
  export class CUICustomEdit extends CUIWindow {
    public GetText(): string;
    public SetText(text: string): void;
    public SetNextFocusCapturer(edit: CUICustomEdit): void;
    public CaptureFocus(value: boolean): void;
  }

  /**
   * @source C++ class CUICustomSpin : CUIWindow
   * @customConstructor CUICustomSpin
   * @group xr_ui_interface
   */
  export class CUICustomSpin extends CUIWindow {
    public GetText(): string;
  }

  /**
   * @source C++ class CUIDialogWnd : CUIWindow
   * @customConstructor CUIDialogWnd
   * @group xr_ui_interface
   */

  export class CUIDialogWnd extends CUIWindow {
    public HideDialog(): void;
    public ShowDialog(show: boolean): void;
    public GetHolder(): CDialogHolder;
    public SetHolder(holder: CDialogHolder): void;
  }

  /**
   * @source C++ class CUIScriptWnd : CUIDialogWnd,DLL_Pure
   * @customConstructor CUIScriptWnd
   * @group xr_ui_interface
   */
  export class CUIScriptWnd extends CUIDialogWnd {
    public constructor();

    public OnKeyboard(key: TXR_DIK_key, event: TXR_ui_event): boolean;
    public Update(): void;
    public AddCallback(name: string, event: number, cb: (this: void) => void, source?: CUIWindow): void;
    public Dispatch(command: number, parameter: number): boolean;
    public Register(window: CUIWindow, name: string): void;
    public Load(value: string): boolean;
    public GetListWnd(id: string): CUIListWnd | null;
    public GetDialogWnd(id: string): CUIDialogWnd | null;
    public GetEditBox(id: string): CUIEditBox | null;
    public GetListBox(id: string): CUIListBox | null;
    public GetFrameLineWnd(id: string): CUIFrameLineWnd | null;
    public GetTabControl(id: string): CUITabControl | null;
    public GetProgressBar(id: string): CUIProgressBar | null;
    public GetFrameWindow(id: string): CUIFrameWindow | null;
    public GetStatic(id: string): CUIStatic | null;
  }

  /**
   * @source C++ class CUIEditBox : CUICustomEdit
   * @customConstructor CUIEditBox
   * @group xr_ui_interface
   */
  export class CUIEditBox extends CUICustomEdit {
    public InitTexture(texture_id: string): void;
  }

  /**
   * @source C++ class CUIEditBoxEx : CUICustomEdit
   * @customConstructor CUIEditBoxEx
   * @group xr_ui_interface
   */
  export class CUIEditBoxEx extends CUICustomEdit {
    public InitTexture(texture_id: string): void;
  }

  /**
   * @source C++ class CUIFrameLineWnd : CUIWindow
   * @customConstructor CUIFrameLineWnd
   * @group xr_ui_interface
   */
  export class CUIFrameLineWnd extends CUIWindow {
    public SetColor(color: u32): void;
  }

  /**
   * @source C++ class CUIFrameWindow : CUIWindow
   * @customConstructor CUIFrameWindow
   * @group xr_ui_interface
   */
  export class CUIFrameWindow extends CUIWindow {
    public SetColor(color: u32): void;
  }

  /**
   * @source C++ class CUILines
   * @customConstructor CUILines
   * @group xr_ui_interface
   */
  export class CUILines {
    public GetText(): string;
    public SetElipsis(value: boolean): void;
    public SetFont(value: CGameFont): void;
    public SetText(text: string): void;
    public SetTextColor(color_code: u32): void;
    public SetTextST(text: string): void;
  }

  /**
   * @source C++ class CUIListBox : CUIScrollView
   * @customConstructor CUIListBox
   * @group xr_ui_interface
   */
  export class CUIListBox<T extends CUIListBoxItem = CUIListBoxItem> extends CUIScrollView {
    public GetSize(): u32;
    public GetItem(index: u32): CUIWindow;
    public GetItemByIndex(index: i32): T;
    public GetSelectedIndex(): u32;
    public GetSelectedItem(): T | null;
    public GetItemHeight(): f32;

    public AddExistingItem(item: T): void;
    public AddTextItem(text: string): T;
    public RemoveItem(window: CUIWindow): void;
    public RemoveAll(): void;
    public ShowSelectedItem(value: boolean): void;
    public SetItemHeight(height: f32): void;
    public SetSelectedIndex(index: u32): void;
  }

  /**
   * @source C++ class CUIListBoxItem : CUIFrameLineWnd
   * @customConstructor CUIListBoxItem
   * @group xr_ui_interface
   */
  export class CUIListBoxItem extends CUIFrameLineWnd {
    public constructor(height: f32);
    public constructor(target: CUIListBoxItem);
    public constructor(target: CUIListBoxItem, height: f32);

    public AddIconField(value: f32): CUIStatic;
    public SetTextColor(color: u32): void;
    public AddTextField(text: string, width: f32): CUITextWnd;
    public GetTextItem(): CUITextWnd;
  }

  /**
   * @source C++ class CUIListBoxItemMsgChain : CUIListBoxItem
   * @customConstructor CUIListBoxItemMsgChain
   * @group xr_ui_interface
   */
  export class CUIListBoxItemMsgChain extends CUIListBoxItem {}

  /**
   * @source C++ class CUIMMShniaga : CUIWindow
   * @customConstructor CUIMMShniaga
   * @group xr_ui_interface
   */
  export class CUIMMShniaga extends CUIWindow {
    public static readonly epi_main: 0;
    public static readonly epi_new_game: 1;
    public static readonly epi_new_network_game: 2;

    public ShowPage(page_id: TXR_MMShniaga_page): void;
    public SetPage(page_id: TXR_MMShniaga_page, xml: string, selector: string): void;
    public SetVisibleMagnifier(visible: boolean): void;
  }

  /**
   * @group xr_ui_interface
   */
  export type TXR_MMShniaga_page = EnumeratedStaticsValues<typeof CUIMMShniaga>;

  /**
   * @source C++ class CUIMapInfo : CUIWindow
   * @customConstructor CUIMapInfo
   * @group xr_ui_interface
   */
  export class CUIMapInfo extends CUIWindow {
    public InitMap(a: string, b: string): void;
  }

  /**
   * @source C++ class CUIMapList : CUIWindow
   * @customConstructor CUIMapList
   * @group xr_ui_interface
   */
  export class CUIMapList extends CUIWindow {
    public ClearList(): void;
    public GetCommandLine<T extends string>(value: string): T;
    public GetCurGameType(): TXR_GAME_TYPE;
    public IsEmpty(): boolean;
    public LoadMapList(): void;
    public OnModeChange(): void;
    public SaveMapList(): void;
    public SetMapInfo(info: CUIMapInfo): void;
    public SetMapPic(picture: CUIStatic): void;
    public SetModeSelector(modeSelector: CUISpinText): void;
    public SetServerParams(params: string): void;
    public SetWeatherSelector(selector: CUIComboBox): void;
    public StartDedicatedServer(): void;
  }

  /**
   * @source C++ class CUIMessageBox : CUIStatic
   * @customConstructor CUIMessageBox
   * @group xr_ui_interface
   */
  export class CUIMessageBox extends CUIStatic {
    public InitMessageBox(value: string): boolean;
    public GetPassword(): string;
    public GetHost(): string;
  }

  /**
   * @source C++ class CUIMessageBoxEx : CUIDialogWnd
   * @customConstructor CUIMessageBoxEx
   * @group xr_ui_interface
   */
  export class CUIMessageBoxEx extends CUIDialogWnd {
    public InitMessageBox(selector: string): void;
    public SetText(text: string): void;
    public GetPassword(): string;
    public GetHost(): string;
  }

  /**
   * @source C++ class CUIProgressBar : CUIWindow
   * @customConstructor CUIProgressBar
   * @group xr_ui_interface
   */
  export class CUIProgressBar extends CUIWindow {
    public GetRange_max(): f32;
    public GetRange_min(): f32;
    public SetProgressPos(value: f32): void;
    public GetProgressPos(): f32;
  }

  /**
   * @source C++ class CUIPropertiesBox : CUIFrameWindow
   * @customConstructor CUIPropertiesBox
   * @group xr_ui_interface
   */
  export class CUIPropertiesBox extends CUIFrameWindow {
    public AddItem(id: string): void;
    public AutoUpdateSize(): void;
    public RemoveItem(index: u32): void;
    public RemoveAll(): void;
    public Hide(): void;

    public Show(show: boolean): void;
    public Show(int1: i32, int2: i32): void;
  }

  /**
   * @source C++ class CUIVersionList : CUIWindow
   * @customConstructor CUIVersionList
   * @group xr_ui_interface
   */
  export class CUIVersionList {
    public constructor();

    public GetItemsCount(): u64;
    public SwitchToSelectedVersion(): void;
    public GetCurrentVersionDescr(): string;
    public GetCurrentVersionName(): string;
  }

  /**
   * @source C++ class CUIScrollView : CUIWindow
   * @customConstructor CUIScrollView
   * @group xr_ui_interface
   */
  export class CUIScrollView extends CUIWindow {
    public SetScrollPos(position: i32): void;
    public RemoveWindow(window: CUIWindow): void;
    public ScrollToBegin(): void;
    public GetCurrentScrollPos(): i32;
    public AddWindow(window: CUIWindow, value: boolean): void;
    public GetMaxScrollPos(): i32;
    public GetMinScrollPos(): i32;
    public ScrollToEnd(): void;
    public Clear(): void;
    public SetFixedScrollBar(fixed: boolean): void;
  }

  /**
   * @source C++ class CUISleepStatic : CUIStatic
   * @customConstructor CUISleepStatic
   * @group xr_ui_interface
   */
  export class CUISleepStatic extends CUIStatic {}

  /**
   * @source C++ class CUISpinFlt : CUICustomSpin
   * @customConstructor CUISpinFlt
   * @group xr_ui_interface
   */
  export class CUISpinFlt extends CUICustomSpin {}

  /**
   * @source C++ class CUISpinNum : CUICustomSpin
   * @customConstructor CUISpinNum
   * @group xr_ui_interface
   */
  export class CUISpinNum extends CUICustomSpin {}

  /**
   * @source C++ class CUISpinText : CUICustomSpin
   * @customConstructor CUISpinText
   * @group xr_ui_interface
   */
  export class CUISpinText extends CUICustomSpin {}

  /**
   * @source C++ class CUIStatic : CUIWindow
   * @customConstructor CUIStatic
   * @group xr_ui_interface
   */
  export class CUIStatic extends CUIWindow {
    public GetColor(): u32;
    public TextControl(): CUILines;
    public GetTextureRect(): Frect;
    public GetStretchTexture(): boolean;
    public SetStretchTexture(stretch: boolean): void;
    public SetTextureRect(frect: Frect): void;
    public InitTexture(texture: string): void;
    public SetTextColor(r: i32, g: i32, b: i32, a: i32): void;
    public SetHeading(number: f32): void;
    public SetTextST(string: string): void;
    public SetTextAlign(align: u32): void;
    public GetTextAlign(): u32;
    public GetText(): string;
    public InitTextureEx(first: string, second: string): void;
    public SetTextX(x: f32): void;
    public SetTextY(x: f32): void;
    public GetTextY(x: f32): void;
    public GetTextX(): f32;
    public SetTextureOffset(x: f32, y: f32): void;
    public SetColor(color: u32): void;
    public SetElipsis(a: i32, b: i32): void;
    public GetHeading(): f32;
    public SetText(text: string): void;
    public GetOriginalRect(): Frect;
    public SetOriginalRect(frect: Frect): void;
  }

  /**
   * @source C++ class CUITabButton : CUIButton
   * @customConstructor CUITabButton
   * @group xr_ui_interface
   */
  export class CUITabButton extends CUIButton {}

  /**
   * @source C++ class CUITabControl : CUIWindow
   * @customConstructor CUITabControl
   * @group xr_ui_interface
   */
  export class CUITabControl extends CUIWindow {
    public GetActiveId(): string;
    public SetActiveTab(id: string): void;
    public SetActiveTab(id: u32): void;
    public GetTabsCount(): u32;
    public GetButtonById(id: string): CUITabButton;
    public RemoveAll(): void;
    public AddItem(item: CUITabButton): void;
    public AddItem(id: string, name: string, top_left: vector2, bot_right: vector2): void;
    public RemoveItem(id: string): void;
    public GetButtonByIndex(index: u32): CUITabButton;
    public SetNewActiveTab(index: u32): void;
    public GetActiveIndex(): i32;
  }

  /**
   * @source C++ class CUITextWnd : CUIWindow
   * @customConstructor CUITextWnd
   * @group xr_ui_interface
   */
  export class CUITextWnd extends CUIWindow {
    public SetTextOffset(x: f32, y: f32): void;
    public SetText(text: string): void;
    public SetTextAlignment(align: TXR_CGameFont_alignment): void;
    public SetTextComplexMode(complex: boolean): void;
    public GetText(): string;
    public GetTextColor(): u32;
    public SetTextColor(color: u32): void;
    public SetTextST(text: string): void;
    public AdjustHeightToText(): void;
    public AdjustWidthToText(): void;
    public SetEllipsis(value: boolean): void;
    public SetVTextAlignment(alignment: TXR_CGameFont_alignment): void;
  }

  /**
   * @source C++ class CUITrackBar : CUIWindow
   * @customConstructor CUITrackBar
   * @group xr_ui_interface
   */
  export class CUITrackBar extends CUIWindow {
    public SetCheck(value: boolean): void;
    public SetCurrentValue(): void;
    public SetCurrentValue(value: f32): void;
    public SetCurrentValue(value: i32): void;
    public GetCheck(): boolean;
    public GetIValue(): i32;
    public GetFValue(): f32;
    public SetOptIBounds(min: i32, max: i32): void;
    public SetOptFBounds(min: f32, max: f32): number;
  }

  /**
   * @source C++ class CDialogHolder
   * @customConstructor CDialogHolder
   * @group xr_ui_interface
   */
  export class CDialogHolder {
    public RemoveDialogToRender(window: CUIWindow): void;
    public AddDialogToRender(window: CUIWindow): void;
    public TopInputReceiver(): CUIDialogWnd;
    public SetMainInputReceiver(window: CUIDialogWnd, find_remove: boolean): boolean;
    public MainInputReceiver(): CUIDialogWnd;
    public start_stop_menu(window: CUIWindow, value: boolean): void;
  }

  /**
   * @source C++ class StaticDrawableWrapper
   * @customConstructor StaticDrawableWrapper
   * @group xr_ui_interface
   */
  export class StaticDrawableWrapper {
    public m_endTime: f32;

    private constructor();

    public Draw(): void;
    public Update(): void;

    public IsActual(): boolean;
    public SetText(text: string): void;

    public destroy(): void;
    public wnd(): CUIStatic;
  }

  /**
   * @source C++ class CUIListWnd : CUIWindow
   * @customConstructor CUIListWnd
   * @group xr_ui_interface
   */
  export class CUIListWnd extends CUIWindow {
    public SetVertFlip(flip: boolean): void;
    public RemoveItem(index: i32): void;
    public ScrollToPos(position: i32): void;
    public ShowSelectedItem(show: boolean): void;
    public EnableScrollBar(enable: boolean): void;
    public GetItem(index: i32): CUIListItem;
    public GetVertFlip(): boolean;
    public SetTextColor(color: i32): void;
    public GetSelectedItem(): i32;
    public ScrollToEnd(): void;
    public SetFocusedItem(index: i32): void;
    public ActivateList(flag: boolean): void;
    public GetSize(): i32;
    public IsScrollBarEnabled(): boolean;
    public ScrollToBegin(): void;
    public RemoveAll(): void;
    public AddItem(item: CUIListItem): boolean;
    public SetItemHeight(height: f32): void;
    public GetItemPos(item: CUIListItem): i32;
    public IsListActive(): boolean;
    public GetFocusedItem(): i32;
    public ResetFocusCapture(): void;
  }

  /**
   * @source C++ class CUIListItem : CUIButton
   * @customConstructor CUIListItem
   * @group xr_ui_interface
   */
  export class CUIListItem extends CUIButton {}

  /**
   * @source C++ class CUIListItemEx : CUIListItem
   * @customConstructor CUIListItemEx
   * @group xr_ui_interface
   */
  export class CUIListItemEx extends CUIListItem {
    public SetSelectionColor(color: u32): void;
  }

  /**
   * @source C++ class UIHint : CUIWindow
   * @customConstructor UIHint
   * @group xr_ui_interface
   */
  export class UIHint extends CUIWindow {
    public constructor();

    public GetHintText(): string;
    public SetHintText(hint: string): void;
  }

  /**
   * @source C++ class CUIPdaWnd : CUIDialogWnd
   * @customConstructor CUIPdaWnd
   * @group xr_ui_interface
   */
  export class CUIPdaWnd extends CUIDialogWnd {
    public constructor();

    public SetActiveSubdialog(section: string): void;
    public GetActiveSection(): string;
    public GetTabControl(): CUITabControl;
  }

  /**
   * @source C++ class CUIActorMenu : CUIDialogWnd
   * @customConstructor CUIActorMenu
   * @group xr_ui_interface
   */
  export class CUIActorMenu extends CUIDialogWnd {
    public constructor();

    public get_drag_item(): game_object | null;
    public highlight_section_in_slot(section: string, type: TXR_EDDListType, slot_id: u16): void;
    public highlight_for_each_in_slot(
      functor: (object: game_object) => boolean,
      type: TXR_EDDListType,
      slot_id: u16
    ): void;
    public refresh_current_cell_item(): void;
  }

  /**
   * @source C++ enum EDDListType
   * @customConstructor EDDListType
   * @group xr_ui_interface
   */
  export class EDDListType {
    public static readonly iActorBag: 2;
    public static readonly iActorBelt: 3;
    public static readonly iActorSlot: 1;
    public static readonly iActorTrade: 4;
    public static readonly iDeadBodyBag: 7;
    public static readonly iInvalid: 0;
    public static readonly iPartnerTrade: 6;
    public static readonly iPartnerTradeBag: 5;
    public static readonly iQuickSlot: 8;
    public static readonly iTrashSlot: 9;

    private constructor();
  }

  export type TXR_EDDListType = EnumeratedStaticsValues<typeof EDDListType>;
}
