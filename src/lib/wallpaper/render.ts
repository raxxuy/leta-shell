import GLib from "gi://GLib?version=2.0";
import { buildPath, ensureDir, fileExists, moveFile } from "../fs";
import { hashPath } from "../hash";
import { exec } from "../process";
import { CACHE_WALLPAPERS_DIR } from "./constants";

export const renderWallpaper = async (
  path: string,
  width: number,
  height: number,
): Promise<string | null> => {
  const absolute = GLib.canonicalize_filename(path, null);
  const hash = hashPath(absolute);
  if (!hash) return null;

  const extension = /\.([^./]+)$/.exec(absolute)?.[1] ?? "png";
  const dir = buildPath(CACHE_WALLPAPERS_DIR, hash);
  const output = buildPath(dir, `${width}x${height}.${extension}`);

  if (fileExists(output)) return output;
  ensureDir(dir);

  const temp = buildPath(dir, `.${width}x${height}.tmp.${extension}`);

  try {
    await exec([
      "leta-toolkit",
      "image",
      "cover",
      "--input",
      absolute,
      "--output",
      temp,
      "--width",
      String(width),
      "--height",
      String(height),
    ]);

    moveFile(temp, output);

    return output;
  } catch (error) {
    console.error(`Failed to render ${absolute} at ${width}x${height}:`, error);
    return null;
  }
};
