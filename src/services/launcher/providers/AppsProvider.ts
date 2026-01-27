import AstalApps from "gi://AstalApps";
import { toggleWindow } from "@/lib/utils";
import type { LauncherProvider, LauncherResult } from "../types";

export class AppsProvider implements LauncherProvider {
  name = "apps";
  priority = 10;
  private apps = new AstalApps.Apps();

  canHandle(query: string): boolean {
    return query.length > 0;
  }

  async search(query: string): Promise<LauncherResult[]> {
    return this.apps
      .exact_query(query)
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 5)
      .map((app) => ({
        id: app.entry,
        type: "app" as const,
        title: app.name,
        description: app.description,
        icon: app.iconName,
        score: 100,
        execute: () => {
          toggleWindow("launcher");
          app.launch();
        },
        data: app,
      }));
  }
}
