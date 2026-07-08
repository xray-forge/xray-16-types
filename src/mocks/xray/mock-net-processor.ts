import { type net_packet, type reader, type TXR_net_processor } from "xray16";

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
}

/**
 * X-Ray net processor mock for testing save/load of data.
 */
export class MockNetProcessor {
  public static mock(): TXR_net_processor {
    return new MockNetProcessor() as unknown as TXR_net_processor;
  }

  public static mockNetPacket(): net_packet {
    return new MockNetProcessor() as unknown as net_packet;
  }

  public static mockReader(): reader {
    return new MockNetProcessor() as unknown as reader;
  }

  public readDataOrder: Array<EMockPacketDataType> = [];
  public writeDataOrder: Array<EMockPacketDataType> = [];

  public dataList: Array<unknown>;

  public constructor(dataList: Array<unknown> = []) {
    this.dataList = dataList;
  }

  public r_stringZ(): string {
    this.readDataOrder.push(EMockPacketDataType.STRING);

    if (this.hasData()) {
      return this.dataList.shift() as string;
    } else {
      throw new Error("Unexpected test mock read.");
    }
  }

  public r_float(): number {
    this.readDataOrder.push(EMockPacketDataType.F32);

    if (this.hasData()) {
      return this.dataList.shift() as number;
    } else {
      throw new Error("Unexpected test mock read.");
    }
  }

  public r_u32(): number {
    this.readDataOrder.push(EMockPacketDataType.U32);

    if (this.hasData()) {
      return this.dataList.shift() as number;
    } else {
      throw new Error("Unexpected test mock read.");
    }
  }

  public r_s32(): number {
    this.readDataOrder.push(EMockPacketDataType.I32);

    if (this.hasData()) {
      return this.dataList.shift() as number;
    } else {
      throw new Error("Unexpected test mock read.");
    }
  }

  public r_u16(): number {
    this.readDataOrder.push(EMockPacketDataType.U16);

    if (this.hasData()) {
      return this.dataList.shift() as number;
    } else {
      throw new Error("Unexpected test mock read.");
    }
  }

  public r_u8(): number {
    this.readDataOrder.push(EMockPacketDataType.U8);

    if (this.hasData()) {
      return this.dataList.shift() as number;
    } else {
      throw new Error("Unexpected test mock read.");
    }
  }

  public r_bool(): boolean {
    this.readDataOrder.push(EMockPacketDataType.BOOLEAN);

    if (this.hasData()) {
      return this.dataList.shift() as boolean;
    } else {
      throw new Error("Unexpected test mock read.");
    }
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

  public hasData(): boolean {
    return this.dataList.length > 0;
  }

  public asNetReader(): reader {
    return this as unknown as reader;
  }

  public asNetPacket(): net_packet {
    return this as unknown as net_packet;
  }

  public asNetProcessor(): net_packet {
    return this as unknown as net_packet;
  }
}
