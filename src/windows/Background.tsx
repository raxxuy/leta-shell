import { createBinding, createComputed, With } from "ags";
import type { Gdk } from "ags/gtk4";
import { Align, Exclusivity, Layer } from "@/enums";
import Wallpaper from "@/services/wallpaper";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.geometry;
  const wallpaper = Wallpaper.get_default();

  const details = createComputed(
    [createBinding(wallpaper, "wallpaper")],
    (wallpaper) => ({
      source: wallpaper.source,
      width,
      height,
    }),
  );

  return (
    <window
      visible
      name="background"
      class="background"
      layer={Layer.BACKGROUND}
      gdkmonitor={gdkmonitor}
      exclusivity={Exclusivity.IGNORE}
    >
      <With value={details}>
        {(details) =>
          details.source !== "" ? (
            <box
              class="background-wallpaper"
              css={`
                background-image: url("file://${details.source}");
                min-width: ${details.width}px;
                min-height: ${details.height}px;
              `}
            />
          ) : (
            <box class="background-no-wallpaper" halign={Align.CENTER}>
              No wallpaper selected
            </box>
          )
        }
      </With>
    </window>
  );
}
