import { createBinding } from "ags";
import type { Gdk } from "ags/gtk4";
import { Align, Exclusivity, Layer, Overflow } from "@/enums";
import Wallpaper from "@/services/wallpaper";
import FallbackLabel from "@/widgets/FallbackLabel";
import ImageWrapper from "@/widgets/ImageWrapper";

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
      <ImageWrapper
        file
        src={source}
        class="background-wallpaper"
        widthRequest={width}
        heightRequest={height}
        overflow={Overflow.HIDDEN}
      >
        <FallbackLabel
          src={source}
          label=""
          fallback="No wallpaper selected"
          halign={Align.CENTER}
          hexpand
        />
      </ImageWrapper>
    </window>
  );
}
