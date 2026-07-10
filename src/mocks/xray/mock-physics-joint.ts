import { type physics_element, type physics_joint, type vector } from "xray16";

import { MockPhysicsElement } from "./mock-physics-element";
import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine physics joint.
 */
export class MockPhysicsJoint implements physics_joint {
  public static create(name: string): MockPhysicsJoint {
    return new MockPhysicsJoint(name);
  }

  public static mock(name: string): physics_joint {
    return new MockPhysicsJoint(name);
  }

  public name: string;
  public anchor: MockVector = MockVector.create();
  public axesNumber: number = 1;
  public boneId: number = 0;
  public isBreakable: boolean = false;
  public firstElement: physics_element = MockPhysicsElement.mock();
  public secondElement: physics_element = MockPhysicsElement.mock();
  public axisDirections: Map<number, MockVector> = new Map();
  public angleLimits: Map<number, [number, number]> = new Map();
  public forceVelocityLimits: Map<number, [number, number]> = new Map();
  public axisSpringDamping: Map<number, [number, number]> = new Map();
  public jointSpringDamping: [number, number] = [0, 0];

  public constructor(name: string) {
    this.name = name;
  }

  public get_anchor(anchor: vector): void {
    anchor.set(this.anchor);
  }

  public get_axes_number(): number {
    return this.axesNumber;
  }

  public get_axis_angle(_axis: number): number {
    return 0;
  }

  public get_axis_dir(axis: number, direction: vector): void {
    direction.set(this.axisDirections.get(axis) ?? MockVector.create(1, 0, 0));
  }

  public get_bone_id(): number {
    return this.boneId;
  }

  public get_first_element(): physics_element {
    return this.firstElement;
  }

  public get_limits(min: number, max: number, axis: number): LuaMultiReturn<[number, number]> {
    const [storedMin, storedMax] = this.angleLimits.get(axis) ?? [min, max];

    return [storedMin, storedMax] as LuaMultiReturn<[number, number]>;
  }

  public get_max_force_and_velocity(_force: number, _velocity: number, _axis: number): void {}

  public get_stcond_element(): physics_element {
    return this.secondElement;
  }

  public is_breakable(): boolean {
    return this.isBreakable;
  }

  public set_anchor_global(x: number, y: number, z: number): void {
    this.anchor.set(x, y, z);
  }

  public set_anchor_vs_first_element(x: number, y: number, z: number): void {
    this.anchor.set(x, y, z);
  }

  public set_anchor_vs_second_element(x: number, y: number, z: number): void {
    this.anchor.set(x, y, z);
  }

  public set_axis_dir_global(x: number, y: number, z: number, axis: number): void {
    this.axisDirections.set(axis, MockVector.create(x, y, z));
  }

  public set_axis_dir_vs_first_element(x: number, y: number, z: number, axis: number): void {
    this.axisDirections.set(axis, MockVector.create(x, y, z));
  }

  public set_axis_dir_vs_second_element(x: number, y: number, z: number, axis: number): void {
    this.axisDirections.set(axis, MockVector.create(x, y, z));
  }

  public set_axis_spring_dumping_factors(spring: number, damping: number, axis: number): void {
    this.axisSpringDamping.set(axis, [spring, damping]);
  }

  public set_joint_spring_dumping_factors(spring: number, damping: number): void {
    this.jointSpringDamping = [spring, damping];
  }

  public set_limits(min: number, max: number, axis: number): void {
    this.angleLimits.set(axis, [min, max]);
  }

  public set_max_force_and_velocity(force: number, velocity: number, axis: number): void {
    this.forceVelocityLimits.set(axis, [force, velocity]);
  }
}
