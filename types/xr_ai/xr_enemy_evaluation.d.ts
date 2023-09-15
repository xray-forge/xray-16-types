declare module "xray16" {
  /**
   * @source C++ class cef_storage
   * @customConstructor cef_storage
   * @group xr_enemy_evaluation
   */
  export class cef_storage extends EngineBinding {
    private constructor();

    public evaluate(str: string, game_object: game_object): f32;
    public evaluate(str: string, game_object1: game_object, game_object2: game_object): f32;
    public evaluate(str: string, game_object1: game_object, game_object2: game_object, game_object3: game_object): f32;
    public evaluate(
      str: string,
      game_object1: game_object,
      game_object2: game_object,
      game_object3: game_object,
      game_object4: game_object
    ): f32;
    public evaluate(str: string, cse_alife_object: cse_alife_object): f32;
    public evaluate(str: string, cse_alife_object1: cse_alife_object, cse_alife_object2: cse_alife_object): f32;
    public evaluate(
      str: string,
      cse_alife_object1: cse_alife_object,
      cse_alife_object2: cse_alife_object,
      cse_alife_object3: cse_alife_object
    ): f32;
    public evaluate(
      str: string,
      cse_alife_object1: cse_alife_object,
      cse_alife_object2: cse_alife_object,
      cse_alife_object3: cse_alife_object,
      cse_alife_object4: cse_alife_object
    ): f32;
  }

  /**
   * @group xr_enemy_evaluation
   */
  export function ef_storage(this: void): cef_storage;
}
