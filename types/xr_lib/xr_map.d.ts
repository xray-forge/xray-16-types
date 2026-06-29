declare module "xray16" {
  /**
   * Manages active PDA/minimap locations.
   *
   * @source C++ class CMapManager
   * @customConstructor CMapManager
   * @group xr_map
   */
  export class CMapManager {
    public constructor();

    /**
     * Remove all map locations attached to an object id.
     *
     * @param id - Game object id.
     */
    public RemoveMapLocationByObjectID(id: u16): void;

    /**
     * Remove a specific map location.
     *
     * @param location - Location object to remove.
     */
    public RemoveMapLocation(location: CMapLocation): void;

    /**
     * Hide pointers for all map locations.
     */
    public DisableAllPointers(): void;
  }

  /**
   * A single PDA/minimap spot attached to an object or user position.
   *
   * @source C++ class CMapLocation
   * @customConstructor CMapLocation
   * @group xr_map
   */
  export class CMapLocation {
    public constructor();

    /**
     * @returns Whether the map spot participates in UI collision.
     */
    public Collidable(): boolean;

    /**
     * Hide the off-screen pointer arrow.
     */
    public DisablePointer(): void;

    /**
     * Hide the map spot.
     */
    public DisableSpot(): void;

    /**
     * Show the off-screen pointer arrow.
     */
    public EnablePointer(): void;

    /**
     * Show the map spot.
     */
    public EnableSpot(): void;

    /**
     * @returns Hint text shown for the spot.
     */
    public GetHint(): string;

    /**
     * @returns Last calculated spot position.
     */
    public GetLastPosition(): vector2;

    /**
     * @returns Level name where the spot is located.
     */
    public GetLevelName(): string;

    /**
     * @returns Current spot position on the map.
     */
    public GetPosition(): vector2;

    /**
     * Highlight or clear the spot highlight.
     *
     * @param state - Whether highlighting is enabled.
     * @param color - Highlight color.
     */
    public HighlightSpot(state: boolean, color: fcolor): void;

    /**
     * @returns Whether a hint can be shown for the spot.
     */
    public HintEnabled(): boolean;

    /**
     * @returns Whether this is a user-created spot.
     */
    public IsUserDefined(): boolean;

    /**
     * @returns Object id this spot tracks.
     */
    public ObjectID(): u16;

    /**
     * @returns Whether the off-screen pointer arrow is enabled.
     */
    public PointerEnabled(): boolean;

    /**
     * Set hint text shown for the spot.
     *
     * @param hint - Hint text or string table id.
     */
    public SetHint(hint: string): void;

    /**
     * Mark the spot as user-created or engine-owned.
     *
     * @param state - User-defined flag.
     */
    public SetUserDefinedFlag(state: boolean): void;

    /**
     * @returns Whether the map spot is enabled.
     */
    public SpotEnabled(): boolean;

    /**
     * @returns Spot size on the map.
     */
    public SpotSize(): vector2;
  }
}
