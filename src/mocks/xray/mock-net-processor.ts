import { type net_packet, type reader, type TXR_net_processor, type vector } from "xray16";

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
export class MockNetProcessor implements reader {
  public static create(dataList: Array<unknown> = []): MockNetProcessor {
    return new MockNetProcessor(dataList);
  }

  public static mock(): TXR_net_processor {
    return new MockNetProcessor();
  }

  public static mockNetPacket(): net_packet {
    return new MockNetProcessor() as unknown as net_packet;
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

  public r_angle16(): number {
    return this.read<number>(EMockPacketDataType.F32);
  }

  public r_angle8(): number {
    return this.read<number>(EMockPacketDataType.F32);
  }

  public r_float_q16<T extends number>(_: T, _max: T): T {
    return this.read<T>(EMockPacketDataType.F32);
  }

  public r_float_q8<T extends number>(_: T, _max: T): T {
    return this.read<T>(EMockPacketDataType.F32);
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

  public w_stringZ(data: string): void {
    this.writeDataOrder.push(EMockPacketDataType.STRING);
    this.dataList.push(data);
  }

  public w_u16(data: number): void {
    this.writeDataOrder.push(EMockPacketDataType.U16);
    this.dataList.push(data);
  }

  public w_u32(data: number): void {
    this.writeDataOrder.push(EMockPacketDataType.U32);
    this.dataList.push(data === -1 ? MAX_U32 : data);
  }

  public w_s32(data: number): void {
    this.writeDataOrder.push(EMockPacketDataType.I32);
    this.dataList.push(data);
  }

  public w_u8(data: number): void {
    this.writeDataOrder.push(EMockPacketDataType.U8);
    this.dataList.push(data);
  }

  public w_float(data: number): void {
    this.writeDataOrder.push(EMockPacketDataType.F32);
    this.dataList.push(data);
  }

  public w_bool(data: boolean): void {
    this.writeDataOrder.push(EMockPacketDataType.BOOLEAN);
    this.dataList.push(data);
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

  public asNetReader(): reader {
    return this;
  }

  public asNetPacket(): net_packet {
    return this as unknown as net_packet;
  }

  public asNetProcessor(): net_packet {
    return this as unknown as net_packet;
  }
}
