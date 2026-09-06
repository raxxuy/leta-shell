import type { ConfigKey, ConfigType } from "@/lib/config/schemas";
import ConfigService from "@/services/config";
import type { Get, Path, ValueOrUpdater } from "@/types/config";

export const useConfig = <K extends ConfigKey, P extends Path<ConfigType<K>>>(
  key: K,
  path: P,
) => {
  const service = ConfigService.get_default();
  const value = service.bind(key, path);

  const setValue = (next: ValueOrUpdater<Get<ConfigType<K>, P>>) =>
    service.setValue(key, path, next);

  return [value, setValue] as const;
};
