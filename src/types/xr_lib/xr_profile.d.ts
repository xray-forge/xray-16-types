declare module "xray16" {
  /**
   * No Lua profiler is active.
   *
   * @since OpenXRay 2025-03-19, ac4ba75d, PR #1771
   *
   * @source C++ enum CScriptProfilerType::None
   * @group xr_profiler
   */
  export const PROFILER_TYPE_NONE: 0;

  /**
   * Hook-based Lua profiler.
   *
   * @since OpenXRay 2025-03-19, ac4ba75d, PR #1771
   *
   * @source C++ enum CScriptProfilerType::Hook
   * @group xr_profiler
   */
  export const PROFILER_TYPE_HOOK: 1;

  /**
   * LuaJIT sampling profiler.
   *
   * @since OpenXRay 2025-03-19, ac4ba75d, PR #1771
   *
   * @source C++ enum CScriptProfilerType::Sampling
   * @group xr_profiler
   */
  export const PROFILER_TYPE_SAMPLING: 2;

  /**
   * Lua profiler mode accepted by `profiler.start()`.
   *
   * @source C++ enum CScriptProfilerType
   * @group xr_profiler
   *
   * @remarks
   * Hook mode records Lua call/return events. Sampling mode uses the LuaJIT profiler. `PROFILER_TYPE_NONE` is exposed
   * for status reporting and does not start profiling.
   */
  export type TXR_ProfilerType = typeof PROFILER_TYPE_NONE | typeof PROFILER_TYPE_HOOK | typeof PROFILER_TYPE_SAMPLING;

  /**
   * Lightweight script profile timer.
   *
   * @since OpenXRay 2025-03-19, ac4ba75d, PR #1771
   *
   * @source C++ class profile_timer
   * @customConstructor profile_timer
   * @group xr_profiler
   *
   * @remarks
   * The timer accumulates elapsed microseconds between matching `start()` and `stop()` calls. Nested starts are counted
   * and only the outermost stop adds elapsed time.
   */
  export class profile_timer extends EngineBinding {
    /**
     * Create a stopped profile timer.
     */
    public constructor();

    /**
     * Copy an existing timer.
     *
     * @param timer - Timer to copy.
     */
    public constructor(timer: profile_timer);

    /**
     * Stop measuring elapsed time.
     *
     * @remarks
     * Calling `stop()` on a timer that was not started is ignored.
     */
    public stop(): void;

    /**
     * Start or restart measuring elapsed time.
     *
     * @remarks
     * Calling `start()` while the timer is already running increases the recursion mark instead of restarting the
     * underlying clock.
     */
    public start(): void;

    /**
     * @returns Elapsed time in microseconds.
     */
    public time(): f32;

    /**
     * Overridden string cast is implemented for profiling timer.
     *
     * @returns Serialized profile time.
     */
    public toString(): string;
  }

  /**
   * Lua script profiler namespace.
   *
   * @since OpenXRay 2025-03-19, ac4ba75d, PR #1771
   *
   * @source namespace profiler
   * @group xr_profiler
   *
   * @remarks
   * Requires an engine script profiler instance. Starting an already active profiler is ignored by the engine.
   */
  export interface IXR_profiler {
    /**
     * @returns Whether lua scripts profiler is active.
     */
    is_active(this: void): boolean;

    /**
     * @returns Currently active profiler type.
     */
    get_type(this: void): typeof PROFILER_TYPE_NONE | typeof PROFILER_TYPE_HOOK | typeof PROFILER_TYPE_SAMPLING;

    /**
     * Start lua scripts profiler in default mode.
     *
     * @remarks
     * The default mode is hook profiling.
     */
    start(this: void): void;

    /**
     * Start lua scripts profiler of provided type.
     *
     * @remarks
     * Passing `PROFILER_TYPE_NONE` does not start profiling and only logs a message.
     *
     * @param profiler_type - Type of profiler to start (note: see global exports of type constants).
     */
    start(this: void, profiler_type: TXR_ProfilerType): void;

    /**
     * Start profiler in hook mode.
     * Profiling performance based on lua call start/end events.
     *
     * @remarks
     * Hook mode attaches a Lua hook. If another hook is already installed, start may fail and only log the failure.
     */
    start_hook_mode(this: void): void;

    /**
     * Start profiler in sampling mode with default sampling interval.
     *
     * @remarks
     * Sampling mode uses LuaJIT profiling. It cannot start when LuaJIT profiling is unavailable, for example with
     * `-nojit`.
     */
    start_sampling_mode(this: void): void;

    /**
     * Start profiler in sampling mode with provided sampling interval value.
     *
     * @remarks
     * The engine clamps the interval to its supported range.
     *
     * @param sampling_interval - Interval to collect samples with luaJIT sampling profiler.
     */
    start_sampling_mode(this: void, sampling_interval: u32): void;

    /**
     * Stop currently active profiler.
     *
     * @remarks
     * Stopping clears collected profiling data. Calling it while inactive only logs a message.
     */
    stop(this: void): void;

    /**
     * Reset measurements data of profiler.
     *
     * @remarks
     * Reset keeps the current profiling mode active and clears collected samples.
     */
    reset(this: void): void;

    /**
     * Log report of profiler measurements in game console/log file.
     * Use default engine limit to print top N entries.
     */
    log_report(this: void): void;

    /**
     * Log report of profiler measurements in game console/log file.
     *
     * @param entries_limit - Limit of top profiling entries to print.
     */
    log_report(this: void, entries_limit: u32): void;

    /**
     * Save report of profiler measurements in corresponding log/perf file.
     *
     * @remarks
     * Hook reports are saved under `$logs$` as `*_hook_profile.log`. Sampling reports are saved as
     * `*_sampling_profile.perf`.
     */
    save_report(this: void): void;
  }

  /**
   * Lua script profiler namespace.
   *
   * @since OpenXRay 2025-03-19, ac4ba75d, PR #1771
   *
   * @source namespace profiler
   * @group xr_profiler
   */
  export const profiler: IXR_profiler;

  /**
   * @source namespace profiler
   * @group xr_profiler
   */
  export interface IXR_tracy {
    /**
     * Begin tracy profiling zone.
     */
    ZoneBegin(this: void): void;

    /**
     * Begin tracy profiling zone with defined name.
     *
     * @param name - Name to display in tracy logs for current zone.
     */
    ZoneBeginN(this: void, name: string): void;

    /**
     * Begin a Tracy profiling zone with source location data.
     */
    ZoneBeginS(this: void): void;

    /**
     * Begin a named Tracy profiling zone with source location data.
     */
    ZoneBeginNS(this: void): void;

    /**
     * End tracy profiling zone.
     */
    ZoneEnd(this: void): void;

    /**
     * Set zone text.
     *
     * @param text - Text description of the zone.
     */
    ZoneText(this: void, text: string): void;

    /**
     * Set zone name on per-call basis.
     *
     * @param name - Name of zone.
     */
    ZoneName(this: void, name: string): void;

    /**
     * Send message to tracy profiler.
     */
    Message(this: void): void;
  }

  /**
   * Tracy profiling namespace.
   *
   * @source namespace tracy
   * @group xr_profiler
   */
  export const tracy: IXR_tracy;
}
