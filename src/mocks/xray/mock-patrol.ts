import type { flags32, patrol, vector } from "xray16";

import { MockFlags32 } from "./mock-flags32";
import { type MockVector } from "./mock-vector";

/**
 * Generic patrol mock data shape. Consumers (the engine) inject a registry of these via {@link MockPatrol.setup}.
 */
export interface IPatrolMock {
  points: Array<{ name: string; gvid: number; lvid: number; position: MockVector; flag?: number }>;
}

/**
 * Mock generic patrol object.
 *
 * The patrol point data is engine test-domain, so it is injected via {@link MockPatrol.setup} rather than bundled.
 */
export class MockPatrol {
  private static registry: Record<string, IPatrolMock> = {};

  /**
   * Inject the registry of named patrol mocks (by reference). Call once at test setup.
   */
  public static setup(patrols: Record<string, IPatrolMock>): void {
    MockPatrol.registry = patrols;
  }

  public static mock(name: string): patrol {
    return new MockPatrol(name) as unknown as patrol;
  }

  public patrolMock: IPatrolMock;

  public constructor(name: string) {
    if (MockPatrol.registry[name]) {
      this.patrolMock = MockPatrol.registry[name];
    } else {
      throw new Error(`Not expected patrol '${name}' provided, expect something defined in list of patrols mocks.`);
    }
  }

  public flags(): flags32 {
    return MockFlags32.mock();
  }

  public flag(index: number, flag: number): boolean {
    const normalizedFlag: number = flag + 1;

    return ((this.patrolMock.points[index].flag ?? 0) & normalizedFlag) === normalizedFlag;
  }

  public game_vertex_id(index: number): number {
    return this.patrolMock.points[index].gvid;
  }

  public get_nearest(vector: vector): number {
    return 121;
  }

  public index(name: string): number {
    return this.patrolMock.points.findIndex((it) => it.name === name);
  }

  public level_vertex_id(index: number): number {
    return this.patrolMock.points[index].lvid;
  }

  public name(index: number): string {
    return this.patrolMock.points[index].name;
  }

  public point(index: number): MockVector {
    if (index >= this.patrolMock.points.length) {
      throw new Error(`Trying to get patrol point '${index}' when only 0-${this.patrolMock.points.length} available.`);
    }

    return this.patrolMock.points[index].position;
  }

  public count(): number {
    return this.patrolMock.points.length;
  }

  public terminal(index: number): boolean {
    return index === this.patrolMock.points.length - 1;
  }
}
