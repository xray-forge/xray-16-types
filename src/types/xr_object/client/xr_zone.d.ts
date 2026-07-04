declare module "xray16" {
  /**
   * Client object binding for `CSpaceRestrictor` zones.
   *
   * @source `src/xrGame/space_restrictor_script.cpp`, `CSpaceRestrictor` binding.
   * @customConstructor CSpaceRestrictor
   * @group xr_zone
   *
   * @remarks
   * Restrictor wrappers represent level volumes used by AI and script logic. They are not inventory items or alive
   * entities.
   */
  export class CSpaceRestrictor extends CGameObject {}

  /**
   * Runtime family wrapper for custom anomaly zones returned by `game_object.cast_CustomZone()`.
   *
   * @source `src/xrGame/script_game_object_script3.cpp`, `cast_CustomZone` binding.
   * @customConstructor CCustomZone
   * @group xr_zone
   *
   * @remarks
   * No direct `CCustomZone` class constructor is registered in the script binding; concrete zone classes are exported
   * separately. Anomaly power and activation helpers on `game_object` require this family.
   */
  export class CCustomZone extends CSpaceRestrictor {
    /**
     * Cast-only runtime wrapper.
     */
    protected constructor();
  }

  /**
   * Client object binding for `CLevelChanger` zones.
   *
   * @source `src/xrGame/actor_script.cpp`, `CLevelChanger` binding.
   * @customConstructor CLevelChanger
   * @group xr_zone
   *
   * @remarks
   * Level-changer enable and invitation helpers require this runtime class.
   */
  export class CLevelChanger extends CGameObject {}

  /**
   * Client object binding for `smart_cover_object` zones.
   *
   * @source `src/xrGame/smart_cover_object_script.cpp`, `smart_cover_object` binding.
   * @customConstructor smart_cover_object
   * @group xr_zone
   *
   * @remarks
   * Smart-cover suitability and loophole checks require this kind of object as the cover target.
   */
  export class smart_cover_object extends CGameObject {}

  /**
   * Server object binding for script zone spawn entities.
   *
   * @source `src/xrGame/script_zone_script.cpp`, `ce_script_zone` binding.
   * @customConstructor ce_script_zone
   * @group xr_zone
   *
   * @remarks
   * Server-side zone entity wrapper used by engine internals and spawn data. Gameplay scripts usually interact with
   * the client `CSpaceRestrictor` or `CCustomZone` wrapper instead.
   */
  export class ce_script_zone extends DLL_Pure {
    /**
     * Engine-created script zone server entity.
     */
    protected constructor();
  }

  /**
   * Server object binding for smart-zone spawn entities.
   *
   * @source `src/xrGame/script_zone_script.cpp`, `ce_smart_zone` binding.
   * @customConstructor ce_smart_zone
   * @group xr_zone
   *
   * @remarks
   * Server-side smart-zone entity wrapper. Use client smart-cover objects for runtime cover checks.
   */
  export class ce_smart_zone extends DLL_Pure {
    /**
     * Engine-created smart zone server entity.
     */
    protected constructor();
  }
}
