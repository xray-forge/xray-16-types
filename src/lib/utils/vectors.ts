import { type Vector } from "xray16/alias";

import { createVector } from "./vector";

/**
 * Shared immutable direction/axis vectors.
 *
 * These are single shared instances (created once), not `@inline` constants — consumers must treat them as
 * read-only. Placed after `vector.ts` in the merged bundle so `createVector` is defined before these run.
 */

export const ZERO_VECTOR: Readonly<Vector> = createVector(0, 0, 0);
export const ONE_VECTOR: Readonly<Vector> = createVector(1, 1, 1);

export const X_VECTOR: Readonly<Vector> = createVector(1, 0, 0);
export const MX_VECTOR: Readonly<Vector> = createVector(-1, 0, 0);

export const Y_VECTOR: Readonly<Vector> = createVector(0, 1, 0);
export const MY_VECTOR: Readonly<Vector> = createVector(0, -1, 0);

export const Z_VECTOR: Readonly<Vector> = createVector(0, 0, 1);
export const MZ_VECTOR: Readonly<Vector> = createVector(0, 0, -1);
