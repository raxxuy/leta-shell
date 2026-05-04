import Gio from "gi://Gio";
import { getter, register } from "ags/gobject";
import {
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
  PICTURES_DIR,
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from "@/constants";
import { emitNotify } from "@/decorators/gobject";
import { monitor } from "@/decorators/monitor";
import { listDir } from "@/lib/fs";
import { renderImage } from "@/lib/gtk";
import Service from "./base";

@register({ GTypeName: "PictureService" })
export default class PictureService extends Service {
  private static instance: PictureService;

  #pictures: string[] = [];

  static get_default(): PictureService {
    if (!PictureService.instance)
      PictureService.instance = new PictureService();
    return PictureService.instance;
  }

  @getter(Array<string>)
  get pictures(): string[] {
    return this.#pictures;
  }

  getThumbnail(path: string): string | null {
    return renderImage(
      path,
      THUMBNAIL_WIDTH,
      THUMBNAIL_HEIGHT,
      CACHE_WALLPAPERS_ORIGINAL_DIR,
      CACHE_WALLPAPERS_RENDERED_DIR,
    );
  }

  @emitNotify("pictures")
  private scanPictures(): void {
    const pictures = listDir(PICTURES_DIR, true);
    if (pictures) this.#pictures = pictures;
  }

  @monitor(PICTURES_DIR, Gio.FileMonitorEvent.CHANGES_DONE_HINT)
  protected onPicturesChanged(): void {
    this.scanPictures();
  }

  constructor() {
    super();
    this.scanPictures();
  }
}
