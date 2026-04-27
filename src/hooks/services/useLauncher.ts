import { createBinding } from "ags";
import LauncherService from "@/services/launcher";

export default function useLauncher() {
  const service = LauncherService.get_default();

  const results = createBinding(service, "results");
  const hasResults = results((r) => r.length > 0);

  const search = (query: string) => service.search(query);
  const clear = () => service.clear();

  return { results, hasResults, search, clear };
}
