declare module "xray16" {
  /**
   * Enemy evaluation storage binding.
   *
   * @source C++ class cef_storage
   * @customConstructor cef_storage
   * @group xr_enemy_evaluation
   */
  export class cef_storage extends EngineBinding {
    /**
     * Engine-owned evaluation function storage.
     */
    private constructor();

    /**
     * Run an evaluation function for a live game object.
     *
     * @remarks Prefer the four-object overload for non-ALife item evaluators; shorter engine overloads do not fill
     * item slots.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(functionName: string, member: game_object): f32;

    /**
     * Run an evaluation function for a live actor and enemy pair.
     *
     * @remarks Prefer the four-object overload for non-ALife item evaluators; shorter engine overloads do not fill
     * item slots.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @param enemy - Object used as the target.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(functionName: string, member: game_object, enemy: game_object): f32;

    /**
     * Run an evaluation function for a live actor, target, and actor item.
     *
     * @remarks Prefer the four-object overload for non-ALife item evaluators; shorter engine overloads do not fill
     * item slots.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @param enemy - Object used as the target.
     * @param memberItem - Item owned or considered by the evaluating actor.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(functionName: string, member: game_object, enemy: game_object, memberItem: game_object): f32;

    /**
     * Run an evaluation function for live actor and target context.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @param enemy - Object used as the target.
     * @param memberItem - Item owned or considered by the evaluating actor.
     * @param enemyItem - Item owned or considered by the target.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(
      functionName: string,
      member: game_object,
      enemy: game_object,
      memberItem: game_object,
      enemyItem: game_object
    ): f32;

    /**
     * Run an evaluation function for an ALife object.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(functionName: string, member: cse_alife_object): f32;

    /**
     * Run an evaluation function for an ALife actor and enemy pair.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @param enemy - Object used as the target.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(functionName: string, member: cse_alife_object, enemy: cse_alife_object): f32;

    /**
     * Run an evaluation function for ALife actor, target, and actor item context.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @param enemy - Object used as the target.
     * @param memberItem - Item owned or considered by the evaluating actor.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(
      functionName: string,
      member: cse_alife_object,
      enemy: cse_alife_object,
      memberItem: cse_alife_object
    ): f32;

    /**
     * Run an evaluation function for full ALife actor and target context.
     *
     * @param functionName - Registered evaluation function name.
     * @param member - Object used as the evaluating actor.
     * @param enemy - Object used as the target.
     * @param memberItem - Item owned or considered by the evaluating actor.
     * @param enemyItem - Item owned or considered by the target.
     * @returns Function score, or `0` when the function or object role is invalid.
     */
    public evaluate(
      functionName: string,
      member: cse_alife_object,
      enemy: cse_alife_object,
      memberItem: cse_alife_object,
      enemyItem: cse_alife_object
    ): f32;
  }

  /**
   * Get the global storage for engine evaluation functions.
   *
   * @group xr_enemy_evaluation
   *
   * @returns Evaluation function storage singleton.
   */
  export function ef_storage(this: void): cef_storage;
}
