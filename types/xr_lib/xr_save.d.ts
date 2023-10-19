declare module "xray16" {
  /**
   * @source C++ class ClientID
   * @customConstructor ClientID
   * @group xr_save
   */
  export class ClientID extends EngineBinding {
    protected constructor();

    public value(): u32;
    public set(value: u32): void;
  }

  /**
   * @source C++ class net_packet
   * @customConstructor net_packet
   * @group xr_save
   */
  export class net_packet {
    public r_advance(value: u32): void;

    public r_angle16(value: f32): void;

    public r_angle8(value: f32): void;

    public r_begin(value: u16): u32;

    public r_bool(): boolean;

    public r_clientID(): ClientID;

    public r_dir(vector: vector): void;

    public r_elapsed(): u32;

    public r_eof(): boolean;

    public r_float(): f32;

    public r_float(value: f32): f32;

    public r_float_q16(value1: f32, value2: f32, value3: f32): f32;

    public r_float_q8(value1: f32, value2: f32, value3: f32): f32;

    public r_matrix(matrix: matrix): matrix;

    public r_s16(): i16;

    public r_s16(value: u16): u16;

    public r_s32(): i32;

    public r_s32(value: i32): i32;

    public r_s64(): i64;

    public r_s64(value: i64): i64;

    public r_s8(): i8;

    public r_s8(value: i8): i8;

    public r_sdir(vector: vector): void;

    public r_seek(value: u32): void;

    public r_stringZ<T extends string = string>(): T;

    public r_tell(): u32;

    public r_u16(): u16;

    public r_u16(value: u16): u16;

    public r_u32(): u32;

    public r_u32(value: u32): u32;

    public r_u64(): u64;

    public r_u64(value: u64): u64;

    public r_u8(): u8;

    public r_u8(value: u8): u8;

    public r_vec3(vector: vector): void;

    public w_angle16(value: f32): void;

    public w_angle8(value: f32): void;

    public w_begin(value: u16): void;

    public w_bool(value: boolean): void;

    public w_chunk_close16(value: u32): void;

    public w_chunk_close8(value: u32): void;

    public w_chunk_open16(value: u32): void;

    public w_chunk_open8(value: u32): void;

    public w_clientID(ClientID: ClientID): void;

    public w_dir(vector: vector): void;

    public w_float(value: f32): void;

    public w_float_q16(value1: f32, value2: f32, value3: f32): void;

    public w_float_q8(value1: f32, value2: f32, value3: f32): void;

    public w_matrix(matrix: matrix): void;

    public w_s16(value: i16): void;

    public w_s32(value: i32): void;

    public w_s64(value: i64): void;

    public w_sdir(vector: vector): void;

    public w_stringZ(value: string | null): void;

    public w_tell(): u32;

    public w_u16(value: u16): void;

    public w_u32(value: u32): void;

    public w_u64(value: u64): void;

    public w_u8(value: u8): void;

    public w_vec3(vector: vector): void;
  }

  /**
   * @source C++ class reader
   * @customConstructor reader
   * @group xr_save
   */
  export class reader {
    public r_advance(value: u64): void;

    public r_elapsed(): i64;

    public r_eof(): boolean;

    public r_sdir(vector: vector): void;

    public r_seek(value: u64): void;

    public r_tell(): u64;

    public r_dir(vector: vector): void;

    public r_vec3(vector: vector): void;

    public r_angle16(): f32;

    public r_angle8(): f32;

    public r_bool(): boolean;

    public r_stringZ<T extends string = string>(): T;

    public r_float<T extends f32>(value?: T): T;

    public r_float_q16<T extends f32>(value1: T, value2: T): T;

    public r_float_q8<T extends f32>(value1: T, value2: T): T;

    public r_s16<T extends i16 = i16>(value?: T): T;

    public r_s32<T extends i32 = i32>(value?: T): T;

    public r_s64<T extends i64 = i64>(value?: T): T;

    public r_s8<T extends i8 = i8>(value?: T): T;

    public r_u16<T extends u16 = u16>(value?: T): T;

    public r_u32<T extends u32 = u32>(value?: T): T;

    public r_u64<T extends u64 = u64>(value?: T): T;

    public r_u8<T extends u8 = u8>(value?: T): T;
  }

  /**
   * @group xr_save
   */
  export type TXR_net_processor = reader | net_packet;

  /**
   * @source C++ class CSavedGameWrapper
   * @customConstructor CSavedGameWrapper
   * @group xr_save
   */
  export class CSavedGameWrapper extends EngineBinding {
    public constructor(name: string);

    /**
     * @returns active level name from current save file
     */
    public level_name(): string;

    public level_id(): u8;

    public game_time(): CTime;

    public actor_health(): f32;
  }

  /**
   * @group xr_save
   */
  export function valid_saved_game(this: void, filename: string): boolean;
}
