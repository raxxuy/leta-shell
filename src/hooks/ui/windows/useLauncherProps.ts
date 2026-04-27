import type { Gdk } from "ags/gtk4";

export default function useLauncherProps(gdkmonitor: Gdk.Monitor) {
  const { height, width } = gdkmonitor.geometry;
  const marginTop = height * 0.2;

  return {
    marginTop,
    width,
  };
}
