import { type vector } from "xray16";

import { createVector } from "./vector";

/**
 * Shared immutable direction/axis vectors.
 *
 * These are single shared instances (created once), not `@inline` constants — consumers must treat them as
 * read-only. Placed after `vector.ts` in the merged bundle so `createVector` is defined before these run.
 */

export const ZERO_VECTOR: Readonly<vector> = createVector(0, 0, 0);
export const ONE_VECTOR: Readonly<vector> = createVector(1, 1, 1);

export const X_VECTOR: Readonly<vector> = createVector(1, 0, 0);
export const MX_VECTOR: Readonly<vector> = createVector(-1, 0, 0);

export const Y_VECTOR: Readonly<vector> = createVector(0, 1, 0);
export const MY_VECTOR: Readonly<vector> = createVector(0, -1, 0);

export const Z_VECTOR: Readonly<vector> = createVector(0, 0, 1);
export const MZ_VECTOR: Readonly<vector> = createVector(0, 0, -1);
