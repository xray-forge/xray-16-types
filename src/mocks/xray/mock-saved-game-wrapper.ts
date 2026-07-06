import { MockCTime } from "./mock-ctime";

/**
 * Mock of the X-Ray engine `CSavedGameWrapper`.
 */
export class MockCSavedGameWrapper {
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
