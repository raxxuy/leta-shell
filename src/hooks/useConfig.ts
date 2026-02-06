import type { Configs } from "@/lib/config/schema";
import ConfigService from "@/services/config";
import type { Get, Path } from "@/types/config";

type ValueOrUpdater<T> = T | ((current: T) => T);

export const useBarConfig = () => {
  const configService = ConfigService.get_default();

  return {
    setValue: <P extends Path<Configs["bar"]>>(
      path: P,
      value: ValueOrUpdater<Get<Configs["bar"], P>>,
    ) => configService.setValue("bar", path, value),
    window: configService.bind("bar", "window"),
    layout: {
      start: configService.bind("bar", "layout.start"),
      center: configService.bind("bar", "layout.center"),
      end: configService.bind("bar", "layout.end"),
    },
    modules: {
      workspaces: configService.bind("bar", "modules.workspaces"),
      clock: configService.bind("bar", "modules.clock"),
    },
  };
};

export const useBackgroundConfig = () => {
  const configService = ConfigService.get_default();

  return {
    setValue: <P extends Path<Configs["background"]>>(
      path: P,
      value: ValueOrUpdater<Get<Configs["background"], P>>,
    ) => configService.setValue("background", path, value),
    enabled: configService.bind("background", "enabled"),
  };
};

export const useWallpapersConfig = () => {
  const configService = ConfigService.get_default();

  return {
    setValue: <P extends Path<Configs["wallpapers"]>>(
      path: P,
      value: ValueOrUpdater<Get<Configs["wallpapers"], P>>,
    ) => configService.setValue("wallpapers", path, value),
    location: configService.bind("wallpapers", "location"),
  };
};

export const useGlobalConfig = () => {
  const configService = ConfigService.get_default();
  const spacings = configService.bind("global", "spacings");
  const icons = configService.bind("global", "icons");

  return {
    setValue: <P extends Path<Configs["global"]>>(
      path: P,
      value: ValueOrUpdater<Get<Configs["global"], P>>,
    ) => configService.setValue("global", path, value),
    spacing: (key: keyof Configs["global"]["spacings"], scale = 1) =>
      spacings((s) => s[key] * scale),
    iconSize: (key: keyof Configs["global"]["icons"]["pixelSize"], scale = 1) =>
      icons((i) => i.pixelSize[key] * scale),
    spacings,
    icons,
  };
};

export const useIconSizes = () => {
  return ConfigService.bind("global", "icons.pixelSize");
};
