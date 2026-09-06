import type { Accessor } from "ags";
import { createContext, createState, onCleanup } from "ags";

import { useConfig } from "@/hooks/services/useConfig";
import WallpaperService from "@/services/wallpaper";

interface WallpaperContextValue {
  enabled: Accessor<boolean>;
  getWallpaper: (monitorId: string) => Accessor<string | null>;
  setGlobalWallpaper: (path: string) => void;
  setWallpaper: (monitorId: string, path: string) => void;
}

interface WallpaperProviderProps {
  children: () => JSX.Element;
}

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export const WallpaperProvider = ({ children }: WallpaperProviderProps) => {
  const service = WallpaperService.get_default();

  const [enabled] = useConfig("wallpaper", "enabled");

  const getWallpaper = (monitorId: string) => {
    const [wallpaper, setWallpaperState] = createState<string | null>(null);

    const load = () => {
      service.get(monitorId).then((wallpaper) => {
        setWallpaperState(wallpaper);
      });
    };

    load();

    const connection = service.connect("wallpaper-changed", load);
    onCleanup(() => service.disconnect(connection));

    return wallpaper;
  };

  const value: WallpaperContextValue = {
    enabled,
    getWallpaper,
    setWallpaper: (monitorId: string, path: string) =>
      service.setWallpaper(monitorId, path),
    setGlobalWallpaper: (path: string) => service.setGlobalWallpaper(path),
  };

  return <WallpaperContext value={value}>{children}</WallpaperContext>;
};

export const useWallpaper = () => {
  const context = WallpaperContext.use();

  if (!context) {
    throw new Error("useWallpaper must be used inside WallpaperProvider");
  }

  return context;
};
