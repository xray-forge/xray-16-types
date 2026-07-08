import { jest } from "@jest/globals";

import { MockDevice } from "./xray/mock-device";
import { MockCGameGraph } from "./xray/mock-game-graph";
import { MockAlifeSimulator } from "./xray/server/mock-alife-simulator";

/**
 * Runtime stand-in for the `xray16` engine module under jest/node.
 * The real `xray16` module only exists inside the game process.
 */
export { MockVector as vector } from "./xray/mock-vector";
export { MockVector2D as vector2 } from "./xray/mock-vector-2d";
export { MockCTime as CTime } from "./xray/mock-ctime";
export { MockCSightParams as CSightParams } from "./xray/mock-sight-params";
export { mockGameInterface as game } from "./xray/mock-game";
export { mockLevelInterface as level } from "./xray/mock-level";

export const alife = jest.fn(() => MockAlifeSimulator.mock());
export const device = jest.fn(() => MockDevice.getInstance());
export const game_graph = jest.fn(() => MockCGameGraph.getInstance());
export const time_global = jest.fn((): number => 0);
export const verify_if_thread_is_running = jest.fn((): void => {});
export const log = jest.fn((): void => {});
export const print_stack = jest.fn((): void => {});
