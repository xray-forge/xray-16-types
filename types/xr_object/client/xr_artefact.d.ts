declare module "xray16" {
  /**
   * Client-side artefact object.
   *
   * @source C++ class CArtefact : CGameObject
   * @customConstructor CArtefact
   * @group xr_artefact
   */
  export class CArtefact extends CGameObject {
    /**
     * Create an artefact object wrapper.
     */
    public constructor();

    /**
     * Move the artefact along a patrol path.
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
     * @param is_visible - New visibility state.
     */
    public SwitchVisibility(is_visible: boolean): void;
  }

  /**
   * @source C++ class CZudaArtefact : CArtefact
   * @customConstructor CZudaArtefact
   * @group xr_artefact
   */
  export class CZudaArtefact extends CArtefact {}

  /**
   * @source C++ class CThornArtefact : CArtefact
   * @customConstructor CThornArtefact
   * @group xr_artefact
   */
  export class CThornArtefact extends CArtefact {}

  /**
   * @source C++ class CBastArtefact : CArtefact
   * @customConstructor CBastArtefact
   * @group xr_artefact
   */
  export class CBastArtefact extends CArtefact {}

  /**
   * @source C++ class CBlackDrops : CArtefact
   * @customConstructor CBlackDrops
   * @group xr_artefact
   */
  export class CBlackDrops extends CArtefact {}

  /**
   * @source C++ class CBlackGraviArtefact : CArtefact
   * @customConstructor CBlackGraviArtefact
   * @group xr_artefact
   */
  export class CBlackGraviArtefact extends CArtefact {}

  /**
   * @source C++ class CDummyArtefact : CArtefact
   * @customConstructor CDummyArtefact
   * @group xr_artefact
   */
  export class CDummyArtefact extends CArtefact {}

  /**
   * @source C++ class CElectricBall : CArtefact
   * @customConstructor CElectricBall
   * @group xr_artefact
   */
  export class CElectricBall extends CArtefact {}

  /**
   * @source C++ class CFadedBall : CArtefact
   * @customConstructor CFadedBall
   * @group xr_artefact
   */
  export class CFadedBall extends CArtefact {}

  /**
   * @source C++ class CGalantineArtefact : CArtefact
   * @customConstructor CGalantineArtefact
   * @group xr_artefact
   */
  export class CGalantineArtefact extends CArtefact {}

  /**
   * @source C++ class CGraviArtefact : CArtefact
   * @customConstructor CGraviArtefact
   * @group xr_artefact
   */
  export class CGraviArtefact extends CArtefact {}

  /**
   * @source C++ class CMercuryBall : CArtefact
   * @customConstructor CMercuryBall
   * @group xr_artefact
   */
  export class CMercuryBall extends CArtefact {}

  /**
   * @source C++ class CRustyHairArtefact : CArtefact
   * @customConstructor CRustyHairArtefact
   * @group xr_artefact
   */
  export class CRustyHairArtefact extends CArtefact {}
}
