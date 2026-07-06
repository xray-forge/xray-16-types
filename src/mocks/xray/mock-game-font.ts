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
export const mockGetFontLetterica16Russian = jest.fn((): MockCGameFont => {
  return new MockCGameFont();
});
