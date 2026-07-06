import { jest } from "@jest/globals";

import { MockCVertex } from "./mock-cvertex";

/**
 * Mock of the X-Ray engine `game_graph()` singleton.
 */
export class MockCGameGraph {
  public static instance: MockCGameGraph | null = null;
  public static registry: Record<number, MockCVertex> = {};

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

  public levels = jest.fn(() => [
    { id: 1, name: "zaton" },
    { id: 2, name: "jupiter" },
    { id: 3, name: "pripyat" },
  ]);
}
