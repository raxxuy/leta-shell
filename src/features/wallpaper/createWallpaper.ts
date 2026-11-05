import type Gdk from "gi://Gdk?version=4.0";
import Gio from "gi://Gio?version=2.0";
import { type Accessor, bind, createState, effect, onCleanup } from "gnim";
import { renderWallpaper } from "@/lib/wallpaper/render";
import WallpaperService from "@/services/wallpaper";

export const createWallpaper = (
  monitor: Gdk.Monitor,
): Accessor<Gio.File | null> => {
  const { monitors } = WallpaperService.get_default();
  const geometry = bind(monitor, "geometry");
  const [file, setFile] = createState<Gio.File | null>(null);

  effect(() => {
    const path = monitor.connector ? monitors()[monitor.connector] : undefined;
    if (!path) return setFile(null);

    const { width, height } = geometry();
    const scale = monitor.scaleFactor;

    let stale = false;
    onCleanup(() => {
      stale = true;
    });

    renderWallpaper(path, width * scale, height * scale).then((result) => {
      if (!stale && result) setFile(Gio.File.new_for_path(result));
    });
  });

  return file;
};
