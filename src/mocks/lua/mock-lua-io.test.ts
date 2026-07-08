import { MockIoFile, mockIo } from "./mock-lua-io";

describe("MockIoFile", () => {
  it("should write and read back content while open", () => {
    const file = new MockIoFile("path.txt", "w");

    file.write("data");

    expect(file.content).toBe("data");
    expect(file.read()).toBe("data");
  });

  it("should close and reject further writes", () => {
    const file = new MockIoFile("path.txt", "w");

    file.close();

    expect(file.isOpen).toBe(false);
    expect(() => file.write("more")).toThrow();
  });

  it("should expose itself as a LuaFile mock", () => {
    const file = new MockIoFile("path.txt", "r");

    expect(file.asMock()).toBe(file);
    expect(MockIoFile.mock("a.txt", "r")).toBeInstanceOf(MockIoFile);
  });
});

describe("mockIo", () => {
  it("should open a file wrapped in a multi-return array", () => {
    const [file] = mockIo.open("a.txt", "w") as unknown as [MockIoFile];

    expect(file).toBeInstanceOf(MockIoFile);
    expect(file.path).toBe("a.txt");
  });

  it("should report io type for open, closed and foreign values", () => {
    const file = new MockIoFile("a.txt", "w");

    expect(mockIo.type(file)).toBe("file");

    file.close();

    expect(mockIo.type(file)).toBe("closed file");
    expect(mockIo.type({})).toBeNull();
  });
});
