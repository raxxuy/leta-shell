import { For } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";

import Popup from "@/components/Popup";
import { THUMBNAIL_HEIGHT } from "@/constants";
import { Align, PolicyType } from "@/enums";
import { useHorizontalDragScroll } from "@/hooks/interactions/useHorizontalDragScoll";
import { usePictures } from "@/hooks/services/usePictures";
import { cleanupWidget } from "@/lib/theme/plugin";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";
import { useWallpaper, WallpaperProvider } from "@/providers/WallpaperProvider";
import ThumbnailButton from "./ThumbnailButton";
import { useThumbnail } from "./useThumbnail";

const WallpaperSelectorWindowInner = ({
  gdkmonitor,
}: {
  gdkmonitor: Gdk.Monitor;
}) => {
  const { colors, spacing } = useTheme();
  const { pictures } = usePictures();
  const { setWallpaper } = useWallpaper();
  const { ref: scrollRef, dragged } = useHorizontalDragScroll();

  const { width } = gdkmonitor.geometry;

  return (
    <Popup
      animation="popover"
      application={app}
      exclusivity="ignore"
      gdkmonitor={gdkmonitor}
      keymode="exclusive"
      layer="overlay"
      name="wallpaper-selector"
      namespace="leta-shell"
    >
      <box
        class={colors.base(
          (b) =>
            `m-[5px_10px_15px] rounded-2xl border border-tertiary/20 bg-${b} px-6 py-4 shadow-lg`,
        )}
      >
        <scrolledwindow
          $={scrollRef}
          class="rounded-2xl"
          heightRequest={THUMBNAIL_HEIGHT * 1.2}
          hscrollbarPolicy={PolicyType.EXTERNAL}
          kineticScrolling
          vscrollbarPolicy={PolicyType.NEVER}
          widthRequest={width}
        >
          <box hexpand spacing={spacing.xl} valign={Align.CENTER}>
            <For cleanup={cleanupWidget} each={pictures}>
              {(picture) => (
                <ThumbnailButton
                  onClicked={() =>
                    !dragged.peek() &&
                    setWallpaper(gdkmonitor.connector ?? "", picture)
                  }
                  source={useThumbnail(picture)}
                />
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>
    </Popup>
  );
};

export default function WallpaperSelectorWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <ThemeProvider>
      {() => (
        <WallpaperProvider>
          {() => <WallpaperSelectorWindowInner gdkmonitor={gdkmonitor} />}
        </WallpaperProvider>
      )}
    </ThemeProvider>
  );
}
