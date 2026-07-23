import { jest } from "@jest/globals";
import type { CGameTask, TXR_TaskState, TXR_TaskType } from "xray16";

/**
 * Mock x-ray task object.
 */
export class MockCGameTask implements CGameTask {
  public static create(overrides: Partial<MockCGameTask> = {}): MockCGameTask {
    const task: MockCGameTask = new MockCGameTask();

    Object.entries(overrides).forEach(([key, value]) => ((task as Record<string, any>)[key] = value));

    return task;
  }

  public static mock(overrides: Partial<MockCGameTask> = {}): CGameTask {
    const task: MockCGameTask = new MockCGameTask();

    Object.entries(overrides).forEach(([key, value]) => ((task as Record<string, any>)[key] = value));

    return task as CGameTask;
  }

  public priority: number = -1;
  public title: string = "test_title";
  public description: string = "test_description";
  public iconName: string = "test_icon";
  public id: string = "test_id";
  public state: TXR_TaskState = 1;
  public def_ml_enabled: boolean = false;

  public add_complete_func = jest.fn((): void => {});

  public add_complete_info = jest.fn((): void => {});

  public add_fail_func = jest.fn((): void => {});

  public add_fail_info = jest.fn((): void => {});

  public add_on_complete_func = jest.fn((): void => {});

  public add_on_complete_info = jest.fn((): void => {});

  public add_on_fail_func = jest.fn((): void => {});

  public add_on_fail_info = jest.fn((): void => {});

  public change_map_location = jest.fn((): void => {});

  public get_description = jest.fn((): string => {
    return this.description;
  });

  public get_icon_name = jest.fn(<T extends string>(): T | null => {
    return this.iconName as T;
  }) as <T extends string>() => T | null;

  public get_id = jest.fn((): string => {
    return this.id;
  });

  public get_priority = jest.fn((): number => {
    return this.priority;
  });

  public get_state = jest.fn((): TXR_TaskState => {
    return this.state;
  });

  public get_title = jest.fn((): string => {
    return this.title;
  });

  public get_type = jest.fn((): TXR_TaskType => {
    return 0;
  });

  public remove_map_locations = jest.fn((flag: boolean): void => {});

  public set_description = jest.fn((description: string): void => {
    this.description = description;
  });

  public set_icon_name = jest.fn((name: string): void => {
    this.iconName = name;
  });

  public set_id = jest.fn((id: string): void => {
    this.id = id;
  });

  public set_map_hint = jest.fn((hint: string): void => {});

  public set_map_location = jest.fn((location: string): void => {});

  public set_map_object_id = jest.fn((id: number): void => {});

  public set_priority = jest.fn((priority: number): void => {
    this.priority = priority;
  });

  public set_title = jest.fn((title: string): void => {
    this.title = title;
  });

  public set_type = jest.fn((type: number): void => {});

  public get_map_location = jest.fn((): string => {
    throw new Error("Method not implemented.");
  });

  public get_map_object_id = jest.fn((): number => {
    throw new Error("Method not implemented.");
  });

  public create_map_location = jest.fn((): string => {
    throw new Error("Method not implemented.");
  });

  public load = jest.fn((): void => {
    throw new Error("Method not implemented.");
  });

  public add_objective = jest.fn((): void => {
    throw new Error("Method not implemented.");
  });

  public get_objective = jest.fn((): CGameTask => {
    throw new Error("Method not implemented.");
  });

  public get_objectives_cnt = jest.fn((): number => {
    throw new Error("Method not implemented.");
  });

  public get_idx = jest.fn((): number => {
    throw new Error("Method not implemented.");
  });

  public set_article_id = jest.fn((): void => {
    throw new Error("Method not implemented.");
  });

  public set_article_key = jest.fn((): void => {
    throw new Error("Method not implemented.");
  });

  public set_object_id = jest.fn((): void => {
    throw new Error("Method not implemented.");
  });
}

/**
 * Mock task object.
 *
 * @deprecated
 */
export function mockCGameTask(overrides: Partial<MockCGameTask> = {}): CGameTask {
  const task: MockCGameTask = new MockCGameTask();

  Object.entries(overrides).forEach(([key, value]) => ((task as Record<string, any>)[key] = value));

  return task as CGameTask;
}
