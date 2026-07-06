import { jest } from "@jest/globals";
import type { cse_smart_cover } from "xray16";

import { type IMockAlifeObjectConfig, MockAlifeObject } from "./mock-alife-object";

/**
 * Mock generic server object handling smart covers.
 */
export class MockAlifeSmartCover extends MockAlifeObject {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_smart_cover {
    return new this(config) as unknown as cse_smart_cover;
  }

  public set_available_loopholes = jest.fn();

  public set_loopholes_table_checker = jest.fn();

  public description = jest.fn(() => "default");

  public FillProps(): void {}
}
