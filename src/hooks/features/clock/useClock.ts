import { createMemo } from "ags";
import { createPoll } from "ags/time";
import useConfig from "@/hooks/services/useConfig";
import { now } from "@/lib/time";

export default function useClock() {
  const [format] = useConfig("bar", "settings.clock.format");

  const counter = createPoll(0, 1000, (prev) => prev + 1);

  const time = createMemo(() => {
    counter(); // tick to recompute every second
    return now().format(format()) ?? "";
  });

  return time;
}
