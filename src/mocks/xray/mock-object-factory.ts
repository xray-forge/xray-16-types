import { type object_factory, type TXR_class_key } from "xray16";

/**
 * Mock of the X-Ray engine game object factory.
 */
export class MockObjectFactory implements object_factory {
  public static create(): MockObjectFactory {
    return new MockObjectFactory();
  }

  public static mock(): object_factory {
    return new MockObjectFactory();
  }

  public registeredClientClasses: Set<string> = new Set();
  public registeredServerClasses: Set<string> = new Set();
  public registeredClassIds: Set<string> = new Set();
  public registeredScriptClassIds: Set<string> = new Set();

  public register(
    clientObjectClass: string,
    serverObjectClass: string,
    clsId: string,
    scriptClsId: TXR_class_key
  ): void;
  public register(clientObjectClass: string, clsId: string, scriptClsId: TXR_class_key): void;
  public register(...args: Array<string>): void {
    this.registeredClientClasses.add(args[0]);

    if (args.length === 4) {
      this.registeredServerClasses.add(args[1]);
      this.registeredClassIds.add(args[2]);
      this.registeredScriptClassIds.add(args[3]);
    } else {
      this.registeredClassIds.add(args[1]);
      this.registeredScriptClassIds.add(args[2]);
    }
  }
}

/**
 * Mock generic object factory.
 */
export function mockObjectFactory(): [object_factory, MockObjectFactory] {
  const factory: MockObjectFactory = new MockObjectFactory();

  return [factory as unknown as object_factory, factory];
}
