import app from "ags/gtk4/app";
import style from "styles/index.scss";
import { initCache } from "@/lib/cache";
import { initConfigs } from "@/lib/config";
import request from "@/lib/request";
import { socketService } from "@/lib/socket";
import { applyTheme } from "@/lib/styles";
import Background from "@/windows/Background";
import Bar from "@/windows/Bar";
import Launcher from "@/windows/Launcher";
import NotificationPopups from "@/windows/NotificationPopups";
import Settings from "@/windows/Settings";
import WallpaperManager from "@/windows/WallpaperManager";

app.start({
  icons: `${SRC}/assets/icons`,
  iconTheme: "custom",
  css: style,
  main() {
    initConfigs();
    initCache();
    applyTheme();

    socketService.start();

    app.monitors.forEach((monitor) => {
      Bar(monitor);
      Launcher(monitor);
      Background(monitor);
      NotificationPopups(monitor);
      WallpaperManager(monitor);
    });
    Settings();

    app.connect("shutdown", () => {
      socketService.stop();
    });
  },
  requestHandler(argv, res) {
    request(argv, res);
  },
});
