declare module "xray16" {
  /**
   * @source C++ class GameGraph__CVertex
   * @customConstructor GameGraph__CVertex
   * @group xr_graph
   */
  export class GameGraph__CVertex extends EngineBinding {
    protected constructor();

    public level_vertex_id(): u32;

    public level_id(): u8;

    public game_point(): vector;

    public level_point(): vector;
  }

  /**
   * @source C++ class CGameGraph
   * @customConstructor CGameGraph
   * @group xr_graph
   */
  export class CGameGraph {
    public valid_vertex_id(value: u32): boolean;

    public vertex(vertexId: u32): GameGraph__CVertex;

    public vertex_id(graph: CGameGraph): u16;

    public accessible(value: u32): boolean;

    public accessible(value1: u32, value2: boolean): void;

    /**
     * Method to iterate over game levels registered in `all.spawn`.
     *
     * @returns level abstract object with every iteration
     */
    public levels(): LuaIterable<cse_abstract>;
  }

}
