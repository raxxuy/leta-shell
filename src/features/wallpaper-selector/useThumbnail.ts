import { createState } from "ags";

import { usePictures } from "@/hooks/services/usePictures";

export const useThumbnail = (path: string) => {
  const { getThumbnail } = usePictures();
  const [thumbnail, setThumbnail] = createState<string | null>(null);

  getThumbnail(path)
    .then(setThumbnail)
    .catch(() => setThumbnail(null));

  return thumbnail;
};
