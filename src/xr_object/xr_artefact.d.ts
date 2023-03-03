declare module "xray16" {
  /**
   * @source C++ class CArtefact : CGameObject
   * @customConstructor CArtefact
   * @group xr_artefact
   */
  export class XR_CArtefact extends XR_CGameObject {
    public constructor();

    public FollowByPath(a: string, b: i32, c: XR_vector): void;
    public GetAfRank(): u8;
    public SwitchVisibility(to: boolean): void;
  }

  /**
   * @source C++ class CZudaArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CZudaArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CThornArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CThornArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CBastArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CBastArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CBlackDrops : CArtefact
   * @group xr_artefact
   */
  export class XR_CBlackDrops extends XR_CArtefact {
  }

  /**
   * @source C++ class CBlackGraviArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CBlackGraviArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CDummyArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CDummyArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CElectricBall : CArtefact
   * @group xr_artefact
   */
  export class XR_CElectricBall extends XR_CArtefact {
  }

  /**
   * @source C++ class CFadedBall : CArtefact
   * @group xr_artefact
   */
  export class XR_CFadedBall extends XR_CArtefact {
  }

  /**
   * @source C++ class CGalantineArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CGalantineArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CGraviArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CGraviArtefact extends XR_CArtefact {
  }

  /**
   * @source C++ class CMercuryBall : CArtefact
   * @group xr_artefact
   */
  export class XR_CMercuryBall extends XR_CArtefact {
  }

  /**
   * @source C++ class CRustyHairArtefact : CArtefact
   * @group xr_artefact
   */
  export class XR_CRustyHairArtefact extends XR_CArtefact {
  }
}
