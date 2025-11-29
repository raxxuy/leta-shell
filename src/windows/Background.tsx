import { createBinding } from "ags";
import type { Gdk } from "ags/gtk4";
import { Align, Exclusivity, Layer } from "@/enums";
import Wallpaper from "@/services/wallpaper";
import FallbackLabel from "@/widgets/FallbackLabel";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const source = createBinding(wallpaper, "source");

  return (
    <window
      visible
      name="background"
      class="background"
      namespace="leta-shell"
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
        <FallbackLabel
          hexpand
          halign={Align.CENTER}
          source={source}
          label=""
          fallback="No wallpaper selected"
        />
      </box>
    </window>
  );
}
