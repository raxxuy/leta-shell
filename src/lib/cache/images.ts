import GdkPixbuf from "gi://GdkPixbuf";
import Gio from "gi://Gio";
import {
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
} from "@/constants";
import { buildPath, ensureDir, fileExists } from "../fs";
import { scaleCover } from "../gtk";
import { hashPath } from "../hash";

export const renderImage = (
  path: string,
  w: number,
  h: number,
): string | null => {
  const hash = hashPath(path);
  if (!hash) return null;

  const originalFile = Gio.File.new_for_path(
    buildPath(CACHE_WALLPAPERS_ORIGINAL_DIR, hash),
  );
  if (!originalFile.query_exists(null)) {
    originalFile.make_symbolic_link(path, null);
  }

  const resDir = buildPath(CACHE_WALLPAPERS_RENDERED_DIR, `${w}x${h}`);
  ensureDir(resDir);

  const file = buildPath(resDir, `${hash}.png`);
  if (fileExists(file)) return file;

  const pixbuf = GdkPixbuf.Pixbuf.new_from_file(path);
  const cropped = scaleCover(pixbuf, w, h);
  if (!cropped) return null;

  cropped.savev(file, "png", [], []);
  return file;
};
