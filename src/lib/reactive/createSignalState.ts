/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { createState, onCleanup } from "ags";
import type GObject from "ags/gobject";
import type { SignalOf } from "@/types/gobject";

export const createSignalState = <T, Target extends GObject.Object>(
  target: Target,
  signal: SignalOf<Target>,
  get: (...args: any[]) => T,
) => {
  const [value, setValue] = createState<T>(get());

  const id = target.connect(signal, (...args) => setValue(get(...args)));
  onCleanup(() => target.disconnect(id));

  return value;
};
