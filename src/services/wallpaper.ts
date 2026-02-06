import { monitorFile } from "ags/file";
import type GObject from "ags/gobject";
import { getter, register, setter, signal } from "ags/gobject";
import { PICTURES_DIR, WALLPAPER_FILE } from "@/constants";
import { applyTheme } from "@/lib/styles";
import {
  cleanupOrphanedCache,
  exec,
  generateColors,
  isImageFile,
  readFile,
  scaleAndCenterImage,
  writeFile,
} from "@/utils";
import Service from "./base";

interface WallpaperSignals extends GObject.Object.SignalSignatures {
  "wallpaper-changed": WallpaperService["wallpaperChanged"];
  "pictures-changed": WallpaperService["picturesChanged"];
  "cached-pictures-changed": WallpaperService["cachedPicturesChanged"];
}

interface CachedPicture {
  original: string;
  cached: string;
}

@register({ GTypeName: "WallpaperService" })
export default class WallpaperService extends Service<WallpaperSignals> {
  private static instance: WallpaperService;
  private monitorWidth = 0;
  private monitorHeight = 0;
  #source = "";
  #pictures: string[] = [];
  #cachedPictures: CachedPicture[] = [];

  static get_default() {
    if (!WallpaperService.instance) {
      WallpaperService.instance = new WallpaperService();
    }
    return WallpaperService.instance;
  }

  @signal(Boolean)
  wallpaperChanged(_full?: boolean) {}

  @signal()
  picturesChanged() {}

  @signal()
  cachedPicturesChanged() {}

  @getter(String)
  get source() {
    return this.#source;
  }

  @getter(Array)
  get pictures() {
    return this.#pictures;
  }

  @getter(Array)
  get cachedPictures() {
    return this.#cachedPictures;
  }

  @setter(String)
  set source(path: string) {
    if (path === this.#source) return;

    this.#source = path;
    this.setWallpaper(path);
    this.notify("source");
  }

  setMonitorDimensions(width: number, height: number): void {
    this.monitorWidth = width;
    this.monitorHeight = height;
    this.fetchPictures();
  }

  setSource(path: string, full?: boolean) {
    if (full) {
      this.source = path;
      this.wallpaperChanged(true);
    } else {
      this.source = path;
      this.wallpaperChanged(false);
    }
  }

  private async setWallpaper(path?: string): Promise<void> {
    writeFile(WALLPAPER_FILE, path as string);

    await generateColors(path);
    await applyTheme();
  }

  private async fetchPictures(): Promise<void> {
    try {
      const output = await exec(["find", PICTURES_DIR, "-maxdepth 1 -type f"]);

      this.#pictures = output
        .split("\n")
        .filter((line) => line.trim() && isImageFile(line.trim()))
        .sort();

      // Clean up orphaned cache files before generating new ones
      await cleanupOrphanedCache(
        this.#pictures,
        this.monitorWidth,
        this.monitorHeight,
      );

      await this.generateCachedPictures();
    } catch (error) {
      console.error("Failed to fetch pictures:", error);
      this.#pictures = [];
      this.#cachedPictures = [];
    } finally {
      this.notify("pictures");
      this.picturesChanged();
    }
  }

  private async generateCachedPictures(): Promise<void> {
    const cachedPromises = this.#pictures.map(async (picture) => {
      const cachedPath = await scaleAndCenterImage(
        picture,
        this.monitorWidth,
        this.monitorHeight,
      );

      return {
        original: picture,
        cached: cachedPath || picture,
      };
    });

    this.#cachedPictures = await Promise.all(cachedPromises);
    this.notify("cached-pictures");
    this.cachedPicturesChanged();
  }

  private async initializeWallpaper(path: string): Promise<void> {
    try {
      await generateColors(path);
      await applyTheme();
      this.wallpaperChanged(false);
    } catch (error) {
      console.error("Failed to initialize wallpaper:", error);
    }
  }

  constructor() {
    super();

    const wallpaperPath = readFile(WALLPAPER_FILE);

    this.#source = wallpaperPath;

    if (wallpaperPath) {
      this.initializeWallpaper(wallpaperPath);
    }

    // Monitor pictures directory
    monitorFile(PICTURES_DIR, () => this.fetchPictures());
  }
}
