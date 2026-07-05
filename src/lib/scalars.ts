/**
 * Semantic scalar aliases used across X-Ray script code.
 *
 * These are readability aliases over `string` / `number` primitives; they carry intent, not distinct runtime
 * behaviour, and erase completely at build time.
 */

/**
 * Named entity, section or key.
 */
export type TName = string;

/**
 * Human-readable label / caption.
 */
export type TLabel = string;

/**
 * Filesystem or resource path.
 */
export type TPath = string;

/**
 * String-based identifier.
 */
export type TStringId = string;

/**
 * Numeric identifier.
 */
export type TNumberId = number;

/**
 * Collection index.
 */
export type TIndex = number;

/**
 * Unix-like timestamp.
 */
export type TTimestamp = number;

/**
 * Probability value.
 */
export type TProbability = number;

/**
 * Distance value.
 */
export type TDistance = number;

/**
 * Direction value.
 */
export type TDirection = number;

/**
 * Duration in milliseconds.
 */
export type TDuration = number;

/**
 * Count of items.
 */
export type TCount = number;

/**
 * Rate / ratio value.
 */
export type TRate = number;

/**
 * Size value.
 */
export type TSize = number;

/**
 * Coordinate value.
 */
export type TCoordinate = number;

/**
 * Engine-style boolean expressed as `0` / `1`.
 */
export type TNotCastedBoolean = 0 | 1;

/**
 * Boolean serialized to a string.
 */
export type TStringifiedBoolean = "true" | "false";

/**
 * `nil` serialized to a string.
 */
export type TStringifiedNil = "nil";
