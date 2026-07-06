import { game, time_global, verify_if_thread_is_running } from "xray16";

import { type TDuration, type TTimestamp } from "../scalars";
import { type Nillable } from "../types";

/**
 * Lock script execution based on game time.
 *
 * @param timeToWait - Game-time duration to wait, or null to yield once.
 */
export function waitGame(timeToWait: Nillable<TDuration> = null): void {
  verify_if_thread_is_running();

  if (timeToWait === null) {
    coroutine.yield();
  } else {
    const timeToStop: TTimestamp = game.time() + timeToWait;

    while (game.time() <= timeToStop) {
      coroutine.yield();
    }
  }
}

/**
 * Lock script execution based on real time.
 *
 * @param timeToWait - Real-time duration to wait, or null to yield once.
 */
export function wait(timeToWait: Nillable<TDuration> = null): void {
  verify_if_thread_is_running();

  if (timeToWait === null) {
    coroutine.yield();
  } else {
    const timeToStop: TTimestamp = time_global() + timeToWait;

    while (time_global() <= timeToStop) {
      coroutine.yield();
    }
  }
}
