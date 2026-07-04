declare module "xray16" {
  /**
   * Client object binding for `CMosquitoBald` anomaly objects.
   *
   * @source `src/xrGame/MosquitoBald_script.cpp`, `CMosquitoBald` binding.
   * @customConstructor CMosquitoBald
   * @group xr_anomaly
   *
   * @remarks
   * Concrete anomaly wrapper. Generic anomaly helpers are usually available through `CCustomZone`/`game_object`.
   */
  export class CMosquitoBald extends CGameObject {}

  /**
   * Client object binding for torch items.
   *
   * @source `src/xrGame/torch_script.cpp`, `CTorch` binding.
   * @customConstructor CTorch
   * @group xr_anomaly
   *
   * @remarks
   * Torch-specific night-vision helpers on `game_object` require this runtime object.
   */
  export class CTorch extends CGameObject {}

  /**
   * Client object binding for `CTorridZone` anomaly objects.
   *
   * @source `src/xrGame/MosquitoBald_script.cpp`, `CTorridZone` binding.
   * @customConstructor CTorridZone
   * @group xr_anomaly
   */
  export class CTorridZone extends CGameObject {}

  /**
   * Client object binding for `CRadioactiveZone` anomaly objects.
   *
   * @source `src/xrGame/mincer_script.cpp`, `CRadioactiveZone` binding.
   * @customConstructor CRadioactiveZone
   * @group xr_anomaly
   */
  export class CRadioactiveZone extends CGameObject {}

  /**
   * Client object binding for `CMincer` anomaly objects.
   *
   * @source `src/xrGame/mincer_script.cpp`, `CMincer` binding.
   * @customConstructor CMincer
   * @group xr_anomaly
   */
  export class CMincer extends CGameObject {}

  /**
   * Client object binding for `CFracture` anomaly objects.
   *
   * @source `src/xrGame/ai/monsters/fracture/fracture_script.cpp`, `CFracture` binding.
   * @customConstructor CFracture
   * @group xr_anomaly
   */
  export class CFracture extends CGameObject {}

  /**
   * Client object binding for `CHairsZone` anomaly objects.
   *
   * @source `src/xrGame/HairsZone_script.cpp`, `CHairsZone` binding.
   * @customConstructor CHairsZone
   * @group xr_anomaly
   */
  export class CHairsZone extends CGameObject {}

  /**
   * Client object binding for `CAmebaZone` anomaly objects.
   *
   * @source `src/xrGame/HairsZone_script.cpp`, `CAmebaZone` binding.
   * @customConstructor CAmebaZone
   * @group xr_anomaly
   *
   * @remarks
   * Registered together with hair and no-gravity anomaly zones. Generic anomaly helpers are available through
   * `CCustomZone`/`game_object` after checking the runtime class.
   */
  export class CAmebaZone extends CGameObject {}

  /**
   * Client object binding for `CNoGravityZone` anomaly objects.
   *
   * @source `src/xrGame/HairsZone_script.cpp`, `CNoGravityZone` binding.
   * @customConstructor CNoGravityZone
   * @group xr_anomaly
   *
   * @remarks
   * Registered by the hair-zone script binding as a concrete anomaly wrapper.
   */
  export class CNoGravityZone extends CGameObject {}
}
