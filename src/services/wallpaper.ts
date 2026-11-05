import type Gdk from "gi://Gdk?version=4.0";
import { register } from "gnim/gobject";
import { config } from "@/lib/config/store";
import { listImages } from "@/lib/wallpaper/list";
import { renderWallpaper } from "@/lib/wallpaper/render";
import { BaseService } from "./base";

@register
export default class WallpaperService extends BaseService {
  readonly monitors = config.value.as((value) => value.wallpaper.monitors);
  readonly images = config.value.as((value) =>
    listImages(value.wallpaper.sources),
  );

  async select(monitor: Gdk.Monitor, path: string): Promise<boolean> {
    const { connector } = monitor;
    if (!connector) return false;

    const { width, height } = monitor.geometry;
    const scale = monitor.scaleFactor;

    if (!(await renderWallpaper(path, width * scale, height * scale))) {
      return false;
    }

    config.update((draft) => {
      draft.wallpaper.monitors[connector] = path;
    });

    return true;
  }

  addSource(dir: string): void {
    config.update((draft) => {
      if (!draft.wallpaper.sources.includes(dir)) {
        draft.wallpaper.sources.push(dir);
      }
    });
  }
}
