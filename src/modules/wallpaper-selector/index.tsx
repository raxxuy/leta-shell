import { For } from "ags";
import type { Gtk } from "ags/gtk4";
import { Align, PolicyType } from "@/enums";
import usePictures from "@/hooks/services/usePictures";
import useSpacing from "@/hooks/services/useSpacing";
import useWallpaper from "@/hooks/services/useWallpaper";
import { unscan } from "@/lib/theme";
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
  const { pictures, getThumbnail } = usePictures();
  const [, setWallpaper] = useWallpaper(connector);

  const scrollWidth = width * 0.95;

  return (
    <box class="m-[5px_10px_15px]">
      <box class="rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-4 shadow-lg">
        <scrolledwindow
          class="rounded-2xl"
          heightRequest={240}
          hscrollbarPolicy={PolicyType.EXTERNAL}
          kineticScrolling
          vscrollbarPolicy={PolicyType.NEVER}
          widthRequest={scrollWidth}
        >
          <box class="px-1" hexpand spacing={spacing.xl} valign={Align.CENTER}>
            <For
              cleanup={(element) => unscan?.(element as Gtk.Widget)}
              each={pictures}
            >
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
    </box>
  );
}
