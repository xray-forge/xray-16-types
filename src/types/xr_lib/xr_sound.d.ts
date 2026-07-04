import type { Nillable } from "../internal";

declare module "xray16" {
  /**
   * Current playback parameters for a launched sound.
   *
   * @source C++ class sound_params
   * @customConstructor sound_params
   * @group xr_sound
   */
  export class sound_params {
    /**
     * Playback frequency multiplier.
     */
    public frequency: f32;

    /**
     * Maximum audible distance in meters.
     */
    public max_distance: f32;

    /**
     * Minimum distance before attenuation starts.
     */
    public min_distance: f32;

    /**
     * Current sound position.
     */
    public position: vector;

    /**
     * Playback volume.
     */
    public volume: f32;

    /**
     * Engine-created playback parameters.
     */
    private constructor();
  }

  /**
   * Play an engine sound resource from scripts.
   *
   * @source C++ class sound_object
   * @customConstructor sound_object
   * @group xr_sound
   *
   * @remarks
   * Most playback and parameter APIs require the sound resource to exist, unless the engine is running with sound
   * disabled. Missing files are logged at construction and fail later when playback starts.
   */
  export class sound_object {
    /**
     * Spatial 3D playback.
     */
    public static readonly s3d: 0;

    /**
     * Keep playing until stopped.
     */
    public static readonly looped: 1;

    /**
     * Screen-space 2D playback.
     */
    public static readonly s2d: 2;

    /**
     * Playback frequency multiplier.
     */
    public frequency: f32;

    /**
     * Maximum audible distance in meters.
     */
    public max_distance: f32;

    /**
     * Minimum distance before attenuation starts.
     */
    public min_distance: f32;

    /**
     * Playback volume.
     */
    public volume: f32;

    /**
     * Create a sound from `$game_sounds$/<sound_path>.ogg`.
     *
     * @remarks
     * Missing sound files are logged during construction. Playback methods will throw later if the sound handle was
     * not created.
     *
     * @param sound_path - Sound resource path without extension.
     */
    public constructor(sound_path: string);

    /**
     * Create a typed sound from `$game_sounds$/<sound_path>.ogg`.
     *
     * @remarks
     * Missing sound files are logged during construction. Playback methods will throw later if the sound handle was
     * not created.
     *
     * @param sound_path - Sound resource path without extension.
     * @param type - Sound category used by AI sound memory.
     */
    public constructor(sound_path: string, type: TXR_snd_type);

    /**
     * Get sound length in milliseconds.
     *
     * @remarks
     * Reads the engine sound handle. Do not use it as a file-existence check after construction logged a missing file.
     *
     * @returns Sound duration.
     */
    public length(): u32;

    /**
     * Check whether the sound has active playback feedback.
     *
     * @remarks
     * Sounds started with `play_no_feedback` are intentionally not tracked by feedback.
     *
     * @returns Whether the sound is currently playing.
     */
    public playing(): boolean;

    /**
     * Get the current playback position.
     *
     * @remarks
     * Logs an engine script error and returns a zero vector if the sound was not launched.
     *
     * @returns Current sound position.
     */
    public get_position(): vector;

    /**
     * Move the sound emitter.
     *
     * @throws If the sound handle was not created.
     *
     * @param position - New world position.
     */
    public set_position(position: vector): void;

    /**
     * Append a tail sound played after this sound ends.
     *
     * @remarks
     * The tail path is passed to the engine sound handle as-is. Use a game sound resource path without extension.
     *
     * @param sound_path - Sound resource path without extension.
     */
    public attach_tail(sound_path: string): void;

    /**
     * Play the sound attached to an object, or globally when `object` is null.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Object used as sound owner.
     */
    public play(object: Nillable<game_object>): void;

    /**
     * Play the sound after a delay.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Object used as sound owner.
     * @param delay - Delay in seconds.
     */
    public play(object: Nillable<game_object>, delay: f32): void;

    /**
     * Play the sound with engine sound flags.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Object used as sound owner.
     * @param delay - Delay in seconds.
     * @param flags - Playback flags such as `sound_object.looped` or `sound_object.s2d`.
     */
    public play(object: Nillable<game_object>, delay: f32, flags: i32): void;

    /**
     * Play the sound at a fixed world position.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Optional object used as sound owner.
     * @param position - World position for playback.
     */
    public play_at_pos(object: Nillable<game_object>, position: vector): void;

