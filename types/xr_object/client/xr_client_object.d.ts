declare module "xray16" {
  /**
   * @source C++ class DLL_Pure
   * @customConstructor DLL_Pure
   * @group xr_core
   */
  export class DLL_Pure extends EngineBinding {
    protected constructor();
  }

  /**
   * @source C++ class IRender_Visual
   * @group xr_client_object
   */
  export interface IXR_IRender_Visual {
    dcast_PKinematicsAnimated(): IKinematicsAnimated;
  }

  /**
   * @source C++ class CGameObject : DLL_Pure, ISheduled, ICollidable, IRenderable
   * @customConstructor CGameObject
   * @group xr_client_object
   */
  export class CGameObject extends DLL_Pure {
    public Visual(): IXR_IRender_Visual;

    public getEnabled(): boolean;

    public _construct(): DLL_Pure;

    public net_Import(net_packet: net_packet): void;

    public getVisible(): boolean;

    public net_Export(net_packet: net_packet): void;

    public net_Spawn(cse_abstract: cse_abstract): boolean;

    public use(object: CGameObject): boolean;
  }

  /**
   * Class to link client side object with script object entity.
   *
   * @source C++ class object_binder
   * @customConstructor object_binder
   * @group xr_client_object
   */
  export class object_binder<T = game_object> extends EngineBinding {
    public readonly object: T;

    public constructor(object: T);

    public save(packet: net_packet): void;

    public load(reader: reader): void;

    public update(delta: u32): void;

    public reload(section: string): void;

    public reinit(): void;

    public net_export(net_packet: net_packet): void;

    public net_save_relevant(): boolean;

    public net_destroy(): void;

    public net_Relcase(object: T): void;

    public net_spawn(object: cse_alife_object): boolean;

    public net_import(net_packet: net_packet): void;
  }
}
