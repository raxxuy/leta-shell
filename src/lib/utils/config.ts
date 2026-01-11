import { configs } from "@/lib/config";
import type { ConfigKey, ConfigType, Path, PathValue } from "@/types/config";

export const getNestedValue = <
  K extends ConfigKey,
  P extends Path<ConfigType<K>>,
>(
  configKey: K,
  path: P,
): PathValue<ConfigType<K>, P> => {
  const config = configs[configKey];
  return (path as string).split(".").reduce<unknown>((acc, part) => {
    return (acc as Record<string, unknown>)?.[part];
  }, config as unknown) as PathValue<ConfigType<K>, P>;
};

export const setNestedValue = <
  K extends ConfigKey,
  P extends Path<ConfigType<K>>,
>(
  configKey: K,
  path: P,
  value: PathValue<ConfigType<K>, P>,
): ConfigType<K> => {
  const config = configs[configKey];
  const keys = (path as string).split(".");
  const lastKey = keys.pop() as string;

  if (keys.length === 0) {
    return { ...config, [lastKey]: value } as ConfigType<K>;
  }

  const result = { ...config };
  let current: Record<string, unknown> = result as Record<string, unknown>;

  for (const key of keys) {
    const next = current[key] as Record<string, unknown>;
    current[key] = { ...next };
    current = current[key] as Record<string, unknown>;
  }

  current[lastKey] = value;
  return result;
};
