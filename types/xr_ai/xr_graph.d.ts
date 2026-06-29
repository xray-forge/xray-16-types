declare module "xray16" {
  /**
   * @source C++ class GameGraph__CVertex
   * @customConstructor GameGraph__CVertex
   * @group xr_graph
   */
  export class GameGraph__CVertex extends EngineBinding {
    /**
     * Engine-created game-graph vertex descriptor.
     */
    protected constructor();

    /**
     * Get the level-graph vertex this game-graph point maps to.
     *
     * @returns Level vertex id inside the owning level.
     */
    public level_vertex_id(): u32;

    /**
     * Get the id of the level that owns this graph point.
     *
     * @returns Level id.
     */
    public level_id(): u8;

    /**
     * Get this point position in global game space.
     *
     * @returns Game-space position.
     */
    public game_point(): vector;

    /**
     * Get this point position in its level.
     *
     * @returns Level-space position.
     */
    public level_point(): vector;
  }

  /**
   * @source C++ class CGameGraph
   * @customConstructor CGameGraph
   * @group xr_graph
   */
  export class CGameGraph {
    /**
     * Check whether a game-graph vertex id exists.
     *
     * @param vertexId - Game-graph vertex id.
     * @returns Whether the id can be used with graph methods.
     */
    public valid_vertex_id(vertexId: u32): boolean;

    /**
     * Get a game-graph vertex by id.
     *
     * @param vertexId - Game-graph vertex id.
     * @returns Graph vertex descriptor.
     */
    public vertex(vertexId: u32): GameGraph__CVertex;

    /**
     * Resolve a graph vertex back to its id.
     *
     * @param vertex - Vertex returned by {@link CGameGraph.vertex}.
     * @returns Game-graph vertex id.
     */
    public vertex_id(vertex: GameGraph__CVertex): u16;

    /**
     * Check whether a game-graph vertex can be used for AI travel.
     *
     * @param vertexId - Game-graph vertex id.
     * @returns Whether the vertex is currently accessible.
     */
    public accessible(vertexId: u32): boolean;

    /**
     * Mark a game-graph vertex as accessible or blocked.
     *
     * @param vertexId - Game-graph vertex id.
     * @param value - New accessibility state.
     */
    public accessible(vertexId: u32, value: boolean): void;

    /**
     * Iterate over game levels registered in `all.spawn`.
     *
     * @returns Level object on every iteration.
     */
    public levels(): LuaIterable<cse_abstract>;
  }

  /**
   * Get the global game graph used by AI navigation.
   *
   * @group xr_graph
   *
   * @returns Game graph singleton.
   */
  export function game_graph(this: void): CGameGraph;
}
