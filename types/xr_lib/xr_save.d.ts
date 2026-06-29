declare module "xray16" {
  /**
   * Network client identifier.
   *
   * @source C++ class ClientID
   * @customConstructor ClientID
   * @group xr_save
   */
  export class ClientID extends EngineBinding {
    /** Create an empty client id. */
    public constructor();

    /**
     * Get raw client id value.
     *
     * @returns Client id value.
     */
    public value(): u32;

    /**
     * Set raw client id value.
     *
     * @param value - Client id value.
     */
    public set(value: u32): void;
  }

  /**
   * Read/write network packet used by server entities and events.
   *
   * Reading methods advance the read cursor. Writing methods append to the packet unless the method name says
   * otherwise.
   *
   * @source C++ class net_packet
   * @customConstructor net_packet
   * @group xr_save
   */
  export class net_packet {
    /** Create an empty packet. */
    public constructor();

    /**
     * Advance the read cursor.
     *
     * @param size - Number of bytes to skip.
     */
    public r_advance(size: u32): void;

    /**
     * Read a 16-bit compressed angle into a placeholder.
     *
     * @param value - Output placeholder.
     */
    public r_angle16(value: f32): void;

    /**
     * Read an 8-bit compressed angle into a placeholder.
     *
     * @param value - Output placeholder.
     */
    public r_angle8(value: f32): void;

    /**
     * Read packet message header.
     *
     * @param type - Output placeholder for message type.
     * @returns Packet payload size.
     */
    public r_begin(type: u16): u32;

    /**
     * Read boolean value.
     *
     * @returns Boolean value.
     */
    public r_bool(): boolean;

    /**
     * Read client id.
     *
     * @returns Client id.
     */
    public r_clientID(): ClientID;

    /**
     * Read a compressed direction vector.
     *
     * @param vector - Vector to fill.
     */
    public r_dir(vector: vector): void;

    /**
     * Get unread byte count.
     *
     * @returns Remaining bytes.
     */
    public r_elapsed(): u32;

    /**
     * Check whether the read cursor reached the end.
     *
     * @returns Whether packet is fully read.
     */
    public r_eof(): boolean;

    /**
     * Read float value.
     *
     * @returns Float value.
     */
    public r_float(): f32;

    /**
     * Read float value through a Lua-style placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Float value.
     */
    public r_float(value: f32): f32;

    /**
     * Read a 16-bit quantized float.
     *
     * @param min - Minimum decoded value.
     * @param max - Maximum decoded value.
     * @param value - Placeholder value.
     * @returns Decoded float.
     */
    public r_float_q16(min: f32, max: f32, value: f32): f32;

    /**
     * Read an 8-bit quantized float.
     *
     * @param min - Minimum decoded value.
     * @param max - Maximum decoded value.
     * @param value - Placeholder value.
     * @returns Decoded float.
     */
    public r_float_q8(min: f32, max: f32, value: f32): f32;

    /**
     * Read matrix data.
     *
     * @param matrix - Matrix to fill.
     * @returns Filled matrix.
     */
    public r_matrix(matrix: matrix): matrix;

    /**
     * Read signed 16-bit integer.
     *
     * @returns Signed 16-bit integer.
     */
    public r_s16(): i16;

    /**
     * Read signed 16-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Signed 16-bit integer.
     */
    public r_s16(value: u16): u16;

    /**
     * Read signed 32-bit integer.
     *
     * @returns Signed 32-bit integer.
     */
    public r_s32(): i32;

    /**
     * Read signed 32-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Signed 32-bit integer.
     */
    public r_s32(value: i32): i32;

    /**
     * Read signed 64-bit integer.
     *
     * @returns Signed 64-bit integer.
     */
    public r_s64(): i64;

    /**
     * Read signed 64-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Signed 64-bit integer.
     */
    public r_s64(value: i64): i64;

    /**
     * Read signed 8-bit integer.
     *
     * @returns Signed 8-bit integer.
     */
    public r_s8(): i8;

    /**
     * Read signed 8-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Signed 8-bit integer.
     */
    public r_s8(value: i8): i8;

    /**
     * Read a signed compressed direction vector.
     *
     * @param vector - Vector to fill.
     */
    public r_sdir(vector: vector): void;

    /**
     * Move read cursor to an absolute byte offset.
     *
     * @param offset - Byte offset.
     */
    public r_seek(offset: u32): void;

    /**
     * Read zero-terminated string.
     *
     * @returns String value.
     */
    public r_stringZ<T extends string = string>(): T;

    /**
     * Get current read cursor offset.
     *
     * @returns Byte offset.
     */
    public r_tell(): u32;

    /**
     * Read unsigned 16-bit integer.
     *
     * @returns Unsigned 16-bit integer.
     */
    public r_u16(): u16;

    /**
     * Read unsigned 16-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Unsigned 16-bit integer.
     */
    public r_u16(value: u16): u16;

    /**
     * Read unsigned 32-bit integer.
     *
     * @returns Unsigned 32-bit integer.
     */
    public r_u32(): u32;

    /**
     * Read unsigned 32-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Unsigned 32-bit integer.
     */
    public r_u32(value: u32): u32;

    /**
     * Read unsigned 64-bit integer.
     *
     * @returns Unsigned 64-bit integer.
     */
    public r_u64(): u64;

    /**
     * Read unsigned 64-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Unsigned 64-bit integer.
     */
    public r_u64(value: u64): u64;

    /**
     * Read unsigned 8-bit integer.
     *
     * @returns Unsigned 8-bit integer.
     */
    public r_u8(): u8;

    /**
     * Read unsigned 8-bit integer through a placeholder overload.
     *
     * @param value - Placeholder value.
     * @returns Unsigned 8-bit integer.
     */
    public r_u8(value: u8): u8;

    /**
     * Read 3D vector.
     *
     * @param vector - Vector to fill.
     */
    public r_vec3(vector: vector): void;

    /**
     * Write a 16-bit compressed angle.
     *
     * @param value - Angle in radians.
     */
    public w_angle16(value: f32): void;

    /**
     * Write an 8-bit compressed angle.
     *
     * @param value - Angle in radians.
     */
    public w_angle8(value: f32): void;

    /**
     * Start packet with message type.
     *
     * @param type - Message type.
     */
    public w_begin(type: u16): void;

    /**
     * Write boolean value.
     *
     * @param value - Boolean value.
     */
    public w_bool(value: boolean): void;

    /**
     * Close a 16-bit size-prefixed chunk.
     *
     * @param marker - Chunk marker returned by `w_chunk_open16`.
     */
    public w_chunk_close16(marker: u32): void;

    /**
     * Close an 8-bit size-prefixed chunk.
     *
     * @param marker - Chunk marker returned by `w_chunk_open8`.
     */
    public w_chunk_close8(marker: u32): void;

    /**
     * Open a 16-bit size-prefixed chunk.
     *
     * @param marker - Output placeholder for chunk marker.
     */
    public w_chunk_open16(marker: u32): void;

    /**
     * Open an 8-bit size-prefixed chunk.
     *
     * @param marker - Output placeholder for chunk marker.
     */
    public w_chunk_open8(marker: u32): void;

    /**
     * Write client id.
     *
     * @param client_id - Client id.
     */
    public w_clientID(client_id: ClientID): void;

    /**
     * Write compressed direction vector.
     *
     * @param vector - Direction vector.
     */
    public w_dir(vector: vector): void;

    /**
     * Write float value.
     *
     * @param value - Float value.
     */
    public w_float(value: f32): void;

    /**
     * Write a 16-bit quantized float.
     *
     * @param value - Value to write.
     * @param min - Minimum encoded value.
     * @param max - Maximum encoded value.
     */
    public w_float_q16(value: f32, min: f32, max: f32): void;

    /**
     * Write an 8-bit quantized float.
     *
     * @param value - Value to write.
     * @param min - Minimum encoded value.
     * @param max - Maximum encoded value.
     */
    public w_float_q8(value: f32, min: f32, max: f32): void;

    /**
     * Write matrix data.
     *
     * @param matrix - Matrix to write.
     */
    public w_matrix(matrix: matrix): void;

    /**
     * Write signed 16-bit integer.
     *
     * @param value - Signed 16-bit integer.
     */
    public w_s16(value: i16): void;

    /**
     * Write signed 32-bit integer.
     *
     * @param value - Signed 32-bit integer.
     */
    public w_s32(value: i32): void;

    /**
     * Write signed 64-bit integer.
     *
     * @param value - Signed 64-bit integer.
     */
    public w_s64(value: i64): void;

    /**
     * Write signed compressed direction vector.
     *
     * @param vector - Direction vector.
     */
    public w_sdir(vector: vector): void;

    /**
     * Write zero-terminated string.
     *
     * @param value - String value. `null` writes an empty value in existing scripts.
     */
    public w_stringZ(value: string | null): void;

    /**
     * Get current write cursor offset.
     *
     * @returns Byte offset.
     */
    public w_tell(): u32;

    /**
     * Write unsigned 16-bit integer.
     *
     * @param value - Unsigned 16-bit integer.
     */
    public w_u16(value: u16): void;

    /**
     * Write unsigned 32-bit integer.
     *
     * @param value - Unsigned 32-bit integer.
     */
    public w_u32(value: u32): void;

    /**
     * Write unsigned 64-bit integer.
     *
     * @param value - Unsigned 64-bit integer.
     */
    public w_u64(value: u64): void;

    /**
     * Write unsigned 8-bit integer.
     *
     * @param value - Unsigned 8-bit integer.
     */
    public w_u8(value: u8): void;

    /**
     * Write 3D vector.
     *
     * @param vector - Vector to write.
     */
    public w_vec3(vector: vector): void;
  }

  /**
   * Binary reader used for save data and chunk payloads.
   *
   * @source C++ class reader
   * @customConstructor reader
   * @group xr_save
   */
  export class reader {
    /**
     * Advance the read cursor.
     *
     * @param size - Number of bytes to skip.
     */
    public r_advance(size: u64): void;

    /**
     * Get unread byte count.
     *
     * @returns Remaining bytes.
     */
    public r_elapsed(): i64;

    /**
     * Check whether the reader cursor reached the end.
     *
     * @returns Whether reader is fully consumed.
     */
    public r_eof(): boolean;

    /**
     * Read signed compressed direction vector.
     *
     * @param vector - Vector to fill.
     */
    public r_sdir(vector: vector): void;

    /**
     * Move read cursor to an absolute byte offset.
     *
     * @param offset - Byte offset.
     */
    public r_seek(offset: u64): void;

    /**
     * Get current read cursor offset.
     *
     * @returns Byte offset.
     */
    public r_tell(): u64;

    /**
     * Read compressed direction vector.
     *
     * @param vector - Vector to fill.
     */
    public r_dir(vector: vector): void;

    /**
     * Read 3D vector.
     *
     * @param vector - Vector to fill.
     */
    public r_vec3(vector: vector): void;

    /**
     * Read a 16-bit compressed angle.
     *
     * @returns Angle in radians.
     */
    public r_angle16(): f32;

    /**
     * Read an 8-bit compressed angle.
     *
     * @returns Angle in radians.
     */
    public r_angle8(): f32;

    /**
     * Read boolean value.
     *
     * @returns Boolean value.
     */
    public r_bool(): boolean;

    /**
     * Read zero-terminated string.
     *
     * @returns String value.
     */
    public r_stringZ<T extends string = string>(): T;

    /**
     * Read float value.
     *
     * @param value - Optional placeholder value.
     * @returns Float value.
     */
    public r_float<T extends f32>(value?: T): T;

    /**
     * Read a 16-bit quantized float.
     *
     * @param min - Minimum decoded value.
     * @param max - Maximum decoded value.
     * @returns Decoded float.
     */
    public r_float_q16<T extends f32>(min: T, max: T): T;

    /**
     * Read an 8-bit quantized float.
     *
     * @param min - Minimum decoded value.
     * @param max - Maximum decoded value.
     * @returns Decoded float.
     */
    public r_float_q8<T extends f32>(min: T, max: T): T;

    /**
     * Read signed 16-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Signed 16-bit integer.
     */
    public r_s16<T extends i16 = i16>(value?: T): T;

    /**
     * Read signed 32-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Signed 32-bit integer.
     */
    public r_s32<T extends i32 = i32>(value?: T): T;

    /**
     * Read signed 64-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Signed 64-bit integer.
     */
    public r_s64<T extends i64 = i64>(value?: T): T;

    /**
     * Read signed 8-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Signed 8-bit integer.
     */
    public r_s8<T extends i8 = i8>(value?: T): T;

    /**
     * Read unsigned 16-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Unsigned 16-bit integer.
     */
    public r_u16<T extends u16 = u16>(value?: T): T;

    /**
     * Read unsigned 32-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Unsigned 32-bit integer.
     */
    public r_u32<T extends u32 = u32>(value?: T): T;

    /**
     * Read unsigned 64-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Unsigned 64-bit integer.
     */
    public r_u64<T extends u64 = u64>(value?: T): T;

    /**
     * Read unsigned 8-bit integer.
     *
     * @param value - Optional placeholder value.
     * @returns Unsigned 8-bit integer.
     */
    public r_u8<T extends u8 = u8>(value?: T): T;
  }

  /**
   * Any engine binary input accepted by save/network serializers.
   *
   * @group xr_save
   */
  export type TXR_net_processor = reader | net_packet;

  /**
   * Lightweight view over save-game metadata.
   *
   * @source C++ class CSavedGameWrapper
   * @customConstructor CSavedGameWrapper
   * @group xr_save
   */
  export class CSavedGameWrapper extends EngineBinding {
    /**
     * Open save-game metadata by save name.
     *
     * @param name - Save name without extension.
     */
    public constructor(name: string);

    /**
     * Get active level name stored in the save.
     *
     * @returns Level name, or an empty/error value when metadata cannot be resolved.
     */
    public level_name(): string;

    /**
     * Get active level id stored in the save.
     *
     * @returns Level id.
     */
    public level_id(): u8;

    /**
     * Get in-game time stored in the save.
     *
     * @returns Game time.
     */
    public game_time(): CTime;

    /**
     * Get actor health stored in the save.
     *
     * @returns Actor health.
     */
    public actor_health(): f32;
  }

  /**
   * Check whether a save exists and has a compatible header.
   *
   * @group xr_save
   *
   * @param filename - Save name without extension.
   * @returns Whether the save can be loaded by this engine.
   */
  export function valid_saved_game(this: void, filename: string): boolean;
}
