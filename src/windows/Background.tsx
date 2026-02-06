import { With } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import ImageWrapper from "@/components/ImageWrapper";
import { Exclusivity, Layer } from "@/enums";
import { useBackgroundConfig } from "@/hooks/useConfig";
import { useWallpaper } from "@/hooks/useWallpaper";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { source } = useWallpaper();
  const { enabled } = useBackgroundConfig();
  const { width, height } = gdkmonitor.get_geometry();

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
