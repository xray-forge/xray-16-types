declare module "xray16" {
  /**
   * UI event id constants.
   *
   * @source C++ class ui_events
   * @customConstructor ui_events
   * @group xr_ui_event
   *
   * @remarks
   * These values are engine message ids passed to UI callbacks and script window dispatch handlers.
   */
  export class ui_events {
    /**
     * Engine enum value for `ui_events.BUTTON_CLICKED`.
     */
    public static readonly BUTTON_CLICKED: 19;
    /**
     * Engine enum value for `ui_events.BUTTON_DOWN`.
     */
    public static readonly BUTTON_DOWN: 20;
    /**
     * Engine enum value for `ui_events.CHECK_BUTTON_RESET`.
     */
    public static readonly CHECK_BUTTON_RESET: 23;
    /**
     * Engine enum value for `ui_events.CHECK_BUTTON_SET`.
     */
    public static readonly CHECK_BUTTON_SET: 22;
    /**
     * Engine enum value for `ui_events.EDIT_TEXT_COMMIT`.
     */
    public static readonly EDIT_TEXT_COMMIT: 79;
    /**
     * Engine enum value for `ui_events.LIST_ITEM_CLICKED`.
     */
    public static readonly LIST_ITEM_CLICKED: 37;
    /**
     * Engine enum value for `ui_events.LIST_ITEM_SELECT`.
     */
    public static readonly LIST_ITEM_SELECT: 38;
    /**
     * Engine enum value for `ui_events.LIST_ITEM_UNSELECT`.
     */
    public static readonly LIST_ITEM_UNSELECT: 39;
    /**
     * Engine enum value for `ui_events.MAIN_MENU_RELOADED`.
     */
    public static readonly MAIN_MENU_RELOADED: 84;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_CANCEL_CLICKED`.
     */
    public static readonly MESSAGE_BOX_CANCEL_CLICKED: 47;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_COPY_CLICKED`.
     */
    public static readonly MESSAGE_BOX_COPY_CLICKED: 48;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_NO_CLICKED`.
     */
    public static readonly MESSAGE_BOX_NO_CLICKED: 46;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_OK_CLICKED`.
     */
    public static readonly MESSAGE_BOX_OK_CLICKED: 42;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_QUIT_GAME_CLICKED`.
     */
    public static readonly MESSAGE_BOX_QUIT_GAME_CLICKED: 45;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_QUIT_WIN_CLICKED`.
     */
    public static readonly MESSAGE_BOX_QUIT_WIN_CLICKED: 44;
    /**
     * Engine enum value for `ui_events.MESSAGE_BOX_YES_CLICKED`.
     */
    public static readonly MESSAGE_BOX_YES_CLICKED: 43;
    /**
     * Engine enum value for `ui_events.PROPERTY_CLICKED`.
     */
    public static readonly PROPERTY_CLICKED: 41;
    /**
     * Engine enum value for `ui_events.RADIOBUTTON_SET`.
     */
    public static readonly RADIOBUTTON_SET: 24;
    /**
     * Engine enum value for `ui_events.SCROLLBAR_HSCROLL`.
     */
    public static readonly SCROLLBAR_HSCROLL: 34;
    /**
     * Engine enum value for `ui_events.SCROLLBAR_VSCROLL`.
     */
    public static readonly SCROLLBAR_VSCROLL: 33;
    /**
     * Engine enum value for `ui_events.SCROLLBOX_MOVE`.
     */
    public static readonly SCROLLBOX_MOVE: 32;
    /**
     * Engine enum value for `ui_events.TAB_CHANGED`.
     */
    public static readonly TAB_CHANGED: 21;
    /**
     * Engine enum value for `ui_events.WINDOW_KEYBOARD_CAPTURE_LOST`.
     */
    public static readonly WINDOW_KEYBOARD_CAPTURE_LOST: 16;
    /**
     * Engine enum value for `ui_events.WINDOW_KEY_PRESSED`.
     */
    public static readonly WINDOW_KEY_PRESSED: 12;
    /**
     * Engine enum value for `ui_events.WINDOW_KEY_RELEASED`.
     */
    public static readonly WINDOW_KEY_RELEASED: 13;
    /**
     * Engine enum value for `ui_events.WINDOW_LBUTTON_DB_CLICK`.
     */
    public static readonly WINDOW_LBUTTON_DB_CLICK: 11;
    /**
     * Engine enum value for `ui_events.WINDOW_LBUTTON_DOWN`.
     */
    public static readonly WINDOW_LBUTTON_DOWN: 0;
    /**
     * Engine enum value for `ui_events.WINDOW_LBUTTON_UP`.
     */
    public static readonly WINDOW_LBUTTON_UP: 3;
    /**
     * Engine enum value for `ui_events.WINDOW_MOUSE_MOVE`.
     */
    public static readonly WINDOW_MOUSE_MOVE: 6;
    /**
     * Engine enum value for `ui_events.WINDOW_RBUTTON_DOWN`.
     */
    public static readonly WINDOW_RBUTTON_DOWN: 1;
    /**
     * Engine enum value for `ui_events.WINDOW_RBUTTON_UP`.
     */
    public static readonly WINDOW_RBUTTON_UP: 4;
  }

  /**
   * UI event id.
   *
   * @group xr_ui_event
   */
  type TXR_ui_event = EnumeratedStaticsValues<typeof ui_events>;

  /**
   * Keyboard scan-code constants.
   *
   * @source C++ class DIK_keys
   * @customConstructor DIK_keys
   * @group xr_ui_event
   *
   * @remarks
   * The names keep the legacy DIK naming, but values come from the engine's SDL scancode, mouse, and gamepad mapping.
   */
  export class DIK_keys {
    /**
     * Engine enum value for `DIK_keys.DIK_0`.
     */
    public static readonly DIK_0: 39;
    /**
     * Engine enum value for `DIK_keys.DIK_1`.
     */
    public static readonly DIK_1: 30;
    /**
     * Engine enum value for `DIK_keys.DIK_2`.
     */
    public static readonly DIK_2: 31;
    /**
     * Engine enum value for `DIK_keys.DIK_3`.
     */
    public static readonly DIK_3: 32;
    /**
     * Engine enum value for `DIK_keys.DIK_4`.
     */
    public static readonly DIK_4: 33;
    /**
     * Engine enum value for `DIK_keys.DIK_5`.
     */
    public static readonly DIK_5: 34;
    /**
     * Engine enum value for `DIK_keys.DIK_6`.
     */
    public static readonly DIK_6: 35;
    /**
     * Engine enum value for `DIK_keys.DIK_7`.
     */
    public static readonly DIK_7: 36;
    /**
     * Engine enum value for `DIK_keys.DIK_8`.
     */
    public static readonly DIK_8: 37;
    /**
     * Engine enum value for `DIK_keys.DIK_9`.
     */
    public static readonly DIK_9: 38;
    /**
     * Engine enum value for `DIK_keys.DIK_A`.
     */
    public static readonly DIK_A: 4;
    /**
     * Engine enum value for `DIK_keys.DIK_ADD`.
     */
    public static readonly DIK_ADD: 87;
    /**
     * Engine enum value for `DIK_keys.DIK_ALTERASE`.
     */
    public static readonly DIK_ALTERASE: 153;
    /**
     * Engine enum value for `DIK_keys.DIK_APOSTROPHE`.
     */
    public static readonly DIK_APOSTROPHE: 52;
    /**
     * Engine enum value for `DIK_keys.DIK_APP1`.
     */
    public static readonly DIK_APP1: 283;
    /**
     * Engine enum value for `DIK_keys.DIK_APP2`.
     */
    public static readonly DIK_APP2: 284;
    /**
     * Engine enum value for `DIK_keys.DIK_APPLICATION`.
     */
    public static readonly DIK_APPLICATION: 101;
    /**
     * Engine enum value for `DIK_keys.DIK_AUDIOMUTE`.
     */
    public static readonly DIK_AUDIOMUTE: 262;
    /**
     * Engine enum value for `DIK_keys.DIK_AUDIONEXT`.
     */
    public static readonly DIK_AUDIONEXT: 258;
    /**
     * Engine enum value for `DIK_keys.DIK_AUDIOPLAY`.
     */
    public static readonly DIK_AUDIOPLAY: 261;
    /**
     * Engine enum value for `DIK_keys.DIK_AUDIOPREV`.
     */
    public static readonly DIK_AUDIOPREV: 259;
    /**
     * Engine enum value for `DIK_keys.DIK_AUDIOSTOP`.
     */
    public static readonly DIK_AUDIOSTOP: 260;
    /**
     * Engine enum value for `DIK_keys.DIK_B`.
     */
    public static readonly DIK_B: 5;
    /**
     * Engine enum value for `DIK_keys.DIK_BACK`.
     */
    public static readonly DIK_BACK: 42;
    /**
     * Engine enum value for `DIK_keys.DIK_BACKSLASH`.
     */
    public static readonly DIK_BACKSLASH: 49;
    /**
     * Engine enum value for `DIK_keys.DIK_BRIGHTNESSDOWN`.
     */
    public static readonly DIK_BRIGHTNESSDOWN: 275;
    /**
     * Engine enum value for `DIK_keys.DIK_BRIGHTNESSUP`.
     */
    public static readonly DIK_BRIGHTNESSUP: 276;
    /**
     * Engine enum value for `DIK_keys.DIK_C`.
     */
    public static readonly DIK_C: 6;
    /**
     * Engine enum value for `DIK_keys.DIK_CANCEL`.
     */
    public static readonly DIK_CANCEL: 155;
    /**
     * Engine enum value for `DIK_keys.DIK_CAPITAL`.
     */
    public static readonly DIK_CAPITAL: 57;
    /**
     * Engine enum value for `DIK_keys.DIK_CLEAR`.
     */
    public static readonly DIK_CLEAR: 156;
    /**
     * Engine enum value for `DIK_keys.DIK_CLEARAGAIN`.
     */
    public static readonly DIK_CLEARAGAIN: 162;
    /**
     * Engine enum value for `DIK_keys.DIK_COMMA`.
     */
    public static readonly DIK_COMMA: 54;
    /**
     * Engine enum value for `DIK_keys.DIK_COPY`.
     */
    public static readonly DIK_COPY: 124;
    /**
     * Engine enum value for `DIK_keys.DIK_CRSEL`.
     */
    public static readonly DIK_CRSEL: 163;
    /**
     * Engine enum value for `DIK_keys.DIK_CURRENCYSUBUNIT`.
     */
    public static readonly DIK_CURRENCYSUBUNIT: 181;
    /**
     * Engine enum value for `DIK_keys.DIK_CURRENCYUNIT`.
     */
    public static readonly DIK_CURRENCYUNIT: 180;
    /**
     * Engine enum value for `DIK_keys.DIK_CUT`.
     */
    public static readonly DIK_CUT: 123;
    /**
     * Engine enum value for `DIK_keys.DIK_D`.
     */
    public static readonly DIK_D: 7;
    /**
     * Engine enum value for `DIK_keys.DIK_DECIMALSEPARATOR`.
     */
    public static readonly DIK_DECIMALSEPARATOR: 179;
    /**
     * Engine enum value for `DIK_keys.DIK_DELETE`.
     */
    public static readonly DIK_DELETE: 76;
    /**
     * Engine enum value for `DIK_keys.DIK_DISPLAYSWITCH`.
     */
    public static readonly DIK_DISPLAYSWITCH: 277;
    /**
     * Engine enum value for `DIK_keys.DIK_DIVIDE`.
     */
    public static readonly DIK_DIVIDE: 84;
    /**
     * Engine enum value for `DIK_keys.DIK_DOWN`.
     */
    public static readonly DIK_DOWN: 81;
    /**
     * Engine enum value for `DIK_keys.DIK_E`.
     */
    public static readonly DIK_E: 8;
    /**
     * Engine enum value for `DIK_keys.DIK_EJECT`.
     */
    public static readonly DIK_EJECT: 281;
    /**
     * Engine enum value for `DIK_keys.DIK_END`.
     */
    public static readonly DIK_END: 77;
    /**
     * Engine enum value for `DIK_keys.DIK_EQUALS`.
     */
    public static readonly DIK_EQUALS: 46;
    /**
     * Engine enum value for `DIK_keys.DIK_ESCAPE`.
     */
    public static readonly DIK_ESCAPE: 41;
    /**
     * Engine enum value for `DIK_keys.DIK_EXECUTE`.
     */
    public static readonly DIK_EXECUTE: 116;
    /**
     * Engine enum value for `DIK_keys.DIK_EXSEL`.
     */
    public static readonly DIK_EXSEL: 164;
    /**
     * Engine enum value for `DIK_keys.DIK_F10`.
     */
    public static readonly DIK_F10: 67;
    /**
     * Engine enum value for `DIK_keys.DIK_F11`.
     */
    public static readonly DIK_F11: 68;
    /**
     * Engine enum value for `DIK_keys.DIK_F12`.
     */
    public static readonly DIK_F12: 69;
    /**
     * Engine enum value for `DIK_keys.DIK_F13`.
     */
    public static readonly DIK_F13: 104;
    /**
     * Engine enum value for `DIK_keys.DIK_F14`.
     */
    public static readonly DIK_F14: 105;
    /**
     * Engine enum value for `DIK_keys.DIK_F15`.
     */
    public static readonly DIK_F15: 106;
    /**
     * Engine enum value for `DIK_keys.DIK_F16`.
     */
    public static readonly DIK_F16: 107;
    /**
     * Engine enum value for `DIK_keys.DIK_F17`.
     */
    public static readonly DIK_F17: 108;
    /**
     * Engine enum value for `DIK_keys.DIK_F18`.
     */
    public static readonly DIK_F18: 109;
    /**
     * Engine enum value for `DIK_keys.DIK_F19`.
     */
    public static readonly DIK_F19: 110;
    /**
     * Engine enum value for `DIK_keys.DIK_F1`.
     */
    public static readonly DIK_F1: 58;
    /**
     * Engine enum value for `DIK_keys.DIK_F20`.
     */
    public static readonly DIK_F20: 111;
    /**
     * Engine enum value for `DIK_keys.DIK_F21`.
     */
    public static readonly DIK_F21: 112;
    /**
     * Engine enum value for `DIK_keys.DIK_F22`.
     */
    public static readonly DIK_F22: 113;
    /**
     * Engine enum value for `DIK_keys.DIK_F23`.
     */
    public static readonly DIK_F23: 114;
    /**
     * Engine enum value for `DIK_keys.DIK_F24`.
     */
    public static readonly DIK_F24: 115;
    /**
     * Engine enum value for `DIK_keys.DIK_F2`.
     */
    public static readonly DIK_F2: 59;
    /**
     * Engine enum value for `DIK_keys.DIK_F3`.
     */
    public static readonly DIK_F3: 60;
    /**
     * Engine enum value for `DIK_keys.DIK_F4`.
     */
    public static readonly DIK_F4: 61;
    /**
     * Engine enum value for `DIK_keys.DIK_F5`.
     */
    public static readonly DIK_F5: 62;
    /**
     * Engine enum value for `DIK_keys.DIK_F6`.
     */
    public static readonly DIK_F6: 63;
    /**
     * Engine enum value for `DIK_keys.DIK_F7`.
     */
    public static readonly DIK_F7: 64;
    /**
     * Engine enum value for `DIK_keys.DIK_F8`.
     */
    public static readonly DIK_F8: 65;
    /**
     * Engine enum value for `DIK_keys.DIK_F9`.
     */
    public static readonly DIK_F9: 66;
    /**
     * Engine enum value for `DIK_keys.DIK_F`.
     */
    public static readonly DIK_F: 9;
    /**
     * Engine enum value for `DIK_keys.DIK_FIND`.
     */
    public static readonly DIK_FIND: 126;
    /**
     * Engine enum value for `DIK_keys.DIK_G`.
     */
    public static readonly DIK_G: 10;
    /**
     * Engine enum value for `DIK_keys.DIK_GRAVE`.
     */
    public static readonly DIK_GRAVE: 53;
    /**
     * Engine enum value for `DIK_keys.DIK_H`.
     */
    public static readonly DIK_H: 11;
    /**
     * Engine enum value for `DIK_keys.DIK_HANGUL`.
     */
    public static readonly DIK_HANGUL: 144;
    /**
     * Engine enum value for `DIK_keys.DIK_HANJA`.
     */
    public static readonly DIK_HANJA: 145;
    /**
     * Engine enum value for `DIK_keys.DIK_HELP`.
     */
    public static readonly DIK_HELP: 117;
    /**
     * Engine enum value for `DIK_keys.DIK_HIRAGANA`.
     */
    public static readonly DIK_HIRAGANA: 147;
    /**
     * Engine enum value for `DIK_keys.DIK_HOME`.
     */
    public static readonly DIK_HOME: 74;
    /**
     * Engine enum value for `DIK_keys.DIK_I`.
     */
    public static readonly DIK_I: 12;
    /**
     * Engine enum value for `DIK_keys.DIK_INSERT`.
     */
    public static readonly DIK_INSERT: 73;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL1`.
     */
    public static readonly DIK_INTERNATIONAL1: 135;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL2`.
     */
    public static readonly DIK_INTERNATIONAL2: 136;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL4`.
     */
    public static readonly DIK_INTERNATIONAL4: 138;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL5`.
     */
    public static readonly DIK_INTERNATIONAL5: 139;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL6`.
     */
    public static readonly DIK_INTERNATIONAL6: 140;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL7`.
     */
    public static readonly DIK_INTERNATIONAL7: 141;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL8`.
     */
    public static readonly DIK_INTERNATIONAL8: 142;
    /**
     * Engine enum value for `DIK_keys.DIK_INTERNATIONAL9`.
     */
    public static readonly DIK_INTERNATIONAL9: 143;
    /**
     * Engine enum value for `DIK_keys.DIK_J`.
     */
    public static readonly DIK_J: 13;
    /**
     * Engine enum value for `DIK_keys.DIK_K`.
     */
    public static readonly DIK_K: 14;
    /**
     * Engine enum value for `DIK_keys.DIK_KATAKANA`.
     */
    public static readonly DIK_KATAKANA: 146;
    /**
     * Engine enum value for `DIK_keys.DIK_KBDILLUMDOWN`.
     */
    public static readonly DIK_KBDILLUMDOWN: 279;
    /**
     * Engine enum value for `DIK_keys.DIK_KBDILLUMTOGGLE`.
     */
    public static readonly DIK_KBDILLUMTOGGLE: 278;
    /**
     * Engine enum value for `DIK_keys.DIK_KBDILLUMUP`.
     */
    public static readonly DIK_KBDILLUMUP: 280;
    /**
     * Engine enum value for `DIK_keys.DIK_L`.
     */
    public static readonly DIK_L: 15;
    /**
     * Engine enum value for `DIK_keys.DIK_LANG6`.
     */
    public static readonly DIK_LANG6: 149;
    /**
     * Engine enum value for `DIK_keys.DIK_LANG7`.
     */
    public static readonly DIK_LANG7: 150;
    /**
     * Engine enum value for `DIK_keys.DIK_LANG8`.
     */
    public static readonly DIK_LANG8: 151;
    /**
     * Engine enum value for `DIK_keys.DIK_LANG9`.
     */
    public static readonly DIK_LANG9: 152;
    /**
     * Engine enum value for `DIK_keys.DIK_LBRACKET`.
     */
    public static readonly DIK_LBRACKET: 47;
    /**
     * Engine enum value for `DIK_keys.DIK_LCONTROL`.
     */
    public static readonly DIK_LCONTROL: 224;
    /**
     * Engine enum value for `DIK_keys.DIK_LEFT`.
     */
    public static readonly DIK_LEFT: 80;
    /**
     * Engine enum value for `DIK_keys.DIK_LMENU`.
     */
    public static readonly DIK_LMENU: 226;
    /**
     * Engine enum value for `DIK_keys.DIK_LSHIFT`.
     */
    public static readonly DIK_LSHIFT: 225;
    /**
     * Engine enum value for `DIK_keys.DIK_LWIN`.
     */
    public static readonly DIK_LWIN: 227;
    /**
     * Engine enum value for `DIK_keys.DIK_M`.
     */
    public static readonly DIK_M: 16;
    /**
     * Engine enum value for `DIK_keys.DIK_MENU`.
     */
    public static readonly DIK_MENU: 118;
    /**
     * Engine enum value for `DIK_keys.DIK_MINUS`.
     */
    public static readonly DIK_MINUS: 45;
    /**
     * Engine enum value for `DIK_keys.DIK_MODE`.
     */
    public static readonly DIK_MODE: 257;
    /**
     * Engine enum value for `DIK_keys.DIK_MULTIPLY`.
     */
    public static readonly DIK_MULTIPLY: 85;
    /**
     * Engine enum value for `DIK_keys.DIK_MUTE`.
     */
    public static readonly DIK_MUTE: 127;
    /**
     * Engine enum value for `DIK_keys.DIK_N`.
     */
    public static readonly DIK_N: 17;
    /**
     * Engine enum value for `DIK_keys.DIK_NONUSBACKSLASH`.
     */
    public static readonly DIK_NONUSBACKSLASH: 100;
    /**
     * Engine enum value for `DIK_keys.DIK_NONUSHASH`.
     */
    public static readonly DIK_NONUSHASH: 50;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMLOCK`.
     */
    public static readonly DIK_NUMLOCK: 83;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD0`.
     */
    public static readonly DIK_NUMPAD0: 98;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD1`.
     */
    public static readonly DIK_NUMPAD1: 89;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD2`.
     */
    public static readonly DIK_NUMPAD2: 90;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD3`.
     */
    public static readonly DIK_NUMPAD3: 91;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD4`.
     */
    public static readonly DIK_NUMPAD4: 92;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD5`.
     */
    public static readonly DIK_NUMPAD5: 93;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD6`.
     */
    public static readonly DIK_NUMPAD6: 94;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD7`.
     */
    public static readonly DIK_NUMPAD7: 95;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD8`.
     */
    public static readonly DIK_NUMPAD8: 96;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD9`.
     */
    public static readonly DIK_NUMPAD9: 97;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPADCOMMA`.
     */
    public static readonly DIK_NUMPADCOMMA: 133;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPADENTER`.
     */
    public static readonly DIK_NUMPADENTER: 88;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPADEQUALS`.
     */
    public static readonly DIK_NUMPADEQUALS: 103;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPADEQUALSAS400`.
     */
    public static readonly DIK_NUMPADEQUALSAS400: 134;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPADPERIOD`.
     */
    public static readonly DIK_NUMPADPERIOD: 99;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_000`.
     */
    public static readonly DIK_NUMPAD_000: 177;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_00`.
     */
    public static readonly DIK_NUMPAD_00: 176;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_A`.
     */
    public static readonly DIK_NUMPAD_A: 188;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_BACK`.
     */
    public static readonly DIK_NUMPAD_AC_BACK: 270;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_BOOKMARKS`.
     */
    public static readonly DIK_NUMPAD_AC_BOOKMARKS: 274;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_FORWARD`.
     */
    public static readonly DIK_NUMPAD_AC_FORWARD: 271;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_HOME`.
     */
    public static readonly DIK_NUMPAD_AC_HOME: 269;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_REFRESH`.
     */
    public static readonly DIK_NUMPAD_AC_REFRESH: 273;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_SEARCH`.
     */
    public static readonly DIK_NUMPAD_AC_SEARCH: 268;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AC_STOP`.
     */
    public static readonly DIK_NUMPAD_AC_STOP: 272;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AMPERSAND`.
     */
    public static readonly DIK_NUMPAD_AMPERSAND: 199;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_AT`.
     */
    public static readonly DIK_NUMPAD_AT: 206;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_B`.
     */
    public static readonly DIK_NUMPAD_B: 189;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_BACKSPACE`.
     */
    public static readonly DIK_NUMPAD_BACKSPACE: 187;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_BINARY`.
     */
    public static readonly DIK_NUMPAD_BINARY: 218;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_C`.
     */
    public static readonly DIK_NUMPAD_C: 190;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_CALCULATOR`.
     */
    public static readonly DIK_NUMPAD_CALCULATOR: 266;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_CLEAR`.
     */
    public static readonly DIK_NUMPAD_CLEAR: 216;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_CLEARENTRY`.
     */
    public static readonly DIK_NUMPAD_CLEARENTRY: 217;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_COLON`.
     */
    public static readonly DIK_NUMPAD_COLON: 203;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_COMPUTER`.
     */
    public static readonly DIK_NUMPAD_COMPUTER: 267;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_D`.
     */
    public static readonly DIK_NUMPAD_D: 191;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_DBLAMPERSAND`.
     */
    public static readonly DIK_NUMPAD_DBLAMPERSAND: 200;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_DBLVERTICALBAR`.
     */
    public static readonly DIK_NUMPAD_DBLVERTICALBAR: 202;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_DECIMAL`.
     */
    public static readonly DIK_NUMPAD_DECIMAL: 220;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_E`.
     */
    public static readonly DIK_NUMPAD_E: 192;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_EXCLAM`.
     */
    public static readonly DIK_NUMPAD_EXCLAM: 207;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_F`.
     */
    public static readonly DIK_NUMPAD_F: 193;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_GREATER`.
     */
    public static readonly DIK_NUMPAD_GREATER: 198;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_HASH`.
     */
    public static readonly DIK_NUMPAD_HASH: 204;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_HEXADECIMAL`.
     */
    public static readonly DIK_NUMPAD_HEXADECIMAL: 221;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_LEFTBRACE`.
     */
    public static readonly DIK_NUMPAD_LEFTBRACE: 184;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_LEFTPAREN`.
     */
    public static readonly DIK_NUMPAD_LEFTPAREN: 182;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_LESS`.
     */
    public static readonly DIK_NUMPAD_LESS: 197;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MAIL`.
     */
    public static readonly DIK_NUMPAD_MAIL: 265;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEDIASELECT`.
     */
    public static readonly DIK_NUMPAD_MEDIASELECT: 263;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMADD`.
     */
    public static readonly DIK_NUMPAD_MEMADD: 211;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMCLEAR`.
     */
    public static readonly DIK_NUMPAD_MEMCLEAR: 210;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMDIVIDE`.
     */
    public static readonly DIK_NUMPAD_MEMDIVIDE: 214;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMMULTIPLY`.
     */
    public static readonly DIK_NUMPAD_MEMMULTIPLY: 213;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMRECALL`.
     */
    public static readonly DIK_NUMPAD_MEMRECALL: 209;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMSTORE`.
     */
    public static readonly DIK_NUMPAD_MEMSTORE: 208;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_MEMSUBTRACT`.
     */
    public static readonly DIK_NUMPAD_MEMSUBTRACT: 212;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_OCTAL`.
     */
    public static readonly DIK_NUMPAD_OCTAL: 219;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_PERCENT`.
     */
    public static readonly DIK_NUMPAD_PERCENT: 196;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_PLUSMINUS`.
     */
    public static readonly DIK_NUMPAD_PLUSMINUS: 215;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_POWER`.
     */
    public static readonly DIK_NUMPAD_POWER: 195;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_RIGHTBRACE`.
     */
    public static readonly DIK_NUMPAD_RIGHTBRACE: 185;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_RIGHTPAREN`.
     */
    public static readonly DIK_NUMPAD_RIGHTPAREN: 183;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_SPACE`.
     */
    public static readonly DIK_NUMPAD_SPACE: 205;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_TAB`.
     */
    public static readonly DIK_NUMPAD_TAB: 186;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_VERTICALBAR`.
     */
    public static readonly DIK_NUMPAD_VERTICALBAR: 201;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_WWW`.
     */
    public static readonly DIK_NUMPAD_WWW: 264;
    /**
     * Engine enum value for `DIK_keys.DIK_NUMPAD_XOR`.
     */
    public static readonly DIK_NUMPAD_XOR: 194;
    /**
     * Engine enum value for `DIK_keys.DIK_O`.
     */
    public static readonly DIK_O: 18;
    /**
     * Engine enum value for `DIK_keys.DIK_OPER`.
     */
    public static readonly DIK_OPER: 161;
    /**
     * Engine enum value for `DIK_keys.DIK_OUT`.
     */
    public static readonly DIK_OUT: 160;
    /**
     * Engine enum value for `DIK_keys.DIK_P`.
     */
    public static readonly DIK_P: 19;
    /**
     * Engine enum value for `DIK_keys.DIK_PASTE`.
     */
    public static readonly DIK_PASTE: 125;
    /**
     * Engine enum value for `DIK_keys.DIK_PAUSE`.
     */
    public static readonly DIK_PAUSE: 72;
    /**
     * Engine enum value for `DIK_keys.DIK_PERIOD`.
     */
    public static readonly DIK_PERIOD: 55;
    /**
     * Engine enum value for `DIK_keys.DIK_PGDN`.
     */
    public static readonly DIK_PGDN: 75;
    /**
     * Engine enum value for `DIK_keys.DIK_PGUP`.
     */
    public static readonly DIK_PGUP: 78;
    /**
     * Engine enum value for `DIK_keys.DIK_POWER`.
     */
    public static readonly DIK_POWER: 102;
    /**
     * Engine enum value for `DIK_keys.DIK_PRINTSCREEN`.
     */
    public static readonly DIK_PRINTSCREEN: 70;
    /**
     * Engine enum value for `DIK_keys.DIK_PRIOR`.
     */
    public static readonly DIK_PRIOR: 157;
    /**
     * Engine enum value for `DIK_keys.DIK_Q`.
     */
    public static readonly DIK_Q: 20;
    /**
     * Engine enum value for `DIK_keys.DIK_R`.
     */
    public static readonly DIK_R: 21;
    /**
     * Engine enum value for `DIK_keys.DIK_RBRACKET`.
     */
    public static readonly DIK_RBRACKET: 48;
    /**
     * Engine enum value for `DIK_keys.DIK_RCONTROL`.
     */
    public static readonly DIK_RCONTROL: 228;
    /**
     * Engine enum value for `DIK_keys.DIK_REDO`.
     */
    public static readonly DIK_REDO: 121;
    /**
     * Engine enum value for `DIK_keys.DIK_RETURN2`.
     */
    public static readonly DIK_RETURN2: 158;
    /**
     * Engine enum value for `DIK_keys.DIK_RETURN`.
     */
    public static readonly DIK_RETURN: 40;
    /**
     * Engine enum value for `DIK_keys.DIK_RIGHT`.
     */
    public static readonly DIK_RIGHT: 79;
    /**
     * Engine enum value for `DIK_keys.DIK_RMENU`.
     */
    public static readonly DIK_RMENU: 230;
    /**
     * Engine enum value for `DIK_keys.DIK_RSHIFT`.
     */
    public static readonly DIK_RSHIFT: 229;
    /**
     * Engine enum value for `DIK_keys.DIK_RWIN`.
     */
    public static readonly DIK_RWIN: 231;
    /**
     * Engine enum value for `DIK_keys.DIK_S`.
     */
    public static readonly DIK_S: 22;
    /**
     * Engine enum value for `DIK_keys.DIK_SCROLL`.
     */
    public static readonly DIK_SCROLL: 71;
    /**
     * Engine enum value for `DIK_keys.DIK_SELECT`.
     */
    public static readonly DIK_SELECT: 119;
    /**
     * Engine enum value for `DIK_keys.DIK_SEMICOLON`.
     */
    public static readonly DIK_SEMICOLON: 51;
    /**
     * Engine enum value for `DIK_keys.DIK_SEPARATOR`.
     */
    public static readonly DIK_SEPARATOR: 159;
    /**
     * Engine enum value for `DIK_keys.DIK_SLASH`.
     */
    public static readonly DIK_SLASH: 56;
    /**
     * Engine enum value for `DIK_keys.DIK_SLEEP`.
     */
    public static readonly DIK_SLEEP: 282;
    /**
     * Engine enum value for `DIK_keys.DIK_SPACE`.
     */
    public static readonly DIK_SPACE: 44;
    /**
     * Engine enum value for `DIK_keys.DIK_STOP`.
     */
    public static readonly DIK_STOP: 120;
    /**
     * Engine enum value for `DIK_keys.DIK_SUBTRACT`.
     */
    public static readonly DIK_SUBTRACT: 86;
    /**
     * Engine enum value for `DIK_keys.DIK_T`.
     */
    public static readonly DIK_T: 23;
    /**
     * Engine enum value for `DIK_keys.DIK_TAB`.
     */
    public static readonly DIK_TAB: 43;
    /**
     * Engine enum value for `DIK_keys.DIK_THOUSANDSSEPARATOR`.
     */
    public static readonly DIK_THOUSANDSSEPARATOR: 178;
    /**
     * Engine enum value for `DIK_keys.DIK_U`.
     */
    public static readonly DIK_U: 24;
    /**
     * Engine enum value for `DIK_keys.DIK_UNDO`.
     */
    public static readonly DIK_UNDO: 122;
    /**
     * Engine enum value for `DIK_keys.DIK_UP`.
     */
    public static readonly DIK_UP: 82;
    /**
     * Engine enum value for `DIK_keys.DIK_V`.
     */
    public static readonly DIK_V: 25;
    /**
     * Engine enum value for `DIK_keys.DIK_VOLUMEDOWN`.
     */
    public static readonly DIK_VOLUMEDOWN: 129;
    /**
     * Engine enum value for `DIK_keys.DIK_VOLUMEUP`.
     */
    public static readonly DIK_VOLUMEUP: 128;
    /**
     * Engine enum value for `DIK_keys.DIK_W`.
     */
    public static readonly DIK_W: 26;
    /**
     * Engine enum value for `DIK_keys.DIK_X`.
     */
    public static readonly DIK_X: 27;
    /**
     * Engine enum value for `DIK_keys.DIK_Y`.
     */
    public static readonly DIK_Y: 28;
    /**
     * Engine enum value for `DIK_keys.DIK_YEN`.
     */
    public static readonly DIK_YEN: 137;
    /**
     * Engine enum value for `DIK_keys.DIK_Z`.
     */
    public static readonly DIK_Z: 29;
    /**
     * Engine enum value for `DIK_keys.DIK_ZENHANKAKU`.
     */
    public static readonly DIK_ZENHANKAKU: 148;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_A`.
     */
    public static readonly GAMEPAD_A: 518;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_B`.
     */
    public static readonly GAMEPAD_B: 519;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_BACK`.
     */
    public static readonly GAMEPAD_BACK: 522;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_DPAD_DOWN`.
     */
    public static readonly GAMEPAD_DPAD_DOWN: 530;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_DPAD_LEFT`.
     */
    public static readonly GAMEPAD_DPAD_LEFT: 531;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_DPAD_RIGHT`.
     */
    public static readonly GAMEPAD_DPAD_RIGHT: 532;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_DPAD_UP`.
     */
    public static readonly GAMEPAD_DPAD_UP: 529;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_GUIDE`.
     */
    public static readonly GAMEPAD_GUIDE: 523;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_LEFTSHOULDER`.
     */
    public static readonly GAMEPAD_LEFTSHOULDER: 527;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_LEFTSTICK`.
     */
    public static readonly GAMEPAD_LEFTSTICK: 525;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_RIGHTSHOULDER`.
     */
    public static readonly GAMEPAD_RIGHTSHOULDER: 528;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_RIGHTSTICK`.
     */
    public static readonly GAMEPAD_RIGHTSTICK: 526;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_START`.
     */
    public static readonly GAMEPAD_START: 524;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_X`.
     */
    public static readonly GAMEPAD_X: 520;
    /**
     * Engine enum value for `DIK_keys.GAMEPAD_Y`.
     */
    public static readonly GAMEPAD_Y: 521;
    /**
     * Engine enum value for `DIK_keys.MOUSE_1`.
     */
    public static readonly MOUSE_1: 513;
    /**
     * Engine enum value for `DIK_keys.MOUSE_2`.
     */
    public static readonly MOUSE_2: 515;
    /**
     * Engine enum value for `DIK_keys.MOUSE_3`.
     */
    public static readonly MOUSE_3: 514;
    /**
     * Engine enum value for `DIK_keys.MOUSE_4`.
     */
    public static readonly MOUSE_4: 516;
    /**
     * Engine enum value for `DIK_keys.MOUSE_5`.
     */
    public static readonly MOUSE_5: 517;

    /**
     * Engine-owned input key constants.
     */
    protected constructor();
  }

  /**
   * Static key name from `DIK_keys`.
   *
   * @group xr_ui_event
   */
  type TXR_DIK_key_name = EnumeratedStaticsKeys<typeof DIK_keys>;

  /**
   * DIK, mouse, or gamepad key code.
   *
   * @group xr_ui_event
   */
  type TXR_DIK_key = EnumeratedStaticsValues<typeof DIK_keys>;

  /**
   * Game action binding constants.
   *
   * @source C++ class key_bindings
   * @customConstructor key_bindings
   * @group xr_ui_event
   *
   * @remarks
   * Values are action ids, not key codes. Use `bind_to_dik()` and `dik_to_bind()` to translate between actions and
   * concrete input keys.
   */
  export class key_bindings {
    /**
     * Engine enum value for `key_bindings.kACCEL`.
     */
    public static readonly kACCEL: 7;
    /**
     * Engine enum value for `key_bindings.kBACK`.
     */
    public static readonly kBACK: 10;
    /**
     * Engine enum value for `key_bindings.kBUY`.
     */
    public static readonly kBUY: 52;
    /**
     * Engine enum value for `key_bindings.kCAM_1`.
     */
    public static readonly kCAM_1: 16;
    /**
     * Engine enum value for `key_bindings.kCAM_2`.
     */
    public static readonly kCAM_2: 17;
    /**
     * Engine enum value for `key_bindings.kCAM_3`.
     */
    public static readonly kCAM_3: 18;
    /**
     * Engine enum value for `key_bindings.kCAM_ZOOM_IN`.
     */
    public static readonly kCAM_ZOOM_IN: 20;
    /**
     * Engine enum value for `key_bindings.kCAM_ZOOM_OUT`.
     */
    public static readonly kCAM_ZOOM_OUT: 21;
    /**
     * Engine enum value for `key_bindings.kCHAT`.
     */
    public static readonly kCHAT: 46;
    /**
     * Engine enum value for `key_bindings.kCONSOLE`.
     */
    public static readonly kCONSOLE: 50;
    /**
     * Engine enum value for `key_bindings.kCROUCH`.
     */
    public static readonly kCROUCH: 5;
    /**
     * Engine enum value for `key_bindings.kDOWN`.
     */
    public static readonly kDOWN: 3;
    /**
     * Engine enum value for `key_bindings.kDROP`.
     */
    public static readonly kDROP: 43;
    /**
     * Engine enum value for `key_bindings.kFWD`.
     */
    public static readonly kFWD: 9;
    /**
     * Engine enum value for `key_bindings.kINVENTORY`.
     */
    public static readonly kINVENTORY: 51;
    /**
     * Engine enum value for `key_bindings.kJUMP`.
     */
    public static readonly kJUMP: 4;
    /**
     * Engine enum value for `key_bindings.kLEFT`.
     */
    public static readonly kLEFT: 0;
    /**
     * Engine enum value for `key_bindings.kL_LOOKOUT`.
     */
    public static readonly kL_LOOKOUT: 13;
    /**
     * Engine enum value for `key_bindings.kL_STRAFE`.
     */
    public static readonly kL_STRAFE: 11;
    /**
     * Engine enum value for `key_bindings.kNIGHT_VISION`.
     */
    public static readonly kNIGHT_VISION: 24;
    /**
     * Engine enum value for `key_bindings.kQUIT`.
     */
    public static readonly kQUIT: 49;
    /**
     * Engine enum value for `key_bindings.kRIGHT`.
     */
    public static readonly kRIGHT: 1;
    /**
     * Engine enum value for `key_bindings.kR_LOOKOUT`.
     */
    public static readonly kR_LOOKOUT: 14;
    /**
     * Engine enum value for `key_bindings.kR_STRAFE`.
     */
    public static readonly kR_STRAFE: 12;
    /**
     * Engine enum value for `key_bindings.kSCORES`.
     */
    public static readonly kSCORES: 45;
    /**
     * Engine enum value for `key_bindings.kSCREENSHOT`.
     */
    public static readonly kSCREENSHOT: 48;
    /**
     * Engine enum value for `key_bindings.kSKIN`.
     */
    public static readonly kSKIN: 53;
    /**
     * Engine enum value for `key_bindings.kTEAM`.
     */
    public static readonly kTEAM: 54;
    /**
     * Engine enum value for `key_bindings.kTORCH`.
     */
    public static readonly kTORCH: 23;
    /**
     * Engine enum value for `key_bindings.kUP`.
     */
    public static readonly kUP: 2;
    /**
     * Engine enum value for `key_bindings.kUSE`.
     */
    public static readonly kUSE: 44;
    /**
     * Engine enum value for `key_bindings.kWPN_1`.
     */
    public static readonly kWPN_1: 26;
    /**
     * Engine enum value for `key_bindings.kWPN_2`.
     */
    public static readonly kWPN_2: 27;
    /**
     * Engine enum value for `key_bindings.kWPN_3`.
     */
    public static readonly kWPN_3: 28;
    /**
     * Engine enum value for `key_bindings.kWPN_4`.
     */
    public static readonly kWPN_4: 29;
    /**
     * Engine enum value for `key_bindings.kWPN_5`.
     */
    public static readonly kWPN_5: 30;
    /**
     * Engine enum value for `key_bindings.kWPN_6`.
     */
    public static readonly kWPN_6: 31;
    /**
     * Engine enum value for `key_bindings.kWPN_FIRE`.
     */
    public static readonly kWPN_FIRE: 34;
    /**
     * Engine enum value for `key_bindings.kWPN_FUNC`.
     */
    public static readonly kWPN_FUNC: 39;
    /**
     * Engine enum value for `key_bindings.kWPN_NEXT`.
     */
    public static readonly kWPN_NEXT: 33;
    /**
     * Engine enum value for `key_bindings.kWPN_RELOAD`.
     */
    public static readonly kWPN_RELOAD: 38;
    /**
     * Engine enum value for `key_bindings.kWPN_ZOOM`.
     */
    public static readonly kWPN_ZOOM: 35;
  }

  /**
   * Transforms dik key enumeration code to key binding code.
   *
   * @group xr_ui_event
   *
   * @remarks
   * Uses the default input context.
   *
   * @param keycode - DIK or mouse/gamepad key code.
   * @returns Bound game action id.
   */
  export function dik_to_bind(this: void, keycode: i32): i32;

  /**
   * Transform a DIK key code to a game action in a specific input context.
   *
   * @group xr_ui_event
   *
   * @remarks
   * Context values are exported by `key_bindings_context` in the engine binding.
   *
   * @param keycode - DIK or mouse/gamepad key code.
   * @param context - Input context id.
   * @returns Bound game action id.
   */
  export function dik_to_bind(this: void, keycode: i32, context: i32): i32;

  /**
   * Get the primary DIK key bound to a game action.
   *
   * @group xr_ui_event
   *
   * @remarks
   * Returns the first binding slot for the action.
   *
   * @param action - Game action id.
   * @returns DIK or mouse/gamepad key code.
   */
  export function bind_to_dik(this: void, action: i32): i32;

  /**
   * Get a DIK key bound to a game action by binding slot.
   *
   * @group xr_ui_event
   *
   * @remarks
   * `index` selects the action binding slot used by the engine input configuration.
   *
   * @param action - Game action id.
   * @param index - Binding slot index.
   * @returns DIK or mouse/gamepad key code.
   */
  export function bind_to_dik(this: void, action: i32, index: i32): i32;
}
