import { ThemeSchema } from "./theme";
import { WallpaperSchema } from "./wallpaper";

export const configs = {
  theme: ThemeSchema.prefault({}),
  wallpaper: WallpaperSchema.prefault({}),
};

export { ThemeSchema, themeDefaults } from "./theme";
export { WallpaperSchema, wallpaperDefaults } from "./wallpaper";
