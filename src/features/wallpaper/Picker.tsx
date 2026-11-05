import type Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { createState, For } from "gnim";
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "@/constants";
import { ContentFit } from "@/enums";
import { renderWallpaper } from "@/lib/wallpaper/render";
import WallpaperService from "@/services/wallpaper";

const Thumbnail = ({
  path,
  onSelect,
}: {
  path: string;
  onSelect: () => void;
}) => {
  const [file, setFile] = createState<Gio.File | null>(null);

  renderWallpaper(path, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).then((result) => {
    if (result) setFile(Gio.File.new_for_path(result));
  });

  return (
    <flowboxchild>
      <button onClicked={onSelect}>
        <picture
          contentFit={ContentFit.COVER}
          file={file}
          heightRequest={THUMBNAIL_HEIGHT}
          widthRequest={THUMBNAIL_WIDTH}
        />
      </button>
    </flowboxchild>
  );
};

export default function WallpaperPicker({ monitor }: { monitor: Gdk.Monitor }) {
  const service = WallpaperService.get_default();

  return (
    <scrolledwindow hexpand vexpand>
      <flowbox maxChildrenPerLine={3} selectionMode={Gtk.SelectionMode.NONE}>
        <For each={service.images}>
          {(path) => (
            <Thumbnail
              onSelect={() => service.select(monitor, path)}
              path={path}
            />
          )}
        </For>
      </flowbox>
    </scrolledwindow>
  );
}
