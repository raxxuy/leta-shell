import app from "ags/gtk4/app";
import style from "src/styles/index.scss";
import { applyCss, createCacheDir } from "@/lib/cache";
import request from "@/lib/request";
import Background from "@/windows/Background";
import BarPanel from "@/windows/BarPanel";
import Launcher from "@/windows/Launcher";
import WallpaperManager from "@/windows/WallpaperManager";

app.start({
  css: style,
  main() {
    createCacheDir();
    applyCss();
    Launcher();
    WallpaperManager();
    app.monitors.forEach((monitor) => {
      BarPanel(monitor);
      Background(monitor);
    });
  },
  requestHandler(argv, res) {
    request(argv, res);
  },
});
