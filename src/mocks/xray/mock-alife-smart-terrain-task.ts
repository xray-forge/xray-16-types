import { type CALifeSmartTerrainTask, type vector } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine alife task for smart terrains.
 */
export class MockCALifeSmartTerrainTask implements CALifeSmartTerrainTask {
  private readonly gameVertexId: number;
  private readonly levelVertexId: number;
  public readonly taskPosition: vector;

  public constructor(gameVertexId: number | string, levelVertexId?: number) {
    if (typeof gameVertexId === "string") {
      this.gameVertexId = 20001;
      this.levelVertexId = 20002;
      this.taskPosition = MockVector.mock(10, 20, 30);
    } else {
      this.gameVertexId = gameVertexId;
      this.levelVertexId = levelVertexId ?? 0;
      this.taskPosition = MockVector.mock(1, 2, 3);
    }
  }

  public game_vertex_id(): number {
    return this.gameVertexId;
  }

  public level_vertex_id(): number {
    return this.levelVertexId;
  }

  public position(): vector {
    return this.taskPosition;
  }
}
