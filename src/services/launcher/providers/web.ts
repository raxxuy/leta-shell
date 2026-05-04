import { exec } from "@/lib/process";
import { toggleWindow } from "@/lib/window";
import ConfigService from "@/services/config";
import type { LauncherProvider, LauncherResult } from "../types";

export default class WebProvider implements LauncherProvider {
  private searchEngines: Record<string, string> = {
    google: "https://google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    brave: "https://search.brave.com/search?q=",
  };

  private get engine(): string {
    const name =
      ConfigService.get_default().configs.launcher.providers.web.searchEngine;
    return this.searchEngines[name] ?? this.searchEngines.google;
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
          exec(`xdg-open ${this.engine}${encodeURIComponent(query)}`);
          exec(
            "hyprctl dispatch focuswindow class:$(xdg-settings get default-web-browser | sed 's/\\.desktop$//')",
          );
        },
      },
    ];
  }

  shouldSearch(query: string): boolean {
    return query.length > 2;
  }
}
