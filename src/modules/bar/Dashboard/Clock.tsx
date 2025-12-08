import { createState, onCleanup } from "ags";
import { interval } from "ags/time";
import { getConfig } from "@/lib/config";
import { now } from "@/lib/utils";

const {
  modules: { clock },
} = getConfig("bar");

export default function Clock() {
  const getCurrentTime = () => now() as string;
  const [time, setTime] = createState<string>(getCurrentTime());

  const clockInterval = interval(1000, () => setTime(getCurrentTime()));

  onCleanup(() => clockInterval.cancel());

  return (
    <label
      class="clock text-large"
      label={time((t) => t.format(clock.format))}
      tooltipText={time((t) => t.format(clock.tooltipFormat))}
    />
  );
}
