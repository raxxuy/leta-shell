import type GObject from "ags/gobject";
import { getter, register } from "ags/gobject";
import type { LauncherResult } from "@/types/launcher";
import Service from "../base";
import { ProviderManager } from "./ProviderManager";
import {
  ActionsProvider,
  AppsProvider,
  CalculatorProvider,
  CommandsProvider,
  WebSearchProvider,
} from "./providers";

interface LauncherSignals extends GObject.Object.SignalSignatures {}

@register({ GTypeName: "LauncherService" })
export default class LauncherService extends Service<LauncherSignals> {
  private static instance: LauncherService;
  private providerManager = new ProviderManager();
  #results: LauncherResult[] = [];
  #searching = false;

  static get_default() {
    if (!LauncherService.instance) {
      LauncherService.instance = new LauncherService();
    }
    return LauncherService.instance;
  }

  @getter(Array)
  get results() {
    return this.#results;
  }

  @getter(Boolean)
  get searching() {
    return this.#searching;
  }

  async search(query: string) {
    if (!query.trim()) {
      this.#results = [];
      this.notify("results");
      return;
    }

    this.#searching = true;
    this.notify("searching");

    try {
      const results = await this.providerManager.search(query);
      this.#results = results;
      this.notify("results");
    } finally {
      this.#searching = false;
      this.notify("searching");
    }
  }

  clear() {
    this.#results = [];
    this.notify("results");
  }

  private registerProviders() {
    this.providerManager.register(new CalculatorProvider());
    this.providerManager.register(new AppsProvider());
    this.providerManager.register(new CommandsProvider());
    this.providerManager.register(new ActionsProvider());
    this.providerManager.register(new WebSearchProvider());
  }

  constructor() {
    super();
    this.registerProviders();
  }
}
