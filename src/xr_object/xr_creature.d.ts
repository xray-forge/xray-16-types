declare module "xray16" {
  /**
   * @source C++ class CActor : CGameObject
   * @customConstructor CActor
   * @group xr_creature
   */
  export class CActor extends CGameObject {}

  /**
   * @source C++ class CZombie : CGameObject
   * @customConstructor CZombie
   * @group xr_creature
   */
  export class CZombie extends CGameObject {}

  /**
   * @source C++ class CController : CGameObject
   * @customConstructor CController
   * @group xr_creature
   */
  export class CController extends CGameObject {}

  /**
   * @source C++ class CTushkano : CGameObject
   * @customConstructor CTushkano
   * @group xr_creature
   */
  export class CTushkano extends CGameObject {}

  /**
   * @source C++ class CBurer : CGameObject
   * @customConstructor CBurer
   * @group xr_creature
   */
  export class CBurer extends CGameObject {}

  /**
   * @source C++ class CCat : CGameObject
   * @customConstructor CCat
   * @group xr_creature
   */
  export class CCat extends CGameObject {}

  /**
   * @source C++ class CChimera : CGameObject
   * @customConstructor CChimera
   * @group xr_creature
   */
  export class CChimera extends CGameObject {}

  /**
   * @source C++ class CPoltergeist : CGameObject
   * @customConstructor CPoltergeist
   * @group xr_creature
   */
  export class CPoltergeist extends CGameObject {}

  /**
   * @source C++ class CPseudoGigant : CGameObject
   * @customConstructor CPseudoGigant
   * @group xr_creature
   */
  export class CPseudoGigant extends CGameObject {}

  /**
   * @source C++ class CPsyDog : CGameObject
   * @customConstructor CPsyDog
   * @group xr_creature
   */
  export class CPsyDog extends CGameObject {}

  /**
   * @source C++ class CPsyDogPhantom : CGameObject
   * @customConstructor CPsyDogPhantom
   * @group xr_creature
   */
  export class CPsyDogPhantom extends CGameObject {}

  /**
   * @source C++ class CAI_Bloodsucker : CGameObject
   * @customConstructor CAI_Bloodsucker
   * @group xr_creature
   */
  export class CAI_Bloodsucker extends CGameObject {
    public force_visibility_state(value: i32): void;
  }

  /**
   * @source C++ class CAI_Boar : CGameObject
   * @customConstructor CAI_Boar
   * @group xr_creature
   */
  export class CAI_Boar extends CGameObject {}

  /**
   * @source C++ class CAI_Dog : CGameObject
   * @customConstructor CAI_Dog
   * @group xr_creature
   */
  export class CAI_Dog extends CGameObject {}

  /**
   * @source C++ class CAI_Flesh : CGameObject
   * @customConstructor CAI_Flesh
   * @group xr_creature
   */
  export class CAI_Flesh extends CGameObject {}

  /**
   * @source C++ class CAI_PseudoDog : CGameObject
   * @customConstructor CAI_PseudoDog
   * @group xr_creature
   */
  export class CAI_PseudoDog extends CGameObject {}

  /**
   * @source C++ class CAI_Stalker : CGameObject
   * @customConstructor CAI_Stalker
   * @group xr_creature
   */
  export class CAI_Stalker extends CGameObject {}

  /**
   * @source C++ class CAI_Trader : CGameObject
   * @customConstructor CAI_Trader
   * @group xr_creature
   */
  export class CAI_Trader extends CGameObject {}

  /**
   * @source C++ class CSnork : CGameObject
   * @customConstructor CSnork
   * @group xr_creature
   */
  export class CSnork extends CGameObject {}
}
