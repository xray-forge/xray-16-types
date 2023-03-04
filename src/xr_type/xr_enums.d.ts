declare module "xray16" {
  /**
   * Enumeration with possible game types:
   * - eGameIDNoGame = u32(0),
   * - eGameIDSingle = u32(1) << 0,
   * - eGameIDDeathmatch = u32(1) << 1,
   * - eGameIDTeamDeathmatch = u32(1) << 2,
   * - eGameIDArtefactHunt = u32(1) << 3,
   * - eGameIDCaptureTheArtefact = u32(1) << 4,
   * - eGameIDDominationZone = u32(1) << 5,
   * - eGameIDTeamDominationZone = u32(1) << 6,
   *
   * @source C++ enum EGameIDs
   * @group xr_types
   */
  export type TXR_EGameID = 0 | 1 | 2 | 8 | 16 | 32 | 64;
}
