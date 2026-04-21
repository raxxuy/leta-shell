import { createState } from "ags";
import WallpaperService from "@/services/wallpaper";

export const useWallpaper = (monitorId: string) => {
  const wallpaperService = WallpaperService.get_default();
  const [wallpaper, setWallpaper] = createState<string | null>(
    wallpaperService.get(monitorId),
  );

  const handler = () => setWallpaper(wallpaperService.get(monitorId));

  wallpaperService.connect("wallpaper-changed", handler);

  return wallpaper;
};
