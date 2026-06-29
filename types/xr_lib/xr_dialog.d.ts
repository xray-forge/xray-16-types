declare module "xray16" {
  /**
   * Script rules attached to a dialog phrase.
   *
   * @source C++ class CPhraseScript
   * @customConstructor CPhraseScript
   * @group xr_dialog
   */
  export class CPhraseScript {
    /**
     * Run a script action after the phrase is spoken.
     *
     * @param function_name - Script function name.
     */
    public AddAction(function_name: string): void;

    /**
     * Disable an info portion when phrase actions run.
     *
     * @param info_portion - Info portion id.
     */
    public AddDisableInfo(info_portion: string): void;

    /**
     * Require an info portion to be absent before the phrase is available.
     *
     * @param info_portion - Info portion id.
     */
    public AddDontHasInfo(info_portion: string): void;

    /**
     * Give an info portion when phrase actions run.
     *
     * @param info_portion - Info portion id.
     */
    public AddGiveInfo(info_portion: string): void;

    /**
     * Require an info portion before the phrase is available.
     *
     * @param info_portion - Info portion id.
     */
    public AddHasInfo(info_portion: string): void;

    /**
     * Add a script predicate checked before the phrase is available.
     *
     * @param function_name - Script function name.
     */
    public AddPrecondition(function_name: string): void;

    /**
     * Use a script function to provide phrase text.
     *
     * @param function_name - Script function name.
     */
    public SetScriptText(function_name: string): void;
  }

  /**
   * Runtime phrase in a phrase dialog.
   *
   * @source C++ class CPhrase
   * @customConstructor CPhrase
   * @group xr_dialog
   */
  export class CPhrase {
    /**
     * @returns Script helper used to configure phrase conditions and actions.
     */
    public GetPhraseScript(): CPhraseScript;
  }

  /**
   * Phrase dialog built or extended from scripts.
   *
   * @source C++ class CPhraseDialog
   * @customConstructor CPhraseDialog
   * @group xr_dialog
   */
  export class CPhraseDialog {
    /**
     * Add a phrase to the dialog tree.
     *
     * @param text - Text or string table id.
     * @param phrase_id - New phrase id.
     * @param prev_phrase_id - Parent phrase id.
     * @param goodwill_level - Minimum goodwill required for the phrase.
     * @returns Created phrase.
     */
    public AddPhrase(text: string, phrase_id: string, prev_phrase_id: string, goodwill_level: i32): CPhrase;
  }
}
