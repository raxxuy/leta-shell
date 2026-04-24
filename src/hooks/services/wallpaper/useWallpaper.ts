import { createState, onCleanup } from "ags";
import WallpaperService from "@/services/wallpaper";

export const useWallpaper = (monitorId: string) => {
  const wallpaperService = WallpaperService.get_default();

  const [wallpaper, setWallpaper] = createState<string | null>(
    wallpaperService.get(monitorId),
  );

  const handler = () => setWallpaper(wallpaperService.get(monitorId));

  const id = wallpaperService.connect("wallpaper-changed", handler);

  onCleanup(() => {
    wallpaperService.disconnect(id);
  });

  return wallpaper;
};
