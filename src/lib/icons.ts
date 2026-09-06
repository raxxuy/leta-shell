import GLib from "gi://GLib";

const svgCache = new Map<string, string>();

const readSvg = (path: string): string => {
  const [ok, bytes] = GLib.file_get_contents(path);
  if (!ok) throw Error(`failed to read ${path}`);
  return new TextDecoder().decode(bytes);
};

export const getSvg = (name: string): string => {
  if (!svgCache.has(name)) {
    svgCache.set(name, readSvg(`${SRC}/assets/${name}.svg`));
  }
  return svgCache.get(name) ?? "";
};
