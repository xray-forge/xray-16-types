import { jest } from "@jest/globals";
import { type CGameFont } from "xray16";

/**
 * Mock of the X-Ray engine `CGameFont` class for jest/node.
 */
export class MockCGameFont implements CGameFont {
  public static readonly alCenter: number = 2;
  public static readonly alLeft: number = 0;
  public static readonly alRight: number = 1;

  public static mock(): CGameFont {
    return new this() as unknown as CGameFont;
  }

  public static create(): MockCGameFont {
    return new this();
  }
}

/**
 * Mock of the engine font getter globals.
 */
export const mockGetGameFont = jest.fn((): CGameFont => MockCGameFont.mock());
export const mockGetFontDI = mockGetGameFont;
export const mockGetFontGraffiti19Russian = mockGetGameFont;
export const mockGetFontGraffiti22Russian = mockGetGameFont;
export const mockGetFontGraffiti32Russian = mockGetGameFont;
export const mockGetFontGraffiti50Russian = mockGetGameFont;
export const mockGetFontLetterica16Russian = mockGetGameFont;
export const mockGetFontLetterica18Russian = mockGetGameFont;
export const mockGetFontLetterica25 = mockGetGameFont;
export const mockGetFontMedium = mockGetGameFont;
export const mockGetFontSmall = mockGetGameFont;
