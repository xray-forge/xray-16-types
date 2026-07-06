import { type CPhraseScript } from "xray16";

/**
 * Mock of the X-Ray engine dialog `CPhraseScript`.
 */
export class MockPhraseScript {
  public static mock(): CPhraseScript {
    return new MockPhraseScript() as unknown as CPhraseScript;
  }

  public text: string | null = null;
  public actions: Array<string> = [];
  public preconditions: Array<string> = [];

  public SetScriptText(text: string): void {
    this.text = text;
  }

  public AddPrecondition(precondition: string): void {
    this.preconditions.push(precondition);
  }

  public AddAction(action: string): void {
    this.actions.push(action);
  }
}
