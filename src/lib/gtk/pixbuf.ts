import GdkPixbuf from "gi://GdkPixbuf";

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
