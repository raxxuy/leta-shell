import { createPoll } from "@gnim-js/io/timer";
import type { WindowProps } from "@/components/types";
import { Align } from "@/enums";
import { formatTime, now } from "@/lib/time";
import Workspaces from "./modules/Workspaces";

export default function BarWindow({
  application,
  monitor,
  visible,
}: WindowProps) {
  const clock = createPoll(now(), 1000, () => now());

  return (
    <layerwindow
      anchor={["top", "left", "right"]}
      application={application}
      class="min-h-8 border-b border-b-white/20 bg-zinc-950/95"
      exclusivity="exclusive"
      monitor={monitor}
      name="bar"
      namespace="leta-shell"
      visible={visible}
    >
      <centerbox class="px-4">
        <box halign={Align.START} slot="start" valign={Align.CENTER}>
          <Workspaces />
        </box>

        <box halign={Align.END} slot="end" valign={Align.CENTER}>
          <label
            class="text-sm font-semibold text-zinc-300"
            label={clock.as(formatTime)}
          />
        </box>
      </centerbox>
    </layerwindow>
  );
}
