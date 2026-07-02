import type { Nullable } from "../../internal";

declare module "xray16" {
  /**
   * Base engine object exposed for compatibility with script binders.
   *
   * @source `src/xrGame/base_client_classes_script.cpp`, `DLL_Pure` binding.
   * @customConstructor DLL_Pure
   * @group xr_core
   *
   * @remarks
   * Backward-compatible script name for the native `IFactoryObject` base. It is exposed as `DLL_Pure` for existing mod
   * scripts, while most gameplay code receives derived client objects from engine callbacks or casts.
   */
  export class DLL_Pure extends EngineBinding {
    /**
     * Engine-created base object.
     */
    protected constructor();
  }

  /**
   * Render visual handle for client objects.
   *
   * @source `src/xrGame/base_client_classes_script.cpp`, `IRender_Visual` binding.
   * @group xr_client_object
   *
   * @remarks
   * Visual handles are owned by the object. Cast helpers return borrowed engine interfaces and can return `null` when
   * the underlying visual does not implement the requested interface.
   */
  export interface IXR_IRender_Visual {
    /**
     * Cast the visual to animated kinematics when supported.
     *
     * @remarks
     * Returns `null` when the visual is not animated. The native default implementation returns `nullptr`.
     *
     * @returns Animated kinematics interface.
     */
    dcast_PKinematicsAnimated(): Nullable<IKinematicsAnimated>;
  }

  /**
   * Base client-side game object.
   *
   * @source `src/xrGame/base_client_classes_script.cpp`, `CGameObject` binding.
   * @customConstructor CGameObject
   * @group xr_client_object
   *
   * @remarks
   * Client-side object state is engine-owned. The binding exposes low-level lifecycle hooks used by custom client
   * subclasses; ordinary gameplay scripts usually work with the higher-level `game_object` wrapper instead.
   */
  export class CGameObject extends DLL_Pure {
    /**
     * @returns Render visual assigned to the object.
     */
    public Visual(): IXR_IRender_Visual;

    /**
     * @returns Whether the object is enabled in the client object loop.
     */
    public getEnabled(): boolean;

    /**
     * Construct engine-side object state.
     *
     * @remarks
     * Lifecycle hook used by the engine. Calling it from gameplay scripts can reinitialize native state unexpectedly.
     *
     * @returns Constructed base object.
     */
    public _construct(): DLL_Pure;

    /**
     * Import network state from a packet.
     *
     * @param net_packet - Source network packet.
     */
    public net_Import(net_packet: net_packet): void;

    /**
     * @returns Whether the object is visible.
     */
    public getVisible(): boolean;

    /**
     * Export network state to a packet.
     *
     * @param net_packet - Destination network packet.
     */
    public net_Export(net_packet: net_packet): void;

    /**
     * Spawn the client object from its server object.
     *
     * @remarks
     * Lifecycle hook used during network spawn. Return `false` to reject spawn in custom subclasses.
     *
     * @param cse_abstract - Server object used for spawn data.
     * @returns Whether spawn succeeded.
     */
    public net_Spawn(cse_abstract: cse_abstract): boolean;

    /**
     * Use another object through the engine interaction path.
     *
     * @param object - Object being used.
     * @returns Whether the use action was handled.
     */
    public use(object: CGameObject): boolean;
  }

  /**
   * Script-side binder attached to a client `game_object`.
   *
   * @source `src/xrGame/script_binder_object_script.cpp`, `object_binder` binding.
   * @source `src/xrGame/script_binder.cpp`, `CScriptBinder`.
   * @customConstructor object_binder
   * @group xr_client_object
   *
   * @remarks
   * A config section can name a `script_binding` function. During reload, the engine calls that function with the
   * object's `game_object`; the script normally creates an `object_binder` subclass for it. Binder hooks are
   * client-object hooks. Server ALife objects use `cse_alife_dynamic_object` lifecycle methods instead.
   *
   * Base hook implementations are empty, except `net_spawn` returns `true` and `net_save_relevant` returns `false`.
   * If a hook throws, the engine clears the binder.
   */
  export class object_binder<T = game_object> extends EngineBinding {
    /**
     * Client `game_object` controlled by this binder.
     *
     * @remarks
     * The engine passes this object to the constructor and stores the binder on the native client object. Treat the
     * reference as engine-owned.
     */
    public readonly object: T;

