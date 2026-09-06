import { getter, register } from "ags/gobject";
import { debounce } from "es-toolkit";

import { emitNotify } from "@/decorators/gobject";
import type { LauncherConfig } from "@/lib/config/schemas/launcher";
import Service from "../base";
import ConfigService from "../config";
import ProviderManager from "./providers";
import type { LauncherResult } from "./types";

@register({ GTypeName: "LauncherService" })
export default class LauncherService extends Service {
  private static instance: LauncherService;
  private providerManager: ProviderManager = new ProviderManager();

  private readonly searchDebounced = debounce(async (query: string) => {
    const results = await this.providerManager.search(query);
    this.setResults(results);
  }, 100);

  #results: LauncherResult[] = [];

  static get_default(): LauncherService {
    if (!LauncherService.instance)
      LauncherService.instance = new LauncherService();
    return LauncherService.instance;
  }

  private get config(): LauncherConfig {
    return ConfigService.get_default().configs.launcher;
  }

  @getter(Array<LauncherResult>)
  get results(): LauncherResult[] {
    return this.#results.slice(0, this.config.maxResults);
  }

  async search(query: string): Promise<void> {
    query = query.trim();

    if (!query) {
      this.clear();
      return;
    }

    this.searchDebounced(query);
  }

  clear(): void {
    this.setResults([]);
  }

  @emitNotify("results")
  private setResults(results: LauncherResult[]): void {
    this.#results = results;
  }

  constructor() {
    super();
    this.providerManager.addProvider("apps");
  }
}
