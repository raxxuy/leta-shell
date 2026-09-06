import { register } from "ags/gobject";

import { CACHE_COLORS_FILE, CACHE_THEMES_DIR } from "@/constants";
import { connect } from "@/decorators/gobject";
import { buildPath, dirExists, ensureDir, readFile, writeFile } from "@/lib/fs";
import { hashPath } from "@/lib/hash";
import { applyTheme } from "@/lib/theme/apply";
import { callMatugen, relinkTheme } from "@/lib/theme/matugen";
import Service from "./base";
import WallpaperService from "./wallpaper";

@register({ GTypeName: "ThemeService" })
export default class ThemeService extends Service {
  private static instance: ThemeService;

  static get_default(): ThemeService {
    if (!ThemeService.instance) ThemeService.instance = new ThemeService();
    return ThemeService.instance;
  }

  private async generateTheme(path: string): Promise<void> {
    try {
      const hash = hashPath(path);
      if (!hash) return;

      const themeDir = buildPath(CACHE_THEMES_DIR, hash);

      if (!dirExists(themeDir)) {
        ensureDir(themeDir);
        await callMatugen(path, themeDir);
      }

      await Promise.all([relinkTheme(themeDir), this.applyColors(themeDir)]);
      await applyTheme();
    } catch (error) {
      console.error("ThemeService: Failed to generate theme", error);
    }
  }

  private async applyColors(themeDir: string): Promise<void> {
    const src = readFile(buildPath(themeDir, "colors.scss"));
    if (src) writeFile(CACHE_COLORS_FILE, src);
  }

  @connect("wallpaper-changed", () => WallpaperService.get_default())
  protected onWallpaperChanged(_: WallpaperService, path: string): void {
    this.generateTheme(path);
  }
}
