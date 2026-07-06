import { jest } from "@jest/globals";
import type { alife_simulator, cse_alife_object, vector } from "xray16";

import { ACTOR_ID } from "../game-constants";
import { mockClsid } from "../mock-clsid";
import { type MockVector } from "../mock-vector";

import { MockAlifeHumanStalker } from "./mock-alife-human-stalker";
import { MockAlifeObject } from "./mock-alife-object";
import { MockAlifeOnlineOfflineGroup } from "./mock-alife-online-offline-group";

/**
 * Mock alife simulator registry containing data with server objects.
 */
export class MockAlifeSimulator {
  public static simulator: MockAlifeSimulator | null = null;
  public static registry: Record<number, cse_alife_object> = {};

  public static getInstance(): MockAlifeSimulator {
    if (!MockAlifeSimulator.simulator) {
      MockAlifeSimulator.simulator = new MockAlifeSimulator();
    }

    return MockAlifeSimulator.simulator;
  }

  public static mock(): alife_simulator {
    return MockAlifeSimulator.getInstance() as unknown as alife_simulator;
  }

  public static reset(): void {
    MockAlifeSimulator.simulator = new MockAlifeSimulator();
    MockAlifeSimulator.registry = {};
  }

  public static addToRegistry(object: cse_alife_object): void {
    MockAlifeSimulator.registry[object.id] = object;
  }

  public static removeFromRegistry(id: number): void {
    delete MockAlifeSimulator.registry[id];
  }

  public static getFromRegistry<T extends cse_alife_object = cse_alife_object>(id: number): T | null {
    return (MockAlifeSimulator.registry[id] as T) || null;
  }

  public actor = jest.fn(() => MockAlifeSimulator.registry[0] || null);

  public object = jest.fn((id: number) => MockAlifeSimulator.registry[id] || null);

  public create = jest.fn((section: string, position: MockVector, lvid: number, gvid: number) => {
    if (section === "stalker" || section.endsWith("_stalker")) {
      return MockAlifeHumanStalker.mock({
        clsid: mockClsid.script_stalker,
        position: position as unknown as vector,
        levelVertexId: lvid,
        gameVertexId: gvid,
      });
    } else if (section === "squad" || section.endsWith("_squad") || section.endsWith("_group")) {
      return MockAlifeOnlineOfflineGroup.mock({
        section,
      });
    }

    return MockAlifeObject.mock({
      section: section,
      position: position as unknown as vector,
      levelVertexId: lvid,
      gameVertexId: gvid,
    });
  });

  public create_ammo = jest.fn(() => {});

  public level_name = jest.fn((levelId: number) => {
    switch (levelId) {
      case 1:
        return "zaton";
      case 2:
        return "jupiter";
      case 3:
        return "pripyat";

      default:
        return "unknown";
    }
  });

  public level_id = jest.fn(() => 3);

  public story_object = jest.fn((sid: number) => {
    for (const it of Object.values(MockAlifeSimulator.registry)) {
      if (it.m_story_id === sid) {
        return it;
      }
    }

    return null;
  });

  public set_objects_per_update = jest.fn(() => {});

  public switch_distance = jest.fn(() => 150);

  public iterate_objects = jest.fn((cb: (object: cse_alife_object) => void) => {
    return Object.values(MockAlifeSimulator.registry).forEach((v) => {
      if (v.id !== ACTOR_ID) {
        cb(v);
      }
    });
  });

  public release = jest.fn((object: cse_alife_object) => {
    MockAlifeSimulator.removeFromRegistry(object.id);
  });
}
