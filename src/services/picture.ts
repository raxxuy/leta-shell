import { getter, register } from "ags/gobject";
import { PICTURES_DIR } from "@/constants";
import { emitNotify } from "@/decorators/gobject";
import { monitor } from "@/decorators/monitor";
import { listDir } from "@/lib/fs";
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

  @emitNotify("pictures")
  private scanPictures(): void {
    const pictures = listDir(PICTURES_DIR, true);
    if (pictures) this.#pictures = pictures;
  }

  @monitor(PICTURES_DIR)
  protected onPicturesChanged(): void {
    this.scanPictures();
  }

  constructor() {
    super();
    this.scanPictures();
  }
}
