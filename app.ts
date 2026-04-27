import app from "ags/gtk4/app";
import style from "scss/index.scss";
import { initCache } from "@/lib/cache";
import { applyTheme } from "@/lib/theme";
import ConfigService from "@/services/config";
import MprisService from "@/services/mpris";
import ThemeService from "@/services/theme";
import WallpaperService from "@/services/wallpaper";
import { startSocket, stopSocket } from "@/socket";
import BarWindow from "@/windows/Bar";
import LauncherWindow from "@/windows/Launcher";
import NotificationsWindow from "@/windows/Notifications";
import WallpaperWindow from "@/windows/Wallpaper";
import WallpaperSelectorWindow from "@/windows/WallpaperSelector";

const windows = [
  BarWindow,
  LauncherWindow,
  WallpaperWindow,
  NotificationsWindow,
  WallpaperSelectorWindow,
];

app.start({
  icons: `${SRC}/assets/icons`,
  iconTheme: "custom",
  css: style,
  main() {
    initCache();
    startSocket();

    ConfigService.get_default();
    MprisService.get_default();
    WallpaperService.get_default().initMonitors(app.monitors);
    ThemeService.get_default();

    app.monitors.forEach((mon) => {
      windows.forEach((win) => {
        win(mon);
      });
    });

    applyTheme();

    app.connect("shutdown", () => {
      stopSocket();
    });
  },
});
