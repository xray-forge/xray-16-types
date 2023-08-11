/// <reference path="./xr_lib/xr_fs.d.ts" />
/// <reference path="./xr_lib/xr_math.d.ts" />
/// <reference path="./xr_lib/xr_utils.d.ts" />
/// <reference path="./xr_map/xr_map.d.ts" />
/// <reference path="./xr_object/xr_action.d.ts" />
/// <reference path="./xr_object/xr_alife.d.ts" />
/// <reference path="./xr_object/xr_anomaly.d.ts" />
/// <reference path="./xr_object/xr_artefact.d.ts" />
/// <reference path="./xr_object/xr_client_object.d.ts" />
/// <reference path="./xr_object/xr_creature.d.ts" />
/// <reference path="./xr_object/xr_dialog.d.ts" />
/// <reference path="./xr_object/xr_item.d.ts" />
/// <reference path="./xr_object/xr_level.d.ts" />
/// <reference path="./xr_object/xr_physic.d.ts" />
/// <reference path="./xr_object/xr_quest.d.ts" />
/// <reference path="./xr_object/xr_server_object.d.ts" />
/// <reference path="./xr_online/xr_multiplayer.d.ts" />
/// <reference path="./xr_sound/xr_sound.d.ts" />
/// <reference path="./xr_type/xr_enums.d.ts" />
/// <reference path="./xr_type/xr_type.d.ts" />
/// <reference path="./xr_ui/xr_ui_core.d.ts" />
/// <reference path="./xr_ui/xr_ui_interface.d.ts" />
/// <reference path="./xr_constant.d.ts" />
/// <reference path="./xr_core.d.ts" />
/// <reference path="./xr_global.d.ts" />
/// <reference path="./xr_luabind.d.ts" />

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
