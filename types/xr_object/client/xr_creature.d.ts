declare module "xray16" {
  /**
   * Client object binding for `CEntityAlive`.
   *
   * @source C++ class CEntityAlive : public CEntity
   * @customConstructor CEntityAlive
   * @group xr_creature
   */
  export class CEntityAlive extends CGameObject {}

  /**
   * Client object binding for `CActor`.
   *
   * @source C++ class CActor : CGameObject
   * @customConstructor CActor
   * @group xr_creature
   */
  export class CActor extends CGameObject {}

  /**
   * Client object binding for `CCustomMonster`.
   *
   * @source C++ class CCustomMonster : CGameObject
   * @customConstructor CCustomMonster
   * @group xr_creature
   */
  export class CCustomMonster extends CGameObject {}

  /**
   * Client object binding for `CInventoryOwner`.
   *
   * @source C++ class CInventoryOwner : CGameObject
   * @customConstructor CInventoryOwner
   * @group xr_creature
   */
  export class CInventoryOwner extends CGameObject {}

  /**
   * Client object binding for `CInventoryItem`.
   *
   * @source C++ class CInventoryItem : CGameObject
   * @customConstructor CInventoryItem
   * @group xr_creature
   */
  export class CInventoryItem extends CGameObject {}

  /**
   * Client object binding for `CZombie`.
   *
   * @source C++ class CZombie : CGameObject
   * @customConstructor CZombie
   * @group xr_creature
   */
  export class CZombie extends CGameObject {}

  /**
   * Client object binding for `CController`.
   *
   * @source C++ class CController : CGameObject
   * @customConstructor CController
   * @group xr_creature
   */
  export class CController extends CGameObject {}

  /**
   * Client object binding for `CTushkano`.
   *
   * @source C++ class CTushkano : CGameObject
   * @customConstructor CTushkano
   * @group xr_creature
   */
  export class CTushkano extends CGameObject {}

  /**
   * Client object binding for `CBurer`.
   *
   * @source C++ class CBurer : CGameObject
   * @customConstructor CBurer
   * @group xr_creature
   */
  export class CBurer extends CGameObject {}

  /**
   * Client object binding for `CCat`.
   *
   * @source C++ class CCat : CGameObject
   * @customConstructor CCat
   * @group xr_creature
   */
  export class CCat extends CGameObject {}

  /**
   * Client object binding for `CChimera`.
   *
   * @source C++ class CChimera : CGameObject
   * @customConstructor CChimera
   * @group xr_creature
   */
  export class CChimera extends CGameObject {}

  /**
   * Client object binding for `CPoltergeist`.
   *
   * @source C++ class CPoltergeist : CGameObject
   * @customConstructor CPoltergeist
   * @group xr_creature
   */
  export class CPoltergeist extends CGameObject {}

  /**
   * Client object binding for `CPseudoGigant`.
   *
   * @source C++ class CPseudoGigant : CGameObject
   * @customConstructor CPseudoGigant
   * @group xr_creature
   */
  export class CPseudoGigant extends CGameObject {}

  /**
   * Client object binding for `CPsyDog`.
   *
   * @source C++ class CPsyDog : CGameObject
   * @customConstructor CPsyDog
   * @group xr_creature
   */
  export class CPsyDog extends CGameObject {}

  /**
   * Client object binding for `CPsyDogPhantom`.
   *
   * @source C++ class CPsyDogPhantom : CGameObject
   * @customConstructor CPsyDogPhantom
   * @group xr_creature
   */
  export class CPsyDogPhantom extends CGameObject {}

  /**
   * Client object binding for `CAI_Bloodsucker`.
   *
   * @source C++ class CAI_Bloodsucker : CGameObject
   * @customConstructor CAI_Bloodsucker
   * @group xr_creature
   */
  export class CAI_Bloodsucker extends CGameObject {
    /**
     * Override the bloodsucker visibility state.
     *
     * @param value - Visibility state id used by the monster implementation.
     */
    public force_visibility_state(value: i32): void;
  }

  /**
   * Client object binding for `CAI_Boar`.
   *
   * @source C++ class CAI_Boar : CGameObject
   * @customConstructor CAI_Boar
   * @group xr_creature
   */
  export class CAI_Boar extends CGameObject {}

  /**
   * Client object binding for `CAI_Dog`.
   *
   * @source C++ class CAI_Dog : CGameObject
   * @customConstructor CAI_Dog
   * @group xr_creature
   */
  export class CAI_Dog extends CGameObject {}

  /**
   * Client object binding for `CAI_Flesh`.
   *
   * @source C++ class CAI_Flesh : CGameObject
   * @customConstructor CAI_Flesh
   * @group xr_creature
   */
  export class CAI_Flesh extends CGameObject {}

  /**
   * Client object binding for `CAI_PseudoDog`.
   *
   * @source C++ class CAI_PseudoDog : CGameObject
   * @customConstructor CAI_PseudoDog
   * @group xr_creature
   */
  export class CAI_PseudoDog extends CGameObject {}

  /**
   * Client object binding for `CAI_Stalker`.
   *
   * @source C++ class CAI_Stalker : CGameObject
   * @customConstructor CAI_Stalker
   * @group xr_creature
   */
  export class CAI_Stalker extends CGameObject {}

  /**
   * Client object binding for `CAI_Trader`.
   *
   * @source C++ class CAI_Trader : CGameObject
   * @customConstructor CAI_Trader
   * @group xr_creature
   */
  export class CAI_Trader extends CGameObject {}

  /**
   * Client object binding for `CSnork`.
   *
   * @source C++ class CSnork : CGameObject
   * @customConstructor CSnork
   * @group xr_creature
   */
  export class CSnork extends CGameObject {}
}
