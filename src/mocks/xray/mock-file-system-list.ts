/**
 * Mock of the X-Ray engine FS file list.
 */
export class MockFileSystemList {
  public list: Array<unknown>;

  public constructor(list: Array<string> = []) {
    this.list = list;
  }

  public Size(): number {
    return this.list.length;
  }

  public Sort(): void {}
}
