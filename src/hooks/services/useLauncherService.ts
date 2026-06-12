import { createBinding } from "ags";
import LauncherService from "@/services/launcher";

export const useLauncherService = () => {
  const service = LauncherService.get_default();

  const results = createBinding(service, "results");

  const clear = () => service.clear();
  const search = (query: string) => service.search(query);

  return { results, search, clear };
};
