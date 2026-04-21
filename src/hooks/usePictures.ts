import { createBinding } from "ags";
import PictureService from "@/services/picture";

export const usePictures = () => {
  const pictureService = PictureService.get_default();
  return createBinding(pictureService, "pictures");
};
