import { jest } from "@jest/globals";
import type { alife_simulator, cse_abstract, cse_alife_monster_abstract, cse_alife_object, vector } from "xray16";

import { mockClsid } from "../mock-clsid";
import { ACTOR_ID } from "../mock-constants";

import { MockAlifeHumanStalker } from "./mock-alife-human-stalker";
import { MockAlifeObject } from "./mock-alife-object";
import { MockAlifeOnlineOfflineGroup } from "./mock-alife-online-offline-group";
import {
  addMockAlifeObjectToRegistry,
  mockAlifeRegistry,
  removeMockAlifeObjectFromRegistry,
  resetMockAlifeRegistry,
} from "./mock-alife-registry";

/**
 * Mock alife simulator registry containing data with server objects.
 */
export class MockAlifeSimulator implements alife_simulator {
  public static simulator: MockAlifeSimulator | null = null;

  public static get registry(): Record<number, cse_alife_object> {
    return mockAlifeRegistry.objects;
  }

  public static set registry(value: Record<number, cse_alife_object>) {
    mockAlifeRegistry.objects = value;
  }

  public static get infoPortions(): Record<number, Set<string>> {
    return mockAlifeRegistry.infoPortions;
  }

  public static set infoPortions(value: Record<number, Set<string>>) {
    mockAlifeRegistry.infoPortions = value;
  }

  public static getInstance(): MockAlifeSimulator {
    if (!MockAlifeSimulator.simulator) {
      MockAlifeSimulator.simulator = new MockAlifeSimulator();
    }

    return MockAlifeSimulator.simulator;
  }

  public static mock(): alife_simulator {
    return MockAlifeSimulator.getInstance() as unknown as alife_simulator;
  }

  public static create(): MockAlifeSimulator {
    return new MockAlifeSimulator();
  }

  public static reset(): void {
    MockAlifeSimulator.simulator = new MockAlifeSimulator();
    resetMockAlifeRegistry();
  }

  public static addToRegistry(object: cse_alife_object): void {
    addMockAlifeObjectToRegistry(object);
  }

  public static removeFromRegistry(id: number): void {
    removeMockAlifeObjectFromRegistry(id);
  }

  public static getFromRegistry<T extends cse_alife_object = cse_alife_object>(id: number): T | null {
    return (MockAlifeSimulator.registry[id] as T) || null;
  }

  public objectSwitchDistance: number = 150;

  public actor = jest.fn(<T extends cse_alife_object = cse_alife_object>() => {
    return (MockAlifeSimulator.registry[0] || null) as T;
  }) as unknown as alife_simulator["actor"];

  public object = jest.fn(<T extends cse_alife_object = cse_alife_object>(id: number | string) => {
    if (typeof id === "string") {
      return (Object.values(MockAlifeSimulator.registry).find((it) => it.name() === id) as T | undefined) ?? null;
    }

    return (MockAlifeSimulator.registry[id] as T | undefined) ?? null;
  }) as unknown as alife_simulator["object"];

  public create = jest.fn(
    <T extends cse_alife_object = cse_alife_object>(
      section: string | number,
      position?: vector,
      lvid?: number,
      gvid?: number,
      _parentId?: number,
      _register?: boolean
    ): T => {
      if (typeof section === "number") {
        return (MockAlifeSimulator.registry[section] ?? MockAlifeObject.mock({ id: section })) as T;
      }

      if (section === "stalker" || section.endsWith("_stalker")) {
        return MockAlifeHumanStalker.mock({
          clsid: mockClsid.script_stalker,
          position,
          levelVertexId: lvid,
          gameVertexId: gvid,
        }) as unknown as T;
      } else if (section === "squad" || section.endsWith("_squad") || section.endsWith("_group")) {
        return MockAlifeOnlineOfflineGroup.mock({
          section,
        }) as unknown as T;
      }

      return MockAlifeObject.mock({
        section: section,
        position,
        levelVertexId: lvid,
        gameVertexId: gvid,
      }) as T;
    }
  ) as unknown as alife_simulator["create"];

  public create_ammo = jest.fn(
    (
      section: string,
      position: vector,
      levelVertexId: number,
      gameVertexId: number,
      _parentId: number,
      _count: number
    ) =>
      MockAlifeObject.mock({
        gameVertexId,
        levelVertexId,
        position,
        section,
      })
  );

  public clone_weapon = jest.fn(
    (
      _object: cse_abstract,
      section: string,
      position: vector,
      levelVertexId: number,
      gameVertexId: number,
      parentId: number,
      shouldRegister: boolean = true
    ) => this.create(section, position, levelVertexId, gameVertexId, parentId, shouldRegister)
  );

  public level_name = jest.fn(<T extends string = string>(levelId: number): T => {
    switch (levelId) {
      case 1:
        return "zaton" as T;
      case 2:
        return "jupiter" as T;
      case 3:
        return "pripyat" as T;

      default:
        return "unknown" as T;
    }
  }) as unknown as alife_simulator["level_name"];

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

  public set_process_time = jest.fn();

  public set_switch_distance = jest.fn((distance: number) => {
    this.objectSwitchDistance = distance;
  });

  public switch_distance = jest.fn((distance?: number) => {
    if (distance !== undefined) {
      this.objectSwitchDistance = distance;
    }

    return this.objectSwitchDistance;
  });

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

  public has_info = jest.fn((objectId: number, infoId: string) => {
    return Boolean(MockAlifeSimulator.infoPortions[objectId]?.has(infoId));
  });

  public dont_has_info = jest.fn((objectId: number, infoId: string) => !this.has_info(objectId, infoId));

  public iterate_info = jest.fn((objectId: number, cb: (objectId: number, infoId: string) => void) => {
    MockAlifeSimulator.infoPortions[objectId]?.forEach((it) => cb(objectId, it));
  });

  public get_children = jest.fn((object: cse_abstract) => {
    return ((object as unknown as { children?: Array<number> }).children ?? []) as unknown as LuaIterable<number>;
  });

  public add_in_restriction = jest.fn();

  public add_out_restriction = jest.fn();

  public remove_all_restrictions = jest.fn();

  public remove_in_restriction = jest.fn();

  public remove_out_restriction = jest.fn();

  public set_interactive = jest.fn();

  public register = jest.fn((object: cse_abstract) => {
    MockAlifeSimulator.addToRegistry(object as cse_alife_object);

    return object;
  });

  public set_switch_offline = jest.fn();

  public set_switch_online = jest.fn();

  public spawn_id = jest.fn((spawnStoryId: number) => spawnStoryId);

  public teleport_object = jest.fn(
    (objectId: number, gameVertexId: number, levelVertexId: number, position: vector) => {
      const object = MockAlifeSimulator.registry[objectId] as unknown as {
        m_game_vertex_id?: number;
        m_level_vertex_id?: number;
        position?: vector;
      };

      if (object) {
        object.m_game_vertex_id = gameVertexId;
        object.m_level_vertex_id = levelVertexId;
        object.position = position;
      }
    }
  );

  public valid_object_id = jest.fn((objectId: number) => objectId !== 65535);

  public kill_entity = jest.fn((monster: cse_alife_monster_abstract) => {
    (monster as unknown as { alive?: boolean }).alive = false;
  });
}
