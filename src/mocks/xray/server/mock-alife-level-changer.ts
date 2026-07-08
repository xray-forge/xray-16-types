import type { cse_alife_level_changer } from "xray16";

import { type IMockAlifeObjectConfig } from "./mock-alife-object";
import { MockSpaceRestrictor } from "./mock-space-restrictor";

export interface IMockAlifeLevelChangerConfig extends IMockAlifeObjectConfig {
  destLevelName?: string;
}

/**
 * Mock alife level changer server object.
 */
export class MockAlifeLevelChanger extends MockSpaceRestrictor implements cse_alife_level_changer {
  public objectDestLevelName: string;

  public static override mock(config: IMockAlifeLevelChangerConfig = {}): cse_alife_level_changer {
    return new this(config) as unknown as cse_alife_level_changer;
  }

  public static override create(config: IMockAlifeLevelChangerConfig = {}): MockAlifeLevelChanger {
    return new this(config);
  }

  public constructor(config: IMockAlifeLevelChangerConfig = {}) {
    super(config);

    this.objectDestLevelName = config.destLevelName ?? "unknown";
  }

  public get_dest_level_name(): string {
    return this.objectDestLevelName;
  }
}
