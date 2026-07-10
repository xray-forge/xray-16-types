import { jest } from "@jest/globals";

import { MockFileStatus } from "./mock-file-status";
import { MockFileSystemList } from "./mock-file-system-list";

/**
 * Mock engine FS manager.
 */
export class MockFileSystem {
  public static MOCKS: Record<string, Record<string, boolean>> = {
    ["$game_sounds$"]: {
      "device\\pda\\pda_objective.ogg": true,
    },
  };

  public static FS_ClampExt: number = 4;
  public static FS_ListFiles: number = 1;
  public static FS_ListFolders: number = 2;
  public static FS_RootOnly: number = 8;
  public static FS_sort_by_modif_down: number = 5;
  public static FS_sort_by_modif_up: number = 4;
  public static FS_sort_by_name_down: number = 1;
  public static FS_sort_by_name_up: number = 0;
  public static FS_sort_by_size_down: number = 3;
  public static FS_sort_by_size_up: number = 2;
  public static FSType_Virtual: number = 1;
  public static FSType_External: number = 2;
  public static FSType_Any: number = 3;

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

  public r_open = jest.fn(() => ({}));

  public w_close = jest.fn();

  public w_open = jest.fn(() => ({}));

  public exist = jest.fn((rootOrPath: string, path?: string, fsType?: number) => {
    const exists: boolean =
      path === undefined ? Boolean(this.mocks[rootOrPath]) : Boolean(this.mocks[rootOrPath]?.[path]);

    if (fsType !== undefined) {
      return exists ? MockFileStatus.mock(true, fsType === MockFileSystem.FSType_External) : null;
    }

    return exists;
  });
}
