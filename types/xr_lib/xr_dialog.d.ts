declare module "xray16" {
  /**
   * @source C++ class CPhraseScript
   * @customConstructor CPhraseScript
   * @group xr_dialog
   */
  export class CPhraseScript {
    public AddAction(value: string): void;

    public AddDisableInfo(value: string): void;

    public AddDontHasInfo(value: string): void;

    public AddGiveInfo(value: string): void;

    public AddHasInfo(value: string): void;

    public AddPrecondition(value: string): void;

    public SetScriptText(value: string): void;
  }

  /**
   * @source C++ class CPhrase
   * @customConstructor CPhrase
   * @group xr_dialog
   */
  export class CPhrase {
    public GetPhraseScript(): CPhraseScript;
  }

  /**
   * @source C++ class CPhraseDialog
   * @customConstructor CPhraseDialog
   * @group xr_dialog
   */
  export class CPhraseDialog {
    public AddPhrase(text: string, phrase_id: string, prev_phrase_id: string, goodwill_level: i32): CPhrase;
  }
}
