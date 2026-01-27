import type { LauncherProvider, LauncherResult } from "./types";

export class ProviderManager {
  private providers: LauncherProvider[] = [];

  register(provider: LauncherProvider) {
    this.providers.push(provider);
    this.providers.sort((a, b) => b.priority - a.priority);
  }

  async search(query: string): Promise<LauncherResult[]> {
    const results = await Promise.all(
      this.providers
        .filter((p) => p.canHandle(query))
        .map((p) => p.search(query)),
    );

    return results
      .flat()
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }
}
