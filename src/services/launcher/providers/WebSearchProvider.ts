import type { LauncherProvider, LauncherResult } from "@/types/launcher";
import { exec, toggleWindow } from "@/utils";

export class WebSearchProvider implements LauncherProvider {
  name = "web";
  priority = 3;

  private searchEngines = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    youtube: "https://www.youtube.com/results?search_query=",
  };

  canHandle(query: string): boolean {
    return query.length > 2;
  }

  async search(query: string): Promise<LauncherResult[]> {
    return [
      {
        id: `web-google-${query}`,
        type: "web",
        title: `Search Google for "${query}"`,
        description: "Open in browser",
        icon: "globe",
        score: 50,
        execute: () => {
          toggleWindow("launcher");
          exec(
            `xdg-open "${this.searchEngines.google}${encodeURIComponent(query)}"`,
          );
        },
      },
    ];
  }
}
