import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";

import { MockConsole } from "../../mocks";
import { mockTable } from "../../mocks/lua/mock-lua-table";

import { executeConsoleCommand, getConsoleFloatCommand } from "./console";

// Console utils use the Lua `table` global for argument concatenation; provide the mock before the specs run.
beforeAll(() => {
  (globalThis as Record<string, unknown>).table = mockTable;
});

beforeEach(() => {
  MockConsole.reset();
});

describe("executeConsoleCommand", () => {
  it("should correctly execute simple and parameterized commands", () => {
    const console: MockConsole = MockConsole.getInstance();

    executeConsoleCommand("disconnect");
    expect(console.execute).toHaveBeenCalledWith("disconnect");

    executeConsoleCommand("g_game_difficulty", "gd_master");
    expect(console.execute).toHaveBeenCalledWith("g_game_difficulty gd_master");

    executeConsoleCommand("start", "server(all/single/alife/new)", "client(localhost)");
    expect(console.execute).toHaveBeenCalledWith("start server(all/single/alife/new) client(localhost)");
  });
});

describe("getConsoleFloatCommand", () => {
  it("should correctly read float value from console", () => {
    expect(getConsoleFloatCommand("test")).toBe(0.5);
    expect(getConsoleFloatCommand("test", "a", "b")).toBe(0.5);
  });
});
