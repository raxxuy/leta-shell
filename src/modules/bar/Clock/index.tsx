import { createMemo, createState, onCleanup } from "ags";
import { interval } from "ags/time";
import { useConfig } from "@/hooks/useConfig";
import { now } from "@/lib/time/now";

export default function Clock() {
  const [format] = useConfig("bar", "settings.clock.format");

  const [tick, setTick] = createState(0);
  const clockInterval = interval(1000, () => setTick((t) => t + 1));

  const time = createMemo(() => {
    tick();
    return now().format(format());
  });

  onCleanup(() => clockInterval.cancel());

  return <label class="font-bold text-sm" label={time(String)} />;
}
