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

    private constructor();
  }

  /**
   * Play an engine sound resource from scripts.
   *
   * @source C++ class sound_object
   * @customConstructor sound_object
   * @group xr_sound
   */
  export class sound_object {
    /**
     * Spatial 3D playback.
     */
    public static s3d: 0;

    /**
     * Keep playing until stopped.
     */
    public static looped: 1;

    /**
     * Screen-space 2D playback.
     */
    public static s2d: 2;

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
     * @param sound_path - Sound resource path without extension.
     */
    public constructor(sound_path: string);

    /**
     * Create a typed sound from `$game_sounds$/<sound_path>.ogg`.
     *
     * @param sound_path - Sound resource path without extension.
     * @param type - Sound category used by AI sound memory.
     */
    public constructor(sound_path: string, type: TXR_snd_type);

    /**
     * Get sound length in milliseconds.
     *
     * @returns Sound duration.
     */
    public length(): u32;

    /**
     * Check whether the sound has active playback feedback.
     *
     * @returns Whether the sound is currently playing.
     */
    public playing(): boolean;

    /**
     * Get the current playback position.
     *
     * @remarks Logs an engine script error and returns zero vector if the sound was not launched.
     * @returns Current sound position.
     */
    public get_position(): vector;

    /**
     * Move the sound emitter.
     *
     * @param position - New world position.
     */
    public set_position(position: vector): void;

    /**
     * Append a tail sound played after this sound ends.
     *
     * @param sound_path - Sound resource path without extension.
     */
    public attach_tail(sound_path: string): void;

    /**
     * Play the sound attached to an object, or globally when `object` is null.
     *
     * @param object - Object used as sound owner.
     */
    public play(object: game_object | null): void;

    /**
     * Play the sound after a delay.
     *
     * @param object - Object used as sound owner.
     * @param delay - Delay in seconds.
     */
    public play(object: game_object | null, delay: f32): void;

    /**
     * Play the sound with engine sound flags.
     *
     * @param object - Object used as sound owner.
     * @param delay - Delay in seconds.
     * @param flags - Playback flags such as `sound_object.looped` or `sound_object.s2d`.
     */
    public play(object: game_object | null, delay: f32, flags: i32): void;

    /**
     * Play the sound at a fixed world position.
     *
     * @param object - Optional object used as sound owner.
     * @param position - World position for playback.
     */
    public play_at_pos(object: game_object | null, position: vector): void;

    /**
     * Play the sound at a fixed world position after a delay.
     *
     * @param object - Optional object used as sound owner.
     * @param position - World position for playback.
     * @param delay - Delay in seconds.
     */
    public play_at_pos(object: game_object | null, position: vector, delay: f32): void;

    /**
     * Play the sound at a fixed world position with engine sound flags.
     *
     * @param object - Optional object used as sound owner.
     * @param position - World position for playback.
     * @param delay - Delay in seconds.
     * @param flags - Playback flags such as `sound_object.looped` or `sound_object.s2d`.
     */
    public play_at_pos(object: game_object | null, position: vector, delay: f32, flags: i32): void;

    /**
     * Play without tracking feedback.
     *
     * @param object - Optional object used as sound owner.
     * @param flags - Playback flags.
     * @param delay - Delay in seconds.
     * @param position - Optional playback position.
     * @param volume - Optional playback volume.
     */
    public play_no_feedback(object: game_object | null, flags: i32, delay: f32, position: vector, volume: f32): void;

    /**
     * Stop playback immediately.
     */
    public stop(): void;

    /**
     * Stop playback through the engine deferred-stop path.
     */
    public stop_deffered(): void;

    /**
     * Stop playback through the engine deferred-stop path.
     */
    public stop_deferred(): void;
  }

  /**
   * @group xr_sound
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
    public static ambient: 128;
    public static anomaly: 268435456;
    public static anomaly_idle: 268437504;
    public static attack: 8192;
    public static bullet_hit: 524288;
    public static die: 131072;
    public static drop: 33554432;
    public static eat: 4096;
    public static empty: 1048576;
    public static hide: 16777216;
    public static idle: 2048;
    public static injure: 65536;
    public static item: 1073741824;
    public static item_drop: 1107296256;
    public static item_hide: 1090519040;
    public static item_pick_up: 1140850688;
    public static item_take: 1082130432;
    public static item_use: 1077936128;
    public static monster: 536870912;
    public static monster_attack: 536879104;
    public static monster_die: 537001984;
    public static monster_eat: 536875008;
    public static monster_injure: 536936448;
    public static monster_step: 536903680;
    public static monster_talk: 536887296;
    public static no_sound: 0;
    public static object_break: 1024;
    public static object_collide: 512;
    public static object_explode: 256;
    public static pick_up: 67108864;
    public static reload: 262144;
    public static shoot: 2097152;
    public static step: 32768;
    public static take: 8388608;
    public static talk: 16384;
    public static use: 4194304;
    public static weapon: -2147483648;
    public static weapon_bullet_hit: -2146959360;
    public static weapon_empty: -2146435072;
    public static weapon_reload: -2147221504;
    public static weapon_shoot: -2145386496;
    public static world: 134217728;
    public static world_ambient: 134217856;
    public static world_object_break: 134218752;
    public static world_object_collide: 134218240;
    public static world_object_explode: 134217984;

    private constructor();
  }

  /**
   * @group xr_sound
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

    private constructor();
  }
}
