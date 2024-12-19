declare module "xray16" {
  /**
   * @source C++ class ui_events
   * @customConstructor ui_events
   * @group xr_ui_event
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
   * @group xr_ui_event
   */
  type TXR_ui_event = EnumeratedStaticsValues<typeof ui_events>;

  /**
   * @source C++ class DIK_keys
   * @customConstructor DIK_keys
   * @group xr_ui_event
   */
  export class DIK_keys {
    public static readonly DIK_0: 39;
    public static readonly DIK_1: 30;
    public static readonly DIK_2: 31;
    public static readonly DIK_3: 32;
    public static readonly DIK_4: 33;
    public static readonly DIK_5: 34;
    public static readonly DIK_6: 35;
    public static readonly DIK_7: 36;
    public static readonly DIK_8: 37;
    public static readonly DIK_9: 38;
    public static readonly DIK_A: 4;
    public static readonly DIK_ADD: 87;
    public static readonly DIK_ALTERASE: 153;
    public static readonly DIK_APOSTROPHE: 52;
    public static readonly DIK_APP1: 283;
    public static readonly DIK_APP2: 284;
    public static readonly DIK_APPLICATION: 101;
    public static readonly DIK_AUDIOMUTE: 262;
    public static readonly DIK_AUDIONEXT: 258;
    public static readonly DIK_AUDIOPLAY: 261;
    public static readonly DIK_AUDIOPREV: 259;
    public static readonly DIK_AUDIOSTOP: 260;
    public static readonly DIK_B: 5;
    public static readonly DIK_BACK: 42;
    public static readonly DIK_BACKSLASH: 49;
    public static readonly DIK_BRIGHTNESSDOWN: 275;
    public static readonly DIK_BRIGHTNESSUP: 276;
    public static readonly DIK_C: 6;
    public static readonly DIK_CANCEL: 155;
    public static readonly DIK_CAPITAL: 57;
    public static readonly DIK_CLEAR: 156;
    public static readonly DIK_CLEARAGAIN: 162;
    public static readonly DIK_COMMA: 54;
    public static readonly DIK_COPY: 124;
    public static readonly DIK_CRSEL: 163;
    public static readonly DIK_CURRENCYSUBUNIT: 181;
    public static readonly DIK_CURRENCYUNIT: 180;
    public static readonly DIK_CUT: 123;
    public static readonly DIK_D: 7;
    public static readonly DIK_DECIMALSEPARATOR: 179;
    public static readonly DIK_DELETE: 76;
    public static readonly DIK_DISPLAYSWITCH: 277;
    public static readonly DIK_DIVIDE: 84;
    public static readonly DIK_DOWN: 81;
    public static readonly DIK_E: 8;
    public static readonly DIK_EJECT: 281;
    public static readonly DIK_END: 77;
    public static readonly DIK_EQUALS: 46;
    public static readonly DIK_ESCAPE: 41;
    public static readonly DIK_EXECUTE: 116;
    public static readonly DIK_EXSEL: 164;
    public static readonly DIK_F10: 67;
    public static readonly DIK_F11: 68;
    public static readonly DIK_F12: 69;
    public static readonly DIK_F13: 104;
    public static readonly DIK_F14: 105;
    public static readonly DIK_F15: 106;
    public static readonly DIK_F16: 107;
    public static readonly DIK_F17: 108;
    public static readonly DIK_F18: 109;
    public static readonly DIK_F19: 110;
    public static readonly DIK_F1: 58;
    public static readonly DIK_F20: 111;
    public static readonly DIK_F21: 112;
    public static readonly DIK_F22: 113;
    public static readonly DIK_F23: 114;
    public static readonly DIK_F24: 115;
    public static readonly DIK_F2: 59;
    public static readonly DIK_F3: 60;
    public static readonly DIK_F4: 61;
    public static readonly DIK_F5: 62;
    public static readonly DIK_F6: 63;
    public static readonly DIK_F7: 64;
    public static readonly DIK_F8: 65;
    public static readonly DIK_F9: 66;
    public static readonly DIK_F: 9;
    public static readonly DIK_FIND: 126;
    public static readonly DIK_G: 10;
    public static readonly DIK_GRAVE: 53;
    public static readonly DIK_H: 11;
    public static readonly DIK_HANGUL: 144;
    public static readonly DIK_HANJA: 145;
    public static readonly DIK_HELP: 117;
    public static readonly DIK_HIRAGANA: 147;
    public static readonly DIK_HOME: 74;
    public static readonly DIK_I: 12;
    public static readonly DIK_INSERT: 73;
    public static readonly DIK_INTERNATIONAL1: 135;
    public static readonly DIK_INTERNATIONAL2: 136;
    public static readonly DIK_INTERNATIONAL4: 138;
    public static readonly DIK_INTERNATIONAL5: 139;
    public static readonly DIK_INTERNATIONAL6: 140;
    public static readonly DIK_INTERNATIONAL7: 141;
    public static readonly DIK_INTERNATIONAL8: 142;
    public static readonly DIK_INTERNATIONAL9: 143;
    public static readonly DIK_J: 13;
    public static readonly DIK_K: 14;
    public static readonly DIK_KATAKANA: 146;
    public static readonly DIK_KBDILLUMDOWN: 279;
    public static readonly DIK_KBDILLUMTOGGLE: 278;
    public static readonly DIK_KBDILLUMUP: 280;
    public static readonly DIK_L: 15;
    public static readonly DIK_LANG6: 149;
    public static readonly DIK_LANG7: 150;
    public static readonly DIK_LANG8: 151;
    public static readonly DIK_LANG9: 152;
    public static readonly DIK_LBRACKET: 47;
    public static readonly DIK_LCONTROL: 224;
    public static readonly DIK_LEFT: 80;
    public static readonly DIK_LMENU: 226;
    public static readonly DIK_LSHIFT: 225;
    public static readonly DIK_LWIN: 227;
    public static readonly DIK_M: 16;
    public static readonly DIK_MENU: 118;
    public static readonly DIK_MINUS: 45;
    public static readonly DIK_MODE: 257;
    public static readonly DIK_MULTIPLY: 85;
    public static readonly DIK_MUTE: 127;
    public static readonly DIK_N: 17;
    public static readonly DIK_NONUSBACKSLASH: 100;
    public static readonly DIK_NONUSHASH: 50;
    public static readonly DIK_NUMLOCK: 83;
    public static readonly DIK_NUMPAD0: 98;
    public static readonly DIK_NUMPAD1: 89;
    public static readonly DIK_NUMPAD2: 90;
    public static readonly DIK_NUMPAD3: 91;
    public static readonly DIK_NUMPAD4: 92;
    public static readonly DIK_NUMPAD5: 93;
    public static readonly DIK_NUMPAD6: 94;
    public static readonly DIK_NUMPAD7: 95;
    public static readonly DIK_NUMPAD8: 96;
    public static readonly DIK_NUMPAD9: 97;
    public static readonly DIK_NUMPADCOMMA: 133;
    public static readonly DIK_NUMPADENTER: 88;
    public static readonly DIK_NUMPADEQUALS: 103;
    public static readonly DIK_NUMPADEQUALSAS400: 134;
    public static readonly DIK_NUMPADPERIOD: 99;
    public static readonly DIK_NUMPAD_000: 177;
    public static readonly DIK_NUMPAD_00: 176;
    public static readonly DIK_NUMPAD_A: 188;
    public static readonly DIK_NUMPAD_AC_BACK: 270;
    public static readonly DIK_NUMPAD_AC_BOOKMARKS: 274;
    public static readonly DIK_NUMPAD_AC_FORWARD: 271;
    public static readonly DIK_NUMPAD_AC_HOME: 269;
    public static readonly DIK_NUMPAD_AC_REFRESH: 273;
    public static readonly DIK_NUMPAD_AC_SEARCH: 268;
    public static readonly DIK_NUMPAD_AC_STOP: 272;
    public static readonly DIK_NUMPAD_AMPERSAND: 199;
    public static readonly DIK_NUMPAD_AT: 206;
    public static readonly DIK_NUMPAD_B: 189;
    public static readonly DIK_NUMPAD_BACKSPACE: 187;
    public static readonly DIK_NUMPAD_BINARY: 218;
    public static readonly DIK_NUMPAD_C: 190;
    public static readonly DIK_NUMPAD_CALCULATOR: 266;
    public static readonly DIK_NUMPAD_CLEAR: 216;
    public static readonly DIK_NUMPAD_CLEARENTRY: 217;
    public static readonly DIK_NUMPAD_COLON: 203;
    public static readonly DIK_NUMPAD_COMPUTER: 267;
    public static readonly DIK_NUMPAD_D: 191;
    public static readonly DIK_NUMPAD_DBLAMPERSAND: 200;
    public static readonly DIK_NUMPAD_DBLVERTICALBAR: 202;
    public static readonly DIK_NUMPAD_DECIMAL: 220;
    public static readonly DIK_NUMPAD_E: 192;
    public static readonly DIK_NUMPAD_EXCLAM: 207;
    public static readonly DIK_NUMPAD_F: 193;
    public static readonly DIK_NUMPAD_GREATER: 198;
    public static readonly DIK_NUMPAD_HASH: 204;
    public static readonly DIK_NUMPAD_HEXADECIMAL: 221;
    public static readonly DIK_NUMPAD_LEFTBRACE: 184;
    public static readonly DIK_NUMPAD_LEFTPAREN: 182;
    public static readonly DIK_NUMPAD_LESS: 197;
    public static readonly DIK_NUMPAD_MAIL: 265;
    public static readonly DIK_NUMPAD_MEDIASELECT: 263;
    public static readonly DIK_NUMPAD_MEMADD: 211;
    public static readonly DIK_NUMPAD_MEMCLEAR: 210;
    public static readonly DIK_NUMPAD_MEMDIVIDE: 214;
    public static readonly DIK_NUMPAD_MEMMULTIPLY: 213;
    public static readonly DIK_NUMPAD_MEMRECALL: 209;
    public static readonly DIK_NUMPAD_MEMSTORE: 208;
    public static readonly DIK_NUMPAD_MEMSUBTRACT: 212;
    public static readonly DIK_NUMPAD_OCTAL: 219;
    public static readonly DIK_NUMPAD_PERCENT: 196;
    public static readonly DIK_NUMPAD_PLUSMINUS: 215;
    public static readonly DIK_NUMPAD_POWER: 195;
    public static readonly DIK_NUMPAD_RIGHTBRACE: 185;
    public static readonly DIK_NUMPAD_RIGHTPAREN: 183;
    public static readonly DIK_NUMPAD_SPACE: 205;
    public static readonly DIK_NUMPAD_TAB: 186;
    public static readonly DIK_NUMPAD_VERTICALBAR: 201;
    public static readonly DIK_NUMPAD_WWW: 264;
    public static readonly DIK_NUMPAD_XOR: 194;
    public static readonly DIK_O: 18;
    public static readonly DIK_OPER: 161;
    public static readonly DIK_OUT: 160;
    public static readonly DIK_P: 19;
    public static readonly DIK_PASTE: 125;
    public static readonly DIK_PAUSE: 72;
    public static readonly DIK_PERIOD: 55;
    public static readonly DIK_PGDN: 75;
    public static readonly DIK_PGUP: 78;
    public static readonly DIK_POWER: 102;
    public static readonly DIK_PRINTSCREEN: 70;
    public static readonly DIK_PRIOR: 157;
    public static readonly DIK_Q: 20;
    public static readonly DIK_R: 21;
    public static readonly DIK_RBRACKET: 48;
    public static readonly DIK_RCONTROL: 228;
    public static readonly DIK_REDO: 121;
    public static readonly DIK_RETURN2: 158;
    public static readonly DIK_RETURN: 40;
    public static readonly DIK_RIGHT: 79;
    public static readonly DIK_RMENU: 230;
    public static readonly DIK_RSHIFT: 229;
    public static readonly DIK_RWIN: 231;
    public static readonly DIK_S: 22;
    public static readonly DIK_SCROLL: 71;
    public static readonly DIK_SELECT: 119;
    public static readonly DIK_SEMICOLON: 51;
    public static readonly DIK_SEPARATOR: 159;
    public static readonly DIK_SLASH: 56;
    public static readonly DIK_SLEEP: 282;
    public static readonly DIK_SPACE: 44;
    public static readonly DIK_STOP: 120;
    public static readonly DIK_SUBTRACT: 86;
    public static readonly DIK_T: 23;
    public static readonly DIK_TAB: 43;
    public static readonly DIK_THOUSANDSSEPARATOR: 178;
    public static readonly DIK_U: 24;
    public static readonly DIK_UNDO: 122;
    public static readonly DIK_UP: 82;
    public static readonly DIK_V: 25;
    public static readonly DIK_VOLUMEDOWN: 129;
    public static readonly DIK_VOLUMEUP: 128;
    public static readonly DIK_W: 26;
    public static readonly DIK_X: 27;
    public static readonly DIK_Y: 28;
    public static readonly DIK_YEN: 137;
    public static readonly DIK_Z: 29;
    public static readonly DIK_ZENHANKAKU: 148;
    public static readonly GAMEPAD_A: 518;
    public static readonly GAMEPAD_B: 519;
    public static readonly GAMEPAD_BACK: 522;
    public static readonly GAMEPAD_DPAD_DOWN: 530;
    public static readonly GAMEPAD_DPAD_LEFT: 531;
    public static readonly GAMEPAD_DPAD_RIGHT: 532;
    public static readonly GAMEPAD_DPAD_UP: 529;
    public static readonly GAMEPAD_GUIDE: 523;
    public static readonly GAMEPAD_LEFTSHOULDER: 527;
    public static readonly GAMEPAD_LEFTSTICK: 525;
    public static readonly GAMEPAD_RIGHTSHOULDER: 528;
    public static readonly GAMEPAD_RIGHTSTICK: 526;
    public static readonly GAMEPAD_START: 524;
    public static readonly GAMEPAD_X: 520;
    public static readonly GAMEPAD_Y: 521;
    public static readonly MOUSE_1: 513;
    public static readonly MOUSE_2: 515;
    public static readonly MOUSE_3: 514;
    public static readonly MOUSE_4: 516;
    public static readonly MOUSE_5: 517;

    protected constructor();
  }

  /**
   * @group xr_ui_event
   */
  type TXR_DIK_key_name = EnumeratedStaticsKeys<typeof DIK_keys>;

  /**
   * @group xr_ui_event
   */
  type TXR_DIK_key = EnumeratedStaticsValues<typeof DIK_keys>;

  /**
   * @source C++ class key_bindings
   * @customConstructor key_bindings
   * @group xr_ui_event
   */
  export class key_bindings {
    public static readonly kACCEL: 7;
    public static readonly kBACK: 10;
    public static readonly kBUY: 52;
    public static readonly kCAM_1: 16;
    public static readonly kCAM_2: 17;
    public static readonly kCAM_3: 18;
    public static readonly kCAM_ZOOM_IN: 20;
    public static readonly kCAM_ZOOM_OUT: 21;
    public static readonly kCHAT: 46;
    public static readonly kCONSOLE: 50;
    public static readonly kCROUCH: 5;
    public static readonly kDOWN: 3;
    public static readonly kDROP: 43;
    public static readonly kFWD: 9;
    public static readonly kINVENTORY: 51;
    public static readonly kJUMP: 4;
    public static readonly kLEFT: 0;
    public static readonly kL_LOOKOUT: 13;
    public static readonly kL_STRAFE: 11;
    public static readonly kNIGHT_VISION: 24;
    public static readonly kQUIT: 49;
    public static readonly kRIGHT: 1;
    public static readonly kR_LOOKOUT: 14;
    public static readonly kR_STRAFE: 12;
    public static readonly kSCORES: 45;
    public static readonly kSCREENSHOT: 48;
    public static readonly kSKIN: 53;
    public static readonly kTEAM: 54;
    public static readonly kTORCH: 23;
    public static readonly kUP: 2;
    public static readonly kUSE: 44;
    public static readonly kWPN_1: 26;
    public static readonly kWPN_2: 27;
    public static readonly kWPN_3: 28;
    public static readonly kWPN_4: 29;
    public static readonly kWPN_5: 30;
    public static readonly kWPN_6: 31;
    public static readonly kWPN_FIRE: 34;
    public static readonly kWPN_FUNC: 39;
    public static readonly kWPN_NEXT: 33;
    public static readonly kWPN_RELOAD: 38;
    public static readonly kWPN_ZOOM: 35;
  }

  /**
   * Transforms dik key enumeration code to key binding code.
   *
   * @group xr_ui_event
   */
  export function dik_to_bind(this: void, keycode: i32): i32;
}
