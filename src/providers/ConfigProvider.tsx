import type { Accessor } from "ags";
import { createContext } from "ags";

import type { ConfigKey, ConfigType } from "@/lib/config/schemas";
import ConfigService from "@/services/config";
import type { Get, Path, ValueOrUpdater } from "@/types/config";

export const createConfigProvider = <
  K extends ConfigKey,
  Paths extends readonly Path<ConfigType<K>>[],
>(
  key: K,
  paths: Paths,
) => {
  type ContextValue = {
    [P in Paths[number]]: Accessor<Get<ConfigType<K>, P>>;
  } & {
    setValue: <P extends Paths[number]>(
      path: P,
      next: ValueOrUpdater<Get<ConfigType<K>, P>>,
    ) => void;
  };

  const Context = createContext<ContextValue | null>(null);

  const Provider = ({ children }: { children: () => JSX.Element }) => {
    const service = ConfigService.get_default();

    const values = Object.fromEntries(
      paths.map((p) => [p, service.bind(key, p)]),
    ) as { [P in Paths[number]]: Accessor<Get<ConfigType<K>, P>> };

    const setValue = <P extends Paths[number]>(
      path: P,
      next: ValueOrUpdater<Get<ConfigType<K>, P>>,
    ) => service.setValue(key, path, next);

    return <Context value={{ ...values, setValue }}>{children}</Context>;
  };

  const useContextValue = () => {
    const context = Context.use();

    if (!context) {
      throw new Error(
        `useConfigContext(${key}) must be used inside its Provider`,
      );
    }

    return context;
  };

  return [Provider, useContextValue] as const;
};

export const [ThemeConfigProvider, useThemeConfig] = createConfigProvider(
  "theme",
  ["spacing", "pixelSize", "colors"] as const,
);

export const [LauncherConfigProvider, useLauncherConfig] = createConfigProvider(
  "launcher",
  ["maxResults", "providers.apps.enabled", "providers.apps.query"] as const,
);
