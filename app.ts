import app from "ags/gtk4/app";

import BarWindow from "@/features/bar/BarWindow";
import LauncherWindow from "@/features/launcher/LauncherWindow";
import WallpaperWindow from "@/features/wallpaper/WallpaperWindow";
import WallpaperSelectorWindow from "@/features/wallpaper-selector/WallpaperSelectorWindow";
import { initCache } from "@/lib/cache/init";
import { initConfigs } from "@/lib/config";
import LetaSocket from "@/lib/socket";
import { applyTheme } from "@/lib/theme/apply";
import ConfigService from "@/services/config";
import HyprlandService from "@/services/hyprland";
import LauncherService from "@/services/launcher";
import MprisService from "@/services/mpris";
import ThemeService from "@/services/theme";
import WallpaperService from "@/services/wallpaper";
import style from "./scss/index.scss";

const windows = [
  BarWindow,
  WallpaperWindow,
  LauncherWindow,
  WallpaperSelectorWindow,
];

const services = [
  ConfigService,
  HyprlandService,
  WallpaperService,
  LauncherService,
  ThemeService,
  MprisService,
];

app.start({
  icons: `${SRC}/assets`,
  css: style,
  main() {
    initCache();
    initConfigs();
    applyTheme();

    const socket = LetaSocket.get_default();

    services.forEach((service) => {
      service.get_default();
    });

    WallpaperService.get_default().initMonitors(app.monitors);

    app.monitors.forEach((monitor) => {
      windows.forEach((window) => {
        window(monitor);
      });
    });

    app.connect("shutdown", () => {
      socket.close();
    });
  },
});
