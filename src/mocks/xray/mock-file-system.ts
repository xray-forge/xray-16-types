import { jest } from "@jest/globals";
import type { FS } from "xray16";

import { MockFileStatus } from "./mock-file-status";
import { MockFileSystemList } from "./mock-file-system-list";
import { MockNetProcessor } from "./mock-net-processor";

/**
 * Mock engine FS manager.
 */
export class MockFileSystem implements FS {
  public static MOCKS: Record<string, Record<string, boolean>> = {
    ["$game_sounds$"]: {
      "device\\pda\\pda_objective.ogg": true,
    },
  };

  public static readonly FS_ClampExt = 4 as const;
  public static readonly FS_ListFiles = 1 as const;
  public static readonly FS_ListFolders = 2 as const;
  public static readonly FS_RootOnly = 8 as const;
  public static readonly FS_sort_by_modif_down = 5 as const;
  public static readonly FS_sort_by_modif_up = 4 as const;
  public static readonly FS_sort_by_name_down = 1 as const;
  public static readonly FS_sort_by_name_up = 0 as const;
  public static readonly FS_sort_by_size_down = 3 as const;
  public static readonly FS_sort_by_size_up = 2 as const;
  public static readonly FSType_Virtual = 1 as const;
  public static readonly FSType_External = 2 as const;
  public static readonly FSType_Any = 3 as const;

  private static instance: MockFileSystem | null = null;

  public static create(mocks: Record<string, any> = MockFileSystem.MOCKS): MockFileSystem {
    return new MockFileSystem(mocks);
  }

  public static mock(): MockFileSystem {
    return this.getInstance();
  }

  public static getInstance(): MockFileSystem {
    if (!this.instance) {
      this.instance = new MockFileSystem();
    }

    return this.instance;
  }

  public mocks: Record<string, any>;
  public paths: Record<string, string> = {
    ["$game_config$"]: "$game_config$\\",
    ["$game_data$"]: "$game_data$\\",
    ["$game_saves$"]: "$game_saves$\\",
    ["$logs$"]: "$logs$\\",
  };

  public constructor(mocks: Record<string, any> = MockFileSystem.MOCKS) {
    this.mocks = mocks;
  }

  public setMock(root: string, path: string, isExisting: boolean = true): void {
    if (!this.mocks[root]) {
      this.mocks[root] = {};
    }

    this.mocks[root][path] = isExisting;
  }

  public file_list_open_ex = jest.fn(() => new MockFileSystemList());

  public file_list_open = jest.fn(() => new MockFileSystemList());

  public file_delete = jest.fn(() => {});

  public dir_delete = jest.fn(() => {});

  public file_copy = jest.fn(() => {});

  public file_length = jest.fn((path: string) => (this.exist(path) ? 0 : -1));

  public file_rename = jest.fn(() => {});

  public get_file_age = jest.fn(() => 0);

  public get_file_age_str = jest.fn(() => 0);

  public update_path = jest.fn((base: string, part: string) => {
    if (base.endsWith("\\")) {
      return base + part;
    } else {
      return `${base}\\${part}`;
    }
  });

  public append_path = jest.fn((alias: string, root: string, add: string) => {
    const resolved: string = this.update_path(root, add);

    this.paths[alias] = resolved;

    return {
      m_Add: add,
      m_DefExt: "",
      m_FilterCaption: "",
      m_Path: resolved,
      m_Root: root,
    };
  });

  public path_exist = jest.fn((path: string) => path in this.paths || path in this.mocks);

  public rescan_path = jest.fn();

  public get_path = jest.fn((alias: string) => ({
    m_Add: "",
    m_DefExt: "",
    m_FilterCaption: "",
    m_Path: this.paths[alias] ?? alias,
    m_Root: alias,
  }));

  public r_close = jest.fn();

  public r_open = jest.fn(() => MockNetProcessor.mockReader()) as unknown as jest.MockedFunction<FS["r_open"]>;

  public w_close = jest.fn();

  public w_open = jest.fn(() => ({}));

  public exist = jest.fn((rootOrPath: string, pathOrFsType?: string | number, fsType?: number) => {
    const path: string | null = typeof pathOrFsType === "string" ? pathOrFsType : null;
    const requestedFsType: number | null = typeof pathOrFsType === "number" ? pathOrFsType : (fsType ?? null);
    const exists: boolean = path === null ? Boolean(this.mocks[rootOrPath]) : Boolean(this.mocks[rootOrPath]?.[path]);

    if (requestedFsType !== null) {
      return MockFileStatus.mock(exists, requestedFsType === MockFileSystem.FSType_External);
    }

    return (path !== undefined && path !== null) || exists
      ? {
          modif: 0,
          name: path ?? rootOrPath,
          ptr: 0,
          size_compressed: 0,
          size_real: 0,
        }
      : null;
  }) as unknown as jest.MockedFunction<FS["exist"]>;
}
