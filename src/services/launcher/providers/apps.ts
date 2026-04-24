import AstalApps from "gi://AstalApps";
import { toggleWindow } from "@/lib/window";
import type { LauncherProvider, LauncherResult } from "../types";

export default class AppsProvider implements LauncherProvider {
  private apps: AstalApps.Apps = new AstalApps.Apps();

  id = "apps";
  priority = 1;

  refresh(): void {
    this.apps.reload();
  }

  search(query: string): LauncherResult[] {
    return this.apps.fuzzy_query(query).map((app) => ({
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
