import type { Gdk } from "ags/gtk4";
import useConfig from "@/hooks/services/config/useConfig";

export default function useWallpaperProps(gdkmonitor: Gdk.Monitor) {
  const [enabled] = useConfig("wallpaper", "enabled");
  const { width, height } = gdkmonitor.geometry;
  const connector = gdkmonitor.connector;

  return {
    enabled,
    connector,
    width,
    height,
  };
}
