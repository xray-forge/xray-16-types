declare module "xray16" {
  /**
   * Base engine object exposed for compatibility with script binders.
   *
   * @source C++ class DLL_Pure
   * @customConstructor DLL_Pure
   * @group xr_core
   *
   * @remarks
   * Base for engine-owned client objects. Scripts normally receive derived objects from xray callbacks or casts.
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
   * @source C++ class IRender_Visual
   * @group xr_client_object
   *
   * @remarks
   * Visual handles are owned by the object. Treat returned cast interfaces as borrowed engine references.
   */
  export interface IXR_IRender_Visual {
    /**
     * Cast the visual to animated kinematics when supported.
     *
     * @remarks
     * Runtime can return `null` when the visual is not animated even though older declarations expose a non-null type.
     *
     * @returns Animated kinematics interface.
     */
    dcast_PKinematicsAnimated(): IKinematicsAnimated;
  }

  /**
   * Base client-side game object.
   *
   * @source C++ class CGameObject : DLL_Pure, ISheduled, ICollidable, IRenderable
   * @customConstructor CGameObject
   * @group xr_client_object
   *
   * @remarks
   * Client-side object state is engine-owned. Use this wrapper for low-level engine callbacks; gameplay scripts usually
   * work with `game_object` instead.
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
   * Class to link client side object with script object entity.
   *
   * @source C++ class object_binder
   * @customConstructor object_binder
   * @group xr_client_object
   *
   * @remarks
   * Script binders are callbacks attached to a `game_object`. The engine calls lifecycle methods; scripts usually
   * override them in subclasses instead of invoking them directly.
   */
  export class object_binder<T = game_object> extends EngineBinding {
    /**
     * Script game object controlled by this binder.
     */
    public readonly object: T;

    /**
     * @param object - Script game object controlled by this binder.
     */
    public constructor(object: T);

    /**
     * Save binder state.
     *
     * @param packet - Destination save packet.
     */
    public save(packet: net_packet): void;

    /**
     * Load binder state.
     *
     * @param reader - Source save reader.
     */
    public load(reader: reader): void;

    /**
     * Update binder logic.
     *
     * @param delta - Time since last update in milliseconds.
     */
    public update(delta: u32): void;

    /**
     * Reload binder configuration.
     *
     * @param section - Object config section.
     */
    public reload(section: string): void;

    /**
     * Reinitialize binder runtime state.
     */
    public reinit(): void;

    /**
     * Export binder network state.
     *
     * @param net_packet - Destination network packet.
     */
    public net_export(net_packet: net_packet): void;

    /**
     * Decide whether binder state should be saved over the network.
     *
     * @returns Whether the state is relevant for network save.
     */
    public net_save_relevant(): boolean;

    /**
     * Handle client object destruction.
     */
    public net_destroy(): void;

    /**
     * Release references to a game object.
     *
     * @param object - Object being released.
     */
    public net_Relcase(object: T): void;

    /**
     * Handle network spawn.
     *
     * @param object - Server object used for spawn data.
     * @returns Whether spawn succeeded.
     */
    public net_spawn(object: cse_alife_object): boolean;

    /**
     * Import binder network state.
     *
     * @param net_packet - Source network packet.
     */
    public net_import(net_packet: net_packet): void;
  }
}
