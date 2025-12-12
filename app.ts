import app from "ags/gtk4/app";
import style from "styles/index.scss";
import { initCache } from "@/lib/cache";
import request from "@/lib/request";
import { applyTheme } from "@/lib/styles";
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
    Settings();
    app.monitors.forEach((monitor) => {
      Bar(monitor);
      Launcher(monitor);
      Background(monitor);
      WallpaperManager(monitor);
    });
  },
  requestHandler(argv, res) {
    request(argv, res);
  },
});
