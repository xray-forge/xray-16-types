import { jest } from "@jest/globals";
import { type CHelicopter } from "xray16";

import { MockCGameObject } from "./mock-c-game-object";
import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine helicopter object.
 */
export class MockCHelicopter extends MockCGameObject implements CHelicopter {
  public static override create(health: number = 1): MockCHelicopter {
    const helicopter: MockCHelicopter = new MockCHelicopter();

    helicopter.health = health;

    return helicopter;
  }

  public static override mock(health: number = 1): CHelicopter {
    const helicopter: MockCHelicopter = new MockCHelicopter();

    helicopter.health = health;

    return helicopter as unknown as CHelicopter;
  }

  public health: number = 1;
  public velocity: number = 10;
  public velocityVector: MockVector = MockVector.create(0.5, 0.5, 0.5);

  public m_exploded: CHelicopter["m_exploded"] = false;
  public m_light_started: CHelicopter["m_light_started"] = false;
  public m_flame_started: CHelicopter["m_flame_started"] = false;
  public m_dead: CHelicopter["m_dead"] = false;
  public m_max_mgun_dist: CHelicopter["m_max_mgun_dist"] = 0;
  public m_max_rocket_dist: CHelicopter["m_max_rocket_dist"] = 0;
  public m_min_mgun_dist: CHelicopter["m_min_mgun_dist"] = 0;
  public m_min_rocket_dist: CHelicopter["m_min_rocket_dist"] = 0;
  public m_syncronize_rocket: CHelicopter["m_syncronize_rocket"] = false;
  public m_time_between_rocket_attack: CHelicopter["m_time_between_rocket_attack"] = 0;
  public m_use_mgun_on_attack: CHelicopter["m_use_mgun_on_attack"] = false;
  public m_use_rocket_on_attack: CHelicopter["m_use_rocket_on_attack"] = false;

  public isVisible = jest.fn(() => false);

  public GetfHealth = jest.fn(() => this.health);

  public SetfHealth = jest.fn((health: number) => (this.health = health));

  public TurnEngineSound = jest.fn();

  public SetEnemy = jest.fn();

  public SetLinearAcc = jest.fn();

  public SetMaxVelocity = jest.fn();

  public SetSpeedInDestPoint = jest.fn();

  public UseFireTrail = jest.fn(() => false) as unknown as jest.MockedFunction<CHelicopter["UseFireTrail"]>;

  public GoPatrolByRoundPath = jest.fn();

  public ClearEnemy = jest.fn();

  public LookAtPoint = jest.fn();

  public GetMaxVelocity = jest.fn(() => 7);

  public SetDestPosition = jest.fn();

  public GetDistanceToDestPosition = jest.fn(() => 30);

  public GetCurrVelocity = jest.fn(() => this.velocity);

  public GetCurrVelocityVec = jest.fn(() => this.velocityVector);

  public GetSafeAltitude = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetSafeAltitude"]>;

  public GetRealAltitude = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetRealAltitude"]>;

  public GetSpeedInDestPoint = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetSpeedInDestPoint"]>;

  public GetOnPointRangeDist = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetOnPointRangeDist"]>;

  public GetMovementState = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetMovementState"]>;

  public GetBodyState = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetBodyState"]>;

  public GetState = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetState"]>;

  public GetHuntState = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GetHuntState"]>;

  public SetFireTrailLength = jest.fn() as unknown as jest.MockedFunction<CHelicopter["SetFireTrailLength"]>;

  public SetBarrelDirTolerance = jest.fn() as unknown as jest.MockedFunction<CHelicopter["SetBarrelDirTolerance"]>;

  public SetOnPointRangeDist = jest.fn() as unknown as jest.MockedFunction<CHelicopter["SetOnPointRangeDist"]>;

  public GoPatrolByPatrolPath = jest.fn() as unknown as jest.MockedFunction<CHelicopter["GoPatrolByPatrolPath"]>;

  public Explode = jest.fn() as unknown as jest.MockedFunction<CHelicopter["Explode"]>;

  public TurnLighting = jest.fn() as unknown as jest.MockedFunction<CHelicopter["TurnLighting"]>;

  public Die = jest.fn() as unknown as jest.MockedFunction<CHelicopter["Die"]>;

  public StartFlame = jest.fn() as unknown as jest.MockedFunction<CHelicopter["StartFlame"]>;
}
