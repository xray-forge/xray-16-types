import { jest } from "@jest/globals";
import type { cse_alife_human_abstract, IXR_relation_registry } from "xray16";

import { charactersGoodwill, communityGoodwill } from "./mock-community-relations";
import { MockAlifeSimulator } from "./server/mock-alife-simulator";

/**
 * Mock module with relations methods and registry.
 */
export const mockRelationRegistryInterface: IXR_relation_registry = {
  change_community_goodwill: jest.fn((communityA: string, value2: number, value3: number): void => {}),
  community_goodwill: jest.fn((community: string, objectId: number): number => {
    const object: cse_alife_human_abstract | null = MockAlifeSimulator.getFromRegistry(objectId);

    if (!object) {
      throw new Error(`Object is not registered: '${objectId}'.`);
    }

    return mockRelationRegistryInterface.community_relation(community, object.community());
  }),
  community_relation: jest.fn((from: string, to: string): number => {
    const descriptor = communityGoodwill[from];
    const goodwill = descriptor?.[to];

    if (goodwill !== undefined) {
      return goodwill;
    }

    return 0;
  }),
  get_general_goodwill_between: jest.fn((from: number, to: number): number => {
    if (typeof charactersGoodwill[from]?.[to] === "number") {
      return charactersGoodwill[from][to];
    }

    throw new Error(`Unexpected mock check: '${from}' to '${to}'.`);
  }),
  set_community_goodwill: jest.fn((communityA: string, value2: number, value3: number): void => {}),
  set_community_relation: jest.fn((communityA: string, communityB: string, value3: number): void => {}),
};
