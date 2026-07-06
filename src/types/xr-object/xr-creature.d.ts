declare module "xray16" {
  /**
   * Runtime family wrapper for alive entities returned by `game_object.cast_EntityAlive()`.
   *
   * @source `src/xrGame/script_game_object_script3.cpp`, `cast_EntityAlive` binding.
   * @customConstructor CEntityAlive
   * @group xr_creature
   *
   * @remarks
   * This is a cast target, not a directly registered script constructor. Use `game_object.is_entity_alive()` or a
   * narrower predicate before calling alive-object methods from the shared `game_object` surface.
   */
  export class CEntityAlive extends CGameObject {
    /**
     * Cast-only runtime wrapper.
     */
    protected constructor();
  }

  /**
   * Client object binding for `CActor`.
   *
   * @source `src/xrGame/actor_script.cpp`, `CActor` binding.
   * @customConstructor CActor
   * @group xr_creature
   *
   * @remarks
   * Actor-only APIs on `game_object` require the current object to be the player actor, not just any alive entity.
   */
  export class CActor extends CGameObject {}

  /**
   * Runtime family wrapper for custom monsters returned by `game_object.cast_Monster()`.
   *
   * @source `src/xrGame/script_game_object_script3.cpp`, `cast_Monster` binding.
   * @customConstructor CCustomMonster
   * @group xr_creature
   *
   * @remarks
   * This is a cast target for monster-specific helpers. Sound, range, memory, home, and enemy-transfer helpers require
   * this family or one of its concrete runtime classes.
   */
  export class CCustomMonster extends CGameObject {
    /**
     * Cast-only runtime wrapper.
     */
    protected constructor();
  }

  /**
   * Runtime family wrapper for inventory owners returned by `game_object.cast_InventoryOwner()`.
   *
   * @source `src/xrGame/script_game_object_script3.cpp`, `cast_InventoryOwner` binding.
   * @customConstructor CInventoryOwner
   * @group xr_creature
   *
   * @remarks
   * Inventory-owner APIs cover NPCs, traders, corpses, boxes, and the actor depending on runtime class. Check the
   * object kind before assuming dialog, trade, belt, or inventory-box behavior exists.
   */
  export class CInventoryOwner extends CGameObject {
    /**
     * Cast-only runtime wrapper.
     */
    protected constructor();
  }

  /**
   * Runtime family wrapper for inventory items returned by `game_object.cast_InventoryItem()`.
   *
   * @source `src/xrGame/script_game_object_script3.cpp`, `cast_InventoryItem` binding.
   * @customConstructor CInventoryItem
   * @group xr_creature
   *
   * @remarks
   * Base wrapper for inventory items. Item condition, cost, upgrades, and slot behavior depend on the concrete item
   * class.
   */
  export class CInventoryItem extends CGameObject {
    /**
     * Cast-only runtime wrapper.
     */
    protected constructor();
  }

  /**
   * Client object binding for `CZombie`.
   *
   * @source `src/xrGame/ai/monsters/zombie/zombie_script.cpp`, `CZombie` binding.
   * @customConstructor CZombie
   * @group xr_creature
   */
  export class CZombie extends CGameObject {}

  /**
   * Client object binding for `CController`.
   *
   * @source `src/xrGame/ai/monsters/controller/controller_script.cpp`, `CController` binding.
   * @customConstructor CController
   * @group xr_creature
   */
  export class CController extends CGameObject {}

  /**
   * Client object binding for `CTushkano`.
   *
   * @source `src/xrGame/ai/monsters/tushkano/tushkano_script.cpp`, `CTushkano` binding.
   * @customConstructor CTushkano
   * @group xr_creature
   */
  export class CTushkano extends CGameObject {}

  /**
   * Client object binding for `CBurer`.
   *
   * @source `src/xrGame/ai/monsters/burer/burer_script.cpp`, `CBurer` binding.
   * @customConstructor CBurer
   * @group xr_creature
   */
  export class CBurer extends CGameObject {}

  /**
   * Client object binding for `CCat`.
   *
   * @source `src/xrGame/ai/monsters/cat/cat_script.cpp`, `CCat` binding.
   * @customConstructor CCat
   * @group xr_creature
   */
  export class CCat extends CGameObject {}

  /**
   * Client object binding for `CChimera`.
   *
   * @source `src/xrGame/ai/monsters/chimera/chimera_script.cpp`, `CChimera` binding.
   * @customConstructor CChimera
   * @group xr_creature
   */
  export class CChimera extends CGameObject {}

  /**
   * Client object binding for `CPoltergeist`.
   *
   * @source `src/xrGame/ai/monsters/poltergeist/poltergeist_script.cpp`, `CPoltergeist` binding.
   * @customConstructor CPoltergeist
   * @group xr_creature
   */
  export class CPoltergeist extends CGameObject {}

  /**
   * Client object binding for `CPseudoGigant`.
   *
   * @source `src/xrGame/ai/monsters/pseudogigant/pseudogigant_script.cpp`, `CPseudoGigant` binding.
   * @customConstructor CPseudoGigant
   * @group xr_creature
   */
  export class CPseudoGigant extends CGameObject {}

  /**
   * Client object binding for `CPsyDog`.
   *
   * @source `src/xrGame/ai/monsters/pseudodog/pseudodog_script.cpp`, `CPsyDog` binding.
   * @customConstructor CPsyDog
   * @group xr_creature
   */
  export class CPsyDog extends CGameObject {}

  /**
   * Client object binding for `CPsyDogPhantom`.
   *
   * @source `src/xrGame/ai/monsters/pseudodog/pseudodog_script.cpp`, `CPsyDogPhantom` binding.
   * @customConstructor CPsyDogPhantom
   * @group xr_creature
   */
  export class CPsyDogPhantom extends CGameObject {}

  /**
   * Client object binding for `CAI_Bloodsucker`.
   *
   * @source `src/xrGame/ai/monsters/bloodsucker/bloodsucker_script.cpp`, `CAI_Bloodsucker` binding.
   * @customConstructor CAI_Bloodsucker
   * @group xr_creature
   *
   * @remarks
   * Bloodsucker-specific visibility helpers are not valid for other custom monsters. The shared `game_object` wrapper
   * also exposes this helper and logs a script error when the object is not this runtime class.
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
   * @source `src/xrGame/ai/monsters/boar/boar_script.cpp`, `CAI_Boar` binding.
   * @customConstructor CAI_Boar
   * @group xr_creature
   */
  export class CAI_Boar extends CGameObject {}

  /**
   * Client object binding for `CAI_Dog`.
   *
   * @source `src/xrGame/ai/monsters/dog/dog_script.cpp`, `CAI_Dog` binding.
   * @customConstructor CAI_Dog
   * @group xr_creature
   */
  export class CAI_Dog extends CGameObject {}

  /**
   * Client object binding for `CAI_Flesh`.
   *
   * @source `src/xrGame/ai/monsters/flesh/flesh_script.cpp`, `CAI_Flesh` binding.
   * @customConstructor CAI_Flesh
   * @group xr_creature
   */
  export class CAI_Flesh extends CGameObject {}

  /**
   * Client object binding for `CAI_PseudoDog`.
   *
   * @source `src/xrGame/ai/monsters/pseudodog/pseudodog_script.cpp`, `CAI_PseudoDog` binding.
   * @customConstructor CAI_PseudoDog
   * @group xr_creature
   */
  export class CAI_PseudoDog extends CGameObject {}

  /**
   * Client object binding for `CAI_Stalker`.
   *
   * @source `src/xrGame/ai/stalker/ai_stalker_script.cpp`, `CAI_Stalker` binding.
   * @customConstructor CAI_Stalker
   * @group xr_creature
   *
   * @remarks
   * Stalker movement, smart-cover, planner, weapon-selection, and dialog helpers require this runtime family.
   */
  export class CAI_Stalker extends CGameObject {}

  /**
   * Client object binding for `CAI_Trader`.
   *
   * @source `src/xrGame/ai/trader/ai_trader_script.cpp`, `CAI_Trader` binding.
   * @customConstructor CAI_Trader
   * @group xr_creature
   *
   * @remarks
   * Trader wrappers are inventory owners with trader-specific animation and sound hooks.
   */
  export class CAI_Trader extends CGameObject {}

  /**
   * Client object binding for `CSnork`.
   *
   * @source `src/xrGame/ai/monsters/snork/snork_script.cpp`, `CSnork` binding.
   * @customConstructor CSnork
   * @group xr_creature
   */
  export class CSnork extends CGameObject {}
}
