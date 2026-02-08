import { createBinding } from "ags";
import type GObject from "ags/gobject";
import { getter, register, signal } from "ags/gobject";
import { get, set } from "es-toolkit/compat";
import { USER_PICTURE_FILE } from "@/constants";
import { configs, writeConfig } from "@/lib/config";
import type { ConfigKey, ConfigType, Get, Path } from "@/types/config";
import { scaleAndCenterImage } from "@/utils";
import Service from "./base";

interface ConfigSignals extends GObject.Object.SignalSignatures {
  changed: ConfigService["changed"];
}

type ValueOrUpdater<T> = T | ((current: T) => T);

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

  @getter(String)
  get avatar() {
    return USER_PICTURE_FILE;
  }

  @signal(String, String)
  changed(_key: string, _path: string) {}

  getValue<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    key: K,
    path: P,
  ): Get<ConfigType<K>, P> {
    return get(this.#configs[key], path) as Get<ConfigType<K>, P>;
  }

  setValue<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    key: K,
    path: P,
    value: ValueOrUpdater<Get<ConfigType<K>, P>>,
  ): void {
    const current = this.getValue(key, path);
    const newValue =
      typeof value === "function"
        ? (value as (current: Get<ConfigType<K>, P>) => Get<ConfigType<K>, P>)(
            current,
          )
        : value;

    this.#configs[key] = set(
      { ...this.#configs[key] },
      path,
      newValue,
    ) as ConfigType<K>;

    writeConfig(key, this.#configs[key]);
    this.emit("changed", key, path);
    this.notify("configs");
  }

  bind<K extends ConfigKey, P extends Path<ConfigType<K>>>(key: K, path: P) {
    return createBinding(this, "configs")(() => this.getValue(key, path));
  }

  async setAvatar(sourcePath: string) {
    const scaledPath = await scaleAndCenterImage(
      sourcePath,
      80,
      80,
      USER_PICTURE_FILE,
      true,
    );

    if (scaledPath) {
      this.notify("avatar");
    } else {
      console.error("Failed to set avatar");
    }
  }

  static setValue<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    key: K,
    path: P,
    value: ValueOrUpdater<Get<ConfigType<K>, P>>,
  ): void {
    ConfigService.get_default().setValue(key, path, value);
  }

  static bind<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    key: K,
    path: P,
  ) {
    const service = ConfigService.get_default();
    return createBinding(service, "configs")(() => service.getValue(key, path));
  }
}
