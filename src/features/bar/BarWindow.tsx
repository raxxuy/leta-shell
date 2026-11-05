import type Gdk from "gi://Gdk?version=4.0";
import type Gtk from "gi://Gtk?version=4.0";
import { createPoll } from "@gnim-js/io/timer";
import { Align } from "@/enums";
import { formatTime, now } from "@/lib/time";
import Workspaces from "./modules/Workspaces";

interface BarWindowProps {
  application: Gtk.Application;
  monitor: Gdk.Monitor;
}

export default function BarWindow({ application, monitor }: BarWindowProps) {
  const clock = createPoll(now(), 1000, () => now());

  return (
    <layerwindow
      anchor={["top", "left", "right"]}
      application={application}
      class="min-h-8 border-b border-b-white/20 bg-zinc-950/95"
      exclusivity="exclusive"
      monitor={monitor}
      namespace="leta-shell"
      visible
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
