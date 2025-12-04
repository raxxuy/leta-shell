import app from "ags/gtk4/app";
import style from "src/styles/index.scss";
import { applyTheme, initCache } from "@/lib/cache";
import request from "@/lib/request";
import Background from "@/windows/Background";
import Bar from "@/windows/Bar";
import Launcher from "@/windows/Launcher";
import Settings from "@/windows/Settings";
import WallpaperManager from "@/windows/WallpaperManager";

app.start({
  icons: `${SRC}/assets/icons`,
  css: style,
  main() {
    initCache();
    applyTheme();
    Launcher();
    WallpaperManager();
    Settings();
    app.monitors.forEach((monitor) => {
      Bar(monitor);
      Background(monitor);
    });
  },
  requestHandler(argv, res) {
    request(argv, res);
  },
});
