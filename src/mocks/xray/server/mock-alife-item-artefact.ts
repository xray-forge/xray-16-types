import type { cse_alife_item_artefact } from "xray16";

import { MockAlifeItem } from "./mock-alife-item";
import { type IMockAlifeObjectConfig } from "./mock-alife-object";

/**
 * Mock alife artefact item server object.
 */
export class MockAlifeItemArtefact extends MockAlifeItem implements cse_alife_item_artefact {
  public static override mock(config: IMockAlifeObjectConfig = {}): cse_alife_item_artefact {
    return new this(config) as unknown as cse_alife_item_artefact;
  }

  public static override create(config: IMockAlifeObjectConfig = {}): MockAlifeItemArtefact {
    return new this(config);
  }
}
