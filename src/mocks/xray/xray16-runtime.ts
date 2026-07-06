import { jest } from "@jest/globals";

/**
 * Runtime stand-in for the `xray16` engine module under jest/node.
 * The real `xray16` module only exists inside the game process.
 */
export { MockVector as vector } from "./mock-vector";
export { MockVector2D as vector2 } from "./mock-vector-2d";
export { MockCTime as CTime } from "./mock-ctime";
export { mockGameInterface as game } from "./mock-game";
export { mockLevelInterface as level } from "./mock-level";

export const time_global = jest.fn((): number => 0);
export const verify_if_thread_is_running = jest.fn((): void => {});
