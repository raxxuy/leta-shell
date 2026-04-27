import { onCleanup } from "ags";
import { interval } from "ags/time";

export function createInterval(ms: number, callback: () => void) {
  const timer = interval(ms, callback);

  onCleanup(() => timer.cancel());

  return timer;
}
