import Gio from "gi://Gio";
import { monitorFile, readFileAsync } from "ags/file";
import GObject, { getter, register, setter, signal } from "ags/gobject";
import { PICTURES_DIR, WAL_FILE } from "@/constants";
import { setWallpaper } from "@/lib/cache";
import { bash } from "@/lib/utils/shell";
import Service from "@/services/base";

@register()
class WallpaperImage extends GObject.Object {
  constructor(
    public source: string,
    public format: string,
    public width: number,
    public height: number,
    public depth: string,
    public colorspace: string,
    public size: string,
  ) {
    super();
  }
}

interface WallpaperSignals extends GObject.Object.SignalSignatures {
  "wallpaper-changed": Wallpaper["wallpaperChanged"];
  "pictures-changed": Wallpaper["picturesChanged"];
}

@register({ GTypeName: "Wallpaper" })
export default class Wallpaper extends Service<WallpaperSignals> {
  private static instance: Wallpaper;
  #wallpaper: WallpaperImage = new WallpaperImage("", "", 0, 0, "", "", "");
  #pictures: string[] = [];

  static get_default() {
    if (!Wallpaper.instance) Wallpaper.instance = new Wallpaper();
    return Wallpaper.instance;
  }

  @signal()
  wallpaperChanged() {}

  @signal()
  picturesChanged() {}

  @getter(WallpaperImage)
  get wallpaper() {
    return this.#wallpaper;
  }

  @getter(Array)
  get pictures() {
    return this.#pictures;
  }

  @setter(String)
  set source(path: string) {
    if (!path) {
      this.#wallpaper = new WallpaperImage("", "", 0, 0, "", "", "");
      setWallpaper("");
      this.notify("wallpaper");
      this.emit("wallpaper-changed");
      return;
    }

    bash(["identify", path])
      .then((details) => {
        const [source, format, resolution, , depth, colorspace, size, , ,] =
          details.split(" ");
        const [width, height] = resolution.split("x").map(Number);

        this.#wallpaper = new WallpaperImage(
          source,
          format,
          width,
          height,
          depth,
          colorspace,
          size,
        );

        setWallpaper(path);
        this.notify("wallpaper");
        this.emit("wallpaper-changed");
      })
      .catch((error) => {
        console.error("Failed to set wallpaper:", error);
      });
  }

  fetchPictures() {
    bash(["ls", PICTURES_DIR])
      .then((output) => {
        this.#pictures = output
          .split("\n")
          .filter((line) => line.trim())
          .map((picture) => `${PICTURES_DIR}/${picture}`);

        this.notify("pictures");
        this.emit("pictures-changed");
      })
      .catch((error) => {
        console.error("Failed to fetch pictures:", error);
        this.#pictures = [];
      });
  }

  constructor() {
    super();

    // Monitor wallpaper file changes
    monitorFile(WAL_FILE, async (file, event) => {
      if (event === Gio.FileMonitorEvent.RENAMED) {
        this.source = await readFileAsync(file);
      }

      if (event === Gio.FileMonitorEvent.DELETED) {
        this.source = "";
      }
    });

    // Monitor pictures directory
    monitorFile(PICTURES_DIR, () => this.fetchPictures());
    this.fetchPictures();
  }
}
