import { createPoll } from "@gnim-js/io/timer";
import { formatTime, now } from "@/lib/time";

export default function Clock() {
  const clock = createPoll(now(), 1000, () => now());

  return (
    <label
      class="text-sm font-semibold text-zinc-300"
      label={clock.as(formatTime)}
    />
  );
}
