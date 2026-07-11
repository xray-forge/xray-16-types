import { mockLfs } from "./mock-lua-lfs";

describe("mockLfs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should provide no-op directory creation and no attributes", () => {
    expect(mockLfs.mkdir("test")).toBeUndefined();
    expect(mockLfs.mkdir).toHaveBeenCalledWith("test");
    expect(mockLfs.attributes("test")).toBeNull();
  });

  it("should provide an empty directory iterator", () => {
    const [, directory] = mockLfs.dir("test");

    expect(directory.next()).toBeNull();
  });
});
