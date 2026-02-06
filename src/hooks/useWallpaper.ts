import { createBinding } from "ags";
import WallpaperService from "@/services/wallpaper";

export const useWallpaper = () => {
  const wallpaperService = WallpaperService.get_default();

  return {
    setSource: (source: string, full?: boolean) =>
      wallpaperService.setSource(source, full),
    setMonitorDimensions: (width: number, height: number) =>
      wallpaperService.setMonitorDimensions(width, height),
    source: createBinding(wallpaperService, "source"),
    pictures: createBinding(wallpaperService, "pictures"),
    cachedPictures: createBinding(wallpaperService, "cachedPictures"),
  };
};
