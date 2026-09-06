import type { LauncherProvider, LauncherResult } from "../types";
import AppsProvider from "./apps";

const PROVIDERS = {
  apps: AppsProvider,
};

export default class ProviderManager {
  private providers: LauncherProvider[] = [];

  addProvider(id: keyof typeof PROVIDERS): void {
    if (id in PROVIDERS) {
      this.providers.push(new PROVIDERS[id]());
    }
  }

  async search(query: string): Promise<LauncherResult[]> {
    const results = await Promise.all(
      this.providers.map((provider) => provider.search(query)),
    );

    return results.flat();
  }
}
