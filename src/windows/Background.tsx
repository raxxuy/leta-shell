import { createBinding, With } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Layer } from "@/enums";
import ConfigManager from "@/services/configs";
import Wallpaper from "@/services/wallpaper";
import ImageWrapper from "@/widgets/ImageWrapper";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const configManager = ConfigManager.get_default();
  const source = createBinding(wallpaper, "source");
  const enabled = configManager.bind("background", "enabled");

  return (
    <window
      application={app}
      class="background"
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      layer={Layer.BACKGROUND}
      name="background"
      namespace="leta-shell"
      visible={enabled}
    >
      <With value={source}>
        {(source) =>
          source ? (
            <ImageWrapper
              file
              heightRequest={height}
              src={source}
              widthRequest={width}
            />
          ) : (
            <label class="text-3xl text-white" label="No wallpaper selected" />
          )
        }
      </With>
    </window>
  );
}
