declare module "xray16" {
  /**
   * Script rules attached to a dialog phrase.
   *
   * @source C++ class CPhraseScript
   * @customConstructor CPhraseScript
   * @group xr_dialog
   *
   * @remarks
   * Phrase scripts are evaluated by the dialog engine against the current actor/NPC speakers. Info portion checks use
   * the actor info registry.
   */
  export class CPhraseScript {
    /**
     * Run a script action after the phrase is spoken.
     *
     * @remarks
     * In active two-speaker dialogs the function receives `(speaker, listener, dialog_id, phrase_id)`. In simpler
     * dialog checks it receives `(speaker, dialog_id)`.
     *
     * @throws If the function name cannot be resolved.
     *
     * @param function_name - Script function name.
     */
    public AddAction(function_name: string): void;

    /**
     * Disable an info portion when phrase actions run.
     *
     * @remarks
     * Applied after the phrase is accepted and its actions run.
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
     * @remarks
     * Applied after the phrase is accepted and its actions run.
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
     * @remarks
     * In active two-speaker dialogs the function receives `(speaker, listener, dialog_id, phrase_id, next_phrase_id)`.
     * It should return `true` when the phrase may be shown.
     *
     * @throws If the function name cannot be resolved.
     *
     * @param function_name - Script function name.
     */
    public AddPrecondition(function_name: string): void;

    /**
     * Use a script function to provide phrase text.
     *
     * @remarks
     * The function is called when the dialog asks for phrase text. Use it for text that depends on the current speaker
     * or dialog state.
     *
     * @throws If the function name cannot be resolved.
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
   *
   * @remarks
   * Phrase instances are owned by the dialog graph. Script code usually configures them immediately after
   * `CPhraseDialog.AddPhrase`.
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
   *
   * @remarks
   * A phrase dialog is a directed phrase graph. Phrase id `"0"` is the start phrase used by loaded XML dialogs.
   */
  export class CPhraseDialog {
    /**
     * Add a phrase to the dialog tree.
     *
     * @remarks
     * `prev_phrase_id` creates the edge from the previous phrase to the new one. Pass an empty string for a root phrase.
     * Reusing an existing `phrase_id` returns the existing phrase and still links it from `prev_phrase_id`.
     *
     * @param text - Text or string table id.
     * @param phrase_id - New phrase id.
     * @param prev_phrase_id - Parent phrase id, or an empty string.
     * @param goodwill_level - Goodwill value used when the engine orders available replies.
     * @returns Created phrase.
     */
    public AddPhrase(text: string, phrase_id: string, prev_phrase_id: string, goodwill_level: i32): CPhrase;
  }
}
