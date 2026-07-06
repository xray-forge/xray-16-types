import { mockString } from "./lua-string";
import { mockToString } from "./lua-tostring";

describe("mockString (fengari-backed)", () => {
  // `string.format` delegates to the global `tostring`, installed by the runtime; provide it here.
  const originalToString = (globalThis as Record<string, unknown>).tostring;

  beforeAll(() => {
    (globalThis as Record<string, unknown>).tostring = mockToString;
  });

  afterAll(() => {
    (globalThis as Record<string, unknown>).tostring = originalToString;
  });

  it("should format values like lua", () => {
    expect(mockString.format("abc%s", "54")).toBe("abc54");
    expect(mockString.format("%s-to-%s", "1", 1)).toBe("1-to-1");
    expect(mockString.format("%s:%s:%s and %s", "a", 1, true, null)).toBe("a:1:true and nil");
    expect(mockString.format("%s %% %s %% %s", "a", 1, true)).toBe("a % 1 % true");
    expect(mockString.format("%s %f", "b", 2.5)).toBe("b 2.5");
  });

  it("should find with lua patterns, indices and captures", () => {
    expect(mockString.find("abcd54abc", "54")).toEqual([5, 6, null]);
    expect(mockString.find("abcd54abc", "%d+")).toEqual([5, 6, null]);
    expect(mockString.find("abcd54abc", "43")).toEqual([null, null, null]);
    expect(mockString.find("abcd%d+abc", "%d+", 1, true)).toEqual([5, 7, null]);
    expect(mockString.find("abcd54abc54", "54", 7)).toEqual([10, 11, null]);
    expect(mockString.find("abcd54abc", "cd(%d+)ab")).toEqual([3, 8, "54"]);
    expect(mockString.find("abcd54abc", "(a)b(c)d")).toEqual([1, 4, "a", "c"]);
    expect(mockString.find("", ".*")).toEqual([1, 0, null]);
  });

  it("should gsub and report replacement count", () => {
    expect(mockString.gsub(" aabc ", "^%s*(.-)%s*$", "%1")).toEqual(["aabc", 1]);
    expect(mockString.gsub("Lua is test", "test", "great")).toEqual(["Lua is great", 1]);
    expect(mockString.gsub("Lua is test test", "test", "great")).toEqual(["Lua is great great", 2]);
    expect(mockString.gsub(null as never, "a", "b")).toEqual([null, null, null]);
  });

  it("should gmatch and gfind collecting all matches", () => {
    expect(mockString.gmatch("55", "%d+")).toEqual(["55"]);
    expect(mockString.gmatch("11 2 33 4", "%d+")).toEqual(["11", "2", "33", "4"]);
    expect(mockString.gmatch("", "%d+")).toEqual([]);
    expect(mockString.gfind(" a , b ", "([^,^%s]+)")).toEqual(["a", "b"]);
  });

  it("should sub with positive and negative bounds", () => {
    expect(mockString.sub("1234", 0)).toBe("1234");
    expect(mockString.sub("1234", 2, 3)).toBe("23");
    expect(mockString.sub("1234", -2)).toBe("34");
    expect(mockString.sub("1234", -4, -2)).toBe("123");
    expect(mockString.sub("1234", 6, 7)).toBe("");
  });

  it("should measure length", () => {
    expect(mockString.len("")).toBe(0);
    expect(mockString.len("abc")).toBe(3);
  });

  it("should trim in all directions", () => {
    expect(mockString.trim("  abc  ")).toBe("abc");
    expect(mockString.trim_l("  abc  ")).toBe("abc  ");
    expect(mockString.trim_r("  abc  ")).toBe("  abc");
    expect(mockString.trim_w("  abc  def  ")).toBe("abc  def  ");
    expect(mockString.lower("ABC")).toBe("abc");
  });
});
