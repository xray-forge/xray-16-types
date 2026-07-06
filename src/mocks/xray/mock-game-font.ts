/**
 * Mock of the X-Ray engine `CGameFont` class for jest/node.
 */
export class MockCGameFont {
  public static readonly alCenter: number = 2;
  public static readonly alLeft: number = 0;
  public static readonly alRight: number = 1;
}

/**
 * Mock of the engine `GetFontLetterica16Russian` global.
 */
export function mockGetFontLetterica16Russian(): MockCGameFont {
  return new MockCGameFont();
}
