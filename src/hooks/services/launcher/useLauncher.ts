import { createBinding } from "ags";
import LauncherService from "@/services/launcher";

export const useLauncher = () => {
  const launcherService = LauncherService.get_default();
  const results = createBinding(launcherService, "results");

  return {
    results: results((r) => r.slice(0, 5)),
    search: (query: string) => launcherService.search(query),
    clear: () => launcherService.clear(),
  };
};
