import { buildPath, listDir } from "../fs";

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|avif|bmp|gif)$/i;

export const listImages = (sources: string[]): string[] =>
  sources.flatMap((dir) =>
    (listDir(dir) ?? [])
      .filter((name) => IMAGE_EXTENSIONS.test(name))
      .sort()
      .map((name) => buildPath(dir, name)),
  );
