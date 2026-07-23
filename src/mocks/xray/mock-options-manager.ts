import { jest } from "@jest/globals";
import { type COptionsManager } from "xray16";

/**
 * Mock of the X-Ray main-menu options manager.
 */
export class MockCOptionsManager implements COptionsManager {
  public static instances: Array<MockCOptionsManager> = [];
  public static needsSystemRestart: boolean = false;

  public static create(): MockCOptionsManager {
    return new MockCOptionsManager();
  }

  public static mock(): COptionsManager {
    return new MockCOptionsManager();
  }

  public static reset(): void {
    this.instances = [];
    this.needsSystemRestart = false;
  }

  public constructor() {
    MockCOptionsManager.instances.push(this);
  }

  public NeedSystemRestart = jest.fn(() => MockCOptionsManager.needsSystemRestart);
  public NeedVidRestart = jest.fn(() => false);
  public OptionsPostAccept = jest.fn();
  public SaveBackupValues = jest.fn();
  public SaveValues = jest.fn();
  public SendMessage2Group = jest.fn();
  public SetCurrentValues = jest.fn();
  public UndoGroup = jest.fn();
}
