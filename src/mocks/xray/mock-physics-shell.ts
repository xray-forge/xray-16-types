import { jest } from "@jest/globals";
import { type physics_element, type physics_joint, type physics_shell, type vector } from "xray16";

import { MockPhysicsElement } from "./mock-physics-element";
import { MockPhysicsJoint } from "./mock-physics-joint";
import { MockVector } from "./mock-vector";

/**
 * Mock of the X-Ray engine physics shell.
 */
export class MockPhysicsShell implements physics_shell {
  public static create(): MockPhysicsShell {
    return new MockPhysicsShell();
  }

  public static mock(): physics_shell {
    return new MockPhysicsShell();
  }

  public isBreakingBlocked: boolean = false;
  public isBreakable: boolean = false;
  public force: MockVector = MockVector.create();
  public angularVelocity: MockVector = MockVector.create();
  public linearVelocity: MockVector = MockVector.create();
  public elements: Array<physics_element> = [];
  public joints: Array<physics_joint> = [];
  public elementsByBoneId: Map<number, physics_element> = new Map();
  public elementsByBoneName: Map<string, physics_element> = new Map();
  public jointsByBoneId: Map<number, physics_joint> = new Map();
  public jointsByBoneName: Map<string, physics_joint> = new Map();

  public apply_force = jest.fn((x: number, y: number, z: number) => {
    this.force.set(x, y, z);
  });

  public block_breaking = jest.fn(() => {
    this.isBreakingBlocked = true;
  });

  public get_angular_vel = jest.fn((velocity: vector) => {
    velocity.set(this.angularVelocity);
  });

  public get_element_by_bone_id = jest.fn((id: number): physics_element => {
    const element = this.elementsByBoneId.get(id) ?? MockPhysicsElement.mock();

    this.elementsByBoneId.set(id, element);

    return element;
  });

  public get_element_by_bone_name = jest.fn((name: string): physics_element => {
    const element = this.elementsByBoneName.get(name) ?? MockPhysicsElement.mock();

    this.elementsByBoneName.set(name, element);

    return element;
  });

  public get_element_by_order = jest.fn((order: number): physics_element => {
    return this.elements[order] ?? MockPhysicsElement.mock();
  });

  public get_elements_number = jest.fn(() => this.elements.length);

  public get_joint_by_bone_id = jest.fn((id: number): physics_joint => {
    const joint = this.jointsByBoneId.get(id) ?? MockPhysicsJoint.mock(String(id));

    this.jointsByBoneId.set(id, joint);

    return joint;
  });

  public get_joint_by_bone_name = jest.fn((name: string): physics_joint => {
    const joint = this.jointsByBoneName.get(name) ?? MockPhysicsJoint.mock(name);

    this.jointsByBoneName.set(name, joint);

    return joint;
  });

  public get_joint_by_order = jest.fn((order: number): physics_joint => {
    return this.joints[order] ?? MockPhysicsJoint.mock(String(order));
  });

  public get_joints_number = jest.fn(() => this.joints.length);

  public get_linear_vel = jest.fn((velocity: vector) => {
    velocity.set(this.linearVelocity);
  });

  public is_breakable = jest.fn(() => this.isBreakable);

  public is_breaking_blocked = jest.fn(() => this.isBreakingBlocked);

  public unblock_breaking = jest.fn(() => {
    this.isBreakingBlocked = false;
  });
}
