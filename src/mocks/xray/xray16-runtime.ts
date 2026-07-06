/**
 * Runtime stand-in for the `xray16` engine module under jest/node.
 * The real `xray16` module only exists inside the game process.
 */
export { MockVector as vector } from "./mock-vector";
export { MockVector2D as vector2 } from "./mock-vector-2d";
