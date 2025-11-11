import { createBinding } from "ags";
import type { Gdk } from "ags/gtk4";
import { Align, Exclusivity, Layer } from "@/enums";
import Wallpaper from "@/services/wallpaper";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const source = createBinding(wallpaper, "source");

  return (
    <window
      visible
      name="background"
      class="background"
      layer={Layer.BACKGROUND}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
    >
      <box
        widthRequest={width}
        heightRequest={height}
        class="background-wallpaper"
        css={source(
          (source) => `
            background-image: url("file://${source}");
          `,
        )}
      >
        <label
          hexpand
          halign={Align.CENTER}
          label={source((source) => (!source ? "No wallpaper selected" : ""))}
        />
      </box>
    </window>
  );
}
