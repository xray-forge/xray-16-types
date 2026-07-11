import { type CPhraseScript } from "xray16";

/**
 * Initial state for a mocked `CPhraseScript`.
 */
export interface IMockPhraseScriptConfig {
  text?: string | null;
  actions?: Array<string>;
  preconditions?: Array<string>;
  disabledInfoPortions?: Array<string>;
  excludedInfoPortions?: Array<string>;
  givenInfoPortions?: Array<string>;
  requiredInfoPortions?: Array<string>;
}

/**
 * Mock of the X-Ray engine dialog `CPhraseScript`.
 */
export class MockPhraseScript implements CPhraseScript {
  public static create(config: IMockPhraseScriptConfig = {}): MockPhraseScript {
    const script: MockPhraseScript = new MockPhraseScript();

    script.text = config.text ?? null;
    script.actions = config.actions ?? [];
    script.preconditions = config.preconditions ?? [];
    script.disabledInfoPortions = config.disabledInfoPortions ?? [];
    script.excludedInfoPortions = config.excludedInfoPortions ?? [];
    script.givenInfoPortions = config.givenInfoPortions ?? [];
    script.requiredInfoPortions = config.requiredInfoPortions ?? [];

    return script;
  }

  public static mock(config: IMockPhraseScriptConfig = {}): CPhraseScript {
    return MockPhraseScript.create(config);
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
