import { createState, onCleanup } from "ags";
import { interval } from "ags/time";
import { getConfig } from "@/lib/config";
import { now } from "@/lib/utils/time";

const {
  modules: { clock },
} = getConfig("bar");

export default function Clock() {
  const getCurrentTime = () => now(clock.format) as string;
  const [time, setTime] = createState<string>(getCurrentTime());

  const clockInterval = interval(1000, () => setTime(getCurrentTime()));

  onCleanup(() => clockInterval.cancel());

  return <label class="clock" label={time} />;
}
