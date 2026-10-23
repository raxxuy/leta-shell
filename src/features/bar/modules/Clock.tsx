import { createPoll } from "ags/time";

import { now } from "@/lib/time";

export default function Clock() {
  const formattedTime = () => now().format("%I:%M %p") ?? "";
  const time = createPoll(formattedTime(), 1000, () => formattedTime());

  return <label class="font-medium text-shadow-xs" label={time} />;
}
