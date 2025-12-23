import { createBinding, With } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Layer } from "@/enums";
import Wallpaper from "@/services/wallpaper";
import ImageWrapper from "@/widgets/ImageWrapper";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const source = createBinding(wallpaper, "source");

  return (
    <window
      visible
      application={app}
      name="background"
      class="background"
      namespace="leta-shell"
      layer={Layer.BACKGROUND}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
    >
      <With value={source}>
        {(source) =>
          source ? (
            <ImageWrapper
              file
              src={source}
              widthRequest={width}
              heightRequest={height}
            />
          ) : (
            <label class="text-3xl text-white" label="No wallpaper selected" />
          )
        }
      </With>
    </window>
  );
}
