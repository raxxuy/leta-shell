import {
  WallpaperConfigContext,
  type WallpaperConfigShape,
} from "@/contexts/WallpaperConfigContext";
import useConfig from "@/hooks/services/useConfig";

interface WallpaperConfigProviderProps {
  children: () => JSX.Element;
}

export default function WallpaperConfigProvider({
  children,
}: WallpaperConfigProviderProps) {
  const value: WallpaperConfigShape = {
    enabled: useConfig("wallpaper", "enabled"),
    globalWallpaper: useConfig("wallpaper", "globalWallpaper"),
    monitorWallpapers: useConfig("wallpaper", "monitorWallpapers"),
    useGlobal: useConfig("wallpaper", "useGlobal"),
  };

  return (
    <WallpaperConfigContext value={value}>{children}</WallpaperConfigContext>
  );
}
