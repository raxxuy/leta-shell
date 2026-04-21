import app from "ags/gtk4/app";
import style from "scss/index.scss";
import { initCache } from "@/lib/cache";
import { applyTheme, getUsedClasses, setClasses } from "@/lib/theme";
import ConfigService from "@/services/config";
import MprisService from "@/services/mpris";
import WallpaperService from "@/services/wallpaper";
import BarWindow from "@/windows/Bar";
import WallpaperWindow from "@/windows/Wallpaper";
import WallpaperSelectorWindow from "@/windows/WallpaperSelector";

app.start({
  icons: `${SRC}/assets/icons`,
  iconTheme: "custom",
  css: style,
  main() {
    ConfigService.get_default();
    MprisService.get_default();
    WallpaperService.get_default().initMonitors(app.monitors);

    app.monitors.forEach((mon) => {
      BarWindow(mon);
      WallpaperWindow(mon);
      WallpaperSelectorWindow(mon);
    });

    initCache();

    applyTheme({
      setClasses,
      classes: getUsedClasses(app.windows),
    });
  },
});

app.connect("notify::windows", () => {
  setClasses(getUsedClasses(app.windows));
});
