import { type physics_joint } from "xray16";

/**
 * Mock of the X-Ray engine physics joint.
 */
export class MockPhysicsJoint {
  public static create(name: string): MockPhysicsJoint {
    return new MockPhysicsJoint(name);
  }

  public static mock(name: string): physics_joint {
    return new MockPhysicsJoint(name) as unknown as physics_joint;
  }

  public name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public get_limits(min: number, max: number): LuaMultiReturn<[number, number]> {
    return $multi(min, max);
  }

  public get_axis_angle(angle: number): number {
    return angle;
  }

  public set_max_force_and_velocity(): void {}
}
