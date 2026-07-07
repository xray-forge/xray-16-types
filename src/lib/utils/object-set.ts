import { CSightParams } from "xray16";
import { type GameObject } from "xray16/alias";

import { copyVector } from "./vector";

/**
 * Point one object's sight direction at another object's current position.
 *
 * @param object - Object whose sight direction is updated.
 * @param target - Object to look at.
 */
export function setObjectLookAtAnotherObject(object: GameObject, target: GameObject): void {
  object.set_sight(CSightParams.eSightTypeDirection, copyVector(target.position().sub(object.position())), 0);
}
