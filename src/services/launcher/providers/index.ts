import type { LauncherProvider, LauncherResult } from "../types";
import AppsProvider from "./apps";

export const PROVIDERS = {
  apps: AppsProvider,
};

export default class ProviderManager {
  private providers: Map<string, LauncherProvider> = new Map();

  addProvider(id: keyof typeof PROVIDERS): void {
    if (id in PROVIDERS) {
      this.providers.set(id, new PROVIDERS[id]());
    }
  }

  removeProvider(id: keyof typeof PROVIDERS): void {
    this.providers.delete(id);
  }

  async search(query: string): Promise<LauncherResult[]> {
    const results = [];
    for (const provider of this.providers.values()) {
      results.push(await provider.search(query));
    }

    return results.flat();
  }
}
