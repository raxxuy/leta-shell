import { getter, register } from "ags/gobject";
import { emitNotify } from "@/decorators/gobject";
import type { LauncherConfig } from "@/lib/config/schemas/launcher";
import Service from "../base";
import ConfigService from "../config";
import AppsProvider from "./providers/apps";
import SessionProvider from "./providers/session";
import WebProvider from "./providers/web";
import type { LauncherProvider, LauncherResult } from "./types";

@register({ GTypeName: "LauncherService" })
export default class LauncherService extends Service {
  private static instance: LauncherService;

  #providers: LauncherProvider[] = [];
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

  search(query: string): void {
    if (!query.trim()) {
      this.clear();
      return;
    }

    const q = query.trim();

    const results = this.#providers
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .filter((provider) => provider.shouldSearch(q))
      .flatMap((provider) => provider.search(q));

    this.setResults(results);
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
    this.#providers = [
      new AppsProvider(),
      new WebProvider(),
      new SessionProvider(),
    ];
  }
}
