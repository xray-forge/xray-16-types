declare module "xray16" {
  /**
   * @source C++ class CMapManager
   * @customConstructor CMapManager
   * @group xr_map
   */
  export class CMapManager {
    public constructor();

    public RemoveMapLocationByObjectID(id: u16): void;
    public RemoveMapLocation(spot_type: string, id: u16): void;
    public DisableAllPointers(): void;
  }

  /**
   * @source C++ class CMapLocation
   * @customConstructor CMapLocation
   * @group xr_map
   */
  export class CMapLocation {
    public constructor();

    public Collidable(): boolean;
    public DisablePointer(): void;
    public DisableSpot(): void;
    public EnablePointer(): void;
    public EnableSpot(): void;
    public GetHint(): string;
    public GetLastPosition(): vector2;
    public GetLevelName(): string;
    public GetPosition(): vector2;
    public HighlightSpot(state: boolean, color: fcolor): void;
    public HintEnabled(): boolean;
    public IsUserDefined(): boolean;
    public ObjectID(): u16;
    public PointerEnabled(): boolean;
    public SetHint(hint: string): void;
    public SetUserDefinedFlag(state: boolean): void;
    public SpotEnabled(): boolean;
    public SpotSize(): vector2;
  }
}
