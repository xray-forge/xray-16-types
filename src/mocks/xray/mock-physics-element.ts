import { jest } from "@jest/globals";
import { type matrix, type physics_element, type vector } from "xray16";

import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine physics element.
 */
export class MockPhysicsElement implements physics_element {
  public static create(): MockPhysicsElement {
    return new MockPhysicsElement();
  }

  public static mock(): physics_element {
    return new MockPhysicsElement();
  }

  public isFixed: boolean = false;
  public isBreakable: boolean = false;
  public density: number = 1;
  public mass: number = 1;
  public volume: number = 1;
  public force: MockVector = MockVector.create();
  public angularVelocity: MockVector = MockVector.create();
  public linearVelocity: MockVector = MockVector.create();
  public transform: matrix = {} as matrix;

  public apply_force = jest.fn((x: number, y: number, z: number) => {
    this.force.set(x, y, z);
  });

  public fix = jest.fn(() => {
    this.isFixed = true;
  });

  public get_angular_vel = jest.fn((velocity: vector) => {
    velocity.set(this.angularVelocity);
  });

  public get_density = jest.fn(() => this.density);

  public get_linear_vel = jest.fn((velocity: vector) => {
    velocity.set(this.linearVelocity);
  });

  public get_mass = jest.fn(() => this.mass);

  public get_volume = jest.fn(() => this.volume);

  public global_transform = jest.fn(() => this.transform);

  public is_breakable = jest.fn(() => this.isBreakable);

  public is_fixed = jest.fn(() => this.isFixed);

  public release_fixed = jest.fn(() => {
    this.isFixed = false;
  });
}
