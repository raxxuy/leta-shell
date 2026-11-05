import { createState } from "gnim";
import { CONFIG_DIR } from "@/constants";
import { buildPath, ensureDir, readFile, writeFile } from "../fs";
import { configs } from "./schemas";
import type {
  Config,
  ConfigInput,
  ConfigKey,
  ConfigStore,
  ConfigValue,
} from "./types";

const keys = Object.keys(configs) as ConfigKey[];

const createConfigStore = (dir = CONFIG_DIR): ConfigStore => {
  const fileFor = (key: ConfigKey) => buildPath(dir, `${key}.json`);

  const parse = (input: ConfigInput): Config =>
    Object.fromEntries(
      keys.map((key) => [key, configs[key].parse(input[key])]),
    ) as Config;

  const read = (key: ConfigKey): unknown => {
    const text = readFile(fileFor(key));
    return text === null ? undefined : JSON.parse(text);
  };

  const load = (): Config =>
    parse(Object.fromEntries(keys.map((key) => [key, read(key)])));

  const loadInitial = (): Config =>
    Object.fromEntries(
      keys.map((key) => {
        try {
          return [key, configs[key].parse(read(key))];
        } catch (error) {
          console.error(
            `Failed to load ${fileFor(key)}; using defaults:`,
            error,
          );
          return [key, configs[key].parse(undefined)];
        }
      }),
    ) as Config;

  const [value, setValue] = createState<ConfigValue>(loadInitial());

  const persist = (next: ConfigValue): void => {
    ensureDir(dir);

    for (const key of keys) {
      writeFile(fileFor(key), `${JSON.stringify(next[key], null, 2)}\n`);
    }
  };

  const set = (input: ConfigInput): void => {
    const next = parse(input);
    persist(next);
    setValue(next);
  };

  const update = (edit: (draft: Config) => void): void => {
    const draft = parse(value.peek());
    edit(draft);
    set(draft);
  };

  const save = (): void => persist(value.peek());
  const reload = (): void => setValue(load());
  const reset = (): void => set({});

  return { path: dir, value, set, update, save, reload, reset };
};

export const config = createConfigStore();
