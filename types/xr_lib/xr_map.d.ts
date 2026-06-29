declare module "xray16" {
  /**
   * Manages active PDA/minimap locations.
   *
   * @source C++ class CMapManager
   * @customConstructor CMapManager
   * @group xr_map
   *
   * @remarks
   * Level scripts usually work with the level-owned map manager through map spot helpers instead of creating a new
   * manager.
   */
  export class CMapManager {
    /**
     * Create a map manager wrapper.
     */
    public constructor();

    /**
     * Remove all map locations attached to an object id.
     *
     * @remarks
     * In single-player this also releases linked game-task map locations. Native location objects are destroyed on the
     * manager's deferred destroy queue.
     *
     * @param id - Game object id.
     */
    public RemoveMapLocationByObjectID(id: u16): void;

    /**
     * Remove a specific map location.
     *
     * @remarks
     * In single-player this also releases linked game-task map locations. Native location objects are destroyed on the
     * manager's deferred destroy queue.
     *
     * @param location - Location object to remove.
     */
    public RemoveMapLocation(location: CMapLocation): void;

    /**
     * Hide pointers for all map locations.
     *
     * @remarks
     * Only pointer arrows are disabled. The map spots themselves remain enabled.
     */
    public DisableAllPointers(): void;
  }

  /**
   * A single PDA/minimap spot attached to an object or user position.
   *
   * @source C++ class CMapLocation
   * @customConstructor CMapLocation
   * @group xr_map
   *
   * @remarks
   * Map locations are created by the engine or map manager. The native binding does not expose a script constructor.
   */
  export class CMapLocation {
    /**
     * Engine-created map location.
     */
    protected constructor();

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
     * @remarks
     * Returns `null` when hints are disabled for this spot.
     *
     * @returns Hint text shown for the spot.
     */
    public GetHint(): string | null;

    /**
     * @remarks
     * This is a cached value updated by the map manager.
     *
     * @returns Last calculated spot position.
     */
    public GetLastPosition(): vector2;

    /**
     * @remarks
     * This is a cached value updated by the map manager.
     *
     * @returns Level name where the spot is located.
     */
    public GetLevelName(): string;

    /**
     * @remarks
     * This is a cached value updated by the map manager.
     *
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
     * @remarks
     * Pointer state also depends on `SpotEnabled()`. A disabled spot reports its pointer as disabled.
     *
     * @returns Whether the off-screen pointer arrow is enabled.
     */
    public PointerEnabled(): boolean;

    /**
     * Set hint text shown for the spot.
     *
     * @remarks
     * Passing `disable_hint` disables hints and clears the stored hint.
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
     * @remarks
     * Disabling a spot also makes `PointerEnabled()` return `false`.
     *
     * @returns Whether the map spot is enabled.
     */
    public SpotEnabled(): boolean;

    /**
     * @remarks
     * Reads the level-map spot size. Use after the spot has been loaded by the map UI.
     *
     * @returns Spot size on the map.
     */
    public SpotSize(): vector2;
  }
}
