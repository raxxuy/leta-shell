import { CONFIG_DIR } from "@/constants";
import {
  type ConfigKey,
  type Configs,
  schemaDefaults,
  schemas,
} from "@/lib/config/schemas";
import { buildPath, ensureDir, readFile, writeFile } from "@/utils";

const getConfigPath = (key: ConfigKey): string =>
  buildPath(CONFIG_DIR, `${key}.json`);

const readConfigFile = <K extends ConfigKey>(key: K): Configs[K] | null => {
  const content = readFile(getConfigPath(key));
  if (!content) return null;

  try {
    return schemas[key].parse(JSON.parse(content)) as Configs[K];
  } catch {
    console.warn(`[config] Invalid "${key}", resetting to defaults`);
    return null;
  }
};

const writeConfigFile = <K extends ConfigKey>(
  key: K,
  config: Configs[K],
): boolean => writeFile(getConfigPath(key), JSON.stringify(config, null, 2));

const loadOrCreate = <K extends ConfigKey>(key: K): Configs[K] => {
  const existing = readConfigFile(key);
  if (existing) return existing;

  const defaults = schemas[key].parse(schemaDefaults[key]) as Configs[K];
  if (!writeConfigFile(key, defaults))
    console.warn(`[config] Failed to write defaults for "${key}"`);

  return defaults;
};

export const initConfigs = (): Configs => {
  ensureDir(CONFIG_DIR);

  return Object.fromEntries(
    (Object.keys(schemas) as ConfigKey[]).map((key) => [
      key,
      loadOrCreate(key),
    ]),
  ) as Configs;
};

export const writeConfig = <K extends ConfigKey>(
  key: K,
  config: Configs[K],
): void => {
  try {
    ensureDir(CONFIG_DIR);
    writeConfigFile(key, config);
  } catch (error) {
    console.error(`[config] Failed to write "${key}":`, error);
  }
};
