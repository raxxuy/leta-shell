import { createBinding } from "ags";
import LauncherService from "@/services/launcher";

export const useLauncher = () => {
  const launcherService = LauncherService.get_default();

  return {
    clear: () => launcherService.clear(),
    search: (query: string) => launcherService.search(query),
    results: createBinding(launcherService, "results"),
  };
};
