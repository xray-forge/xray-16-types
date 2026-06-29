declare module "xray16" {
  /**
   * Rectangle with top-left and bottom-right points.
   *
   * @source C++ class Frect
   * @customConstructor Frect
   * @group xr_math
   */
  export class Frect extends EngineBinding {
    /**
     * Top-left corner.
     */
    public lt: vector2;

    /**
     * Bottom-right corner.
     */
    public rb: vector2;

    /**
     * Left edge.
     */
    public x1: f32;

    /**
     * Right edge.
     */
    public x2: f32;

    /**
     * Top edge.
     */
    public y1: f32;

    /**
     * Bottom edge.
     */
    public y2: f32;

    /**
     * Create an empty rectangle.
     */
    public constructor();

    /**
     * Set rectangle edges.
     *
     * @param x1 - Left edge.
     * @param y1 - Top edge.
     * @param x2 - Right edge.
     * @param y2 - Bottom edge.
     * @returns This rectangle.
     */
    public set(x1: f32, y1: f32, x2: f32, y2: f32): Frect;
  }

  /**
   * Axis-aligned 3D box.
   *
   * @source C++ class Fbox
   * @customConstructor Fbox
   * @group xr_math
   */
  export class Fbox {
    /**
     * Maximum corner.
     */
    public max: vector;

    /**
     * Minimum corner.
     */
    public min: vector;

    /**
     * Create an empty box.
     */
    public constructor();
  }

  /**
   * Heading/pitch rotation pair.
   *
   * @source C++ class rotation
   * @customConstructor rotation
   * @group xr_math
   */
  export class rotation {
    /**
     * Horizontal angle.
     */
    public yaw: f32;

    /**
     * Vertical angle.
     */
    public pitch: f32;
  }

  /**
   * Mutable 2D float vector.
   *
   * @source C++ class vector2
   * @customConstructor vector2
   * @group xr_math
   */
  export class vector2 {
    /**
     * X component.
     */
    public x: f32;

    /**
     * Y component.
     */
    public y: f32;

    /**
     * Create a zero vector.
     */
    public constructor();

    /**
     * Set components.
     *
     * @param x - X component.
     * @param y - Y component.
     * @returns This vector.
     */
    public set(x: f32, y: f32): vector2;

    /**
     * Copy another vector.
     *
     * @param vector - Source vector.
     * @returns This vector.
     */
    public set(vector: vector2): vector2;
  }

  /**
   * Mutable 3D float vector.
   *
   * Most operations mutate the receiver and return it for chaining.
   *
   * @source C++ class XR_vector
   * @customConstructor vector
   * @group xr_math
   */
  export class vector {
    /**
     * X component.
     */
    public x: f32;

    /**
     * Y component.
     */
    public y: f32;

    /**
     * Z component.
     */
    public z: f32;

    /**
     * Create a zero vector.
     */
    public constructor();

    /**
     * Set this vector to absolute component values of another vector.
     *
     * @param vector - Source vector.
     * @returns This vector.
     */
    public abs(vector: Readonly<vector>): vector;

    /**
     * Add a scalar to every component.
     *
     * @param value - Scalar value.
     * @returns This vector.
     */
    public add(value: f32): vector;

    /**
     * Set this vector to `left + right`.
     *
     * @param left - Left vector.
     * @param right - Right vector.
     * @returns This vector.
     */
    public add(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Add another vector.
     *
     * @param vector - Vector to add.
     * @returns This vector.
     */
    public add(vector: Readonly<vector>): vector;

    /**
     * Set this vector to `vector + value`.
     *
     * @param vector - Source vector.
     * @param value - Scalar value.
     * @returns This vector.
     */
    public add(vector: Readonly<vector>, value: f32): vector;

    /**
     * Snap components to the engine alignment grid.
     *
     * @returns This vector.
     */
    public align(): vector;

    /**
     * Set this vector to the midpoint between two vectors.
     *
     * @param left - First vector.
     * @param right - Second vector.
     * @returns This vector.
     */
    public average(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Move this vector halfway toward another vector.
     *
     * @param vector - Other vector.
     * @returns This vector.
     */
    public average(vector: Readonly<vector>): vector;

    /**
     * Clamp this vector between two bounds.
     *
     * @param min - Minimum components.
     * @param max - Maximum components.
     * @returns This vector.
     */
    public clamp(min: Readonly<vector>, max: Readonly<vector>): vector;

    /**
     * Clamp this vector to symmetric component bounds.
     *
     * @param vector - Bound vector.
     * @returns This vector.
     */
    public clamp(vector: Readonly<vector>): vector;

    /**
     * Set this vector to a cross product.
     *
     * @param left - Left vector.
     * @param right - Right vector.
     * @returns This vector.
     */
    public crossproduct(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Get 3D distance to another vector.
     *
     * @param vector - Target vector.
     * @returns Distance.
     */
    public distance_to(vector: Readonly<vector>): f32;

    /**
     * Get squared 3D distance to another vector.
     *
     * @param vector - Target vector.
     * @returns Squared distance.
     */
    public distance_to_sqr(vector: Readonly<vector>): f32;

    /**
     * Get distance to another vector on the XZ plane.
     *
     * @param vector - Target vector.
     * @returns XZ-plane distance.
     */
    public distance_to_xz(vector: Readonly<vector>): f32;

    /**
     * Divide every component by a scalar.
     *
     * @param value - Scalar divisor.
     * @returns This vector.
     */
    public div(value: f32): vector;

    /**
     * Set this vector to component-wise `left / right`.
     *
     * @param left - Left vector.
     * @param right - Right vector.
     * @returns This vector.
     */
    public div(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Divide this vector component-wise by another vector.
     *
     * @param vector - Divisor vector.
     * @returns This vector.
     */
    public div(vector: Readonly<vector>): vector;

    /**
     * Set this vector to `vector / value`.
     *
     * @param vector - Source vector.
     * @param value - Scalar divisor.
     * @returns This vector.
     */
    public div(vector: Readonly<vector>, value: f32): vector;

    /**
     * Get dot product with another vector.
     *
     * @param vector - Other vector.
     * @returns Dot product.
     */
    public dotproduct(vector: Readonly<vector>): f32;

    /**
     * Get heading angle for this direction vector.
     *
     * @returns Heading angle in radians.
     */
    public getH(): f32;

    /**
     * Get pitch angle for this direction vector.
     *
     * @returns Pitch angle in radians.
     */
    public getP(): f32;

    /**
     * Smooth this vector toward another vector.
     *
     * @param vector - Target vector.
     * @param value - Blend factor.
     * @returns This vector.
     */
    public inertion(vector: Readonly<vector>, value: f32): vector;

    /**
     * Negate this vector.
     *
     * @returns This vector.
     */
    public invert(): vector;

    /**
     * Set this vector to negated source vector.
     *
     * @param vector - Source vector.
     * @returns This vector.
     */
    public invert(vector: Readonly<vector>): vector;

    /**
     * Linearly interpolate between two vectors.
     *
     * @param from - Start vector.
     * @param to - End vector.
     * @param factor - Interpolation factor.
     * @returns This vector.
     */
    public lerp(from: Readonly<vector>, to: Readonly<vector>, factor: f32): vector;

    /**
     * Add two vectors and store the result.
     *
     * @param left - Left vector.
     * @param right - Right vector.
     * @returns This vector.
     */
    public mad(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Add a scaled vector and store the result.
     *
     * @param base - Base vector.
     * @param direction - Direction vector.
     * @param scale - Direction scale.
     * @returns This vector.
     */
    public mad(base: Readonly<vector>, direction: Readonly<vector>, scale: f32): vector;

    /**
     * Add two vectors component-wise and scale by a third vector.
     *
     * @param base - Base vector.
     * @param left - First multiplier vector.
     * @param right - Second multiplier vector.
     * @returns This vector.
     */
    public mad(base: Readonly<vector>, left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Add a scaled vector to this vector.
     *
     * @param vector - Vector to add.
     * @param scale - Vector scale.
     * @returns This vector.
     */
    public mad(vector: Readonly<vector>, scale: f32): vector;

    /**
     * Get vector length.
     *
     * @returns 3D vector magnitude.
     */
    public magnitude(): f32;

    /**
     * Set this vector to component-wise maximum of two vectors.
     *
     * @param left - First vector.
     * @param right - Second vector.
     * @returns This vector.
     */
    public max(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Clamp this vector upward by another vector.
     *
     * @param vector - Minimum components.
     * @returns This vector.
     */
    public max(vector: Readonly<vector>): vector;

    /**
     * Set this vector to component-wise minimum of two vectors.
     *
     * @param left - First vector.
     * @param right - Second vector.
     * @returns This vector.
     */
    public min(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Clamp this vector downward by another vector.
     *
     * @param vector - Maximum components.
     * @returns This vector.
     */
    public min(vector: Readonly<vector>): vector;

    /**
     * Multiply every component by a scalar.
     *
     * @param value - Scalar multiplier.
     * @returns This vector.
     */
    public mul(value: f32): vector;

    /**
     * Set this vector to component-wise `left * right`.
     *
     * @param left - Left vector.
     * @param right - Right vector.
     * @returns This vector.
     */
    public mul(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Multiply this vector component-wise by another vector.
     *
     * @param vector - Multiplier vector.
     * @returns This vector.
     */
    public mul(vector: Readonly<vector>): vector;

    /**
     * Set this vector to `vector * value`.
     *
     * @param vector - Source vector.
     * @param value - Scalar multiplier.
     * @returns This vector.
     */
    public mul(vector: Readonly<vector>, value: f32): vector;

    /**
     * Normalize this vector safely.
     *
     * @returns This vector.
     */
    public normalize(): vector;

    /**
     * Set this vector to normalized source vector safely.
     *
     * @param vector - Source vector.
     * @returns This vector.
     */
    public normalize(vector: Readonly<vector>): vector;

    /**
     * Normalize this vector safely.
     *
     * @returns This vector.
     */
    public normalize_safe(): vector;

    /**
     * Set this vector to normalized source vector safely.
     *
     * @param vector - Source vector.
     * @returns This vector.
     */
    public normalize_safe(vector: Readonly<vector>): vector;

    /**
     * Reflect a direction vector around a normal.
     *
     * @param direction - Incoming direction.
     * @param normal - Surface normal.
     * @returns This vector.
     */
    public reflect(direction: Readonly<vector>, normal: Readonly<vector>): vector;

    /**
     * Copy another vector.
     *
     * @param vector - Source vector.
     * @returns This vector.
     */
    public set(vector: Readonly<vector>): vector;

    /**
     * Set components.
     *
     * @param x - X component.
     * @param y - Y component.
     * @param z - Z component.
     * @returns This vector.
     */
    public set(x: f32, y: f32, z: f32): vector;

    /**
     * Set direction from heading and pitch.
     *
     * @param heading - Heading angle in radians.
     * @param pitch - Pitch angle in radians.
     * @returns This vector.
     */
    public setHP(heading: f32, pitch: f32): vector;

    /**
     * Change vector length while keeping direction.
     *
     * @param value - New length.
     * @returns This vector.
     */
    public set_length(value: f32): vector;

    /**
     * Compare vectors with tolerance.
     *
     * @param vector - Vector to compare.
     * @param epsilon - Allowed component difference.
     * @returns Whether vectors are similar.
     */
    public similar(vector: Readonly<vector>, epsilon: f32): boolean;

    /**
     * Slide a direction along a surface normal.
     *
     * @param direction - Direction vector.
     * @param normal - Surface normal.
     * @returns This vector.
     */
    public slide(direction: Readonly<vector>, normal: Readonly<vector>): vector;

    /**
     * Subtract a scalar from every component.
     *
     * @param value - Scalar value.
     * @returns This vector.
     */
    public sub(value: f32): vector;

    /**
     * Set this vector to `left - right`.
     *
     * @param left - Left vector.
     * @param right - Right vector.
     * @returns This vector.
     */
    public sub(left: Readonly<vector>, right: Readonly<vector>): vector;

    /**
     * Subtract another vector.
     *
     * @param vector - Vector to subtract.
     * @returns This vector.
     */
    public sub(vector: Readonly<vector>): vector;

    /**
     * Set this vector to `vector - value`.
     *
     * @param vector - Source vector.
     * @param value - Scalar value.
     * @returns This vector.
     */
    public sub(vector: Readonly<vector>, value: f32): vector;
  }

  /**
   * Patrol graph point with position and angle vectors.
   *
   * @source C++ class RPoint
   * @customConstructor RPoint
   * @group xr_math
   */
  export class RPoint {
    /**
     * Angle vector.
     */
    public A: vector;

    /**
     * Position vector.
     */
    public P: vector;

    /**
     * Create an empty patrol point.
     */
    public constructor();
  }

  /**
   * Mutable 4x4 transform matrix.
   *
   * Basis vectors are exposed as `i`, `j`, `k`; translation is exposed as `c`.
   *
   * @source C++ class matrix
   * @customConstructor matrix
   * @group xr_math
   */
  export class matrix {
    /**
     * First row fourth component.
     */
    public _14_: f32;

    /**
     * Second row fourth component.
     */
    public _24_: f32;

    /**
     * Third row fourth component.
     */
    public _34_: f32;

    /**
     * Fourth row fourth component.
     */
    public _44_: f32;

    /**
     * Translation vector.
     */
    public c: vector;

    /**
     * X basis vector.
     */
    public i: vector;

    /**
     * Y basis vector.
     */
    public j: vector;

    /**
     * Z basis vector.
     */
    public k: vector;

    /**
     * Create an empty matrix.
     */
    public constructor();

    /**
     * Build transform from quaternion and translation.
     *
     * @param rotation - Quaternion value.
     * @param position - Translation vector.
     * @returns This matrix.
     */
    public mk_xform(rotation: unknown /* _quaternion<float> */, position: vector): matrix;

    /**
     * Copy another matrix.
     *
     * @param value - Source matrix.
     * @returns This matrix.
     */
    public set(value: matrix): matrix;

    /**
     * Set basis and translation vectors.
     *
     * @param i - X basis vector.
     * @param j - Y basis vector.
     * @param k - Z basis vector.
     * @param c - Translation vector.
     * @returns This matrix.
     */
    public set(i: vector, j: vector, k: vector, c: vector): matrix;

    /**
     * Set this matrix to `value / divisor`.
     *
     * @param value - Source matrix.
     * @param divisor - Scalar divisor.
     * @returns This matrix.
     */
    public div(value: matrix, divisor: f32): matrix;

    /**
     * Divide this matrix by a scalar.
     *
     * @param divisor - Scalar divisor.
     * @returns This matrix.
     */
    public div(divisor: f32): matrix;

    /**
     * Set this matrix to identity.
     *
     * @returns This matrix.
     */
    public identity(): matrix;

    /**
     * Set rotation from heading, pitch, and bank angles.
     *
     * @param heading - Heading angle in radians.
     * @param pitch - Pitch angle in radians.
     * @param bank - Bank angle in radians.
     * @returns This matrix.
     */
    public setHPB(heading: f32, pitch: f32, bank: f32): matrix;

    /**
     * Set rotation from XYZ Euler angles.
     *
     * @param x - X rotation in radians.
     * @param y - Y rotation in radians.
     * @param z - Z rotation in radians.
     * @returns This matrix.
     */
    public setXYZ(x: f32, y: f32, z: f32): matrix;

    /**
     * Get heading, pitch, and bank from this matrix.
     *
     * @param value - Placeholder kept for existing declaration compatibility.
     * @param heading - Heading output placeholder.
     * @param pitch - Pitch output placeholder.
     * @param bank - Bank output placeholder.
     * @returns This matrix.
     */
    public getHPB(value: matrix, heading: f32, pitch: f32, bank: f32): matrix;

    /**
     * Set this matrix to `left * right`.
     *
     * @param left - Left matrix.
     * @param right - Right matrix.
     * @returns This matrix.
     */
    public mul(left: matrix, right: matrix): matrix;

    /**
     * Set this matrix to `value * multiplier`.
     *
     * @param value - Source matrix.
     * @param multiplier - Scalar multiplier.
     * @returns This matrix.
     */
    public mul(value: matrix, multiplier: f32): matrix;

    /**
     * Multiply this matrix by a scalar.
     *
     * @param multiplier - Scalar multiplier.
     * @returns This matrix.
     */
    public mul(multiplier: f32): matrix;

    /**
     * Set inverse XYZ rotation from Euler angles.
     *
     * @param x - X rotation in radians.
     * @param y - Y rotation in radians.
     * @param z - Z rotation in radians.
     * @returns This matrix.
     */
    public setXYZi(x: f32, y: f32, z: f32): matrix;
  }
}
