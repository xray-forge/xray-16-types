declare module "xray16" {
  export const PROFILER_TYPE_NONE: 0;
  export const PROFILER_TYPE_HOOK: 1;
  export const PROFILER_TYPE_SAMPLING: 2;

  export type TXR_ProfilerType = typeof PROFILER_TYPE_NONE | typeof PROFILER_TYPE_HOOK | typeof PROFILER_TYPE_SAMPLING;

  /**
   * @source C++ class profile_timer
   * @customConstructor profile_timer
   * @group xr_profile
   */
  export class profile_timer extends EngineBinding {
    public constructor();
    public constructor(timer: profile_timer);

    public stop(): void;

    public start(): void;

    public time(): f32;

    /**
     * Overridden string cast is implemented for profiling timer.
     *
     * @returns serialized profile time.
     */
    public toString(): string;
  }

  /**
   * @source namespace profiler
   * @group xr_profile
   */
  export interface IXR_profiler {
    /**
     * @returns whether lua scripts profiler is active
     */
    is_active(this: void): boolean;

    /**
     * @returns currently active profiler type
     */
    get_type(this: void): typeof PROFILER_TYPE_NONE | typeof PROFILER_TYPE_HOOK | typeof PROFILER_TYPE_SAMPLING;

    /**
     * Start lua scripts profiler in default mode.
     */
    start(this: void): void;

    /**
     * Start lua scripts profiler of provided type.
     *
     * @param profiler_type - type of profiler to start (note: see global exports of type constants)
     */
    start(this: void, profiler_type: TXR_ProfilerType): void;

    /**
     * Start profiler in hook mode.
     * Profiling performance based on lua call start/end events.
     */
    start_hook_mode(this: void): void;

    /**
     * Start profiler in sampling mode with default sampling interval.
     */
    start_sampling_mode(this: void): void;

    /**
     * Start profiler in sampling mode with provided sampling interval value.
     *
     * @param sampling_interval - interval to collect samples with luaJIT sampling profiler
     */
    start_sampling_mode(this: void, sampling_interval: u32): void;

    /**
     * Stop currently active profiler.
     */
    stop(this: void): void;

    /**
     * Reset measurements data of profiler.
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
     * @param entries_limit - limit of top profiling entries to print
     */
    log_report(this: void, entries_limit: u32): void;

    /**
     * Save report of profiler measurements in corresponding log/perf file.
     */
    save_report(this: void): void;
  }

  /**
   * @group xr_profile
   */
  export const profiler: IXR_profiler;

  /**
   * @source namespace profiler
   * @group xr_profile
   */
  export interface IXR_tracy {
    /**
     * Begin tracy profiling zone.
     */
    ZoneBegin(this: void): void;

    /**
     * Begin tracy profiling zone with defined name.
     *
     * @param name - name to display in tracy logs for current zone
     */
    ZoneBeginN(this: void, name: string): void;

    ZoneBeginS(this: void): void;

    ZoneBeginNS(this: void): void;

    /**
     * End tracy profiling zone.
     */
    ZoneEnd(this: void): void;

    /**
     * Set zone text.
     *
     * @param text - text description of the zone
     */
    ZoneText(this: void, text: string): void;

    /**
     * Set zone name on per-call basis.
     *
     * @param name - name of zone
     */
    ZoneName(this: void, name: string): void;

    /**
     * Send message to tracy profiler.
     */
    Message(this: void): void;
  }

  /**
   * @group xr_profile
   */
  export const tracy: IXR_tracy;
}
