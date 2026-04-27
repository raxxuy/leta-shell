import { createBinding } from "ags";
import PictureService from "@/services/picture";

export default function usePictures() {
  const service = PictureService.get_default();

  const pictures = createBinding(service, "pictures");

  const getThumbnail = (path: string) => service.getThumbnail(path);

  return { pictures, getThumbnail };
}
