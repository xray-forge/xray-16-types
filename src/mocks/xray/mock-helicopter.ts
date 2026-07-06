import { jest } from "@jest/globals";
import { type CHelicopter } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine helicopter object.
 */
export class MockCHelicopter {
  public static mock(health: number = 1): CHelicopter {
    const helicopter: MockCHelicopter = new MockCHelicopter();

    helicopter.health = health;

    return helicopter as unknown as CHelicopter;
  }

  public health: number = 1;
  public velocity: number = 10;

  public velocityVector: MockVector = MockVector.create(0.5, 0.5, 0.5);

  public isVisible = jest.fn(() => false);
  public GetfHealth = jest.fn(() => this.health);
  public SetfHealth = jest.fn((health: number) => (this.health = health));
  public TurnEngineSound = jest.fn();
  public SetEnemy = jest.fn();
  public SetLinearAcc = jest.fn();
  public SetMaxVelocity = jest.fn();
  public SetSpeedInDestPoint = jest.fn();
  public UseFireTrail = jest.fn();
  public GoPatrolByRoundPath = jest.fn();
  public ClearEnemy = jest.fn();
  public LookAtPoint = jest.fn();
  public GetMaxVelocity = jest.fn(() => 7);
  public SetDestPosition = jest.fn();
  public GetDistanceToDestPosition = jest.fn(() => 30);
  public GetCurrVelocity = jest.fn(() => this.velocity);
  public GetCurrVelocityVec = jest.fn(() => this.velocityVector);
}
