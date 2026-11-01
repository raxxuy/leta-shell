import { register } from "ags/gobject";

import { CACHE_COLORS_FILE, CACHE_THEMES_DIR } from "@/constants";
import { connect } from "@/decorators/gobject";
import {
  buildPath,
  ensureDir,
  fileExists,
  readFile,
  writeFile,
} from "@/lib/fs";
import { hashPath } from "@/lib/hash";
import { applyTheme } from "@/lib/theme/apply";
import { callPalette, relinkTheme, THEME_OUTPUTS } from "@/lib/theme/palette";
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

      if (
        !THEME_OUTPUTS.every((file) => fileExists(buildPath(themeDir, file)))
      ) {
        if (!ensureDir(themeDir)) throw new Error(`Cannot create ${themeDir}`);
        await callPalette(path, themeDir);
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
