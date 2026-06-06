import { createConnection } from "ags";
import WallpaperService from "@/services/wallpaper";

export const useWallpaperService = (monitorId: string) => {
  const service = WallpaperService.get_default();

  const wallpaper = createConnection(service.get(monitorId), [
    service,
    "wallpaper-changed",
    () => service.get(monitorId),
  ]);

  const setWallpaper = (path: string) => service.setWallpaper(monitorId, path);
  const setGlobalWallpaper = (path: string) => service.setGlobalWallpaper(path);

  return { wallpaper, setWallpaper, setGlobalWallpaper };
};
