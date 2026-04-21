import { createBinding } from "ags";
import type { ConfigKey, ConfigType } from "@/lib/config/schemas";
import ConfigService from "@/services/config";
import type { Get, Path, ValueOrUpdater } from "@/types/config";

export const useConfig = <K extends ConfigKey, P extends Path<ConfigType<K>>>(
  key: K,
  path: P,
) => {
  const configService = ConfigService.get_default();
  const value = configService.bind(key, path);
  const setValue = (next: ValueOrUpdater<Get<ConfigType<K>, P>>) =>
    configService.setValue(key, path, next);

  return [value, setValue] as const;
};

export const useConfigSection = <K extends ConfigKey>(key: K) => {
  const configService = ConfigService.get_default();
  return createBinding(configService, "configs")((c) => c[key]);
};
