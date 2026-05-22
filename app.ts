import type { Gdk } from "ags/gtk4";
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
import SettingsWindow from "@/windows/Settings";
import WallpaperWindow from "@/windows/Wallpaper";
import WallpaperSelectorWindow from "@/windows/WallpaperSelector";

const windowFactories = [
  BarWindow,
  LauncherWindow,
  WallpaperWindow,
  NotificationsWindow,
  WallpaperSelectorWindow,
  SettingsWindow,
];

const services = [ConfigService, ThemeService, MprisService];

const initializeInfrastructure = (): void => {
  initCache();
  startSocket();
};

const initializeServices = (): void => {
  services.forEach((service) => {
    service.get_default();
  });

  WallpaperService.get_default().initMonitors(app.monitors);
};

const mountWindows = (monitors: Gdk.Monitor[]): void => {
  monitors.forEach((monitor) => {
    windowFactories.forEach((windowFactory) => {
      windowFactory(monitor);
    });
  });
};

const initializeEffects = (): void => {
  applyTheme();

  app.connect("shutdown", stopSocket);
};

app.start({
  icons: `${SRC}/assets/icons`,
  iconTheme: "custom",
  css: style,

  main() {
    initializeInfrastructure();
    initializeServices();
    mountWindows(app.monitors);
    initializeEffects();
  },
});
