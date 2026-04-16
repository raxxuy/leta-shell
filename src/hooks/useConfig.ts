import { createBinding } from "ags";
import type { ConfigKey, ConfigType } from "@/lib/config/schemas";
import ConfigService from "@/services/config";
import type { Get, Path, ValueOrUpdater } from "@/types/config";

export const useConfig = <K extends ConfigKey, P extends Path<ConfigType<K>>>(
  key: K,
  path: P,
) => {
  const service = ConfigService.get_default();
  const value = service.bind(key, path);
  const set = (next: ValueOrUpdater<Get<ConfigType<K>, P>>) =>
    service.setValue(key, path, next);

  return [value, set] as const;
};

export const useConfigSection = <K extends ConfigKey>(key: K) => {
  const service = ConfigService.get_default();
  return createBinding(service, "configs")((c) => c[key]);
};
