import { WallpaperConfigContext } from "@/contexts/WallpaperConfigContext";

export const useWallpaper = () => {
  const { enabled, useGlobal, globalWallpaper, monitorWallpapers } =
    WallpaperConfigContext.use();

  return {
    enabled,
    useGlobal,
    globalWallpaper,
    monitorWallpapers,
  };
};
