import type { WindowProps } from "@/components/types";
import { Cursors } from "@/constants";
import { Align } from "@/enums";
import { useTheme } from "@/hooks/useTheme";
import { toggle } from "@/lib/requests";
import { symbolic } from "@/lib/svg";
import Clock from "./modules/Clock";
import Workspaces from "./modules/Workspaces";

export default function BarWindow({
  application,
  monitor,
  visible,
}: WindowProps) {
  const { spacing, pixelSize } = useTheme();

  return (
    <layerwindow
      anchor={["top", "left", "right"]}
      application={application}
      exclusivity="exclusive"
      monitor={monitor}
      name="bar"
      namespace="leta-shell"
      visible={visible}
    >
      <centerbox class="border-b-secondary/15 min-h-8 border-b px-4">
        <box halign={Align.START} slot="start" valign={Align.CENTER}>
          <Workspaces />
        </box>
        <box
          halign={Align.END}
          slot="end"
          spacing={spacing.sm}
          valign={Align.CENTER}
        >
          <button
            class="rounded-lg p-1 transition-[background-color,opacity] duration-150 ease-in-out hover:bg-current/12 focus-visible:bg-current/12 active:bg-current/22 active:opacity-70"
            cursor={Cursors.POINTER}
            onClicked={() => toggle(application, "wallpaper")}
            tooltipText="Toggle wallpaper"
          >
            <svg class="text-zinc-300" pixelSize={pixelSize.lg}>
              {symbolic(
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image preview-icon"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
              )}
            </svg>
          </button>
          <Clock />
        </box>
      </centerbox>
    </layerwindow>
  );
}
