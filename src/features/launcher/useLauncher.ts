import { createBindings } from "@/lib/binding";
import LauncherService from "@/services/launcher";

export const useLauncher = () => {
  const service = LauncherService.get_default();

  const { results } = createBindings(service, {
    results: true,
  });

  return {
    results,
    search: (query: string) => service.search(query),
    clear: () => service.clear(),
    activate: () => results.peek()[0].activate(),
  };
};