    /**
     * Create a binder for a script game object.
     *
     * @param object - Script game object controlled by this binder.
     */
    public constructor(object: T);

    /**
     * Save binder state.
     *
     * @remarks
     * Write only data that `load` will read back in the same order.
     *
     * @param packet - Destination save packet.
     */
    public save(packet: net_packet): void;

    /**
     * Load binder state.
     *
     * @remarks
     * Read data written by `save`. The engine does not validate custom binder packet layouts.
     *
     * @param reader - Source save reader.
     */
    public load(reader: reader): void;

    /**
     * Update binder logic.
     *
     * @remarks
     * Called from the owning client object's scheduled update while the object is online.
     *
     * @param delta - Time since last update in milliseconds.
     */
    public update(delta: u32): void;

    /**
     * Reload binder configuration.
     *
     * @remarks
     * Called after the engine creates the script binder from the section's `script_binding` callback.
     *
     * @param section - Object config section.
     */
    public reload(section: string): void;

    /**
     * Reinitialize binder runtime state.
     *
     * @remarks
     * Called when the owning client object is reinitialized. Keep persistent state in `save` and `load`, not here.
     */
    public reinit(): void;

    /**
     * Decide whether binder state should be saved over the network.
     *
     * @remarks
     * The base implementation returns `false`.
     *
     * @returns Whether the state is relevant for network save.
     */
    public net_save_relevant(): boolean;

    /**
     * Import binder network state.
     *
     * @remarks
     * Pair this with `net_export` when the binder participates in network state synchronization.
     *
     * @param net_packet - Source network packet.
     */
    public net_import(net_packet: net_packet): void;

    /**
     * Export binder network state.
     *
     * @remarks
     * Pair this with `net_import` when the binder participates in network state synchronization.
     *
     * @param net_packet - Destination network packet.
     */
    public net_export(net_packet: net_packet): void;

    /**
     * Handle network spawn.
     *
     * @source `src/xrGame/script_binder.cpp`, `CScriptBinder::net_Spawn`.
     *
     * @remarks
     * Client-side online spawn hook. It can run again for the same logical ALife object when the engine recreates its
     * online client object. Return `false` to reject the client spawn. The base implementation returns `true`.
     *
     * @param object - Server object used for spawn data.
     * @returns Whether spawn succeeded.
     */
    public net_spawn(object: cse_alife_object): boolean;

    /**
     * Handle this client object destruction.
     *
     * @remarks
     * Called when this client object goes offline or is destroyed. This is the binder's own cleanup hook. `net_Relcase`
     * is for another object being released.
     */
    public net_destroy(): void;

    /**
     * Release references to a game object that is about to be destroyed.
     *
     * @source `src/xrEngine/xr_object_list.cpp`, `CObjectList::SingleUpdate`.
     * @source `src/xrGame/GameObject.cpp`, `CGameObject::net_Relcase`.
     * @source `src/xrGame/script_binder.cpp`, `CScriptBinder::net_Relcase`.
     *
     * @remarks
     * The engine broadcasts this to every active and sleeping client object for every object in the destroy queue. Use
     * it only to drop references to `object`; the callback is not limited to binders that reference it.
     *
     * Keep overrides small, tolerate unrelated objects, and do not store or use `object` after this callback returns.
     * The broadcast cost is roughly `(active + sleeping client objects) * destroyed objects`.
     *
     * @param object - Object being released.
     */
    public net_Relcase(object: T): void;
  }
}
