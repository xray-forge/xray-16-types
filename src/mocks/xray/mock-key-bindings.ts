import { jest } from "@jest/globals";

/**
 * Mock of X-Ray game action binding constants.
 */
export class MockKeyBindings {
  public static readonly kACCEL: number = 7;
  public static readonly kBACK: number = 10;
  public static readonly kBUY: number = 52;
  public static readonly kCAM_1: number = 16;
  public static readonly kCAM_2: number = 17;
  public static readonly kCAM_3: number = 18;
  public static readonly kCAM_ZOOM_IN: number = 20;
  public static readonly kCAM_ZOOM_OUT: number = 21;
  public static readonly kCHAT: number = 46;
  public static readonly kCONSOLE: number = 50;
  public static readonly kCROUCH: number = 5;
  public static readonly kDOWN: number = 3;
  public static readonly kDROP: number = 43;
  public static readonly kFWD: number = 9;
  public static readonly kINVENTORY: number = 51;
  public static readonly kJUMP: number = 4;
  public static readonly kLEFT: number = 0;
  public static readonly kL_LOOKOUT: number = 13;
  public static readonly kL_STRAFE: number = 11;
  public static readonly kNIGHT_VISION: number = 24;
  public static readonly kQUIT: number = 49;
  public static readonly kRIGHT: number = 1;
  public static readonly kR_LOOKOUT: number = 14;
  public static readonly kSCORES: number = 45;
  public static readonly kSCREENSHOT: number = 48;
  public static readonly kSKIN: number = 53;
  public static readonly kTEAM: number = 54;
  public static readonly kTORCH: number = 23;
  public static readonly kUP: number = 2;
  public static readonly kUSE: number = 44;
  public static readonly kWPN_1: number = 26;
  public static readonly kWPN_2: number = 27;
  public static readonly kWPN_3: number = 28;
  public static readonly kWPN_4: number = 29;
  public static readonly kWPN_5: number = 30;
  public static readonly kWPN_6: number = 31;
  public static readonly kWPN_FIRE: number = 34;
  public static readonly kWPN_FUNC: number = 39;
  public static readonly kWPN_NEXT: number = 33;
  public static readonly kWPN_RELOAD: number = 38;
  public static readonly kWPN_ZOOM: number = 35;
}

/**
 * Mock key-to-action resolver.
 *
 * Returns an unbound sentinel by default. Override it in a test to model the current engine key bindings.
 */
export const mockDikToBind = jest.fn((_key: number, _context?: number): number => -1);
