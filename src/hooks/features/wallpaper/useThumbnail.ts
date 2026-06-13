import { createState } from "ags";
import { usePicturesService } from "@/hooks/services/usePicturesService";

export const useThumbnail = (path: string) => {
  const { getThumbnail } = usePicturesService();
  const [thumbnail, setThumbnail] = createState<string | null>(null);

  getThumbnail(path)
    .then(setThumbnail)
    .catch(() => setThumbnail(null));

  return thumbnail;
};
