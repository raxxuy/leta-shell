import type GObject from "ags/gobject";
import { register, signal } from "ags/gobject";
import type { Gdk } from "ags/gtk4";

import { renderImage } from "@/lib/cache/images";
import type { WallpaperConfig } from "@/lib/config/schemas/wallpaper";
import Service from "./base";
import ConfigService from "./config";

interface WallpaperServiceSignals extends GObject.Object.SignalSignatures {
  "wallpaper-changed": WallpaperService["wallpaperChanged"];
}

@register({ GTypeName: "WallpaperService" })
export default class WallpaperService extends Service<WallpaperServiceSignals> {
  private static instance: WallpaperService;

  #monitorSizes = new Map<string, { width: number; height: number }>();
  #cache = new Map<string, string>();

  static get_default(): WallpaperService {
    if (!WallpaperService.instance)
      WallpaperService.instance = new WallpaperService();
    return WallpaperService.instance;
  }

  @signal(String, Boolean)
  wallpaperChanged(_path: string, _global: boolean) {}

  private get config(): WallpaperConfig {
    return ConfigService.get_default().configs.wallpaper;
  }

  async get(monitorId: string): Promise<string | null> {
    const size = this.#monitorSizes.get(monitorId);
    if (!size) return null;

    const path = this.resolve(monitorId);
    if (!path) return null;

    const key = this.key(path, size.width, size.height);
    const cached = this.#cache.get(key);
    if (cached) return cached;

    const rendered = await renderImage(path, size.width, size.height);
    if (rendered) this.#cache.set(key, rendered);
    return rendered;
  }

  setWallpaper(monitorId: string, path: string): void {
    if (!this.config.enabled) return;

    if (this.config.monitorWallpapers[monitorId] === path) return;

    ConfigService.get_default().setValue(
      "wallpaper",
      "monitorWallpapers",
      (prev) => ({
        ...prev,
        [monitorId]: path,
      }),
    );
    this.emit("wallpaper-changed", path, false);
  }

  setGlobalWallpaper(path: string): void {
    if (!this.config.enabled) return;

    if (this.config.globalWallpaper === path) return;

    ConfigService.get_default().setValue("wallpaper", "globalWallpaper", path);
    this.emit("wallpaper-changed", path, true);
  }

  initMonitors(monitors: Gdk.Monitor[]): void {
    monitors.forEach((mon) => {
      this.#monitorSizes.set(mon.connector as string, {
        width: mon.geometry.width,
        height: mon.geometry.height,
      });
    });
  }

  private resolve(monitorId: string): string | null {
    const config = this.config;
    if (!config.enabled) return null;
    if (config.useGlobal) return config.globalWallpaper;
    return config.monitorWallpapers[monitorId] || config.globalWallpaper;
  }

  private key(path: string, w: number, h: number): string {
    return `${path}:${w}x${h}`;
  }
}
