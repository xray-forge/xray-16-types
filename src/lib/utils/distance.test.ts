import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { type GameObject } from "xray16/alias";

import { MockGameObject } from "../../mocks";
import { mockType } from "../../mocks/lua/mock-lua-type";

import {
  getDistanceBetween,
  getDistanceBetweenSqr,
  getObjectPositioning,
  isDistanceBetweenObjectsGreaterOrEqual,
  isDistanceBetweenObjectsLessOrEqual,
  isObjectInZone,
} from "./distance";

// `getObjectPositioning` calls the Lua `type` global and `$multi`; provide them before the specs run.
beforeAll(() => {
  (globalThis as Record<string, unknown>).type = mockType;
  (globalThis as Record<string, unknown>).$multi = (...args: Array<unknown>) => [...args];
});

describe("isObjectInZone", () => {
  it("should correctly check whether object is inside a zone", () => {
    const object: GameObject = MockGameObject.mock();
    const zone: GameObject = MockGameObject.mock();

    expect(isObjectInZone(null, zone)).toBe(false);
    expect(isObjectInZone(object, null)).toBe(false);

    jest.spyOn(zone, "inside").mockImplementation(() => true);
    expect(isObjectInZone(object, zone)).toBe(true);

    jest.spyOn(zone, "inside").mockImplementation(() => false);
    expect(isObjectInZone(object, zone)).toBe(false);
  });
});

describe("distance between objects utils", () => {
  it("should correctly compute vector distance", () => {
    const first: GameObject = MockGameObject.mock();
    const second: GameObject = MockGameObject.mock();

    jest.spyOn(first.position(), "distance_to").mockImplementation(() => 42);
    expect(getDistanceBetween(first, second)).toBe(42);

    jest.spyOn(first.position(), "distance_to_sqr").mockImplementation(() => 100);
    expect(getDistanceBetweenSqr(first, second)).toBe(100);
  });

  it("should correctly compare squared distance against a threshold", () => {
    const first: GameObject = MockGameObject.mock();
    const second: GameObject = MockGameObject.mock();

    jest.spyOn(first.position(), "distance_to_sqr").mockImplementation(() => 25);

    expect(isDistanceBetweenObjectsGreaterOrEqual(first, second, 5)).toBe(true);
    expect(isDistanceBetweenObjectsGreaterOrEqual(first, second, 6)).toBe(false);
    expect(isDistanceBetweenObjectsLessOrEqual(first, second, 5)).toBe(true);
    expect(isDistanceBetweenObjectsLessOrEqual(first, second, 4)).toBe(false);
  });
});

describe("getObjectPositioning", () => {
  it("should correctly read positioning tuple from a client object", () => {
    const object: GameObject = MockGameObject.mock();
    const [id, gvi, lvi, position] = getObjectPositioning(object);

    expect(id).toBe(object.id());
    expect(gvi).toBe(object.game_vertex_id());
    expect(lvi).toBe(object.level_vertex_id());
    expect(position).toBe(object.position());
  });
});
