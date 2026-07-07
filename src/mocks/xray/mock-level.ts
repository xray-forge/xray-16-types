import { jest } from "@jest/globals";
import type { game_object } from "xray16";

import { ACTOR_ID } from "./mock-constants";
import { MockFbox } from "./mock-fbox";
import { MockGameObject } from "./mock-game-object";
import { MockPatrol } from "./mock-patrol";
import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine `level` namespace for jest/node.
 */
export const mockLevelInterface = {
  add_cam_effector2: jest.fn(),
  add_cam_effector: jest.fn(),
  add_complex_effector: jest.fn(),
  add_pp_effector: jest.fn(),
  change_game_time: jest.fn(),
  disable_input: jest.fn(),
  get_time_factor: jest.fn(() => 10),
  set_time_factor: jest.fn((_factor: number): void => {}),
  get_game_difficulty: jest.fn(() => 3),
  get_bounding_volume: jest.fn(() => MockFbox.mock()),
  get_snd_volume: jest.fn(() => 1),
  get_time_hours: jest.fn(() => 12),
  get_time_minutes: jest.fn(() => 30),
  hide_indicators_safe: jest.fn(),
  iterate_online_objects: jest.fn((cb: (object: game_object) => void) => {
    return [...MockGameObject.REGISTRY.entries()].forEach(([k, v]) => {
      if (v.id() !== ACTOR_ID) {
        cb(v);
      }
    });
  }),
  map_add_object_spot: jest.fn(),
  map_change_spot_hint: jest.fn(),
  map_has_object_spot: jest.fn(() => 0),
  name: jest.fn(() => "zaton"),
  object_by_id: jest.fn((id: number) => {
    const verifiedId: number = Number.parseInt(String(id));

    if (Number.isNaN(verifiedId)) {
      throw new Error("Received NaN for object_by_id getter.");
    }

    return MockGameObject.REGISTRY.get(verifiedId);
  }),
  enable_input: jest.fn(),
  map_add_object_spot_ser: jest.fn(),
  map_remove_object_spot: jest.fn(),
  patrol_path_exists: jest.fn((name: string) => MockPatrol.has(name)),
  present: jest.fn(() => true),
  rain_factor: jest.fn(() => 0),
  remove_cam_effector: jest.fn(),
  remove_complex_effector: jest.fn(),
  remove_pp_effector: jest.fn(),
  set_snd_volume: jest.fn((volume: number) => {}),
  set_weather: jest.fn(),
  show_indicators: jest.fn(),
  show_weapon: jest.fn(),
  stop_weather_fx: jest.fn(),
  vertex_id: jest.fn(() => -1),
  vertex_in_direction: jest.fn(() => -1),
  vertex_position: jest.fn(() => MockVector.create(15, 14, 16)),
};
