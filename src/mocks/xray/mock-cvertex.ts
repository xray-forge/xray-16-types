import { jest } from "@jest/globals";
import { type GameGraph__CVertex } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of a game-level vertex object for jest/node.
 */
export class MockCVertex implements GameGraph__CVertex {
  public static create(vertexId: number = 0): MockCVertex {
    return new MockCVertex(vertexId);
  }

  public static mock(vertexId: number = 0): GameGraph__CVertex {
    return new MockCVertex(vertexId);
  }

  public __name: string = "GameGraph__CVertex";

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
