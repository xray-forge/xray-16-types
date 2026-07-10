import { type game_object, type net_packet, type object_binder, type reader } from "xray16";

import { MockLuabindClass } from "./mock-luabind";
import { type MockNetProcessor } from "./mock-net-processor";

/**
 * Mock of the X-Ray engine object binder (client object lifecycle wrapper).
 */
export class MockObjectBinder extends MockLuabindClass implements object_binder {
  public static asMock(binder: object_binder): MockObjectBinder {
    return binder as unknown as MockObjectBinder;
  }

  public canSpawn: boolean = true;

  public constructor(public object: game_object) {
    super();
  }

  public net_Relcase(): void {}

  public net_destroy(): void {}

  public net_export(): void {}

  public net_import(): void {}

  public net_save_relevant(): boolean {
    return false;
  }

  public net_spawn(): boolean {
    return this.canSpawn;
  }

  public reinit(): void {}

  public reload(): void {}

  public save(packet: net_packet): void {
    (packet as unknown as MockNetProcessor).w_stringZ("save_from_" + this.constructor.name);
  }

  public load(packet: reader): void {
    (packet as unknown as MockNetProcessor).r_stringZ();
  }

  public update(): void {}
}
