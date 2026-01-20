import { CONFIG_DIR } from "@/constants";
import {
  backgroundConfigSchema,
  barConfigSchema,
  globalConfigSchema,
  launcherConfigSchema,
  schemas,
} from "@/lib/config/schema";
import {
  buildPath,
  ensureDir,
  fileExists,
  readFile,
  writeFile,
} from "@/lib/utils";

export const configs = {
  bar: barConfigSchema.parse({
    window: {},
    layout: {},
    modules: { workspaces: {}, clock: {} },
  }),
  global: globalConfigSchema.parse({
    spacings: {},
    icons: { pixelSize: {} },
  }),
  launcher: launcherConfigSchema.parse({
    modules: { items: {} },
  }),
  background: backgroundConfigSchema.parse({}),
};

export const initConfigs = async () => {
  ensureDir(CONFIG_DIR);

  await Promise.all(
    Object.keys(configs).map(async (k) => {
      const key = k as keyof typeof configs;
      const filePath = buildPath(CONFIG_DIR, `${key}.json`);

      if (!fileExists(filePath)) {
        const defaultConfig = schemas[key].parse(configs[key]);
        writeFile(filePath, JSON.stringify(defaultConfig, null, 2));
        configs[key] = defaultConfig as any;
      } else {
        const content = readFile(filePath);
        const parsedContent = JSON.parse(content);
        configs[key] = schemas[key].parse(parsedContent) as any;
      }
    }),
  );
};

export const getConfig = <K extends keyof typeof configs>(
  key: K,
): (typeof configs)[K] => configs[key];

export const writeConfig = <K extends keyof typeof configs>(
  key: K,
  config: Partial<(typeof configs)[K]>,
): void => {
  const merged = { ...configs[key], ...config };
  const validated = schemas[key].parse(merged);
  const filePath = buildPath(CONFIG_DIR, `${key}.json`);
  writeFile(filePath, JSON.stringify(validated, null, 2));
  configs[key] = validated as any;
};
