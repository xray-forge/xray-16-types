declare module "xray16" {
  /**
   * @group export
   */
  export const actor_stats: IXR_actor_stats;

  /**
   * @group export
   */
  export const game: IXR_game;

  /**
   * @group export
   */
  export const level: IXR_level;

  /**
   * @group export
   */
  export const main_menu: IXR_main_menu;

  /**
   * @group export
   */
  export const object: typeof XR_object;

  /**
   * @group export
   */
  export const relation_registry: IXR_relation_registry;
}
