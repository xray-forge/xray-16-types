import { jest } from "@jest/globals";
import type { cse_smart_cover } from "xray16";

import { MockAlifeDynamicObject } from "./mock-alife-dynamic-object";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock generic server object handling smart covers.
 */
export class MockAlifeSmartCover extends MockAlifeDynamicObject implements cse_smart_cover {
  public objectDescription: string | null;

  public static override mock(config: IMockAlifeObjectConfig = {}): cse_smart_cover {
    return new this(config) as unknown as cse_smart_cover;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeSmartCover {
    return new this(config);
  }

  public constructor(config: IMockAlifeObjectConfig = {}) {
    super(config);

    this.objectDescription = "default";
  }

  public set_available_loopholes = jest.fn();

  public set_loopholes_table_checker = jest.fn();

  public description<T extends string = string>(): T | null {
    return this.objectDescription as T | null;
  }

  public override FillProps(): void {}
}
