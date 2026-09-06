import { createBindings } from "@/lib/binding";
import PictureService from "@/services/picture";

export const usePictures = () => {
  const service = PictureService.get_default();

  const { pictures } = createBindings(service, {
    pictures: true,
  });

  return {
    pictures,
    getThumbnail: async (path: string) => service.getThumbnail(path),
  };
};
