import Gio from "gi://Gio";
import { type Accessor, createBinding } from "ags";
import { getter, register } from "ags/gobject";
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
import { structuredClone } from "@/utils";
import Service from "./base";

@register({ GTypeName: "ConfigService" })
export default class ConfigService extends Service {
  private static instance: ConfigService;

  #configs: Configs = initConfigs();
  #bindings = new Map<string, ReturnType<typeof createBinding>>();

  static get_default(): ConfigService {
    if (!ConfigService.instance) ConfigService.instance = new ConfigService();
    return ConfigService.instance;
  }

  @getter(Object)
  get configs() {
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

    const updated = set(structuredClone(this.#configs[key]), path, next);
    const parsed = schemas[key].parse(updated) as ConfigType<K>;

    this.setConfigs({ ...this.#configs, [key]: parsed });
    scheduleWrite(key, parsed);
  }

  bind<K extends ConfigKey, P extends Path<ConfigType<K>>>(key: K, path: P) {
    const cacheKey = `${key}.${path}`;

    if (!this.#bindings.has(cacheKey)) {
      this.#bindings.set(
        cacheKey,
        createBinding(this, "configs")(() => this.getValue(key, path)),
      );
    }

    return this.#bindings.get(cacheKey) as Accessor<Get<ConfigType<K>, P>>;
  }

  @emitNotify("configs")
  private setConfigs(configs: Configs) {
    this.#configs = configs;
  }

  @monitor(
    (_self: ConfigService) => CONFIG_DIR,
    Gio.FileMonitorEvent.CHANGES_DONE_HINT,
  )
  private onConfigChanged() {
    const reloaded = initConfigs();
    this.setConfigs(reloaded);
  }
}
