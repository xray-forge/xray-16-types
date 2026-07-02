declare module "xray16" {
  /**
   * Explosive component shared by grenade and explosive item classes.
   *
   * @source C++ class explosive
   * @customConstructor explosive
   * @group xr_item
   *
   * @remarks
   * Returned for objects that expose the native explosive component. Do not use it as a generic item wrapper.
   */
  export class explosive extends EngineBinding {
    /**
     * Engine-created explosive component.
     */
    protected constructor();

    /**
     * Trigger the explosive immediately.
     *
     * @remarks
     * Requires the owning object to still be alive in the engine object registry.
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
   *
   * @remarks
   * Inventory box helpers on `game_object` require this runtime class, not any inventory owner.
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
   * Client object binding for explosive inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CExplosiveItem` binding.
   * @customConstructor CExplosiveItem
   * @group xr_item
   *
   * @remarks
   * The script binding exposes both `CGameObject` and `explosive` bases for this class.
   */
  export class CExplosiveItem extends CGameObject {
    /**
     * Trigger the item's explosive component immediately.
     */
    public explode(): void;
  }

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
   *
   * @remarks
   * Ammo-count helpers on `game_object` require this runtime class.
   */
  export class CWeaponAmmo extends CGameObject {}

  /**
   * Client object binding for `CWeapon` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeapon` binding.
   * @customConstructor CWeapon
   * @group xr_item
   *
   * @remarks
   * Weapon helpers on `game_object` require this family or a subclass. Addons, ammo, outfits, and consumables are not
   * weapons even when they are inventory items.
   */
  export class CWeapon extends CInventoryItem {
    /**
     * Check whether the weapon can currently fire a lethal shot.
     *
     * @remarks
     * Returns true when the weapon has suitable ammo available or does not use ammo. This is the same predicate used by
     * actor and stalker weapon selection before considering an item lethal.
     *
     * @returns Whether the weapon can kill.
     */
    public can_kill(): boolean;
  }

  /**
   * Client object binding for magazine-fed weapons.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponMagazined` binding.
   * @customConstructor CWeaponMagazined
   * @group xr_item
   *
   * @remarks
   * Base class for most firearms exposed to scripts. The binding inherits `CWeapon`, so `can_kill()` is available on
   * all subclasses declared under this family.
   */
  export class CWeaponMagazined extends CWeapon {}

  /**
   * Client object binding for magazine-fed weapons with grenade-launcher support.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponMagazinedWGrenade` binding.
   * @customConstructor CWeaponMagazinedWGrenade
   * @group xr_item
   */
  export class CWeaponMagazinedWGrenade extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponAK74` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponAK74` binding.
   * @customConstructor CWeaponAK74
   * @group xr_item
   */
  export class CWeaponAK74 extends CWeaponMagazinedWGrenade {}

  /**
   * Client object binding for `CWeaponAutomaticShotgun` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponAutomaticShotgun` binding.
   * @customConstructor CWeaponAutomaticShotgun
   * @group xr_item
   */
  export class CWeaponAutomaticShotgun extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponBM16` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponBM16` binding.
   * @customConstructor CWeaponBM16
   * @group xr_item
   */
  export class CWeaponBM16 extends CWeaponShotgun {}

  /**
   * Client object binding for `CWeaponBinoculars` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponBinoculars` binding.
   * @customConstructor CWeaponBinoculars
   * @group xr_item
   */
  export class CWeaponBinoculars extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponFN2000` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponFN2000` binding.
   * @customConstructor CWeaponFN2000
   * @group xr_item
   */
  export class CWeaponFN2000 extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponFORT` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponFORT` binding.
   * @customConstructor CWeaponFORT
   * @group xr_item
   */
  export class CWeaponFORT extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponGroza` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponGroza` binding.
   * @customConstructor CWeaponGroza
   * @group xr_item
   */
  export class CWeaponGroza extends CWeaponMagazinedWGrenade {}

  /**
   * Client object binding for `CWeaponHPSA` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponHPSA` binding.
   * @customConstructor CWeaponHPSA
   * @group xr_item
   */
  export class CWeaponHPSA extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponKnife` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponKnife` binding.
   * @customConstructor CWeaponKnife
   * @group xr_item
   */
  export class CWeaponKnife extends CWeapon {}

  /**
   * Client object binding for `CWeaponLR300` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponLR300` binding.
   * @customConstructor CWeaponLR300
   * @group xr_item
   */
  export class CWeaponLR300 extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponPM` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponPM` binding.
   * @customConstructor CWeaponPM
   * @group xr_item
   */
  export class CWeaponPM extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponRG6` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponRG6` binding.
   * @customConstructor CWeaponRG6
   * @group xr_item
   */
  export class CWeaponRG6 extends CWeaponShotgun {}

  /**
   * Client object binding for `CWeaponRPG7` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponRPG7` binding.
   * @customConstructor CWeaponRPG7
   * @group xr_item
   */
  export class CWeaponRPG7 extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponSVD` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponSVD` binding.
   * @customConstructor CWeaponSVD
   * @group xr_item
   */
  export class CWeaponSVD extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponSVU` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponSVU` binding.
   * @customConstructor CWeaponSVU
   * @group xr_item
   */
  export class CWeaponSVU extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponShotgun` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponShotgun` binding.
   * @customConstructor CWeaponShotgun
   * @group xr_item
   */
  export class CWeaponShotgun extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponUSP45` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponUSP45` binding.
   * @customConstructor CWeaponUSP45
   * @group xr_item
   */
  export class CWeaponUSP45 extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponVal` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponVal` binding.
   * @customConstructor CWeaponVal
   * @group xr_item
   */
  export class CWeaponVal extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponVintorez` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponVintorez` binding.
   * @customConstructor CWeaponVintorez
   * @group xr_item
   */
  export class CWeaponVintorez extends CWeaponMagazined {}

  /**
   * Client object binding for `CWeaponWalther` inventory items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CWeaponWalther` binding.
   * @customConstructor CWeaponWalther
   * @group xr_item
   */
  export class CWeaponWalther extends CWeaponMagazined {}

  /**
   * Client object binding for `CSilencer` inventory items.
   *
   * @source `src/xrGame/Scope.cpp`, `CSilencer` binding.
   * @customConstructor CSilencer
   * @group xr_item
   */
  export class CSilencer extends CGameObject {}

  /**
   * Client object binding for `CScope` inventory items.
   *
   * @source `src/xrGame/Scope.cpp`, `CScope` binding.
   * @customConstructor CScope
   * @group xr_item
   */
  export class CScope extends CGameObject {}

  /**
   * Client object binding for `CRGD5` grenade items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CRGD5` binding.
   * @customConstructor CRGD5
   * @group xr_item
   *
   * @remarks
   * The script binding exposes both `CGameObject` and `explosive` bases for this class.
   */
  export class CRGD5 extends CGameObject {
    /**
     * Trigger the grenade's explosive component immediately.
     */
    public explode(): void;
  }

  /**
   * Client object binding for `CF1` grenade items.
   *
   * @source `src/xrGame/WeaponScript.cpp`, `CF1` binding.
   * @customConstructor CF1
   * @group xr_item
   *
   * @remarks
   * The script binding exposes both `CGameObject` and `explosive` bases for this class.
   */
  export class CF1 extends CGameObject {
    /**
     * Trigger the grenade's explosive component immediately.
     */
    public explode(): void;
  }

  /**
   * Client object binding for `CPda` inventory items.
   *
   * @source `src/xrGame/torch_script.cpp`, `CPda` binding.
   * @customConstructor CPda
   * @group xr_item
   */
  export class CPda extends CGameObject {}
}
