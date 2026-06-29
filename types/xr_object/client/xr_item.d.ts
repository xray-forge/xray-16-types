declare module "xray16" {
  /**
   * Explosive component shared by grenade and explosive item classes.
   *
   * @source C++ class explosive
   * @customConstructor explosive
   * @group xr_item
   */
  export class explosive extends EngineBinding {
    /**
     * Engine-created explosive component.
     */
    protected constructor();

    /**
     * Trigger the explosive immediately.
     */
    public explode(): void;
  }

  /**
   * Client object binding for `CAntirad` inventory items.
   *
   * @source C++ class CAntirad : CGameObject
   * @customConstructor CAntirad
   * @group xr_item
   */
  export class CAntirad extends CGameObject {}

  /**
   * Client object binding for `CStalkerOutfit` inventory items.
   *
   * @source C++ class CStalkerOutfit : CGameObject
   * @customConstructor CStalkerOutfit
   * @group xr_item
   */
  export class CStalkerOutfit extends CGameObject {}

  /**
   * Client object binding for `CInventoryBox` inventory items.
   *
   * @source C++ class CInventoryBox : CGameObject
   * @customConstructor CInventoryBox
   * @group xr_item
   */
  export class CInventoryBox extends CGameObject {}

  /**
   * Client object binding for `CBottleItem` inventory items.
   *
   * @source C++ class CBottleItem : CGameObject
   * @customConstructor CBottleItem
   * @group xr_item
   */
  export class CBottleItem extends CGameObject {}

  /**
   * Client object binding for `CFoodItem` inventory items.
   *
   * @source C++ class CFoodItem : CGameObject
   * @customConstructor CFoodItem
   * @group xr_item
   */
  export class CFoodItem extends CGameObject {}

  /**
   * Client object binding for `CMedkit` inventory items.
   *
   * @source C++ class CMedkit : CGameObject
   * @customConstructor CMedkit
   * @group xr_item
   */
  export class CMedkit extends CGameObject {}

  /**
   * Client object binding for `CExplosiveItem` inventory items.
   *
   * @source C++ class CExplosiveItem : CGameObject
   * @customConstructor CExplosiveItem
   * @group xr_item
   */
  export class CExplosiveItem extends CGameObject {}

  /**
   * Client object binding for `CCWeaponAK74` inventory items.
   *
   * @source C++ class CWeaponAK74 : CGameObject
   * @customConstructor CWeaponAK74
   * @group xr_item
   */
  export class CCWeaponAK74 extends CGameObject {}

  /**
   * Client object binding for `CGrenadeLauncher` inventory items.
   *
   * @source C++ class CGrenadeLauncher : CGameObject
   * @customConstructor CGrenadeLauncher
   * @group xr_item
   */
  export class CGrenadeLauncher extends CGameObject {}

  /**
   * Client object binding for `CWeaponAmmo` inventory items.
   *
   * @source C++ class CWeaponAmmo : CGameObject
   * @customConstructor CWeaponAmmo
   * @group xr_item
   */
  export class CWeaponAmmo extends CGameObject {}

  /**
   * Client object binding for `CWeapon` inventory items.
   *
   * @source C++ class CWeapon : public CHudItemObject, public CShootingObject
   * @customConstructor CWeaponAmmo
   * @group xr_item
   */
  export class CWeapon extends CInventoryItem {
    /**
     * Check whether the weapon can currently fire a lethal shot.
     *
     * @returns Whether the weapon can kill.
     */
    public can_kill(): boolean;
  }

  /**
   * Client object binding for `CWeaponMagazined` inventory items.
   *
   * @source C++ class CWeaponMagazined : public CWeapon
   * @customConstructor CWeaponMagazined
   * @group xr_item
   */
  export class CWeaponMagazined extends CWeapon {}

  /**
   * Client object binding for `CWeaponAutomaticShotgun` inventory items.
   *
   * @source C++ class CWeaponAutomaticShotgun : CGameObject
   * @customConstructor CWeaponAutomaticShotgun
   * @group xr_item
   */
  export class CWeaponAutomaticShotgun extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponBM16` inventory items.
   *
   * @source C++ class CWeaponBM16 : CGameObject
   * @customConstructor CWeaponBM16
   * @group xr_item
   */
  export class CWeaponBM16 extends CWeaponShotgun {}

  /**
   * Client object binding for `CWeaponBinoculars` inventory items.
   *
   * @source C++ class CWeaponBinoculars : CGameObject
   * @customConstructor CWeaponBinoculars
   * @group xr_item
   */
  export class CWeaponBinoculars extends CGameObject {}

  /**
   * Client object binding for `CWeaponFN2000` inventory items.
   *
   * @source C++ class CWeaponFN2000 : CGameObject
   * @customConstructor CWeaponFN2000
   * @group xr_item
   */
  export class CWeaponFN2000 extends CGameObject {}

  /**
   * Client object binding for `CWeaponFORT` inventory items.
   *
   * @source C++ class CWeaponFORT : CGameObject
   * @customConstructor CWeaponFORT
   * @group xr_item
   */
  export class CWeaponFORT extends CGameObject {}

  /**
   * Client object binding for `CWeaponGroza` inventory items.
   *
   * @source C++ class CWeaponGroza : CGameObject
   * @customConstructor CWeaponGroza
   * @group xr_item
   */
  export class CWeaponGroza extends CGameObject {}

  /**
   * Client object binding for `CWeaponHPSA` inventory items.
   *
   * @source C++ class CWeaponHPSA : CGameObject
   * @customConstructor CWeaponHPSA
   * @group xr_item
   */
  export class CWeaponHPSA extends CGameObject {}

  /**
   * Client object binding for `CWeaponKnife` inventory items.
   *
   * @source C++ class CWeaponKnife : CGameObject
   * @customConstructor CWeaponKnife
   * @group xr_item
   */
  export class CWeaponKnife extends CGameObject {}

  /**
   * Client object binding for `CWeaponLR300` inventory items.
   *
   * @source C++ class CWeaponLR300 : CGameObject
   * @customConstructor CWeaponLR300
   * @group xr_item
   */
  export class CWeaponLR300 extends CGameObject {}

  /**
   * Client object binding for `CWeaponPM` inventory items.
   *
   * @source C++ class CWeaponPM : CGameObject
   * @customConstructor CWeaponPM
   * @group xr_item
   */
  export class CWeaponPM extends CGameObject {}

  /**
   * Client object binding for `CWeaponRG6` inventory items.
   *
   * @source C++ class CWeaponRG6 : CGameObject
   * @customConstructor CWeaponRG6
   * @group xr_item
   */
  export class CWeaponRG6 extends CGameObject {}

  /**
   * Client object binding for `CWeaponRPG7` inventory items.
   *
   * @source C++ class CWeaponRPG7 : CGameObject
   * @customConstructor CWeaponRPG7
   * @group xr_item
   */
  export class CWeaponRPG7 extends CGameObject {}

  /**
   * Client object binding for `CWeaponSVD` inventory items.
   *
   * @source C++ class CWeaponSVD : CGameObject
   * @customConstructor CWeaponSVD
   * @group xr_item
   */
  export class CWeaponSVD extends CGameObject {}

  /**
   * Client object binding for `CWeaponSVU` inventory items.
   *
   * @source C++ class CWeaponSVU : CGameObject
   * @customConstructor CWeaponSVU
   * @group xr_item
   */
  export class CWeaponSVU extends CGameObject {}

  /**
   * Client object binding for `CWeaponShotgun` inventory items.
   *
   * @source C++ class CWeaponShotgun : CGameObject
   * @customConstructor CWeaponShotgun
   * @group xr_item
   */
  export class CWeaponShotgun extends CGameObject {}

  /**
   * Client object binding for `CWeaponUSP45` inventory items.
   *
   * @source C++ class CWeaponUSP45 : CGameObject
   * @customConstructor CWeaponUSP45
   * @group xr_item
   */
  export class CWeaponUSP45 extends CGameObject {}

  /**
   * Client object binding for `CWeaponVal` inventory items.
   *
   * @source C++ class CWeaponVal : CGameObject
   * @customConstructor CWeaponVal
   * @group xr_item
   */
  export class CWeaponVal extends CGameObject {}

  /**
   * Client object binding for `CWeaponVintorez` inventory items.
   *
   * @source C++ class CWeaponVintorez : CGameObject
   * @customConstructor CWeaponVintorez
   * @group xr_item
   */
  export class CWeaponVintorez extends CGameObject {}

  /**
   * Client object binding for `CWeaponWalther` inventory items.
   *
   * @source C++ class CWeaponWalther : CGameObject
   * @customConstructor CWeaponWalther
   * @group xr_item
   */
  export class CWeaponWalther extends CGameObject {}

  /**
   * Client object binding for `CSilencer` inventory items.
   *
   * @source C++ class CSilencer : CGameObject
   * @customConstructor CSilencer
   * @group xr_item
   */
  export class CSilencer extends CGameObject {}

  /**
   * Client object binding for `CScope` inventory items.
   *
   * @source C++ class CScope : CGameObject
   * @customConstructor CScope
   * @group xr_item
   */
  export class CScope extends CGameObject {}

  /**
   * Client object binding for `CRGD5` inventory items.
   *
   * @source C++ class CRGD5 : CGameObject
   * @customConstructor CRGD5
   * @group xr_item
   */
  export class CRGD5 extends CGameObject {}

  /**
   * Client object binding for `CF1` inventory items.
   *
   * @source C++ class CF1 : CGameObject
   * @customConstructor CF1
   * @group xr_item
   */
  export class CF1 extends CGameObject {}

  /**
   * Client object binding for `CPda` inventory items.
   *
   * @source C++ class CPda : CGameObject
   * @customConstructor CPda
   * @group xr_item
   */
  export class CPda extends CGameObject {}
}
