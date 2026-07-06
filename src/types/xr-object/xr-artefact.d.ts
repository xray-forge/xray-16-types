declare module "xray16" {
  /**
   * Client-side artefact object.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CArtefact` binding.
   * @customConstructor CArtefact
   * @group xr_artefact
   *
   * @remarks
   * Scripts usually reach this wrapper through `game_object.cast_Artefact()` after checking `is_artefact()`. Path and
   * visibility helpers only affect artefacts with detector support.
   */
  export class CArtefact extends CGameObject {
    /**
     * Create an artefact object wrapper.
     */
    public constructor();

    /**
     * Move the artefact detector helper along a patrol path.
     *
     * @remarks
     * Native code delegates to detector support when it exists. Missing detector support makes this a no-op. The vector
     * parameter is stored as movement force, not as an initial world position.
     *
     * @param path_name - Patrol path name.
     * @param point_index - Starting path point index.
     * @param position - Movement force used by detector support.
     */
    public FollowByPath(path_name: string, point_index: i32, position: vector): void;

    /**
     * @returns Artefact rank used by detectors and inventory UI.
     */
    public GetAfRank(): u8;

    /**
     * Show or hide the artefact detector helper.
     *
     * @remarks
     * Native code delegates to detector support when it exists. Missing detector support makes this a no-op; it does
     * not spawn or destroy the artefact object.
     *
     * @param is_visible - New visibility state.
     */
    public SwitchVisibility(is_visible: boolean): void;
  }

  /**
   * Client object binding for `CZudaArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CZudaArtefact` binding.
   * @customConstructor CZudaArtefact
   * @group xr_artefact
   */
  export class CZudaArtefact extends CArtefact {}

  /**
   * Client object binding for `CThornArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CThornArtefact` binding.
   * @customConstructor CThornArtefact
   * @group xr_artefact
   */
  export class CThornArtefact extends CArtefact {}

  /**
   * Client object binding for `CBastArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CBastArtefact` binding.
   * @customConstructor CBastArtefact
   * @group xr_artefact
   */
  export class CBastArtefact extends CArtefact {}

  /**
   * Client object binding for `CBlackDrops` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CBlackDrops` binding.
   * @customConstructor CBlackDrops
   * @group xr_artefact
   */
  export class CBlackDrops extends CArtefact {}

  /**
   * Client object binding for `CBlackGraviArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CBlackGraviArtefact` binding.
   * @customConstructor CBlackGraviArtefact
   * @group xr_artefact
   */
  export class CBlackGraviArtefact extends CArtefact {}

  /**
   * Client object binding for `CDummyArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CDummyArtefact` binding.
   * @customConstructor CDummyArtefact
   * @group xr_artefact
   */
  export class CDummyArtefact extends CArtefact {}

  /**
   * Client object binding for `CElectricBall` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CElectricBall` binding.
   * @customConstructor CElectricBall
   * @group xr_artefact
   */
  export class CElectricBall extends CArtefact {}

  /**
   * Client object binding for `CFadedBall` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CFadedBall` binding.
   * @customConstructor CFadedBall
   * @group xr_artefact
   */
  export class CFadedBall extends CArtefact {}

  /**
   * Client object binding for `CGalantineArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CGalantineArtefact` binding.
   * @customConstructor CGalantineArtefact
   * @group xr_artefact
   */
  export class CGalantineArtefact extends CArtefact {}

  /**
   * Client object binding for `CGraviArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CGraviArtefact` binding.
   * @customConstructor CGraviArtefact
   * @group xr_artefact
   */
  export class CGraviArtefact extends CArtefact {}

  /**
   * Client object binding for `CMercuryBall` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CMercuryBall` binding.
   * @customConstructor CMercuryBall
   * @group xr_artefact
   */
  export class CMercuryBall extends CArtefact {}

  /**
   * Client object binding for `CRustyHairArtefact` artefacts.
   *
   * @source `src/xrGame/artefact_script.cpp`, `CRustyHairArtefact` binding.
   * @customConstructor CRustyHairArtefact
   * @group xr_artefact
   */
  export class CRustyHairArtefact extends CArtefact {}
}
