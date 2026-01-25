import { createBinding, createState, With } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import ImageWrapper from "@/components/ImageWrapper";
import { ContentFit, Exclusivity, Layer } from "@/enums";
import ConfigManager from "@/services/configs";
import Wallpaper from "@/services/wallpaper";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const source = createBinding(wallpaper, "source");
  const enabled = ConfigManager.bind("background", "enabled");

  const [contentFit, setContentFit] = createState(ContentFit.COVER);

  wallpaper.connect("wallpaper-changed", (_, full) => {
    if (full) setContentFit(ContentFit.CONTAIN);
    else setContentFit(ContentFit.COVER);
  });

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
              contentFit={contentFit}
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
