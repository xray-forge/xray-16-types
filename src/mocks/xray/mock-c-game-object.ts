import { jest } from "@jest/globals";
import type { CGameObject } from "xray16";

/**
 * Minimal native client-object base shared by engine wrapper mocks.
 */
export class MockCGameObject implements CGameObject {
  public __name: string = "CGameObject";

  public Visual = jest.fn() as unknown as jest.MockedFunction<CGameObject["Visual"]>;

  public getEnabled = jest.fn() as unknown as jest.MockedFunction<CGameObject["getEnabled"]>;

  public _construct = jest.fn() as unknown as jest.MockedFunction<CGameObject["_construct"]>;

  public net_Import = jest.fn() as unknown as jest.MockedFunction<CGameObject["net_Import"]>;

  public getVisible = jest.fn() as unknown as jest.MockedFunction<CGameObject["getVisible"]>;

  public net_Export = jest.fn() as unknown as jest.MockedFunction<CGameObject["net_Export"]>;

  public net_Spawn = jest.fn() as unknown as jest.MockedFunction<CGameObject["net_Spawn"]>;

  public use = jest.fn() as unknown as jest.MockedFunction<CGameObject["use"]>;
}
