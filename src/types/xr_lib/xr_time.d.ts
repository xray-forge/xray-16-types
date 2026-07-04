declare module "xray16" {
  /**
   * Mutable game calendar/time value.
   *
   * Use `game.get_game_time()` for the current in-game time and `time_global()` for real elapsed milliseconds.
   *
   * @source C++ class CTime
   * @customConstructor CTime
   * @group xr_time
   * @remarks
   * Methods such as `add`, `sub`, `set`, and `setHMS` mutate the current instance.
   */
  export class CTime extends EngineBinding {
    /**
     * Date formatting mode: day.
     */
    public static readonly DateToDay: 0;

    /**
     * Date formatting mode: month.
     */
    public static readonly DateToMonth: 1;

    /**
     * Date formatting mode: year.
     */
    public static readonly DateToYear: 2;

    /**
     * Time formatting mode: hours.
     */
    public static readonly TimeToHours: 0;

    /**
     * Time formatting mode: milliseconds.
     */
    public static readonly TimeToMilisecs: 3;

    /**
     * Time formatting mode: minutes.
     */
    public static readonly TimeToMinutes: 1;

    /**
     * Time formatting mode: seconds.
     */
    public static readonly TimeToSeconds: 2;

    /**
     * Create an empty time value.
     */
    public constructor();

    /**
     * Copy another time value.
     *
     * @param time - Time value to copy.
     */
    public constructor(time: CTime);

    /**
     * Add another time value to this one.
     *
     * @param time - Time span to add.
     */
    public add(time: CTime): void;

    /**
     * Format one date component as text.
     *
     * @param mode - One of `CTime.DateTo*` formatting constants.
     * @returns Requested date component.
     */
    public dateToString(mode: i32): string;

    /**
     * Get difference from another game time in seconds.
     *
     * @param time - Time to compare with.
     * @returns Difference in seconds.
     */
    public diffSec(time: CTime): f32;

    /**
     * Read all date and time components.
     *
     * The input values are placeholders for Lua out parameters.
     *
     * @returns Year, month, day, hour, minute, second, and millisecond.
     */
    public get(
      y: u32,
      m: u32,
      d: u32,
      h: u32,
      min: u32,
      sec: u32,
      ms: u32
    ): LuaMultiReturn<[u32, u32, u32, u32, u32, u32, u32]>;

    /**
     * Replace all date and time components.
     *
     * @param y - Year.
     * @param m - Month.
     * @param d - Day.
     * @param h - Hour.
     * @param min - Minute.
     * @param sec - Second.
     * @param ms - Millisecond.
     */
    public set(y: i32, m: i32, d: i32, h: i32, min: i32, sec: i32, ms: i32): void;

    /**
     * Replace time of day.
     *
     * @param h - Hour.
     * @param m - Minute.
     * @param s - Second.
     */
    public setHMS(h: i32, m: i32, s: i32): void;

    /**
     * Replace time of day including milliseconds.
     *
     * @param h - Hour.
     * @param m - Minute.
     * @param s - Second.
     * @param ms - Millisecond.
     */
    public setHMSms(h: i32, m: i32, s: i32, ms: i32): void;

    /**
     * Subtract another time value from this one.
     *
     * @remarks
     * The result is clamped at zero when `time` is greater than the current value.
     *
     * @param time - Time span to subtract.
     */
    public sub(time: CTime): void;

    /**
     * Format one time component as text.
     *
     * @param mode - One of `CTime.TimeTo*` formatting constants.
     * @returns Requested time component.
     */
    public timeToString(mode: i32): string;
  }

  /**
   * Get main-thread engine time in milliseconds since executable start.
   *
   * @group xr_time
   *
   * @remarks
   * Reads `Device.dwTimeGlobal`, the frame-updated engine clock.
   *
   * @example 0, 1000, 60000
   *
   * @returns Milliseconds from game executable start.
   */
  export function time_global(this: void): u32;

  /**
   * Get asynchronous engine time in milliseconds since executable start.
   *
   * @group xr_time
   *
   * @remarks
   * Reads the asynchronous multimedia timer, so it can advance outside the frame-updated `time_global` value.
   *
   * @returns Milliseconds from game executable start.
   */
  export function time_global_async(this: void): u32;
}
