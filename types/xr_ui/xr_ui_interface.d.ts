declare module "xray16" {
  /**
   * Base UI window used by script-created controls.
   *
   * @source C++ class CUIWindow
   * @customConstructor CUIWindow
   * @group xr_ui_interface
   */
  export class CUIWindow extends EngineBinding {
    /**
     * Create an empty UI window.
     */
    public constructor();

    /**
     * @returns Whether the window is visible.
     */
    public IsShown(): boolean;

    /**
     * @returns Whether the window accepts interaction.
     */
    public IsEnabled(): boolean;

    /**
     * @returns Whether the engine owns and deletes this window with its parent.
     */
    public IsAutoDelete(): boolean;

    /**
     * @returns Whether the UI cursor is currently over this window.
     */
    public IsCursorOverWindow(): boolean;

    /**
     * @returns Font assigned to this window.
     */
    public GetFont(): CGameFont;

    /**
     * @returns Window height.
     */
    public GetHeight(): f32;

    /**
     * @returns Window width.
     */
    public GetWidth(): f32;

    /**
     * @returns Window position relative to its parent.
     */
    public GetWndPos(): vector2;

    /**
     * @returns Window rectangle in screen coordinates.
     */
    public GetAbsoluteRect(): Frect;

    /**
     * Set the font used by this window.
     *
     * @param font - Font object.
     */
    public SetFont(font: CGameFont): void;

    /**
     * Set window size.
     *
     * @param vector2 - New size.
     */
    public SetWndSize(vector2: vector2): void;

    /**
     * Set window size.
     *
     * @param width - New width.
     * @param height - New height.
     */
    public SetWndSize(width: f32, height: f32): void;

    /**
     * Set debug/window name.
     *
     * @param name - Window name.
     */
    public SetWindowName(name: string): void;

    /**
     * Set window position.
     *
     * @param vector2 - New position.
     */
    public SetWndPos(vector2: vector2): void;

    /**
     * Set window position.
     *
     * @param x1 - X position.
     * @param y1 - Y position.
     */
    public SetWndPos(x1: f32, y1: f32): void;

    /**
     * Set whether the parent owns this child window.
     *
     * @param auto_delete - Whether the engine should delete the child automatically.
     */
    public SetAutoDelete(auto_delete: boolean): void;

    /**
     * Enable post-process mode for this window.
     */
    public SetPPMode(): void;

    /**
     * Set window height.
     *
     * @param height - New height.
     */
    public SetHeight(height: f32): void;

    /**
     * Set window width.
     *
     * @param width - New width.
     */
    public SetWidth(width: f32): void;

    /**
     * Set window rectangle.
     *
     * @param rect - New rectangle.
     */
    public SetWndRect(rect: Frect): void;

    /**
     * Set window rectangle.
     *
     * @param x1 - X position.
     * @param y1 - Y position.
     * @param x2 - Width.
     * @param y2 - Height.
     */
    public SetWndRect(x1: f32, y1: f32, x2: f32, y2: f32): void;

    /**
     * @returns Level time when this window received focus.
     */
    public FocusReceiveTime(): u32;

    /**
     * Initialize window rectangle.
     *
     * @param frect - Window rectangle.
     */
    public Init(frect: Frect): void;

    /**
     * Initialize window rectangle.
     *
     * @param x1 - X position.
     * @param y1 - Y position.
     * @param x2 - Width.
     * @param y2 - Height.
     */
    public Init(x1: f32, y1: f32, x2: f32, y2: f32): void;

    /**
     * Enable or disable interaction.
     *
     * @param is_enabled - Whether the window should be enabled.
     */
    public Enable(is_enabled: boolean): void;

    /**
     * Attach a child window.
     *
     * @param child - Child window.
     */
    public AttachChild(child: CUIWindow): void;

    /**
     * Detach a child window.
     *
     * @param child - Child window.
     */
    public DetachChild(child: CUIWindow): void;

    /**
     * @returns Window name.
     */
    public WindowName(): string;

    /**
     * Disable post-process mode for this window.
     */
    public ResetPPMode(): void;

    /**
     * Show or hide the window.
     *
     * @param show - Whether the window should be visible.
     */
    public Show(show: boolean): void;
  }

  /**
   * @source C++ class CServerList : CUIWindow
   * @customConstructor CServerList
   * @group xr_ui_interface
   */
  export class CServerList extends CUIWindow {
    /**
     * Engine enum value for `CServerList.ece_unique_nick_expired`.
     */
    public static readonly ece_unique_nick_expired: 2;
    /**
     * Engine enum value for `CServerList.ece_unique_nick_not_registred`.
     */
    public static readonly ece_unique_nick_not_registred: 1;

    /**
     * Set the player name used for server browser queries.
     *
     * @param name - Player name.
     */
    public SetPlayerName(name: string): void;

    /**
     * Apply server browser filters.
     *
     * @param filters - Filter settings.
     */
    public SetFilters(filters: SServerFilters): void;

    /**
     * Refresh the server list.
     *
     * @param value - Whether to force a refresh.
     */
    public RefreshList(value: boolean): void;

    /**
     * Set server list sorting.
     *
     * @param sort_column - Column or field name to sort by.
     * @param ascending - Whether sorting is ascending.
     */
    public SetSortFunc(sort_column: string, ascending: boolean): void;

    /**
     * Switch between internet and LAN server sources.
     *
     * @param value - Whether network radio mode is enabled.
     */
    public NetRadioChanged(value: boolean): void;

    /**
     * Show details for the selected server.
     */
    public ShowServerInfo(): void;

    /**
     * Refresh the quick server list view.
     */
    public RefreshQuick(): void;

    /**
     * Connect to the selected server.
     */
    public ConnectToSelected(): void;

    /**
     * Set callback for connection errors.
     *
     * @param cb - Error callback.
     */
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
    /**
     * Set checked state.
     *
     * @param value - New checked state.
     */
    public SetCheck(value: boolean): void;

    /**
     * @returns Whether the button is checked.
     */
    public GetCheck(): boolean;

    /**
     * Bind another control to this checkbox state.
     *
     * @param window - Dependent control.
     */
    public SetDependControl(window: CUIWindow): void;
  }

  /**
   * @source C++ class CUIComboBox : CUIWindow
   * @customConstructor CUIComboBox
   * @group xr_ui_interface
   */
  export class CUIComboBox extends CUIWindow {
    /**
     * Enable an item by id.
     *
     * @param id - Item id.
     */
    public enable_id(id: i32): void;

    /**
     * Disable an item by id.
     *
     * @param id - Item id.
     */
    public disable_id(id: i32): void;

    /**
     * Remove all items from the combo box.
     */
    public ClearList(): void;

    /**
     * Set the visible text.
     *
     * @param text - Text to show.
     */
    public SetText(text: string): void;

    /**
     * Add an item.
     *
     * @param label - Item text.
     * @param id - Item id.
     */
    public AddItem(label: string, id: i32): void;

    /**
     * @returns Current visible text.
     */
    public GetText(): string;

    /**
     * Set visible list length.
     *
     * @param length - Maximum visible item count.
     */
    public SetListLength(length: i32): void;

    /**
     * @returns Current item id.
     */
    public CurrentID(): i32;

    /**
     * Get text for an item id.
     *
     * @param id - Item id.
     * @returns Item text.
     */
    public GetTextOf(id: i32): string;

    /**
     * Apply the current option value from engine options.
     */
    public SetCurrentOptValue(): void;

    /**
     * Enable or disable the vertical scrollbar.
     *
     * @param enabled - Whether vertical scrolling is enabled.
     */
    public SetVertScroll(enabled: boolean): void;

    /**
     * Select an item by id.
     *
     * @param id - Item id.
     */
    public SetCurrentID(id: i32): void;

    /**
     * Select an item by index.
     *
     * @param index - Item index.
     */
    public SetCurrentIdx(index: u32): void;

    /**
     * @returns Current selected item index.
     */
    public GetCurrentIdx(): u32;

    /**
     * Apply the current combo value.
     */
    public SetCurrentValue(): void;
  }

  /**
   * @source C++ class CUICustomEdit : CUIWindow
   * @customConstructor CUICustomEdit
   * @group xr_ui_interface
   */
  export class CUICustomEdit extends CUIWindow {
    /**
     * @returns Current edit text.
     */
    public GetText(): string;

    /**
     * Set edit text.
     *
     * @param text - New text.
     */
    public SetText(text: string): void;

    /**
     * Set the edit control that receives focus after this one.
     *
     * @param edit - Next edit control.
     */
    public SetNextFocusCapturer(edit: CUICustomEdit): void;

    /**
     * Capture or release keyboard focus.
     *
     * @param value - Whether focus should be captured.
     */
    public CaptureFocus(value: boolean): void;
  }

  /**
   * @source C++ class CUICustomSpin : CUIWindow
   * @customConstructor CUICustomSpin
   * @group xr_ui_interface
   */
  export class CUICustomSpin extends CUIWindow {
    /**
     * @returns Current spin text.
     */
    public GetText(): string;
  }

  /**
   * @source C++ class CUIDialogWnd : CUIWindow
   * @customConstructor CUIDialogWnd
   * @group xr_ui_interface
   */

  export class CUIDialogWnd extends CUIWindow {
    /**
     * Hide the dialog.
     */
    public HideDialog(): void;

    /**
     * Show or hide the dialog.
     *
     * @param show - Whether the dialog should be visible.
     */
    public ShowDialog(show: boolean): void;

    /**
     * @returns Dialog holder.
     */
    public GetHolder(): CDialogHolder;

    /**
     * Assign a dialog holder.
     *
     * @param holder - Dialog holder.
     */
    public SetHolder(holder: CDialogHolder): void;
  }

  /**
   * @source C++ class CUIScriptWnd : CUIDialogWnd,DLL_Pure
   * @customConstructor CUIScriptWnd
   * @group xr_ui_interface
   */
  export class CUIScriptWnd extends CUIDialogWnd {
    /**
     * Create a script-driven dialog window.
     */
    public constructor();

    /**
     * Handle keyboard input.
     *
     * @param key - DIK key code.
     * @param event - UI keyboard event.
     * @returns Whether the event was handled.
     */
    public OnKeyboard(key: TXR_DIK_key, event: TXR_ui_event): boolean;

    /**
     * Update the script window.
     */
    public Update(): void;

    /**
     * Register a named UI callback.
     *
     * @param name - Control name.
     * @param event - UI event id.
     * @param cb - Callback function.
     * @param source - Optional callback owner.
     */
    public AddCallback(name: string, event: number, cb: (this: void) => void, source?: CUIWindow): void;

    /**
     * Dispatch a UI command.
     *
     * @param command - Command id.
     * @param parameter - Command parameter.
     * @returns Whether the command was handled.
     */
    public Dispatch(command: number, parameter: number): boolean;

    /**
     * Register a child window for lookup and callbacks.
     *
     * @param window - Child window.
     * @param name - Optional registration name.
     */
    public Register(window: CUIWindow, name?: string): void;

    /**
     * Load a UI section or XML resource.
     *
     * @param value - Resource or section name.
     * @returns Whether the load succeeded.
     */
    public Load(value: string): boolean;

    /**
     * Find a list window by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetListWnd(id: string): CUIListWnd | null;

    /**
     * Find a dialog window by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetDialogWnd(id: string): CUIDialogWnd | null;

    /**
     * Find an edit box by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetEditBox(id: string): CUIEditBox | null;

    /**
     * Find a list box by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetListBox(id: string): CUIListBox | null;

    /**
     * Find a frame line by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetFrameLineWnd(id: string): CUIFrameLineWnd | null;

    /**
     * Find a tab control by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetTabControl(id: string): CUITabControl | null;

    /**
     * Find a progress bar by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetProgressBar(id: string): CUIProgressBar | null;

    /**
     * Find a frame window by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetFrameWindow(id: string): CUIFrameWindow | null;

    /**
     * Find a static control by id.
     *
     * @param id - Window id.
     * @returns Control instance, or `null` when not found or not matching.
     */
    public GetStatic(id: string): CUIStatic | null;
  }

  /**
   * @source C++ class CUIEditBox : CUICustomEdit
   * @customConstructor CUIEditBox
   * @group xr_ui_interface
   */
  export class CUIEditBox extends CUICustomEdit {
    /**
     * Initialize the edit box texture.
     *
     * @param texture_id - Texture atlas entry name.
     */
    public InitTexture(texture_id: string): void;
  }

  /**
   * @source C++ class CUIEditBoxEx : CUICustomEdit
   * @customConstructor CUIEditBoxEx
   * @group xr_ui_interface
   */
  export class CUIEditBoxEx extends CUICustomEdit {
    /**
     * Initialize the extended edit box texture.
     *
     * @param texture_id - Texture atlas entry name.
     */
    public InitTexture(texture_id: string): void;
  }

  /**
   * @source C++ class CUIFrameLineWnd : CUIWindow
   * @customConstructor CUIFrameLineWnd
   * @group xr_ui_interface
   */
  export class CUIFrameLineWnd extends CUIWindow {
    /**
     * Set frame line color.
     *
     * @param color - ARGB color.
     */
    public SetColor(color: u32): void;
  }

  /**
   * @source C++ class CUIFrameWindow : CUIWindow
   * @customConstructor CUIFrameWindow
   * @group xr_ui_interface
   */
  export class CUIFrameWindow extends CUIWindow {
    /**
     * Set frame color.
     *
     * @param color - ARGB color.
     */
    public SetColor(color: u32): void;
  }

  /**
   * @source C++ class CUILines
   * @customConstructor CUILines
   * @group xr_ui_interface
   */
  export class CUILines {
    /**
     * @returns Current text.
     */
    public GetText(): string;

    /**
     * Enable or disable ellipsis.
     *
     * @param value - Whether long text should be ellipsized.
     */
    public SetElipsis(value: boolean): void;

    /**
     * Set text font.
     *
     * @param value - Font object.
     */
    public SetFont(value: CGameFont): void;

    /**
     * Set raw text.
     *
     * @param text - Text value.
     */
    public SetText(text: string): void;

    /**
     * Set text color.
     *
     * @param color_code - ARGB color.
     */
    public SetTextColor(color_code: u32): void;

    /**
     * Set translated string-table text.
     *
     * @param text - String table id.
     */
    public SetTextST(text: string): void;
  }

  /**
   * @source C++ class CUIListBox : CUIScrollView
   * @customConstructor CUIListBox
   * @group xr_ui_interface
   */
  export class CUIListBox<T extends CUIListBoxItem = CUIListBoxItem> extends CUIScrollView {
    /**
     * @returns Number of items in the list.
     */
    public GetSize(): u32;

    /**
     * Get item window by index.
     *
     * @param index - Item index.
     * @returns Item window.
     */
    public GetItem(index: u32): CUIWindow;

    /**
     * Get typed item by index.
     *
     * @param index - Item index.
     * @returns List box item.
     */
    public GetItemByIndex(index: i32): T;

    /**
     * @returns Selected item index.
     */
    public GetSelectedIndex(): u32;

    /**
     * @returns Selected item, or `null` when nothing is selected.
     */
    public GetSelectedItem(): T | null;

    /**
     * @returns List item height.
     */
    public GetItemHeight(): f32;

    /**
     * Add an existing item and transfer it to the list.
     *
     * @param item - Item to add.
     */
    public AddExistingItem(item: T): void;

    /**
     * Add a text item.
     *
     * @param text - Item text.
     * @returns Created item.
     */
    public AddTextItem(text: string): T;

    /**
     * Remove an item window.
     *
     * @param window - Item window.
     */
    public RemoveItem(window: CUIWindow): void;

    /**
     * Remove all items.
     */
    public RemoveAll(): void;

    /**
     * Scroll the selected item into view.
     *
     * @param value - Whether selected item should be shown.
     */
    public ShowSelectedItem(value: boolean): void;

    /**
     * Set list item height.
     *
     * @param height - Item height.
     */
    public SetItemHeight(height: f32): void;

    /**
     * Select an item by index.
     *
     * @param index - Item index.
     */
    public SetSelectedIndex(index: u32): void;
  }

  /**
   * @source C++ class CUIListBoxItem : CUIFrameLineWnd
   * @customConstructor CUIListBoxItem
   * @group xr_ui_interface
   */
  export class CUIListBoxItem extends CUIFrameLineWnd {
    /**
     * Create a list box item with height.
     *
     * @param height - Item height.
     */
    public constructor(height: f32);

    /**
     * Copy an existing list box item.
     *
     * @param target - Source item.
     */
    public constructor(target: CUIListBoxItem);

    /**
     * Copy an existing list box item and override its height.
     *
     * @param target - Source item.
     * @param height - Item height.
     */
    public constructor(target: CUIListBoxItem, height: f32);

    /**
     * Add an icon field to the item.
     *
     * @param value - Field width.
     * @returns Created static field.
     */
    public AddIconField(value: f32): CUIStatic;

    /**
     * Set item text color.
     *
     * @param color - ARGB color.
     */
    public SetTextColor(color: u32): void;

    /**
     * Add a text field to the item.
     *
     * @param text - Field text.
     * @param width - Field width.
     * @returns Created text window.
     */
    public AddTextField(text: string, width: f32): CUITextWnd;

    /**
     * @returns Main text item.
     */
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
    /**
     * Engine enum value for `CUIMMShniaga.epi_main`.
     */
    public static readonly epi_main: 0;
    /**
     * Engine enum value for `CUIMMShniaga.epi_new_game`.
     */
    public static readonly epi_new_game: 1;
    /**
     * Engine enum value for `CUIMMShniaga.epi_new_network_game`.
     */
    public static readonly epi_new_network_game: 2;

    /**
     * Show a main-menu page.
     *
     * @param page_id - Page id.
     */
    public ShowPage(page_id: TXR_MMShniaga_page): void;

    /**
     * Configure a main-menu page from XML.
     *
     * @param page_id - Page id.
     * @param xml - XML file name.
     * @param selector - XML selector.
     */
    public SetPage(page_id: TXR_MMShniaga_page, xml: string, selector: string): void;

    /**
     * Show or hide the menu magnifier.
     *
     * @param visible - Whether magnifier should be visible.
     */
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
    /**
     * Load map metadata for display.
     *
     * @param map_name - Map name.
     * @param map_version - Map version.
     */
    public InitMap(map_name: string, map_version: string): void;
  }

  /**
   * @source C++ class CUIMapList : CUIWindow
   * @customConstructor CUIMapList
   * @group xr_ui_interface
   */
  export class CUIMapList extends CUIWindow {
    /**
     * Clear map entries.
     */
    public ClearList(): void;

    /**
     * Build a command-line value for the selected map settings.
     *
     * @param value - Base command-line value.
     * @returns Command-line value.
     */
    public GetCommandLine<T extends string = string>(value: string): T;

    /**
     * @returns Current multiplayer game type.
     */
    public GetCurGameType(): TXR_GAME_TYPE;

    /**
     * @returns Whether the map list has no entries.
     */
    public IsEmpty(): boolean;

    /**
     * Load available maps.
     */
    public LoadMapList(): void;

    /**
     * Refresh list state after game mode changes.
     */
    public OnModeChange(): void;

    /**
     * Save current map list settings.
     */
    public SaveMapList(): void;

    /**
     * Set the map info panel updated by this list.
     *
     * @param info - Map info control.
     */
    public SetMapInfo(info: CUIMapInfo): void;

    /**
     * Set the map preview image control.
     *
     * @param picture - Static image control.
     */
    public SetMapPic(picture: CUIStatic): void;

    /**
     * Set game mode selector control.
     *
     * @param modeSelector - Mode selector.
     */
    public SetModeSelector(modeSelector: CUISpinText): void;

    /**
     * Set server launch parameters.
     *
     * @param params - Server parameter string.
     */
    public SetServerParams(params: string): void;

    /**
     * Set weather selector control.
     *
     * @param selector - Weather selector.
     */
    public SetWeatherSelector(selector: CUIComboBox): void;

    /**
     * Start a dedicated server with selected settings.
     */
    public StartDedicatedServer(): void;
  }

  /**
   * @source C++ class CUIMessageBox : CUIStatic
   * @customConstructor CUIMessageBox
   * @group xr_ui_interface
   */
  export class CUIMessageBox extends CUIStatic {
    /**
     * Initialize message box layout.
     *
     * @param value - Message box template name.
     * @returns Whether initialization succeeded.
     */
    public InitMessageBox(value: string): boolean;

    /**
     * @returns Password entered in the message box.
     */
    public GetPassword(): string;

    /**
     * @returns Host entered in the message box.
     */
    public GetHost(): string;
  }

  /**
   * @source C++ class CUIMessageBoxEx : CUIDialogWnd
   * @customConstructor CUIMessageBoxEx
   * @group xr_ui_interface
   */
  export class CUIMessageBoxEx extends CUIDialogWnd {
    /**
     * Initialize message box dialog layout.
     *
     * @param selector - Message box template selector.
     */
    public InitMessageBox(selector: string): void;

    /**
     * Set message text.
     *
     * @param text - Text to show.
     */
    public SetText(text: string): void;

    /**
     * @returns Password entered in the dialog.
     */
    public GetPassword(): string;

    /**
     * @returns Host entered in the dialog.
     */
    public GetHost(): string;
  }

  /**
   * @source C++ class CUIProgressBar : CUIWindow
   * @customConstructor CUIProgressBar
   * @group xr_ui_interface
   */
  export class CUIProgressBar extends CUIWindow {
    /**
     * @returns Progress range maximum.
     */
    public GetRange_max(): f32;

    /**
     * @returns Progress range minimum.
     */
    public GetRange_min(): f32;

    /**
     * Set progress value.
     *
     * @param position - Progress position.
     */
    public SetProgressPos(position: f32): void;

    /**
     * @returns Current progress value.
     */
    public GetProgressPos(): f32;
  }

  /**
   * @source C++ class CUIPropertiesBox : CUIFrameWindow
   * @customConstructor CUIPropertiesBox
   * @group xr_ui_interface
   */
  export class CUIPropertiesBox extends CUIFrameWindow {
    /**
     * Add a selectable property item.
     *
     * @param id - Item id.
     */
    public AddItem(id: string): void;

    /**
     * Resize the box to fit its items.
     */
    public AutoUpdateSize(): void;

    /**
     * Remove an item by index.
     *
     * @param index - Item index.
     */
    public RemoveItem(index: u32): void;

    /**
     * Remove all property items.
     */
    public RemoveAll(): void;

    /**
     * Hide the properties box.
     */
    public Hide(): void;

    /**
     * Show or hide the properties box.
     *
     * @param show - Whether the box should be visible.
     */
    public Show(show: boolean): void;

    /**
     * Show the properties box near a screen point.
     *
     * @param int1 - X position.
     * @param int2 - Y position.
     */
    public Show(int1: i32, int2: i32): void;

    /**
     * @returns Currently selected property item.
     */
    public GetSelectedItem(): CUIListBoxItem;

    /**
     * Initialize properties box geometry.
     *
     * @param position - Box position.
     * @param size - Box size.
     */
    public InitPropertiesBox(position: vector2, size: vector2): void;
  }

  /**
   * @source C++ class CUIVersionList : CUIWindow
   * @customConstructor CUIVersionList
   * @group xr_ui_interface
   */
  export class CUIVersionList {
    /**
     * Create a version list control.
     */
    public constructor();

    /**
     * @returns Number of available versions.
     */
    public GetItemsCount(): u64;

    /**
     * Switch game data to the selected version.
     */
    public SwitchToSelectedVersion(): void;

    /**
     * @returns Description of the selected version.
     */
    public GetCurrentVersionDescr(): string;

    /**
     * @returns Name of the selected version.
     */
    public GetCurrentVersionName(): string;
  }

  /**
   * @source C++ class CUIScrollView : CUIWindow
   * @customConstructor CUIScrollView
   * @group xr_ui_interface
   */
  export class CUIScrollView extends CUIWindow {
    /**
     * Set scroll position.
     *
     * @param position - Scroll position.
     */
    public SetScrollPos(position: i32): void;

    /**
     * Remove a child window from the scroll view.
     *
     * @param window - Window to remove.
     */
    public RemoveWindow(window: CUIWindow): void;

    /**
     * Scroll to the beginning.
     */
    public ScrollToBegin(): void;

    /**
     * @returns Current scroll position.
     */
    public GetCurrentScrollPos(): i32;

    /**
     * Add a window to the scroll view.
     *
     * @param window - Window to add.
     * @param value - Whether layout should be recalculated.
     */
    public AddWindow(window: CUIWindow, value: boolean): void;

    /**
     * @returns Maximum scroll position.
     */
    public GetMaxScrollPos(): i32;

    /**
     * @returns Minimum scroll position.
     */
    public GetMinScrollPos(): i32;

    /**
     * Scroll to the end.
     */
    public ScrollToEnd(): void;

    /**
     * Remove all child windows.
     */
    public Clear(): void;

    /**
     * Keep scrollbar visibility fixed.
     *
     * @param fixed - Whether scrollbar state is fixed.
     */
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
    /**
     * @returns Texture color.
     */
    public GetColor(): u32;

    /**
     * Set texture color.
     *
     * @param color - ARGB color.
     */
    public SetColor(color: u32): void;

    /**
     * @returns Text line controller.
     */
    public TextControl(): CUILines;

    /**
     * @returns Texture rectangle.
     */
    public GetTextureRect(): Frect;

    /**
     * @returns Whether texture stretching is enabled.
     */
    public GetStretchTexture(): boolean;

    /**
     * Enable or disable texture stretching.
     *
     * @param stretch - Whether texture should stretch to the window rect.
     */
    public SetStretchTexture(stretch: boolean): void;

    /**
     * Set source texture rectangle.
     *
     * @param frect - Texture rectangle.
     */
    public SetTextureRect(frect: Frect): void;

    /**
     * Assign texture by atlas id.
     *
     * @param texture - Texture id.
     */
    public InitTexture(texture: string): void;

    /**
     * Set text color from color channels.
     *
     * @param a - Alpha channel.
     * @param r - Red channel.
     * @param g - Green channel.
     * @param b - Blue channel.
     */
    public SetTextColor(a: i32, r: i32, g: i32, b: i32): void;

    /**
     * Set texture color.
     *
     * @param color - ARGB color.
     */
    public SetTextureColor(color: u32): void;

    /**
     * @returns Texture color.
     */
    public GetTextureColor(): u32;

    /**
     * Set heading angle.
     *
     * @param number - Heading angle.
     */
    public SetHeading(number: f32): void;

    /**
     * Set translated string-table text.
     *
     * @param string - String table id.
     */
    public SetTextST(string: string): void;

    /**
     * Set text alignment.
     *
     * @param align - Alignment id.
     */
    public SetTextAlign(align: u32): void;

    /**
     * @returns Text alignment id.
     */
    public GetTextAlign(): u32;

    /**
     * @returns Current text.
     */
    public GetText(): string;

    /**
     * Assign texture and shader by name.
     *
     * @param first - Texture id.
     * @param second - Shader id.
     */
    public InitTextureEx(first: string, second: string): void;

    /**
     * Set text X offset.
     *
     * @param x - X offset.
     */
    public SetTextX(x: f32): void;

    /**
     * Set text Y offset.
     *
     * @param x - Y offset.
     */
    public SetTextY(x: f32): void;

    /**
     * @returns Text Y offset.
     */
    public GetTextY(): f32;

    /**
     * @returns Text X offset.
     */
    public GetTextX(): f32;

    /**
     * Set texture drawing offset.
     *
     * @param x - X offset.
     * @param y - Y offset.
     */
    public SetTextureOffset(x: f32, y: f32): void;

    /**
     * Configure text ellipsis.
     *
     * @param a - Ellipsis mode.
     * @param b - Indent.
     */
    public SetElipsis(a: i32, b: i32): void;

    /**
     * @returns Heading angle.
     */
    public GetHeading(): f32;

    /**
     * Set raw text.
     *
     * @param text - Text value.
     */
    public SetText(text: string): void;

    /**
     * @returns Original texture rectangle.
     */
    public GetOriginalRect(): Frect;

    /**
     * Set original texture rectangle.
     *
     * @param frect - Original rectangle.
     */
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
    /**
     * @returns Active tab id.
     */
    public GetActiveId(): string;

    /**
     * Activate a tab by id.
     *
     * @param id - Tab id.
     */
    public SetActiveTab(id: string): void;

    /**
     * Activate a tab by index.
     *
     * @param id - Tab index.
     */
    public SetActiveTab(id: u32): void;

    /**
     * @returns Number of tabs.
     */
    public GetTabsCount(): u32;

    /**
     * Get a tab button by id.
     *
     * @param id - Tab id.
     * @returns Tab button.
     */
    public GetButtonById(id: string): CUITabButton;

    /**
     * Remove all tabs.
     */
    public RemoveAll(): void;

    /**
     * Add an existing tab button and transfer it to the control.
     *
     * @param item - Tab button.
     */
    public AddItem(item: CUITabButton): void;

    /**
     * Add a tab from texture bounds.
     *
     * @param id - Tab id.
     * @param name - Texture or visual name.
     * @param top_left - Top-left bounds.
     * @param bot_right - Bottom-right bounds.
     */
    public AddItem(id: string, name: string, top_left: vector2, bot_right: vector2): void;

    /**
     * Add a tab from numeric bounds.
     *
     * @param id - Tab id.
     * @param name - Texture or visual name.
     * @param x - X position.
     * @param y - Y position.
     * @param width - Tab width.
     * @param height - Tab height.
     */
    public AddItem(id: string, name: string, x: f32, y: f32, width: f32, height: f32): void;

    /**
     * Remove a tab by index.
     *
     * @param index - Tab index.
     */
    public RemoveItem(index: u32): void;

    /**
     * Remove a tab by id.
     *
     * @param id - Tab id.
     */
    public RemoveItemById(id: string): void;

    /**
     * Get a tab button by index.
     *
     * @param index - Tab index.
     * @returns Tab button.
     */
    public GetButtonByIndex(index: u32): CUITabButton;

    /**
     * Activate a new tab by index.
     *
     * @param index - Tab index.
     */
    public SetNewActiveTab(index: u32): void;

    /**
     * @returns Active tab index.
     */
    public GetActiveIndex(): i32;
  }

  /**
   * @source C++ class CUITextWnd : CUIWindow
   * @customConstructor CUITextWnd
   * @group xr_ui_interface
   */
  export class CUITextWnd extends CUIWindow {
    /**
     * Set text drawing offset.
     *
     * @param x - X offset.
     * @param y - Y offset.
     */
    public SetTextOffset(x: f32, y: f32): void;

    /**
     * Set raw text.
     *
     * @param text - Text value.
     */
    public SetText(text: string): void;

    /**
     * Set horizontal text alignment.
     *
     * @param align - Font alignment.
     */
    public SetTextAlignment(align: TXR_CGameFont_alignment): void;

    /**
     * Enable or disable complex text layout.
     *
     * @param complex - Whether complex mode is enabled.
     */
    public SetTextComplexMode(complex: boolean): void;

    /**
     * @returns Current text.
     */
    public GetText(): string;

    /**
     * @returns Text color.
     */
    public GetTextColor(): u32;

    /**
     * Set text color.
     *
     * @param color - ARGB color.
     */
    public SetTextColor(color: u32): void;

    /**
     * Set translated string-table text.
     *
     * @param text - String table id.
     */
    public SetTextST(text: string): void;

    /**
     * Resize height to fit current text.
     */
    public AdjustHeightToText(): void;

    /**
     * Resize width to fit current text.
     */
    public AdjustWidthToText(): void;

    /**
     * Enable or disable ellipsis.
     *
     * @param value - Whether long text should be ellipsized.
     */
    public SetEllipsis(value: boolean): void;

    /**
     * Set vertical text alignment.
     *
     * @param alignment - Font alignment.
     */
    public SetVTextAlignment(alignment: TXR_CGameFont_alignment): void;
  }

  /**
   * @source C++ class CUITrackBar : CUIWindow
   * @customConstructor CUITrackBar
   * @group xr_ui_interface
   */
  export class CUITrackBar extends CUIWindow {
    /**
     * Set checked state.
     *
     * @param value - New checked state.
     */
    public SetCheck(value: boolean): void;

    /**
     * Apply current option value.
     */
    public SetCurrentValue(): void;

    /**
     * Set current float value.
     *
     * @param value - New value.
     */
    public SetCurrentValue(value: f32): void;

    /**
     * Set current integer value.
     *
     * @param value - New value.
     */
    public SetCurrentValue(value: i32): void;

    /**
     * @returns Whether the track bar is checked.
     */
    public GetCheck(): boolean;

    /**
     * @returns Current integer value.
     */
    public GetIValue(): i32;

    /**
     * @returns Current float value.
     */
    public GetFValue(): f32;

    /**
     * Set integer bounds.
     *
     * @param min - Minimum value.
     * @param max - Maximum value.
     */
    public SetOptIBounds(min: i32, max: i32): void;

    /**
     * Set float bounds.
     *
     * @param min - Minimum value.
     * @param max - Maximum value.
     * @returns Bound setup result.
     */
    public SetOptFBounds(min: f32, max: f32): number;
  }

  /**
   * @source C++ class CDialogHolder
   * @customConstructor CDialogHolder
   * @group xr_ui_interface
   */
  export class CDialogHolder {
    /**
     * Remove a dialog from rendering.
     *
     * @param window - Dialog window.
     */
    public RemoveDialogToRender(window: CUIWindow): void;

    /**
     * Add a dialog to rendering.
     *
     * @param window - Dialog window.
     */
    public AddDialogToRender(window: CUIWindow): void;

    /**
     * @returns Current top input receiver.
     */
    public TopInputReceiver(): CUIDialogWnd;

    /**
     * Set the main input receiver.
     *
     * @param window - Dialog window.
     * @param find_remove - Whether to remove the previous receiver if found.
     * @returns Whether the receiver was set.
     */
    public SetMainInputReceiver(window: CUIDialogWnd, find_remove: boolean): boolean;

    /**
     * @returns Current main input receiver.
     */
    public MainInputReceiver(): CUIDialogWnd;

    /**
     * Start or stop an in-game menu.
     *
     * @param window - Menu window.
     * @param value - Whether the menu should be active.
     */
    public start_stop_menu(window: CUIWindow, value: boolean): void;
  }

  /**
   * @source C++ class StaticDrawableWrapper
   * @customConstructor StaticDrawableWrapper
   * @group xr_ui_interface
   */
  export class StaticDrawableWrapper {
    public m_endTime: f32;

    /**
     * Engine-created wrapper for a drawable static.
     */
    private constructor();

    /**
     * Draw the wrapped static.
     */
    public Draw(): void;

    /**
     * Update wrapper lifetime and state.
     */
    public Update(): void;

    /**
     * @returns Whether the wrapper is still active.
     */
    public IsActual(): boolean;

    /**
     * Set text on the wrapped static.
     *
     * @param text - Text value.
     */
    public SetText(text: string): void;

    /**
     * Destroy the wrapper.
     */
    public destroy(): void;

    /**
     * @returns Wrapped static window.
     */
    public wnd(): CUIStatic;
  }

  /**
   * @source C++ class CUIListWnd : CUIWindow
   * @customConstructor CUIListWnd
   * @group xr_ui_interface
   */
  export class CUIListWnd extends CUIWindow {
    /**
     * Flip list direction vertically.
     *
     * @param flip - Whether vertical flip is enabled.
     */
    public SetVertFlip(flip: boolean): void;

    /**
     * Remove an item by index.
     *
     * @param index - Item index.
     */
    public RemoveItem(index: i32): void;

    /**
     * Scroll to a list position.
     *
     * @param position - Scroll position.
     */
    public ScrollToPos(position: i32): void;

    /**
     * Scroll the selected item into view.
     *
     * @param show - Whether selected item should be shown.
     */
    public ShowSelectedItem(show: boolean): void;

    /**
     * Enable or disable scrollbar.
     *
     * @param enable - Whether scrollbar should be enabled.
     */
    public EnableScrollBar(enable: boolean): void;

    /**
     * Get an item by index.
     *
     * @param index - Item index.
     * @returns List item.
     */
    public GetItem(index: i32): CUIListItem;

    /**
     * @returns Whether vertical flip is enabled.
     */
    public GetVertFlip(): boolean;

    /**
     * Set text color for list items.
     *
     * @param color - ARGB color.
     */
    public SetTextColor(color: i32): void;

    /**
     * @returns Selected item index.
     */
    public GetSelectedItem(): i32;

    /**
     * Scroll to the end.
     */
    public ScrollToEnd(): void;

    /**
     * Set focused item index.
     *
     * @param index - Item index.
     */
    public SetFocusedItem(index: i32): void;

    /**
     * Activate or deactivate the list.
     *
     * @param flag - New active state.
     */
    public ActivateList(flag: boolean): void;

    /**
     * @returns Number of items.
     */
    public GetSize(): i32;

    /**
     * @returns Whether scrollbar is enabled.
     */
    public IsScrollBarEnabled(): boolean;

    /**
     * Scroll to the beginning.
     */
    public ScrollToBegin(): void;

    /**
     * Remove all items.
     */
    public RemoveAll(): void;

    /**
     * Add an item and transfer it to the list.
     *
     * @param item - Item to add.
     * @returns Whether the item was added.
     */
    public AddItem(item: CUIListItem): boolean;

    /**
     * Set list item height.
     *
     * @param height - Item height.
     */
    public SetItemHeight(height: f32): void;

    /**
     * Get item index.
     *
     * @param item - List item.
     * @returns Item index.
     */
    public GetItemPos(item: CUIListItem): i32;

    /**
     * @returns Whether the list is active.
     */
    public IsListActive(): boolean;

    /**
     * @returns Focused item index.
     */
    public GetFocusedItem(): i32;

    /**
     * Release focus capture.
     */
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
    /**
     * Set selection highlight color.
     *
     * @param color - ARGB color.
     */
    public SetSelectionColor(color: u32): void;
  }

  /**
   * @source C++ class UIHint : CUIWindow
   * @customConstructor UIHint
   * @group xr_ui_interface
   */
  export class UIHint extends CUIWindow {
    /**
     * Create a hint window.
     */
    public constructor();

    /**
     * @returns Hint text.
     */
    public GetHintText(): string;

    /**
     * Set hint text.
     *
     * @param hint - Hint text.
     */
    public SetHintText(hint: string): void;
  }

  /**
   * @source C++ class CUIPdaWnd : CUIDialogWnd
   * @customConstructor CUIPdaWnd
   * @group xr_ui_interface
   */
  export class CUIPdaWnd extends CUIDialogWnd {
    /**
     * Create a PDA dialog window.
     */
    public constructor();

    /**
     * Activate a PDA subdialog by section.
     *
     * @param section - Subdialog section.
     */
    public SetActiveSubdialog(section: string): void;

    /**
     * @returns Active PDA section.
     */
    public GetActiveSection(): string;

    /**
     * @returns PDA tab control.
     */
    public GetTabControl(): CUITabControl;

    /**
     * Set active PDA dialog window.
     *
     * @param dialog - Dialog window, or `null` to clear.
     */
    public SetActiveDialog(dialog: CUIWindow | null): void;

    /**
     * @returns Active PDA dialog window, or `null`.
     */
    public GetActiveDialog(): CUIWindow | null;
  }

  /**
   * @source C++ class CUIActorMenu : CUIDialogWnd
   * @customConstructor CUIActorMenu
   * @group xr_ui_interface
   */
  export class CUIActorMenu extends CUIDialogWnd {
    /**
     * Create an actor menu dialog.
     */
    public constructor();

    /**
     * @returns Item currently being dragged, or `null`.
     */
    public get_drag_item(): game_object | null;

    /**
     * Highlight inventory cells containing a section in a slot list.
     *
     * @param section - Item section name.
     * @param type - Drag-drop list type.
     * @param slot_id - Slot id.
     */
    public highlight_section_in_slot(section: string, type: TXR_EDDListType, slot_id: u16): void;

    /**
     * Highlight inventory cells that match a predicate in a slot list.
     *
     * @param functor - Predicate called for each item.
     * @param type - Drag-drop list type.
     * @param slot_id - Slot id.
     */
    public highlight_for_each_in_slot(
      functor: (object: game_object) => boolean,
      type: TXR_EDDListType,
      slot_id: u16
    ): void;

    /**
     * Refresh the currently focused inventory cell.
     */
    public refresh_current_cell_item(): void;

    /**
     * Move an object to an actor slot.
     *
     * @param object - Item object.
     * @param force_place - Whether to force placement.
     * @param slot_id - Slot id.
     * @returns Whether the move succeeded.
     */
    public ToSlot(object: game_object, force_place: boolean, slot_id: u16): boolean;

    /**
     * Move an object to the actor belt.
     *
     * @param object - Item object.
     * @param use_cursor_position - Whether to use the cursor position.
     * @returns Whether the move succeeded.
     */
    public ToBelt(object: game_object, use_cursor_position: boolean): boolean;
  }

  /**
   * @source C++ enum EDDListType
   * @customConstructor EDDListType
   * @group xr_ui_interface
   */
  export class EDDListType {
    /**
     * Engine enum value for `EDDListType.iActorBag`.
     */
    public static readonly iActorBag: 2;
    /**
     * Engine enum value for `EDDListType.iActorBelt`.
     */
    public static readonly iActorBelt: 3;
    /**
     * Engine enum value for `EDDListType.iActorSlot`.
     */
    public static readonly iActorSlot: 1;
    /**
     * Engine enum value for `EDDListType.iActorTrade`.
     */
    public static readonly iActorTrade: 4;
    /**
     * Engine enum value for `EDDListType.iDeadBodyBag`.
     */
    public static readonly iDeadBodyBag: 7;
    /**
     * Engine enum value for `EDDListType.iInvalid`.
     */
    public static readonly iInvalid: 0;
    /**
     * Engine enum value for `EDDListType.iPartnerTrade`.
     */
    public static readonly iPartnerTrade: 6;
    /**
     * Engine enum value for `EDDListType.iPartnerTradeBag`.
     */
    public static readonly iPartnerTradeBag: 5;
    /**
     * Engine enum value for `EDDListType.iQuickSlot`.
     */
    public static readonly iQuickSlot: 8;
    /**
     * Engine enum value for `EDDListType.iTrashSlot`.
     */
    public static readonly iTrashSlot: 9;

    /**
     * Engine-owned drag-drop list constants.
     */
    private constructor();
  }

  /**
   * @group xr_ui_interface
   */
  export type TXR_EDDListType = EnumeratedStaticsValues<typeof EDDListType>;
}
