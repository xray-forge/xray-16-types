import { type FileStatus } from "xray16";

/**
 * Mock of the X-Ray engine FS file status.
 */
export class MockFileStatus implements FileStatus {
  public static create(exists?: boolean, external?: boolean): MockFileStatus {
    return new MockFileStatus(exists, external);
  }

  public static mock(exists?: boolean, external?: boolean): FileStatus {
    return new MockFileStatus(exists, external);
  }

  public readonly Exists: boolean;
  public readonly External: boolean;

  public constructor(exists?: boolean, external?: boolean) {
    this.Exists = exists ?? true;
    this.External = external ?? false;
  }
}
