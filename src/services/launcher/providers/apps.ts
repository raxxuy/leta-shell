import AstalApps from "gi://AstalApps";

import { toggleWindow } from "@/lib/window/utils";
import ConfigService from "@/services/config";
import type { LauncherProvider, LauncherResult } from "../types";

export default class AppsProvider implements LauncherProvider {
  private apps: AstalApps.Apps = new AstalApps.Apps();

  private get config() {
    return ConfigService.get_default().configs.launcher.providers.apps;
  }

  id = "apps";
  priority = 1;

  refresh(): void {
    this.apps.reload();
  }

  search(query: string): LauncherResult[] {
    const apps = this.apps;

    const results =
      this.config.query === "exact"
        ? apps.exact_query(query)
        : apps.fuzzy_query(query);

    return results.map((app) => ({
      id: app.entry,
      label: app.name,
      description: app.description,
      category: "Application",
      icon: app.iconName,
      activate: () => {
        toggleWindow("launcher");
        app.launch();
      },
    }));
  }

  shouldSearch(query: string): boolean {
    return query.length > 0;
  }
}
