import type { Gdk } from "ags/gtk4";

export default function useSettingsProps(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.geometry;

  return {
    width,
    height,
  };
}
