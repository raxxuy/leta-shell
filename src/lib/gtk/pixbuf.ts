import GdkPixbuf from "gi://GdkPixbuf";
import Gio from "gi://Gio";
import GLib from "gi://GLib";
import { buildPath, ensureDir, fileExists } from "../fs";

export const scaleCover = (
  pixbuf: GdkPixbuf.Pixbuf,
  w: number,
  h: number,
): GdkPixbuf.Pixbuf | null => {
  const srcW = pixbuf.get_width();
  const srcH = pixbuf.get_height();
  const scale = Math.max(w / srcW, h / srcH);

  const scaledW = Math.round(srcW * scale);
  const scaledH = Math.round(srcH * scale);

  const offsetX = Math.round((scaledW - w) / 2);
  const offsetY = Math.round((scaledH - h) / 2);

  const scaled = pixbuf.scale_simple(
    scaledW,
    scaledH,
    GdkPixbuf.InterpType.BILINEAR,
  );
  if (!scaled) return null;

  return scaled.new_subpixbuf(offsetX, offsetY, w, h);
};

export const hashPath = (path: string): string | null =>
  GLib.compute_checksum_for_string(GLib.ChecksumType.SHA256, path, -1);

export const renderImage = (
  path: string,
  w: number,
  h: number,
  originalDir: string,
  renderedDir: string,
): string | null => {
  const hash = hashPath(path);
  if (!hash) return null;

  const originalFile = Gio.File.new_for_path(buildPath(originalDir, hash));
  if (!originalFile.query_exists(null)) {
    originalFile.make_symbolic_link(path, null);
  }

  const resDir = buildPath(renderedDir, `${w}x${h}`);
  ensureDir(resDir);

  const file = buildPath(resDir, `${hash}.png`);
  if (fileExists(file)) return file;

  const pixbuf = GdkPixbuf.Pixbuf.new_from_file(path);
  const cropped = scaleCover(pixbuf, w, h);
  if (!cropped) return null;

  cropped.savev(file, "png", [], []);
  return file;
};
