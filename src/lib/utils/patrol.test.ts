import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { type GameObject, type Patrol } from "xray16/alias";

import { MockGameObject, MockPatrol, MockVector } from "../../mocks";

import { getPatrolFlag, isObjectAtTerminalWaypoint, isObjectAtWaypoint } from "./patrol";

function mockRange(start: number, end: number): Generator<number> {
  return (function* generator(): Generator<number> {
    for (let index = start; index <= end; index += 1) {
      yield index;
    }
  })();
}

// Patrol utils iterate with the tstl `$range` extension and return via `$multi`; provide them and a patrol fixture.
beforeAll(() => {
  (globalThis as Record<string, unknown>).$range = mockRange;
  (globalThis as Record<string, unknown>).$multi = (...args: Array<unknown>) => [...args];

  MockPatrol.setup({
    "test-wp": {
      points: [
        { name: "wp0", gvid: 0, lvid: 0, position: MockVector.create(1, 1, 1), flag: 1 },
        { name: "wp1", gvid: 0, lvid: 0, position: MockVector.create(2, 2, 2), flag: 2 },
        { name: "wp2", gvid: 0, lvid: 0, position: MockVector.create(3, 3, 3) },
      ],
    },
  });
});

describe("isObjectAtWaypoint", () => {
  it("should correctly check whether object is at waypoint", () => {
    const object: GameObject = MockGameObject.mock();

    jest.spyOn(object.position(), "distance_to_sqr").mockImplementation(() => 0.131);
    expect(isObjectAtWaypoint(object, MockPatrol.mock("test-wp") as unknown as Patrol, 1)).toBe(false);

    jest.spyOn(object.position(), "distance_to_sqr").mockImplementation(() => 0.13);
    expect(isObjectAtWaypoint(object, MockPatrol.mock("test-wp") as unknown as Patrol, 2)).toBe(true);
  });
});

describe("isObjectAtTerminalWaypoint", () => {
  it("should correctly check whether object is at the terminal waypoint", () => {
    const object: GameObject = MockGameObject.mock();
    const waypointPatrol: Patrol = MockPatrol.mock("test-wp") as unknown as Patrol;
    const lastPoint: MockVector = waypointPatrol.point(2) as unknown as MockVector;

    jest
      .spyOn(object.position(), "distance_to_sqr")
      .mockImplementation((it) => (it === (lastPoint as never) ? 0.131 : 0));
    expect(isObjectAtTerminalWaypoint(object, waypointPatrol)[0]).toBe(false);
    expect(isObjectAtTerminalWaypoint(object, waypointPatrol)[1]).toBeNull();

    jest
      .spyOn(object.position(), "distance_to_sqr")
      .mockImplementation((it) => (it === (lastPoint as never) ? 0.13 : Infinity));
    expect(isObjectAtTerminalWaypoint(object, waypointPatrol)[0]).toBe(true);
    expect(isObjectAtTerminalWaypoint(object, waypointPatrol)[1]).toBe(2);
  });
});

describe("getPatrolFlag", () => {
  it("should correctly choose patrol point flag bit", () => {
    const path: Patrol = MockPatrol.mock("test-wp") as unknown as Patrol;

    expect(getPatrolFlag(path, 0)).toBe(0);
    expect(getPatrolFlag(path, 1)).toBe(1);
    expect(getPatrolFlag(path, 2)).toBeNull();
  });
});
