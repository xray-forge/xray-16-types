import { jest } from "@jest/globals";
import { type CGameGraph, type cse_abstract, type GameGraph__CVertex } from "xray16";

import { MockCVertex } from "./mock-cvertex";

/**
 * Mock of the X-Ray engine `game_graph()` singleton.
 */
export class MockCGameGraph implements CGameGraph {
  public static instance: MockCGameGraph | null = null;
  public static registry: Record<number, MockCVertex> = {};

  public static create(): MockCGameGraph {
    return new MockCGameGraph();
  }

  public static mock(): CGameGraph {
    return this.getInstance();
  }

  public accessibleVertices: Map<number, boolean> = new Map();

  public static getInstance(): MockCGameGraph {
    if (!MockCGameGraph.instance) {
      MockCGameGraph.instance = new MockCGameGraph();
    }

    return MockCGameGraph.instance;
  }

  public vertex = jest.fn((vertexId: number = 1) => {
    if (!MockCGameGraph.registry[vertexId]) {
      MockCGameGraph.registry[vertexId] = new MockCVertex(vertexId);
    }

    return MockCGameGraph.registry[vertexId];
  });

  public valid_vertex_id(vertexId: number): boolean {
    return vertexId >= 0;
  }

  public vertex_id(vertex: GameGraph__CVertex): number {
    return (vertex as unknown as MockCVertex).vertexId;
  }

  public accessible(vertexId: number): boolean;
  public accessible(vertexId: number, value: boolean): void;
  public accessible(vertexId: number, value?: boolean): boolean | void {
    if (value !== undefined) {
      this.accessibleVertices.set(vertexId, value);

      return;
    }

    return this.accessibleVertices.get(vertexId) ?? true;
  }

  public levels = jest.fn(
    () =>
      [
        { id: 1, name: "zaton" },
        { id: 2, name: "jupiter" },
        { id: 3, name: "pripyat" },
      ] as unknown as LuaIterable<cse_abstract>
  );
}
