declare module "xray16" {
  /**
   * Client object binding for `CSpaceRestrictor` zones.
   *
   * @source C++ class CSpaceRestrictor : CGameObject
   * @customConstructor CSpaceRestrictor
   * @group xr_zone
   */
  export class CSpaceRestrictor extends CGameObject {}

  /**
   * Client object binding for `CCustomZone` zones.
   *
   * @source C++ class CCustomZone : public CSpaceRestrictor, public Feel::Touch
   * @customConstructor CCustomZone
   * @group xr_zone
   */
  export class CCustomZone extends CSpaceRestrictor {}

  /**
   * Client object binding for `CLevelChanger` zones.
   *
   * @source C++ class CLevelChanger : CGameObject
   * @customConstructor CLevelChanger
   * @group xr_zone
   */
  export class CLevelChanger extends CGameObject {}

  /**
   * Client object binding for `smart_cover_object` zones.
   *
   * @source C++ class smart_cover_object : CGameObject
   * @customConstructor smart_cover_object
   * @group xr_zone
   */
  export class smart_cover_object extends CGameObject {}

  /**
   * Client object binding for `ce_script_zone` zones.
   *
   * @source C++ class ce_script_zone : DLL_Pure
   * @customConstructor ce_script_zone
   * @group xr_zone
   */
  export class ce_script_zone extends DLL_Pure {
    /**
     * Engine-created script zone server entity.
     */
    protected constructor();
  }

  /**
   * Client object binding for `ce_smart_zone` zones.
   *
   * @source C++ class ce_smart_zone : DLL_Pure
   * @customConstructor ce_smart_zone
   * @group xr_zone
   */
  export class ce_smart_zone extends DLL_Pure {
    /**
     * Engine-created smart zone server entity.
     */
    protected constructor();
  }
}
