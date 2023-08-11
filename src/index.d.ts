import "./xr_lib/xr_fs";
import "./xr_lib/xr_math";
import "./xr_lib/xr_utils";
import "./xr_map/xr_map";
import "./xr_object/xr_action";
import "./xr_object/xr_alife";
import "./xr_object/xr_anomaly";
import "./xr_object/xr_artefact";
import "./xr_object/xr_client_object";
import "./xr_object/xr_creature";
import "./xr_object/xr_dialog";
import "./xr_object/xr_item";
import "./xr_object/xr_level";
import "./xr_object/xr_physic";
import "./xr_object/xr_quest";
import "./xr_object/xr_server_object";
import "./xr_online/xr_multiplayer";
import "./xr_sound/xr_sound";
import "./xr_type/xr_enums";
import "./xr_type/xr_type";
import "./xr_ui/xr_ui_core";
import "./xr_ui/xr_ui_interface";
import "./xr_constant";
import "./xr_core";
import "./xr_luabind";
import "./xr_global";

declare module "xray16" {
  /**
   * @group export
   */
  export const actor_stats: IXR_actor_stats;

  /**
   * @group export
   */
  export const ActorMenu: IXR_ActorMenu;

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
