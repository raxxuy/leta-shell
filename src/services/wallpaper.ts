import { monitorFile } from "ags/file";
import type GObject from "ags/gobject";
import { getter, register, setter, signal } from "ags/gobject";
import { PICTURES_DIR } from "@/constants";
import { getWallpaper, setWallpaper } from "@/lib/cache";
import { bash } from "@/lib/utils/shell";
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
    setWallpaper(path);
    this.notify("source");
    this.emit("wallpaper-changed");
  }

  fetchPictures(): void {
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];

    bash(["find", PICTURES_DIR, "-maxdepth", "1", "-type", "f"])
      .then((output) => {
        this.#pictures = output
          .split("\n")
          .filter((line) => {
            const trimmed = line.trim();
            if (!trimmed) return false;

            const lower = trimmed.toLowerCase();
            return imageExtensions.some((ext) => lower.endsWith(ext));
          })
          .sort();

        this.notify("pictures");
        this.emit("pictures-changed");
      })
      .catch((error) => {
        console.error("Failed to fetch pictures:", error);
        this.#pictures = [];
        this.notify("pictures");
      });
  }

  constructor() {
    super();

    this.source = getWallpaper();

    // Monitor pictures directory
    monitorFile(PICTURES_DIR, () => this.fetchPictures());
    this.fetchPictures();
  }
}
