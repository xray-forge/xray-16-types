import { beforeAll, describe, expect, it } from "@jest/globals";

import { MockLuaTable } from "../../mocks";
import { extendJest } from "../extend-jest";

beforeAll(() => {
  extendJest();
});

describe("lua matchers", () => {
  it("toBeNil should match null and undefined", () => {
    expect(null).toBeNil();
    expect(undefined).toBeNil();
  });

  it("toEqualLuaArrays should compare lua array tables", () => {
    const table = MockLuaTable.mockFromArray<number>([1, 2, 3]);

    expect(table).toEqualLuaArrays([1, 2, 3]);
  });

  it("toEqualLuaTables should compare lua tables", () => {
    const table = MockLuaTable.mockFromObject<string, number>({ a: 1, b: 2 });

    expect(table).toEqualLuaTables({ a: 1, b: 2 });
  });
});
