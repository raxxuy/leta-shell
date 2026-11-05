import Gio from "gi://Gio?version=2.0";
import { onCleanup, runScope } from "gnim";
import { register } from "gnim/gobject";
import { watchDecorated, watchFile } from "@/decorators/watchFile";
import { configs } from "@/lib/config/schemas";
import { config } from "@/lib/config/store";
import { buildPath, ensureDir } from "@/lib/fs";
import { BaseService } from "./base";

@register
export default class ConfigService extends BaseService {
  readonly store = config;
  readonly theme = this.store.value.as((value) => value.theme);

  @watchFile(
    () => config.path,
    Gio.FileMonitorEvent.CHANGES_DONE_HINT,
    Gio.FileMonitorEvent.CREATED,
    Gio.FileMonitorEvent.DELETED,
    Gio.FileMonitorEvent.RENAMED,
    Gio.FileMonitorEvent.MOVED_IN,
    Gio.FileMonitorEvent.MOVED_OUT,
  )
  protected onConfigChanged(path: string, event: Gio.FileMonitorEvent) {
    const isConfigFile = Object.keys(configs).some(
      (key) => path === buildPath(this.store.path, `${key}.json`),
    );

    if (event !== Gio.FileMonitorEvent.RENAMED && !isConfigFile) return;

    try {
      this.store.reload();
    } catch (error) {
      console.error("Failed to reload config:", error);
    }
  }

  constructor() {
    super();

    if (!ensureDir(this.store.path)) {
      throw new Error(`Failed to create config directory: ${this.store.path}`);
    }

    runScope(this.scope, () => onCleanup(watchDecorated(this)));
  }
}