    /**
     * Play the sound at a fixed world position after a delay.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Optional object used as sound owner.
     * @param position - World position for playback.
     * @param delay - Delay in seconds.
     */
    public play_at_pos(object: Nillable<game_object>, position: vector, delay: f32): void;

    /**
     * Play the sound at a fixed world position with engine sound flags.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Optional object used as sound owner.
     * @param position - World position for playback.
     * @param delay - Delay in seconds.
     * @param flags - Playback flags such as `sound_object.looped` or `sound_object.s2d`.
     */
    public play_at_pos(object: Nillable<game_object>, position: vector, delay: f32, flags: i32): void;

    /**
     * Play without tracking feedback.
     *
     * @remarks
     * This starts playback without storing feedback on the `sound_object`, so `playing()` will not describe this
     * playback instance.
     *
     * @throws If the sound handle was not created.
     *
     * @param object - Optional object used as sound owner.
     * @param flags - Playback flags.
     * @param delay - Delay in seconds.
     * @param position - Optional playback position.
     * @param volume - Optional playback volume.
     */
    public play_no_feedback(object: Nillable<game_object>, flags: i32, delay: f32, position: vector, volume: f32): void;

    /**
     * Stop playback immediately.
     *
     * @throws If the sound handle was not created.
     */
    public stop(): void;

    /**
     * Stop playback through the engine deferred-stop path.
     *
     * @remarks
     * Legacy misspelled alias for `stop_deferred`.
     *
     * @throws If the sound handle was not created.
     */
    public stop_deffered(): void;

    /**
     * Stop playback through the engine deferred-stop path.
     *
     * @remarks
     * Preferred spelling. `stop_deffered` is kept for script compatibility.
     *
     * @throws If the sound handle was not created.
     */
    public stop_deferred(): void;
  }

  /**
   * Playback mode flag accepted by `sound_object.play()` and `play_at_pos()`.
   *
   * @source `src/xrGame/script_sound_script.cpp`, `sound_object.sound_play_type` enum.
   * @group xr_sound
   *
   * @remarks
   * `sound_object.looped` keeps playback active until stopped, `sound_object.s2d` plays in screen space, and
   * `sound_object.s3d` leaves playback spatial.
   */
  export type TXR_sound_object_type = EnumeratedStaticsValues<typeof sound_object>;

