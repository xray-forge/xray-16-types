import { type ClientID, type matrix, type net_packet, type reader, type TXR_net_processor, type vector } from "xray16";

const MAX_U32: number = 4_294_967_295;

/**
 * Data types that can be saved in net packets (game save files).
 */
export enum EMockPacketDataType {
  STRING = "string",
  BOOLEAN = "boolean",
  F32 = "f32",
  I16 = "i16",
  I32 = "i32",
  I8 = "i8",
  U16 = "u16",
  U32 = "u32",
  U8 = "u8",
  VECTOR = "vector",
}

/**
 * X-Ray net processor mock for testing save/load of data.
 */
export class MockNetProcessor implements reader, net_packet {
  public static create(dataList: Array<unknown> = []): MockNetProcessor {
    return new MockNetProcessor(dataList);
  }

  public static mock(): TXR_net_processor {
    return new MockNetProcessor();
  }

  public static mockNetPacket(): net_packet {
    return new MockNetProcessor();
  }

  public static mockReader(): reader {
    return new MockNetProcessor();
  }

  public readDataOrder: Array<EMockPacketDataType> = [];
  public writeDataOrder: Array<EMockPacketDataType> = [];

  public dataList: Array<unknown>;

  public constructor(dataList: Array<unknown> = []) {
    this.dataList = dataList;
  }

  private read<T>(type: EMockPacketDataType): T {
    this.readDataOrder.push(type);

    if (!this.hasData()) {
      throw new Error("Unexpected test mock read.");
    }

    return this.dataList.shift() as T;
  }

  public r_stringZ<T extends string = string>(): T {
    return this.read<T>(EMockPacketDataType.STRING);
  }

  public r_float<T extends number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.F32);
  }

  public r_u32<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.U32);
  }

  public r_s32<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.I32);
  }

  public r_u16<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.U16);
  }

  public r_u8<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.U8);
  }

  public r_bool(): boolean {
    return this.read<boolean>(EMockPacketDataType.BOOLEAN);
  }

  public r_advance(size: number): void {
    this.dataList.splice(0, size);
  }

  public r_begin(_type: number): number {
    return 0;
  }

  public r_clientID(): ClientID {
    return this.read<ClientID>(EMockPacketDataType.U32);
  }

  public r_sdir(vector: vector): void {
    vector.set(this.read<vector>(EMockPacketDataType.VECTOR));
  }

  public r_seek(_offset: number): void {}

  public r_dir(vector: vector): void {
    vector.set(this.read<vector>(EMockPacketDataType.VECTOR));
  }

  public r_vec3(vector: vector): void {
    vector.set(this.read<vector>(EMockPacketDataType.VECTOR));
  }

  public r_angle16(): number;
  public r_angle16(value: number): void;
  public r_angle16(value?: number): number | void {
    const angle: number = this.read<number>(EMockPacketDataType.F32);

    if (value === undefined) {
      return angle;
    }
  }

  public r_angle8(): number;
  public r_angle8(value: number): void;
  public r_angle8(value?: number): number | void {
    const angle: number = this.read<number>(EMockPacketDataType.F32);

    if (value === undefined) {
      return angle;
    }
  }

  public r_float_q16<T extends number>(_: T, _max: T): T {
    return this.read<T>(EMockPacketDataType.F32);
  }

  public r_float_q8<T extends number>(_: T, _max: T): T {
    return this.read<T>(EMockPacketDataType.F32);
  }

  public r_matrix(matrix: matrix): matrix {
    return this.read<matrix>(EMockPacketDataType.VECTOR) ?? matrix;
  }

  public r_s16<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.I16);
  }

  public r_s64<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.I32);
  }

  public r_s8<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.I8);
  }

  public r_u64<T extends number = number>(_: T | undefined = undefined): T {
    return this.read<T>(EMockPacketDataType.U32);
  }

  public w_angle16(value: number): void {
    this.write(EMockPacketDataType.F32, value);
  }

  public w_angle8(value: number): void {
    this.write(EMockPacketDataType.F32, value);
  }

  public w_begin(type: number): void {
    this.dataList = [];
    this.writeDataOrder = [];
    this.write(EMockPacketDataType.U16, type);
  }

  public w_chunk_close16(_marker: number): void {}

  public w_chunk_close8(_marker: number): void {}

  public w_chunk_open16(_marker: number): void {}

  public w_chunk_open8(_marker: number): void {}

  public w_clientID(clientId: ClientID): void {
    this.write(EMockPacketDataType.U32, clientId);
  }

  public w_dir(vector: vector): void {
    this.write(EMockPacketDataType.VECTOR, vector);
  }

  public w_float_q16(value: number, _min: number, _max: number): void {
    this.write(EMockPacketDataType.F32, value);
  }

  public w_float_q8(value: number, _min: number, _max: number): void {
    this.write(EMockPacketDataType.F32, value);
  }

  public w_matrix(matrix: matrix): void {
    this.write(EMockPacketDataType.VECTOR, matrix);
  }

  public w_s16(value: number): void {
    this.write(EMockPacketDataType.I16, value);
  }

  public w_s64(value: number): void {
    this.write(EMockPacketDataType.I32, value);
  }

  public w_sdir(vector: vector): void {
    this.write(EMockPacketDataType.VECTOR, vector);
  }

  public w_u64(value: number): void {
    this.write(EMockPacketDataType.U32, value);
  }

  public w_vec3(vector: vector): void {
    this.write(EMockPacketDataType.VECTOR, vector);
  }

  public w_stringZ(data: string): void {
    this.write(EMockPacketDataType.STRING, data);
  }

  public w_u16(data: number): void {
    this.write(EMockPacketDataType.U16, data);
  }

  public w_u32(data: number): void {
    this.write(EMockPacketDataType.U32, data === -1 ? MAX_U32 : data);
  }

  public w_s32(data: number): void {
    this.write(EMockPacketDataType.I32, data);
  }

  public w_u8(data: number): void {
    this.write(EMockPacketDataType.U8, data);
  }

  public w_float(data: number): void {
    this.write(EMockPacketDataType.F32, data);
  }

  public w_bool(data: boolean): void {
    this.write(EMockPacketDataType.BOOLEAN, data);
  }

  public w_tell(): number {
    return this.writeDataOrder.length;
  }

  public r_tell(): number {
    return this.readDataOrder.length;
  }

  public r_elapsed(): number {
    return this.dataList.length;
  }

  public r_eof(): boolean {
    return !this.hasData();
  }

  public hasData(): boolean {
    return this.dataList.length > 0;
  }

  private write(type: EMockPacketDataType, data: unknown): void {
    this.writeDataOrder.push(type);
    this.dataList.push(data);
  }

  public asNetReader(): reader {
    return this;
  }

  public asNetPacket(): net_packet {
    return this;
  }

  public asNetProcessor(): net_packet {
    return this;
  }
}
