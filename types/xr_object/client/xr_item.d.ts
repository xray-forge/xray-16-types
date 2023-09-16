declare module "xray16" {
  /**
   * @source C++ class explosive
   * @customConstructor explosive
   * @group xr_item
   */
  export class explosive extends EngineBinding {
    protected constructor();

    public explode(): void;
  }

  /**
   * @source C++ class CAntirad : CGameObject
   * @customConstructor CAntirad
   * @group xr_item
   */
  export class CAntirad extends CGameObject {}

  /**
   * @source C++ class CStalkerOutfit : CGameObject
   * @customConstructor CStalkerOutfit
   * @group xr_item
   */
  export class CStalkerOutfit extends CGameObject {}

  /**
   * @source C++ class CInventoryBox : CGameObject
   * @customConstructor CInventoryBox
   * @group xr_item
   */
  export class CInventoryBox extends CGameObject {}

  /**
   * @source C++ class CBottleItem : CGameObject
   * @customConstructor CBottleItem
   * @group xr_item
   */
  export class CBottleItem extends CGameObject {}

  /**
   * @source C++ class CFoodItem : CGameObject
   * @customConstructor CFoodItem
   * @group xr_item
   */
  export class CFoodItem extends CGameObject {}

  /**
   * @source C++ class CMedkit : CGameObject
   * @customConstructor CMedkit
   * @group xr_item
   */
  export class CMedkit extends CGameObject {}

  /**
   * @source C++ class CExplosiveItem : CGameObject
   * @customConstructor CExplosiveItem
   * @group xr_item
   */
  export class CExplosiveItem extends CGameObject {}

  /**
   * @source C++ class CWeaponAK74 : CGameObject
   * @customConstructor CWeaponAK74
   * @group xr_item
   */
  export class CCWeaponAK74 extends CGameObject {}

  /**
   * @source C++ class CGrenadeLauncher : CGameObject
   * @customConstructor CGrenadeLauncher
   * @group xr_item
   */
  export class CGrenadeLauncher extends CGameObject {}

  /**
   * @source C++ class CWeaponAmmo : CGameObject
   * @customConstructor CWeaponAmmo
   * @group xr_item
   */
  export class CWeaponAmmo extends CGameObject {}

  /**
   * @source C++ class CWeapon : public CHudItemObject, public CShootingObject
   * @customConstructor CWeaponAmmo
   * @group xr_item
   */
  export class CWeapon extends CInventoryItem {}

  /**
   * @source C++ class CWeaponMagazined : public CWeapon
   * @customConstructor CWeaponMagazined
   * @group xr_item
   */
  export class CWeaponMagazined extends CWeapon {}

  /**
   * @source C++ class CWeaponAutomaticShotgun : CGameObject
   * @customConstructor CWeaponAutomaticShotgun
   * @group xr_item
   */
  export class CWeaponAutomaticShotgun extends CWeaponMagazined {}

  /**
   * @source C++ class CWeaponBM16 : CGameObject
   * @customConstructor CWeaponBM16
   * @group xr_item
   */
  export class CWeaponBM16 extends CWeaponShotgun {}

  /**
   * @source C++ class CWeaponBinoculars : CGameObject
   * @customConstructor CWeaponBinoculars
   * @group xr_item
   */
  export class CWeaponBinoculars extends CGameObject {}

  /**
   * @source C++ class CWeaponFN2000 : CGameObject
   * @customConstructor CWeaponFN2000
   * @group xr_item
   */
  export class CWeaponFN2000 extends CGameObject {}

  /**
   * @source C++ class CWeaponFORT : CGameObject
   * @customConstructor CWeaponFORT
   * @group xr_item
   */
  export class CWeaponFORT extends CGameObject {}

  /**
   * @source C++ class CWeaponGroza : CGameObject
   * @customConstructor CWeaponGroza
   * @group xr_item
   */
  export class CWeaponGroza extends CGameObject {}

  /**
   * @source C++ class CWeaponHPSA : CGameObject
   * @customConstructor CWeaponHPSA
   * @group xr_item
   */
  export class CWeaponHPSA extends CGameObject {}

  /**
   * @source C++ class CWeaponKnife : CGameObject
   * @customConstructor CWeaponKnife
   * @group xr_item
   */
  export class CWeaponKnife extends CGameObject {}

  /**
   * @source C++ class CWeaponLR300 : CGameObject
   * @customConstructor CWeaponLR300
   * @group xr_item
   */
  export class CWeaponLR300 extends CGameObject {}

  /**
   * @source C++ class CWeaponPM : CGameObject
   * @customConstructor CWeaponPM
   * @group xr_item
   */
  export class CWeaponPM extends CGameObject {}

  /**
   * @source C++ class CWeaponRG6 : CGameObject
   * @customConstructor CWeaponRG6
   * @group xr_item
   */
  export class CWeaponRG6 extends CGameObject {}

  /**
   * @source C++ class CWeaponRPG7 : CGameObject
   * @customConstructor CWeaponRPG7
   * @group xr_item
   */
  export class CWeaponRPG7 extends CGameObject {}

  /**
   * @source C++ class CWeaponSVD : CGameObject
   * @customConstructor CWeaponSVD
   * @group xr_item
   */
  export class CWeaponSVD extends CGameObject {}

  /**
   * @source C++ class CWeaponSVU : CGameObject
   * @customConstructor CWeaponSVU
   * @group xr_item
   */
  export class CWeaponSVU extends CGameObject {}

  /**
   * @source C++ class CWeaponShotgun : CGameObject
   * @customConstructor CWeaponShotgun
   * @group xr_item
   */
  export class CWeaponShotgun extends CGameObject {}

  /**
   * @source C++ class CWeaponUSP45 : CGameObject
   * @customConstructor CWeaponUSP45
   * @group xr_item
   */
  export class CWeaponUSP45 extends CGameObject {}

  /**
   * @source C++ class CWeaponVal : CGameObject
   * @customConstructor CWeaponVal
   * @group xr_item
   */
  export class CWeaponVal extends CGameObject {}

  /**
   * @source C++ class CWeaponVintorez : CGameObject
   * @customConstructor CWeaponVintorez
   * @group xr_item
   */
  export class CWeaponVintorez extends CGameObject {}

  /**
   * @source C++ class CWeaponWalther : CGameObject
   * @customConstructor CWeaponWalther
   * @group xr_item
   */
  export class CWeaponWalther extends CGameObject {}

  /**
   * @source C++ class CSilencer : CGameObject
   * @customConstructor CSilencer
   * @group xr_item
   */
  export class CSilencer extends CGameObject {}

  /**
   * @source C++ class CScope : CGameObject
   * @customConstructor CScope
   * @group xr_item
   */
  export class CScope extends CGameObject {}

  /**
   * @source C++ class CRGD5 : CGameObject
   * @customConstructor CRGD5
   * @group xr_item
   */
  export class CRGD5 extends CGameObject {}

  /**
   * @source C++ class CF1 : CGameObject
   * @customConstructor CF1
   * @group xr_item
   */
  export class CF1 extends CGameObject {}

  /**
   * @source C++ class CPda : CGameObject
   * @customConstructor CPda
   * @group xr_item
   */
  export class CPda extends CGameObject {}
}
