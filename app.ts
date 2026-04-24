import app from "ags/gtk4/app";
import style from "scss/index.scss";
import { initCache } from "@/lib/cache";
import { startSocket, stopSocket } from "@/lib/socket";
import { applyTheme } from "@/lib/theme";
import ConfigService from "@/services/config";
import MprisService from "@/services/mpris";
import ThemeService from "@/services/theme";
import WallpaperService from "@/services/wallpaper";
import BarWindow from "@/windows/Bar";
import LauncherWindow from "@/windows/Launcher";
import WallpaperWindow from "@/windows/Wallpaper";
import WallpaperSelectorWindow from "@/windows/WallpaperSelector";

app.start({
  icons: `${SRC}/assets/icons`,
  iconTheme: "custom",
  css: style,
  main() {
    initCache();
    startSocket();

    ConfigService.get_default();
    ThemeService.get_default();
    MprisService.get_default();
    WallpaperService.get_default().initMonitors(app.monitors);

    app.monitors.forEach((mon) => {
      BarWindow(mon);
      LauncherWindow(mon);
      WallpaperWindow(mon);
      WallpaperSelectorWindow(mon);
    });

    applyTheme();

    app.connect("shutdown", () => {
      stopSocket();
    });
  },
});
