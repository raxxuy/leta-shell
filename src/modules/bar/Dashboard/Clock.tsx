import { createState, onCleanup } from "ags";
import { interval } from "ags/time";
import { now } from "@/lib/utils/time";

export default function Clock() {
  const getCurrentTime = () => now().format("%H:%M") as string;
  const [time, setTime] = createState<string>(getCurrentTime());

  const clockInterval = interval(1000, () => setTime(getCurrentTime()));

  onCleanup(() => clockInterval.cancel());

  return <label class="dashboard-clock" label={time} />;
}
