import { createMemo } from "ags";
import { createPoll } from "ags/time";
import { BarConfigContext } from "@/contexts/BarConfigContext";
import { now } from "@/lib/time";

export default function useClock() {
  const { clockFormat } = BarConfigContext.use();
  const [format] = clockFormat;

  const counter = createPoll(0, 1000, (prev) => prev + 1);

  const time = createMemo(() => {
    counter(); // tick to recompute every second
    return now().format(format()) ?? "";
  });

  return time;
}
