import type Gdk from "gi://Gdk?version=4.0";
import GLib from "gi://GLib?version=2.0";
import type Gtk from "gi://Gtk?version=4.0";
import { createPoll } from "@gnim-js/io/timer";
import { Align } from "@/enums";
import Workspaces from "./modules/Workspaces";

// Shared "liquid glass" capsule look
const glass = "rounded-full border border-white/70 bg-white/80 text-zinc-900";

export function BarWindow({
  application,
  monitor,
}: {
  application: Gtk.Application;
  monitor: Gdk.Monitor;
}) {
  const clock = createPoll(GLib.DateTime.new_now_local(), 1000, () =>
    GLib.DateTime.new_now_local(),
  );

  return (
    <layerwindow
      anchor={["top", "left", "right"]}
      application={application}
      exclusivity="exclusive"
      monitor={monitor}
      namespace="leta-shell"
      visible
    >
      <centerbox class="m-[6px_10px_2px] min-h-9">
        <box
          class={`${glass} min-h-9 px-3`}
          halign={Align.START}
          slot="start"
          valign={Align.CENTER}
        >
          <Workspaces />
        </box>

        <box
          class={`${glass} min-h-9 space-x-2 px-4`}
          halign={Align.END}
          slot="end"
          valign={Align.CENTER}
        >
          <label
            class="text-sm font-medium text-zinc-600"
            label={clock.as((time) => time?.format("%a %b %e") ?? "")}
          />
          <label
            class="text-sm font-semibold text-zinc-900"
            label={clock.as((time) => time?.format("%H:%M") ?? "")}
          />
        </box>
      </centerbox>
    </layerwindow>
  );
}

export default BarWindow;
