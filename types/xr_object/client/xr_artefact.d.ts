declare module "xray16" {
  /**
   * Client-side artefact object.
   *
   * @source C++ class CArtefact : CGameObject
   * @customConstructor CArtefact
   * @group xr_artefact
   *
   * @remarks
   * Scripts usually reach this wrapper through `game_object.cast_Artefact()` after checking `is_artefact()`.
   */
  export class CArtefact extends CGameObject {
    /**
     * Create an artefact object wrapper.
     */
    public constructor();

    /**
     * Move the artefact along a patrol path.
     *
     * @remarks
     * Requires a patrol path with the given name. The point index must refer to an existing path point.
     *
     * @param path_name - Patrol path name.
     * @param point_index - Starting path point index.
     * @param position - Initial position.
     */
    public FollowByPath(path_name: string, point_index: i32, position: vector): void;

    /**
     * @returns Artefact rank used by detectors and inventory UI.
     */
    public GetAfRank(): u8;

    /**
     * Show or hide the artefact.
     *
     * @remarks
     * This changes the artefact's client visibility; it does not spawn or destroy the object.
     *
     * @param is_visible - New visibility state.
     */
    public SwitchVisibility(is_visible: boolean): void;
  }

  /**
   * Client object binding for `CZudaArtefact` artefacts.
   *
   * @source C++ class CZudaArtefact : CArtefact
   * @customConstructor CZudaArtefact
   * @group xr_artefact
   */
  export class CZudaArtefact extends CArtefact {}

  /**
   * Client object binding for `CThornArtefact` artefacts.
   *
   * @source C++ class CThornArtefact : CArtefact
   * @customConstructor CThornArtefact
   * @group xr_artefact
   */
  export class CThornArtefact extends CArtefact {}

  /**
   * Client object binding for `CBastArtefact` artefacts.
   *
   * @source C++ class CBastArtefact : CArtefact
   * @customConstructor CBastArtefact
   * @group xr_artefact
   */
  export class CBastArtefact extends CArtefact {}

  /**
   * Client object binding for `CBlackDrops` artefacts.
   *
   * @source C++ class CBlackDrops : CArtefact
   * @customConstructor CBlackDrops
   * @group xr_artefact
   */
  export class CBlackDrops extends CArtefact {}

  /**
   * Client object binding for `CBlackGraviArtefact` artefacts.
   *
   * @source C++ class CBlackGraviArtefact : CArtefact
   * @customConstructor CBlackGraviArtefact
   * @group xr_artefact
   */
  export class CBlackGraviArtefact extends CArtefact {}

  /**
   * Client object binding for `CDummyArtefact` artefacts.
   *
   * @source C++ class CDummyArtefact : CArtefact
   * @customConstructor CDummyArtefact
   * @group xr_artefact
   */
  export class CDummyArtefact extends CArtefact {}

  /**
   * Client object binding for `CElectricBall` artefacts.
   *
   * @source C++ class CElectricBall : CArtefact
   * @customConstructor CElectricBall
   * @group xr_artefact
   */
  export class CElectricBall extends CArtefact {}

  /**
   * Client object binding for `CFadedBall` artefacts.
   *
   * @source C++ class CFadedBall : CArtefact
   * @customConstructor CFadedBall
   * @group xr_artefact
   */
  export class CFadedBall extends CArtefact {}

  /**
   * Client object binding for `CGalantineArtefact` artefacts.
   *
   * @source C++ class CGalantineArtefact : CArtefact
   * @customConstructor CGalantineArtefact
   * @group xr_artefact
   */
  export class CGalantineArtefact extends CArtefact {}

  /**
   * Client object binding for `CGraviArtefact` artefacts.
   *
   * @source C++ class CGraviArtefact : CArtefact
   * @customConstructor CGraviArtefact
   * @group xr_artefact
   */
  export class CGraviArtefact extends CArtefact {}

  /**
   * Client object binding for `CMercuryBall` artefacts.
   *
   * @source C++ class CMercuryBall : CArtefact
   * @customConstructor CMercuryBall
   * @group xr_artefact
   */
  export class CMercuryBall extends CArtefact {}

  /**
   * Client object binding for `CRustyHairArtefact` artefacts.
   *
   * @source C++ class CRustyHairArtefact : CArtefact
   * @customConstructor CRustyHairArtefact
   * @group xr_artefact
   */
  export class CRustyHairArtefact extends CArtefact {}
}
