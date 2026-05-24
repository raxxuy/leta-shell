import { openUrl } from "@/lib/browser";
import { toggleWindow } from "@/lib/window";
import ConfigService from "@/services/config";
import type { LauncherProvider, LauncherResult } from "../types";

export default class WebProvider implements LauncherProvider {
  private static readonly searchEngines: Record<string, string> = {
    google: "https://google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    brave: "https://search.brave.com/search?q=",
  };

  private get engine(): string {
    const name =
      ConfigService.get_default().configs.launcher.providers.web.searchEngine;
    return WebProvider.searchEngines[name] ?? WebProvider.searchEngines.google;
  }

  id = "web";
  priority = 10;

  search(query: string): LauncherResult[] {
    return [
      {
        id: `web-${query}`,
        label: `Search "${query}"`,
        icon: "globe-01",
        activate: () => {
          toggleWindow("launcher");
          openUrl(`${this.engine}${encodeURIComponent(query)}`);
        },
      },
    ];
  }

  shouldSearch(query: string): boolean {
    return query.length > 2;
  }
}