  /**
   * Sound category constants used by AI sound memory and sound playback.
   *
   * @source C++ class snd_type
   * @customConstructor snd_type
   * @group xr_sound
   */
  export class snd_type {
    /**
     * Engine enum value for `snd_type.ambient`.
     */
    public static readonly ambient: 128;
    /**
     * Engine enum value for `snd_type.anomaly`.
     */
    public static readonly anomaly: 268435456;
    /**
     * Engine enum value for `snd_type.anomaly_idle`.
     */
    public static readonly anomaly_idle: 268437504;
    /**
     * Engine enum value for `snd_type.attack`.
     */
    public static readonly attack: 8192;
    /**
     * Engine enum value for `snd_type.bullet_hit`.
     */
    public static readonly bullet_hit: 524288;
    /**
     * Engine enum value for `snd_type.die`.
     */
    public static readonly die: 131072;
    /**
     * Engine enum value for `snd_type.drop`.
     */
    public static readonly drop: 33554432;
    /**
     * Engine enum value for `snd_type.eat`.
     */
    public static readonly eat: 4096;
    /**
     * Engine enum value for `snd_type.empty`.
     */
    public static readonly empty: 1048576;
    /**
     * Engine enum value for `snd_type.hide`.
     */
    public static readonly hide: 16777216;
    /**
     * Engine enum value for `snd_type.idle`.
     */
    public static readonly idle: 2048;
    /**
     * Engine enum value for `snd_type.injure`.
     */
    public static readonly injure: 65536;
    /**
     * Engine enum value for `snd_type.item`.
     */
    public static readonly item: 1073741824;
    /**
     * Engine enum value for `snd_type.item_drop`.
     */
    public static readonly item_drop: 1107296256;
    /**
     * Engine enum value for `snd_type.item_hide`.
     */
    public static readonly item_hide: 1090519040;
    /**
     * Engine enum value for `snd_type.item_pick_up`.
     */
    public static readonly item_pick_up: 1140850688;
    /**
     * Engine enum value for `snd_type.item_take`.
     */
    public static readonly item_take: 1082130432;
    /**
     * Engine enum value for `snd_type.item_use`.
     */
    public static readonly item_use: 1077936128;
    /**
     * Engine enum value for `snd_type.monster`.
     */
    public static readonly monster: 536870912;
    /**
     * Engine enum value for `snd_type.monster_attack`.
     */
    public static readonly monster_attack: 536879104;
    /**
     * Engine enum value for `snd_type.monster_die`.
     */
    public static readonly monster_die: 537001984;
    /**
     * Engine enum value for `snd_type.monster_eat`.
     */
    public static readonly monster_eat: 536875008;
    /**
     * Engine enum value for `snd_type.monster_injure`.
     */
    public static readonly monster_injure: 536936448;
    /**
     * Engine enum value for `snd_type.monster_step`.
     */
    public static readonly monster_step: 536903680;
    /**
     * Engine enum value for `snd_type.monster_talk`.
     */
    public static readonly monster_talk: 536887296;
    /**
     * Engine enum value for `snd_type.no_sound`.
     */
    public static readonly no_sound: 0;
    /**
     * Engine enum value for `snd_type.object_break`.
     */
    public static readonly object_break: 1024;
    /**
     * Engine enum value for `snd_type.object_collide`.
     */
    public static readonly object_collide: 512;
    /**
     * Engine enum value for `snd_type.object_explode`.
     */
    public static readonly object_explode: 256;
    /**
     * Engine enum value for `snd_type.pick_up`.
     */
    public static readonly pick_up: 67108864;
    /**
     * Engine enum value for `snd_type.reload`.
     */
    public static readonly reload: 262144;
    /**
     * Engine enum value for `snd_type.shoot`.
     */
    public static readonly shoot: 2097152;
    /**
     * Engine enum value for `snd_type.step`.
     */
    public static readonly step: 32768;
    /**
     * Engine enum value for `snd_type.take`.
     */
    public static readonly take: 8388608;
    /**
     * Engine enum value for `snd_type.talk`.
     */
    public static readonly talk: 16384;
    /**
     * Engine enum value for `snd_type.use`.
     */
    public static readonly use: 4194304;
    /**
     * Engine enum value for `snd_type.weapon`.
     */
    public static readonly weapon: -2147483648;
    /**
     * Engine enum value for `snd_type.weapon_bullet_hit`.
     */
    public static readonly weapon_bullet_hit: -2146959360;
    /**
     * Engine enum value for `snd_type.weapon_empty`.
     */
    public static readonly weapon_empty: -2146435072;
    /**
     * Engine enum value for `snd_type.weapon_reload`.
     */
    public static readonly weapon_reload: -2147221504;
    /**
     * Engine enum value for `snd_type.weapon_shoot`.
     */
    public static readonly weapon_shoot: -2145386496;
    /**
     * Engine enum value for `snd_type.world`.
     */
    public static readonly world: 134217728;
    /**
     * Engine enum value for `snd_type.world_ambient`.
     */
    public static readonly world_ambient: 134217856;
    /**
     * Engine enum value for `snd_type.world_object_break`.
     */
    public static readonly world_object_break: 134218752;
    /**
     * Engine enum value for `snd_type.world_object_collide`.
     */
    public static readonly world_object_collide: 134218240;
    /**
     * Engine enum value for `snd_type.world_object_explode`.
     */
    public static readonly world_object_explode: 134217984;

    /**
     * Engine-owned sound category constants.
     */
    private constructor();
  }

  /**
   * AI sound category bitmask used by sound memory, callbacks, and sound actions.
   *
   * @source `src/xrGame/script_sound_action_script.cpp`, `snd_type.sound_types` enum.
   * @group xr_sound
   *
   * @remarks
   * Values combine a broad owner category such as `weapon`, `monster`, or `world` with a concrete event such as
   * `shoot`, `die`, or `object_collide`. Use `snd_type.no_sound` when no AI sound category should be emitted.
   */
  export type TXR_snd_type = EnumeratedStaticsValues<typeof snd_type>;

  /**
   * Last sound perceived by an object.
   *
   * @source C++ class SoundInfo
   * @customConstructor SoundInfo
   * @group xr_sound
   */
  export class SoundInfo {
    /**
     * Whether the sound is considered dangerous.
     */
    public danger: i32;

    /**
     * Sound origin position.
     */
    public position: vector;

    /**
     * Perceived sound power.
     */
    public power: f32;

    /**
     * Level time when the sound was perceived.
     */
    public time: i32;

    /**
     * Object that produced the sound.
     */
    public who: game_object;

    /**
     * Engine-created perceived sound info.
     */
    private constructor();
  }
}
