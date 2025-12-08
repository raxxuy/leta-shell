import { monitorFile } from "ags/file";
import type GObject from "ags/gobject";
import { getter, register, setter, signal } from "ags/gobject";
import { PICTURES_DIR, WAL_FILE } from "@/constants";
import { applyTheme } from "@/lib/styles";
import { exec, generateColors, isImageFile, readFile } from "@/lib/utils";
import Service from "@/services/base";

interface WallpaperSignals extends GObject.Object.SignalSignatures {
  "wallpaper-changed": Wallpaper["wallpaperChanged"];
  "pictures-changed": Wallpaper["picturesChanged"];
}

@register({ GTypeName: "Wallpaper" })
export default class Wallpaper extends Service<WallpaperSignals> {
  private static instance: Wallpaper;
  #pictures: string[] = [];
  #source = "";

  static get_default() {
    if (!Wallpaper.instance) Wallpaper.instance = new Wallpaper();
    return Wallpaper.instance;
  }

  @signal()
  wallpaperChanged() {}

  @signal()
  picturesChanged() {}

  @getter(String)
  get source() {
    return this.#source;
  }

  @getter(Array)
  get pictures() {
    return this.#pictures;
  }

  @setter(String)
  set source(path: string) {
    if (path === this.#source) return;

    this.#source = path;
    this.setWallpaper(path);

    this.notify("source");
    this.wallpaperChanged();
  }

  async setWallpaper(path?: string): Promise<void> {
    await generateColors(path);
    await applyTheme();
  }

  async fetchPictures(): Promise<void> {
    try {
      const output = await exec(["find", PICTURES_DIR, "-maxdepth 1 -type f"]);
      this.#pictures = output
        .split("\n")
        .filter((line) => isImageFile(line.trim()))
        .sort();
    } catch (error) {
      console.error("Failed to fetch pictures:", error);
      this.#pictures = [];
    } finally {
      this.notify("pictures");
      this.picturesChanged();
    }
  }

  constructor() {
    super();

    this.source = readFile(WAL_FILE);

    // Monitor pictures directory
    monitorFile(PICTURES_DIR, () => this.fetchPictures());
    this.fetchPictures();
  }
}
