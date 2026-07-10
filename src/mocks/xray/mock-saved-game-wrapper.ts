import { type CSavedGameWrapper } from "xray16";

import { MockCTime } from "./mock-ctime";

/**
 * Mock of the X-Ray engine `CSavedGameWrapper`.
 */
export class MockCSavedGameWrapper implements CSavedGameWrapper {
  public __name: string = "CSavedGameWrapper";

  public constructor(_name: string = "") {}

  public level_id(): number {
    return 0;
  }

  public game_time(): MockCTime {
    return new MockCTime();
  }

  public actor_health(): number {
    return 1;
  }

  public level_name(): string {
    return "pripyat";
  }
}
