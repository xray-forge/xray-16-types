import type { FS_file_list, FS_file_list_ex, FS_item } from "xray16";

function createFileSystemItem(name: string): FS_item {
  return {
    Modif: () => "",
    ModifDigitOnly: () => "",
    NameFull: () => name,
    NameShort: () => name.replace(/^.*[\\/]/, ""),
    Size: () => 0,
  };
}

/**
 * Mock of the X-Ray engine FS file list.
 */
export class MockFileSystemList implements FS_file_list, FS_file_list_ex {
  public list: Array<FS_item>;

  public constructor(list: Array<FS_item | string> = []) {
    this.list = list.map((item) => (typeof item === "string" ? createFileSystemItem(item) : item));
  }

  public Size(): number {
    return this.list.length;
  }

  public GetAt(index: number): FS_item {
    return this.list[index];
  }

  public Sort(_mode?: number): void {}

  public Free(): void {
    this.list = [];
  }
}
