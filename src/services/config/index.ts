import { createBinding } from "ags";
import type GObject from "ags/gobject";
import { getter, register, signal } from "ags/gobject";
import { configs, writeConfig } from "@/lib/config";
import Service from "../base";
import type { ConfigKey, ConfigType, Path, PathValue } from "./types";

interface ConfigSignals extends GObject.Object.SignalSignatures {
  changed: ConfigService["changed"];
}

@register({ GTypeName: "ConfigService" })
export default class ConfigService extends Service<ConfigSignals> {
  private static instance: ConfigService;
  #configs = configs;

  static get_default(): ConfigService {
    if (!ConfigService.instance) ConfigService.instance = new ConfigService();
    return ConfigService.instance;
  }

  @getter(Object)
  get configs() {
    return this.#configs;
  }

  @signal(String, String)
  changed(_key: string, _path: string) {}

  getValue<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    configKey: K,
    path: P,
  ): PathValue<ConfigType<K>, P> {
    const config = this.#configs[configKey];

    return (path as string).split(".").reduce<unknown>((acc, part) => {
      return (acc as Record<string, unknown>)?.[part];
    }, config as unknown) as PathValue<ConfigType<K>, P>;
  }

  setValue<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    configKey: K,
    path: P,
    value:
      | PathValue<ConfigType<K>, P>
      | ((current: PathValue<ConfigType<K>, P>) => PathValue<ConfigType<K>, P>),
  ): void {
    const currentValue = this.getValue(configKey, path);
    const newValue =
      typeof value === "function"
        ? (
            value as (
              current: PathValue<ConfigType<K>, P>,
            ) => PathValue<ConfigType<K>, P>
          )(currentValue)
        : value;

    const config = this.#configs[configKey];
    const keys = (path as string).split(".");
    const lastKey = keys.pop() as string;

    if (keys.length === 0) {
      this.#configs[configKey] = {
        ...config,
        [lastKey]: newValue,
      } as ConfigType<K>;
    } else {
      const result = { ...config };
      let current: Record<string, unknown> = result as Record<string, unknown>;

      for (const key of keys) {
        const next = current[key] as Record<string, unknown>;
        current[key] = { ...next };
        current = current[key] as Record<string, unknown>;
      }

      current[lastKey] = newValue;
      this.#configs[configKey] = result as ConfigType<K>;
    }

    writeConfig(configKey, this.#configs[configKey]);
    this.emit("changed", configKey, path);
    this.notify("configs");
  }

  bind<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    configKey: K,
    path: P,
  ) {
    return createBinding(this, "configs")(() => this.getValue(configKey, path));
  }

  // Remove the annoying need to call get_default
  static bind<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    configKey: K,
    path: P,
  ) {
    const configService = ConfigService.get_default();

    return createBinding(
      configService,
      "configs",
    )(() => configService.getValue(configKey, path));
  }
}
