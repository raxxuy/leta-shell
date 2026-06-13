import { createState, onCleanup } from "ags";
import WallpaperService from "@/services/wallpaper";

export const useWallpaperService = (monitorId: string) => {
  const service = WallpaperService.get_default();
  const [wallpaper, setWallpaper] = createState<string | null>(null);

  const load = () => {
    service.get(monitorId).then(setWallpaper);
  };

  load();

  const conn = service.connect("wallpaper-changed", load);
  onCleanup(() => service.disconnect(conn));

  const setWallpaperPath = (path: string) =>
    service.setWallpaper(monitorId, path);
  const setGlobalWallpaper = (path: string) => service.setGlobalWallpaper(path);

  return { wallpaper, setWallpaper: setWallpaperPath, setGlobalWallpaper };
};
