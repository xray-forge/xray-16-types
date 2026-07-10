import { jest } from "@jest/globals";
import { type physics_shell } from "xray16";

import { MockPhysicsJoint } from "./mock-physics-joint";

/**
 * Mock of the X-Ray engine physics shell.
 */
export class MockPhysicsShell {
  public static create(): MockPhysicsShell {
    return new MockPhysicsShell();
  }

  public static mock(): physics_shell {
    return new MockPhysicsShell() as unknown as physics_shell;
  }

  public get_joint_by_bone_name = jest.fn((name: string) => new MockPhysicsJoint(name));

  public get_element_by_bone_name = jest.fn(() => null);
}
