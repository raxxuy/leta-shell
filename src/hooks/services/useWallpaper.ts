import { createSignalState } from "@/lib/reactive";
import WallpaperService from "@/services/wallpaper";

export default function useWallpaper(monitorId: string) {
  const service = WallpaperService.get_default();

  const wallpaper = createSignalState(service, "wallpaper-changed", () =>
    service.get(monitorId),
  );

  const setWallpaper = (path: string) => service.setWallpaper(monitorId, path);

  return [wallpaper, setWallpaper] as const;
}
