import { For } from "ags";
import { THUMBNAIL_HEIGHT } from "@/constants";
import { Align, PolicyType } from "@/enums";
import { usePicturesService } from "@/hooks/services/usePicturesService";
import { useSpacing } from "@/hooks/services/useSpacing";
import { useWallpaperService } from "@/hooks/services/useWallpaperService";
import { cleanupWidget } from "@/lib/theme";
import ThumbnailButton from "./ThumbnailButton";

interface WallpaperSelectorProps {
  connector: string;
  width: number;
}

export default function WallpaperSelectorModule({
  connector,
  width,
}: WallpaperSelectorProps) {
  const spacing = useSpacing();
  const { pictures, getThumbnail } = usePicturesService();
  const { setWallpaper } = useWallpaperService(connector);

  return (
    <box class="m-[5px_10px_15px] rounded-2xl border border-tertiary/20 bg-zinc-950/95 px-6 py-4 shadow-lg">
      <scrolledwindow
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
                onClick={() => setWallpaper(picture)}
                source={getThumbnail(picture)}
              />
            )}
          </For>
        </box>
      </scrolledwindow>
    </box>
  );
}
