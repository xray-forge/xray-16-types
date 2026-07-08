import { jest } from "@jest/globals";

import { MockDevice } from "./mock-device";
import { MockCGameGraph } from "./mock-game-graph";
import { MockAlifeSimulator } from "./server/mock-alife-simulator";

/**
 * Runtime stand-in for the `xray16` engine module under jest/node.
 * The real `xray16` module only exists inside the game process.
 */
export { MockVector as vector } from "./mock-vector";
export { MockVector2D as vector2 } from "./mock-vector-2d";
export { MockCTime as CTime } from "./mock-ctime";
export { MockCSightParams as CSightParams } from "./mock-sight-params";
export { mockGameInterface as game } from "./mock-game";
export { mockLevelInterface as level } from "./mock-level";

export const alife = jest.fn(() => MockAlifeSimulator.mock());
export const device = jest.fn(() => MockDevice.getInstance());
export const game_graph = jest.fn(() => MockCGameGraph.getInstance());
export const time_global = jest.fn((): number => 0);
export const verify_if_thread_is_running = jest.fn((): void => {});
export const log = jest.fn((): void => {});
export const print_stack = jest.fn((): void => {});
