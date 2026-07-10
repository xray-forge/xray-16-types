import type { GAME_TYPE } from "xray16";

export class MockGameType implements GAME_TYPE {
  public static create(): MockGameType {
    return new MockGameType();
  }

  public static mock(): MockGameType {
    return new MockGameType();
  }

  public static readonly eGameIDArtefactHunt = 8 as const;
  public static readonly eGameIDCaptureTheArtefact = 16 as const;
  public static readonly eGameIDDeathmatch = 2 as const;
  public static readonly eGameIDTeamDeathmatch = 4 as const;

  public static readonly GAME_UNKNOWN = -1 as const;
  public static readonly GAME_ANY = 0 as const;
  public static readonly GAME_SINGLE = 1 as const;
  public static readonly GAME_DEATHMATCH = 2 as const;
  // GAME_CTF = 3,
  // GAME_ASSAULT = 4,	// Team1 - assaulting, Team0 - Defending
  public static readonly GAME_CS = 5 as const;
  public static readonly GAME_TEAMDEATHMATCH = 6 as const;
  public static readonly GAME_ARTEFACTHUNT = 7 as const;
  public static readonly GAME_CAPTURETHEARTEFACT = 8 as const;

  // Identifiers in range [100...254] are registered for script game type
  public static readonly GAME_DUMMY = 255 as const;
}
