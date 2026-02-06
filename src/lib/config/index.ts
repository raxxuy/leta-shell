import { CONFIG_DIR } from "@/constants";
import type { ConfigKey } from "@/types/config";
import { buildPath, ensureDir, fileExists, readFile, writeFile } from "@/utils";
import { type Configs, schemas } from "./schema";

const defaultConfigs: Configs = {
  bar: schemas.bar.parse({
    window: {},
    layout: {},
    modules: { workspaces: {}, clock: {} },
  }),
  global: schemas.global.parse({
    spacings: {},
    icons: { pixelSize: {} },
  }),
  background: schemas.background.parse({}),
  wallpapers: schemas.wallpapers.parse({}),
};

export const configs = { ...defaultConfigs };

const loadOrCreate = async <K extends ConfigKey>(
  key: K,
): Promise<Configs[K]> => {
  const path = buildPath(CONFIG_DIR, `${key}.json`);

  if (fileExists(path)) {
    return schemas[key].parse(JSON.parse(readFile(path))) as Configs[K];
  }

  const defaultConfig = schemas[key].parse(defaultConfigs[key]) as Configs[K];

  writeFile(path, JSON.stringify(defaultConfig, null, 2));

  return defaultConfig;
};

export const initConfigs = async () => {
  ensureDir(CONFIG_DIR);

  const entries = await Promise.all(
    (Object.keys(schemas) as ConfigKey[]).map(async (key) => [
      key,
      await loadOrCreate(key),
    ]),
  );

  Object.assign(configs, Object.fromEntries(entries));
};

export const getConfig = <K extends ConfigKey>(key: K): Configs[K] =>
  configs[key];

export const writeConfig = <K extends ConfigKey>(
  key: K,
  partial: Partial<Configs[K]>,
) => {
  const validated = schemas[key].parse({
    ...configs[key],
    ...partial,
  }) as Configs[K];

  writeFile(
    buildPath(CONFIG_DIR, `${key}.json`),
    JSON.stringify(validated, null, 2),
  );

  configs[key] = validated;
};
