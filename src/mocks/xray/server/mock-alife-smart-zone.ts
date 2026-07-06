import { jest } from "@jest/globals";
import type { cse_alife_smart_zone } from "xray16";

import { mockClsid } from "../mock-clsid";

import { type IMockAlifeObjectConfig, MockAlifeObject } from "./mock-alife-object";

/**
 * Mock alife smart zone server object.
 */
export class MockAlifeSmartZone extends MockAlifeObject {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_smart_zone {
    return new this({ ...config, clsid: mockClsid.smart_zone }) as unknown as cse_alife_smart_zone;
  }

  public set_available_loopholes = jest.fn();
}
