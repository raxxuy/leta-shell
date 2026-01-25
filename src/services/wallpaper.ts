import { monitorFile } from "ags/file";
import type GObject from "ags/gobject";
import { getter, register, setter, signal } from "ags/gobject";
import { PICTURES_DIR, WAL_FILE } from "@/constants";
import { applyTheme } from "@/lib/styles";
import {
  exec,
  generateColors,
  isImageFile,
  readFile,
  scaleAndCenterImage,
  writeFile,
} from "@/lib/utils";
import Service from "@/services/base";

interface WallpaperSignals extends GObject.Object.SignalSignatures {
  "wallpaper-changed": Wallpaper["wallpaperChanged"];
  "pictures-changed": Wallpaper["picturesChanged"];
  "cached-pictures-changed": Wallpaper["cachedPicturesChanged"];
}

interface CachedPicture {
  original: string;
  cached: string;
}

@register({ GTypeName: "Wallpaper" })
export default class Wallpaper extends Service<WallpaperSignals> {
  private static instance: Wallpaper;
  #pictures: string[] = [];
  #cachedPictures: CachedPicture[] = [];
  #source = "";
  #monitorWidth = 0;
  #monitorHeight = 0;

  static get_default() {
    if (!Wallpaper.instance) Wallpaper.instance = new Wallpaper();
    return Wallpaper.instance;
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
    this.#monitorWidth = width;
    this.#monitorHeight = height;
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

  async setWallpaper(path?: string): Promise<void> {
    if (!path) writeFile(WAL_FILE, "");
    await generateColors(path);
    await applyTheme();
  }

  async fetchPictures(): Promise<void> {
    try {
      const output = await exec(["find", PICTURES_DIR, "-maxdepth 1 -type f"]);
      this.#pictures = output
        .split("\n")
        .filter((line) => line.trim() && isImageFile(line.trim()))
        .sort();

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

  async generateCachedPictures(): Promise<void> {
    const cachedPromises = this.#pictures.map(async (picture) => {
      const cachedPath = await scaleAndCenterImage(
        picture,
        this.#monitorWidth,
        this.#monitorHeight,
      );

      return {
        original: picture,
        cached: cachedPath || picture, // Fallback to original if caching fails
      };
    });

    this.#cachedPictures = await Promise.all(cachedPromises);
    this.notify("cached-pictures");
    this.cachedPicturesChanged();
  }

  constructor() {
    super();

    this.source = readFile(WAL_FILE);

    // Monitor pictures directory
    monitorFile(PICTURES_DIR, () => this.fetchPictures());
    // this.fetchPictures();
  }
}
