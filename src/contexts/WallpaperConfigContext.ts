import { createContext } from "ags";
import type { ConfigTuple } from "@/types/config";

export interface WallpaperConfigShape {
  enabled: ConfigTuple<boolean>;
  globalWallpaper: ConfigTuple<string | null>;
  monitorWallpapers: ConfigTuple<Record<string, string>>;
  useGlobal: ConfigTuple<boolean>;
}

export const WallpaperConfigContext = createContext<WallpaperConfigShape>(
  {} as WallpaperConfigShape,
);
