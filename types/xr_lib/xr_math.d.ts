declare module "xray16" {
  /**
   * Frame rectangle.
   * Describing x1, y1 top left start point and x2, y2 bottom right end point.
   *
   * @source C++ class Frect
   * @customConstructor Frect
   * @group xr_math
   */
  export class Frect extends EngineBinding {
    public lt: vector2;
    public rb: vector2;

    public x1: f32;
    public x2: f32;
    public y1: f32;
    public y2: f32;

    public set(x1: f32, y1: f32, x2: f32, y2: f32): Frect;
  }

  /**
   * @source C++ class Fbox
   * @customConstructor Fbox
   * @group xr_math
   */
  export class Fbox {
    public max: vector;
    public min: vector;

    public constructor();
  }

  /**
   * @source C++ class rotation
   * @customConstructor rotation
   * @group xr_math
   */
  export class rotation {
    public yaw: f32;
    public pitch: f32;
  }

  /**
   * @source C++ class vector2
   * @customConstructor vector2
   * @group xr_math
   */
  export class vector2 {
    public x: f32;
    public y: f32;

    public set(x: f32, y: f32): vector2;

    public set(vector: vector2): vector2;
  }

  /**
   * @source C++ class XR_vector
   * @customConstructor vector
   * @group xr_math
   */
  export class vector {
    public x: f32;
    public y: f32;
    public z: f32;

    public abs(vector: Readonly<vector>): vector;

    public add(val: f32): vector;

    public add(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public add(vector: Readonly<vector>): vector;

    public add(vector: Readonly<vector>, val: f32): vector;

    public align(): vector;

    public average(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public average(vector: Readonly<vector>): vector;

    public clamp(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public clamp(vector: Readonly<vector>): vector;

    public crossproduct(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public distance_to(vector: Readonly<vector>): f32;

    public distance_to_sqr(vector: Readonly<vector>): f32;

    public distance_to_xz(vector: Readonly<vector>): f32;

    public div(val: f32): vector;

    public div(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public div(vector: Readonly<vector>): vector;

    public div(vector: Readonly<vector>, val: f32): vector;

    public dotproduct(vector: Readonly<vector>): f32;

    public getH(): f32;

    public getP(): f32;

    public inertion(vector: Readonly<vector>, val: f32): vector;

    public invert(): vector;

    public invert(vector: Readonly<vector>): vector;

    public lerp(vector1: Readonly<vector>, vector2: Readonly<vector>, val: f32): vector;

    public mad(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public mad(vector1: Readonly<vector>, vector2: Readonly<vector>, val: f32): vector;

    public mad(vector1: Readonly<vector>, vector2: Readonly<vector>, vector3: Readonly<vector>): vector;

    public mad(vector: Readonly<vector>, val: f32): vector;

    public magnitude(): f32;

    public max(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public max(vector: Readonly<vector>): vector;

    public min(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public min(vector: Readonly<vector>): vector;

    public mul(val: f32): vector;

    public mul(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public mul(vector: Readonly<vector>): vector;

    public mul(vector: Readonly<vector>, val: f32): vector;

    public normalize(): vector;

    public normalize(vector: Readonly<vector>): vector;

    public normalize_safe(): vector;

    public normalize_safe(vector: Readonly<vector>): vector;

    public reflect(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public set(vector: Readonly<vector>): vector;

    public set(x: f32, y: f32, z: f32): vector;

    public setHP(val1: f32, val2: f32): vector;

    public set_length(val: f32): vector;

    public similar(vector: Readonly<vector>, val: f32): boolean;

    public slide(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public sub(val: f32): vector;

    public sub(vector1: Readonly<vector>, vector2: Readonly<vector>): vector;

    public sub(vector: Readonly<vector>): vector;

    public sub(vector: Readonly<vector>, val: f32): vector;
  }

  /**
   * @source C++ class RPoint
   * @customConstructor RPoint
   * @group xr_math
   */
  export class RPoint {
    public A: vector;
    public P: vector;

    public constructor();
  }

  /**
   * @source C++ class matrix
   * @customConstructor matrix
   * @group xr_math
   */
  export class matrix {
    public _14_: f32;
    public _24_: f32;
    public _34_: f32;
    public _44_: f32;
    public c: vector;
    public i: vector;
    public j: vector;
    public k: vector;

    public constructor();

    public mk_xform(x: unknown /* _quaternion<float> */, vector: vector): matrix;

    public set(matix: matrix): matrix;

    public set(vector1: vector, vector2: vector, vector3: vector, vector4: vector): matrix;

    public div(matix: matrix, number: f32): matrix;

    public div(number: f32): matrix;

    public identity(): matrix;

    public setHPB(number1: f32, number2: f32, number3: f32): matrix;

    public setXYZ(x: f32, y: f32, z: f32): matrix;

    public getHPB(matrix: matrix, number1: f32, number2: f32, number3: f32): matrix;

    public mul(matix1: matrix, matix2: matrix): matrix;

    public mul(matix: matrix, number: f32): matrix;

    public mul(number: f32): matrix;

    public setXYZi(number1: f32, number2: f32, number3: f32): matrix;
  }
}
