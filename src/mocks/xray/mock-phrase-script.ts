import { type CPhraseScript } from "xray16";

/**
 * Mock of the X-Ray engine dialog `CPhraseScript`.
 */
export class MockPhraseScript implements CPhraseScript {
  public static mock(): CPhraseScript {
    return new MockPhraseScript() as unknown as CPhraseScript;
  }

  public text: string | null = null;
  public actions: Array<string> = [];
  public disabledInfoPortions: Array<string> = [];
  public excludedInfoPortions: Array<string> = [];
  public givenInfoPortions: Array<string> = [];
  public requiredInfoPortions: Array<string> = [];
  public preconditions: Array<string> = [];

  public SetScriptText(text: string): void {
    this.text = text;
  }

  public AddPrecondition(precondition: string): void {
    this.preconditions.push(precondition);
  }

  public AddDisableInfo(infoPortion: string): void {
    this.disabledInfoPortions.push(infoPortion);
  }

  public AddDontHasInfo(infoPortion: string): void {
    this.excludedInfoPortions.push(infoPortion);
  }

  public AddGiveInfo(infoPortion: string): void {
    this.givenInfoPortions.push(infoPortion);
  }

  public AddHasInfo(infoPortion: string): void {
    this.requiredInfoPortions.push(infoPortion);
  }

  public AddAction(action: string): void {
    this.actions.push(action);
  }
}
