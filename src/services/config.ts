import Gio from "gi://Gio";
import { type Accessor, createConnection } from "ags";
import type GObject from "ags/gobject";
import { getter, gtype, register, signal } from "ags/gobject";
import { get, set } from "es-toolkit/compat";
import { CONFIG_DIR } from "@/constants";
import { emitNotify } from "@/decorators/gobject";
import { monitor } from "@/decorators/monitor";
import { initConfigs } from "@/lib/config";
import {
  type ConfigKey,
  type Configs,
  type ConfigType,
  schemas,
} from "@/lib/config/schemas";
import { resolveUpdater, scheduleWrite } from "@/lib/config/utils";
import type { Get, Path, ValueOrUpdater } from "@/types/config";
import Service from "./base";

interface ConfigServiceSignals extends GObject.Object.SignalSignatures {
  "config-changed": ConfigService["configChanged"];
}

@register({ GTypeName: "ConfigService" })
export default class ConfigService extends Service<ConfigServiceSignals> {
  private static instance: ConfigService;

  #configs: Configs = initConfigs();
  #bindings = new Map<string, Accessor<unknown>>();

  static get_default(): ConfigService {
    if (!ConfigService.instance) ConfigService.instance = new ConfigService();
    return ConfigService.instance;
  }

  @signal(gtype<ConfigKey>(String), gtype<Path<ConfigType<ConfigKey>>>(String))
  configChanged(_key: ConfigKey, _path: Path<ConfigType<ConfigKey>>): void {}

  @getter(Object)
  get configs(): Configs {
    return this.#configs;
  }

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
    const next = resolveUpdater(value, current);

    if (Object.is(current, next)) return;

    const updated = set({ ...this.#configs[key] }, path, next);
    const parsed = schemas[key].parse(updated) as Configs[K];

    this.setConfigs({ ...this.#configs, [key]: parsed });
    this.emit("config-changed", key, path);
    scheduleWrite(key, parsed);
  }

  bind<K extends ConfigKey, P extends Path<ConfigType<K>>>(
    key: K,
    path: P,
  ): Accessor<Get<ConfigType<K>, P>> {
    const cacheKey = `${key}.${path}`;

    if (!this.#bindings.has(cacheKey)) {
      this.#bindings.set(
        cacheKey,
        createConnection(this.getValue(key, path), [
          this,
          "config-changed",
          (changedKey: K, changedPath: P, current: Get<ConfigType<K>, P>) => {
            if (changedKey !== key) return current;
            if (changedPath !== path && changedPath !== "") return current;
            return this.getValue(key, path);
          },
          // biome-ignore lint/suspicious/noExplicitAny: <Just terrible>
        ] as any),
      );
    }

    return this.#bindings.get(cacheKey) as Accessor<Get<ConfigType<K>, P>>;
  }

  @emitNotify("configs")
  private setConfigs(configs: Configs): void {
    this.#configs = configs;
  }

  @monitor(CONFIG_DIR, Gio.FileMonitorEvent.CHANGES_DONE_HINT)
  protected onConfigChanged(): void {
    const reloaded = initConfigs();

    if (JSON.stringify(reloaded) === JSON.stringify(this.#configs)) return;

    this.setConfigs(reloaded);

    for (const key of Object.keys(reloaded)) {
      this.emit("config-changed", key, "");
    }
  }
}
