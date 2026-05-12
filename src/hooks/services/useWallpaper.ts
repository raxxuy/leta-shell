import { createConnection } from "ags";
import WallpaperService from "@/services/wallpaper";

export default function useWallpaper(monitorId: string) {
  const service = WallpaperService.get_default();

  const wallpaper = createConnection(service.get(monitorId), [
    service,
    "wallpaper-changed",
    () => service.get(monitorId),
  ]);

  const setWallpaper = (path: string) => service.setWallpaper(monitorId, path);

  return [wallpaper, setWallpaper] as const;
}
