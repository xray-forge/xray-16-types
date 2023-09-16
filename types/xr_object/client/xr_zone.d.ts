declare module "xray16" {
  /**
   * @source C++ class CSpaceRestrictor : CGameObject
   * @customConstructor CSpaceRestrictor
   * @group xr_zone
   */
  export class CSpaceRestrictor extends CGameObject {}

  /**
   * @source C++ class CCustomZone : public CSpaceRestrictor, public Feel::Touch
   * @customConstructor CCustomZone
   * @group xr_zone
   */
  export class CCustomZone extends CSpaceRestrictor {}

  /**
   * @source C++ class CLevelChanger : CGameObject
   * @customConstructor CLevelChanger
   * @group xr_zone
   */
  export class CLevelChanger extends CGameObject {}

  /**
   * @source C++ class smart_cover_object : CGameObject
   * @customConstructor smart_cover_object
   * @group xr_zone
   */
  export class smart_cover_object extends CGameObject {}

  /**
   * @source C++ class ce_script_zone : DLL_Pure
   * @customConstructor ce_script_zone
   * @group xr_zone
   */
  export class ce_script_zone extends DLL_Pure {
    protected constructor();
  }

  /**
   * @source C++ class ce_smart_zone : DLL_Pure
   * @customConstructor ce_smart_zone
   * @group xr_zone
   */
  export class ce_smart_zone extends DLL_Pure {
    protected constructor();
  }
}
