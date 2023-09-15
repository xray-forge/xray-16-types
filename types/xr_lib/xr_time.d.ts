declare module "xray16" {
  /**
   * @source C++ class CTime
   * @customConstructor CTime
   * @group xr_time
   */
  export class CTime extends EngineBinding {
    public static DateToDay: 0;
    public static DateToMonth: 1;
    public static DateToYear: 2;
    public static TimeToHours: 0;
    public static TimeToMilisecs: 3;
    public static TimeToMinutes: 1;
    public static TimeToSeconds: 2;

    public constructor();

    public constructor(time: CTime);

    public add(time: CTime): void;

    public dateToString(time: i32): string;

    public diffSec(time: CTime): f32;

    public get(
      y: u32,
      m: u32,
      d: u32,
      h: u32,
      min: u32,
      sec: u32,
      ms: u32
    ): LuaMultiReturn<[u32, u32, u32, u32, u32, u32, u32]>;

    public set(y: i32, m: i32, d: i32, h: i32, min: i32, sec: i32, ms: i32): void;

    public setHMS(a: i32, b: i32, c: i32): void;

    public setHMSms(a: i32, b: i32, c: i32, d: i32): void;

    public sub(time: CTime): void;

    public timeToString(time: i32): string;
  }
}
