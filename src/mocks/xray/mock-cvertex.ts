import { jest } from "@jest/globals";

import { MockVector } from "./mock-vector";

/**
 * Mock of a game-level vertex object for jest/node.
 */
export class MockCVertex {
  public vertexId: number;
  public gamePoint: MockVector = new MockVector();
  public levelPoint: MockVector = new MockVector();

  public constructor(vertexId: number) {
    this.vertexId = vertexId;
  }

  public level_vertex_id = jest.fn(() => this.vertexId);

  public level_id = jest.fn(() => {
    const stringifiedVertex: string = String(this.vertexId);

    return Number.parseInt(stringifiedVertex[0]) || -1;
  });

  public game_point = jest.fn(() => this.gamePoint);

  public level_point = jest.fn(() => this.levelPoint);
}
