import GdkPixbuf from "gi://GdkPixbuf";
import Gio from "gi://Gio";
import GLib from "gi://GLib";
import type GObject from "ags/gobject";
import { register, signal } from "ags/gobject";
import type { Gdk } from "ags/gtk4";
import {
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
  CONFIG_DIR,
} from "@/constants";
import { monitor } from "@/decorators/monitor";
import { buildPath, ensureDir, fileExists } from "@/lib/fs";
import Service from "./base";
import ConfigService from "./config";

interface WallpaperServiceSignals extends GObject.Object.SignalSignatures {
  "wallpaper-changed": WallpaperService["wallpaperChanged"];
}

@register({ GTypeName: "WallpaperService" })
export default class WallpaperService extends Service<WallpaperServiceSignals> {
  private static instance: WallpaperService;
  private static readonly THUMBNAIL_WIDTH = 400;
  private static readonly THUMBNAIL_HEIGHT = 225;

  #monitorSizes = new Map<string, { width: number; height: number }>();
  #cache = new Map<string, string>();

  static get_default(): WallpaperService {
    if (!WallpaperService.instance) {
      WallpaperService.instance = new WallpaperService();
    }
    return WallpaperService.instance;
  }

  @signal()
  wallpaperChanged() {}

  private get wallpaperConfig() {
    return ConfigService.get_default().configs.wallpaper;
  }

  public get(monitorId: string): string | null {
    const size = this.#monitorSizes.get(monitorId);
    if (!size) return null;

    const path = this.resolve(monitorId);
    if (!path) return null;

    const key = this.key(path, size.width, size.height);
    const cached = this.#cache.get(key);
    if (cached) return cached;

    const out = this.buildCachedFile(path, size.width, size.height);
    if (!out) return null;

    this.#cache.set(key, out);
    return out;
  }

  public getThumbnail(path: string): string | null {
    return this.buildCachedFile(
      path,
      WallpaperService.THUMBNAIL_WIDTH,
      WallpaperService.THUMBNAIL_HEIGHT,
    );
  }

  public setWallpaper(monitorId: string, path: string): void {
    ConfigService.get_default().setValue(
      "wallpaper",
      "monitorWallpapers",
      (prev) => ({
        ...prev,
        [monitorId]: path,
      }),
    );
    this.emit("wallpaper-changed");
  }

  public setGlobalWallpaper(path: string): void {
    ConfigService.get_default().setValue("wallpaper", "globalWallpaper", path);
    this.emit("wallpaper-changed");
  }

  public initMonitors(monitors: Gdk.Monitor[]): void {
    monitors.forEach((mon) => {
      this.setMonitorSize(
        mon.connector,
        mon.geometry.width,
        mon.geometry.height,
      );
    });
  }

  private setMonitorSize(
    monitorId: string,
    width: number,
    height: number,
  ): void {
    this.#monitorSizes.set(monitorId, { width, height });
  }

  private resolve(monitorId: string): string | null {
    const cfg = this.wallpaperConfig;
    if (!cfg.enabled) return null;
    if (cfg.useGlobal) return cfg.globalWallpaper || null;
    return cfg.monitorWallpapers[monitorId] || cfg.globalWallpaper || null;
  }

  private key(path: string, w: number, h: number): string {
    return `${path}:${w}x${h}`;
  }

  private buildCachedFile(path: string, w: number, h: number): string | null {
    const hash = GLib.compute_checksum_for_string(
      GLib.ChecksumType.SHA256,
      path,
      -1,
    );

    if (!hash) return null;

    const originalFile = Gio.File.new_for_path(
      buildPath(CACHE_WALLPAPERS_ORIGINAL_DIR, hash),
    );

    if (!originalFile.query_exists(null)) {
      originalFile.make_symbolic_link(path, null);
    }

    const resDir = buildPath(CACHE_WALLPAPERS_RENDERED_DIR, `${w}x${h}`);
    ensureDir(resDir);

    const file = buildPath(resDir, `${hash}.png`);

    if (fileExists(file)) return file;

    const pixbuf = GdkPixbuf.Pixbuf.new_from_file(path);

    const srcW = pixbuf.get_width();
    const srcH = pixbuf.get_height();
    const scale = Math.max(w / srcW, h / srcH);

    const scaledW = Math.round(srcW * scale);
    const scaledH = Math.round(srcH * scale);

    const offsetX = Math.round((scaledW - w) / 2);
    const offsetY = Math.round((scaledH - h) / 2);

    const scaled = pixbuf.scale_simple(
      scaledW,
      scaledH,
      GdkPixbuf.InterpType.BILINEAR,
    );
    if (!scaled) return null;

    const cropped = scaled.new_subpixbuf(offsetX, offsetY, w, h);
    if (!cropped) return null;

    cropped.savev(file, "png", [], []);
    return file;
  }

  private invalidate(): void {
    this.#cache.clear();
  }

  @monitor(CONFIG_DIR)
  private onConfigChanged(): void {
    this.invalidate();
  }
}
