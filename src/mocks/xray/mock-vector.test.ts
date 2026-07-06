import { MockVector } from "./mock-vector";

describe("MockVector", () => {
  it("should set and create component values", () => {
    const vector = MockVector.create(1, 2, 3);

    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  it("should add and subtract vectors", () => {
    const sum = new MockVector().add(MockVector.create(1, 2, 3), MockVector.create(4, 5, 6));

    expect([sum.x, sum.y, sum.z]).toEqual([5, 7, 9]);

    const diff = new MockVector().sub(MockVector.create(5, 7, 9), MockVector.create(1, 2, 3));

    expect([diff.x, diff.y, diff.z]).toEqual([4, 5, 6]);
  });

  it("should compute dot product and magnitude", () => {
    expect(MockVector.create(1, 2, 3).dotproduct(MockVector.create(4, 5, 6))).toBe(32);
    expect(MockVector.create(3, 4, 0).magnitude()).toBe(5);
  });

  it("should return the mocked distance", () => {
    expect(MockVector.create().distance_to()).toBe(MockVector.DEFAULT_DISTANCE);
    expect(MockVector.create().distance_to_sqr()).toBe(MockVector.DEFAULT_DISTANCE ** 2);
  });
});
