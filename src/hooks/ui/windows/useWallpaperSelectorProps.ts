import type { Gdk } from "ags/gtk4";

export default function useWallpaperSelectorProps(gdkmonitor: Gdk.Monitor) {
  const width = gdkmonitor.geometry.width;
  const connector = gdkmonitor.connector;

  return {
    connector,
    width,
  };
}
