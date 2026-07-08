import { describe, expect, it, jest } from "@jest/globals";
import { type GameObject } from "xray16/alias";

import { MockGameObject, MockVector } from "../../mocks";

import { setObjectLookAtAnotherObject } from "./object-set";

describe("setObjectLookAtAnotherObject", () => {
  it("should correctly look at another object", () => {
    const first: GameObject = MockGameObject.mock();
    const second: GameObject = MockGameObject.mock();

    setObjectLookAtAnotherObject(first, second);
    expect(first.set_sight).toHaveBeenNthCalledWith(1, 2, { x: 0, y: 0, z: 0 }, 0);

    jest.mocked(first.position).mockImplementation(() => MockVector.mock(16, 4, 2));
    jest.mocked(second.position).mockImplementation(() => MockVector.mock(2, 4, 16));

    setObjectLookAtAnotherObject(first, second);
    expect(first.set_sight).toHaveBeenNthCalledWith(2, 2, { x: -14, y: 0, z: 14 }, 0);
  });
});
