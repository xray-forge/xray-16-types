import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { game, level } from "xray16";
import { type Time } from "xray16/alias";

import { mockMarshal, MockCTime, EMockPacketDataType, MockNetProcessor } from "../../mocks";
import { mockMath } from "../../mocks/lua/mock-lua-math";
import { mockString } from "../../mocks/lua/mock-lua-string";
import { mockToString } from "../../mocks/lua/mock-lua-tostring";
import { MAX_I32, MAX_U8, MIN_I32 } from "../constants";
import { type Nillable } from "../types";

import {
  createTime,
  deserializeTime,
  gameTimeToString,
  globalTimeToString,
  hoursToWeatherPeriod,
  isInTimeInterval,
  readTimeFromPacket,
  serializeTime,
  toTimeDigit,
  writeTimeToPacket,
} from "./time";

// Time utils call the Lua `math` / `string` / `tostring` / `marshal` globals; provide the mocks first.
beforeAll(() => {
  (globalThis as Record<string, unknown>).math = mockMath;
  (globalThis as Record<string, unknown>).string = mockString;
  (globalThis as Record<string, unknown>).tostring = mockToString;
  (globalThis as Record<string, unknown>).marshal = mockMarshal;
});

describe("writeTimeToPacket and readTimeFromPacket", () => {
  it("should correctly save and load", () => {
    const processor: MockNetProcessor = new MockNetProcessor();
    const timeToWrite: Time = game.get_game_time();

    timeToWrite.set(2012, 6, 12, 3, 6, 12, 500);

    expect(timeToWrite.toString()).toBe("y:2012, m:6, d:12, h:3, min:6, sec:12, ms:500");

    writeTimeToPacket(processor.asNetPacket(), timeToWrite);

    expect(processor.dataList).toEqual([12, 6, 12, 3, 6, 12, 500]);
    expect(processor.writeDataOrder).toEqual([
      EMockPacketDataType.U8,
      EMockPacketDataType.U8,
      EMockPacketDataType.U8,
      EMockPacketDataType.U8,
      EMockPacketDataType.U8,
      EMockPacketDataType.U8,
      EMockPacketDataType.U16,
    ]);

    const timeToRead: Nillable<Time> = readTimeFromPacket(processor.asNetReader());

    expect(timeToRead).not.toBeNull();
    expect(timeToRead?.toString()).toBe("y:2012, m:6, d:12, h:3, min:6, sec:12, ms:500");

    expect(processor.dataList).toEqual([]);
    expect(processor.readDataOrder).toEqual(processor.writeDataOrder);
  });

  it("should handle nulls", () => {
    const processor: MockNetProcessor = new MockNetProcessor();

    writeTimeToPacket(processor.asNetPacket(), null);

    expect(processor.dataList).toEqual([MAX_U8]);
    expect(processor.writeDataOrder).toEqual([EMockPacketDataType.U8]);

    expect(readTimeFromPacket(processor.asNetReader())).toBeNull();

    expect(processor.dataList).toEqual([]);
    expect(processor.readDataOrder).toEqual(processor.writeDataOrder);
  });
});

describe("toTimeDigit", () => {
  it("should correctly convert time digits", () => {
    expect(toTimeDigit(0)).toBe("00");
    expect(toTimeDigit(1)).toBe("01");
    expect(toTimeDigit(9)).toBe("09");
    expect(toTimeDigit(10)).toBe("10");
    expect(toTimeDigit(16)).toBe("16");
    expect(toTimeDigit(20)).toBe("20");
  });
});

describe("createTime", () => {
  it("should create time object with provided date parts", () => {
    const time: Time = createTime(2015, 2, 15, 12, 45, 30, 250);

    expect(time.toString()).toBe(MockCTime.create(2015, 2, 15, 12, 45, 30, 250).toString());
  });
});

describe("gameTimeToString", () => {
  it("should correctly stringify game time", () => {
    expect(gameTimeToString(MockCTime.mock(2015, 2, 15, 12, 45, 30, 250))).toBe("12:45 02/15/2015");
    expect(gameTimeToString(MockCTime.mock(2004, 11, 1, 4, 5, 2, 20))).toBe("04:05 11/01/2004");
  });
});

describe("globalTimeToString", () => {
  it("should correctly stringify global time", () => {
    expect(globalTimeToString(3_600_000 * 3 + 4 * 60_000 + 5 * 1000)).toBe("3:04:05");
    expect(globalTimeToString(3_600_000 * 11 + 25 * 60_000 + 16 * 1000)).toBe("11:25:16");
  });
});

describe("isInTimeInterval", () => {
  it("should correctly check time intervals", () => {
    jest.mocked(level.get_time_hours).mockImplementation(() => 12);

    expect(isInTimeInterval(MIN_I32, 0)).toBeFalsy();
    expect(isInTimeInterval(0, 4)).toBeFalsy();
    expect(isInTimeInterval(4, 8)).toBeFalsy();
    expect(isInTimeInterval(8, 12)).toBeFalsy();
    expect(isInTimeInterval(12, 16)).toBeTruthy();
    expect(isInTimeInterval(16, 20)).toBeFalsy();
    expect(isInTimeInterval(20, 24)).toBeFalsy();
    expect(isInTimeInterval(24, MAX_I32)).toBeFalsy();
    expect(isInTimeInterval(24, 2)).toBeFalsy();
    expect(isInTimeInterval(22, 14)).toBeTruthy();
    expect(isInTimeInterval(20, 14)).toBeTruthy();

    expect(isInTimeInterval(12, 12)).toBeTruthy();
    expect(isInTimeInterval(11.5, 12.5)).toBeTruthy();
    expect(isInTimeInterval(MIN_I32, MAX_I32)).toBeTruthy();

    jest.mocked(level.get_time_hours).mockImplementation(() => 4);
    expect(isInTimeInterval(4, 4)).toBeTruthy();
    expect(isInTimeInterval(3.5, 4.5)).toBeTruthy();
    expect(isInTimeInterval(0, 4)).toBeFalsy();
    expect(isInTimeInterval(4, 5)).toBeTruthy();
  });
});

describe("serializeTime", () => {
  it("should correctly serialize", () => {
    expect(serializeTime(MockCTime.mock(2012, 6, 15, 12, 30, 10, 100))).toBe("[2012,6,15,12,30,10,100]");
    expect(serializeTime(MockCTime.mock(2016, 12, 10, 10, 1, 50, 500))).toBe("[2016,12,10,10,1,50,500]");
  });
});

describe("deserializeTime", () => {
  it("should correctly deserialize", () => {
    expect(deserializeTime("[2012,6,15,12,30,10,100]").toString()).toBe(
      MockCTime.create(2012, 6, 15, 12, 30, 10, 100).toString()
    );
    expect(deserializeTime("[2016,12,10,10,1,50,500]").toString()).toBe(
      MockCTime.create(2016, 12, 10, 10, 1, 50, 500).toString()
    );
  });
});

describe("hoursToWeatherPeriod", () => {
  it("should correctly transform hours", () => {
    expect(hoursToWeatherPeriod(0).toString()).toBe("00:00:00");
    expect(hoursToWeatherPeriod(1).toString()).toBe("01:00:00");
    expect(hoursToWeatherPeriod(12).toString()).toBe("12:00:00");
    expect(hoursToWeatherPeriod(23).toString()).toBe("23:00:00");
  });
});
