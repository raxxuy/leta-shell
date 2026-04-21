import type Gdk from "gi://Gdk";
import GdkPixbuf from "gi://GdkPixbuf";
import GLib from "gi://GLib";
import type GObject from "ags/gobject";
import { register, signal } from "ags/gobject";
import { CACHE_WALLPAPERS_DIR, CONFIG_DIR } from "@/constants";
import { monitor } from "@/decorators/monitor";
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

  private resolve(monitorId: string): string {
    const cfg = this.wallpaperConfig;

    if (!cfg.enabled) return "";

    if (cfg.useGlobal) {
      return cfg.globalWallpaper;
    }

    return cfg.monitorWallpapers[monitorId] || cfg.globalWallpaper;
  }

  private key(path: string, w: number, h: number) {
    return `${path}:${w}x${h}`;
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
    this.#cache.set(key, out);

    return out;
  }

  private buildCachedFile(path: string, w: number, h: number): string {
    const pixbuf = GdkPixbuf.Pixbuf.new_from_file(path);

    const scaled = pixbuf.scale_simple(w, h, GdkPixbuf.InterpType.BILINEAR);

    const hash = GLib.compute_checksum_for_string(
      GLib.ChecksumType.SHA256,
      path,
      -1,
    );

    const file = `${CACHE_WALLPAPERS_DIR}/rendered/${hash}_${w}xh.png`;

    if (scaled) {
      scaled.savev(file, "png", [], []);
      return file;
    }

    return path;
  }

  public setMonitorSize(
    monitorId: string,
    width: number,
    height: number,
  ): void {
    this.#monitorSizes.set(monitorId, { width, height });
  }

  public invalidate(): void {
    this.#cache.clear();
  }

  public initMonitors(monitors: Gdk.Monitor[]) {
    monitors.forEach((mon) => {
      this.setMonitorSize(
        mon.connector,
        mon.geometry.width,
        mon.geometry.height,
      );
    });
  }

  public setWallpaper(monitorId: string, path: string): void {
    const config = ConfigService.get_default();

    config.setValue("wallpaper", "monitorWallpapers", (prev) => ({
      ...prev,
      [monitorId]: path,
    }));

    this.emit("wallpaper-changed");
  }

  public setGlobalWallpaper(path: string): void {
    const config = ConfigService.get_default();

    config.setValue("wallpaper", "globalWallpaper", path);

    this.emit("wallpaper-changed");
  }

  @monitor(CONFIG_DIR)
  private onConfigChanged(): void {
    this.invalidate();
  }
}
