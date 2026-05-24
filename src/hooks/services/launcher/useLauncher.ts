import { type Accessor, createBinding } from "ags";
import LauncherService from "@/services/launcher";
import type { LauncherResult } from "@/services/launcher/types";
import useConfig from "../config/useConfig";

export default function useLauncher() {
  const [maxResults] = useConfig("launcher", "maxResults");
  const service = LauncherService.get_default();

  const results = createBinding(service, "results");
  const hasResults = results((r) => r.length > 0);

  const search = (query: string) => service.search(query);
  const clear = () => service.clear();

  return { results, hasResults, maxResults, search, clear };
}

export const useLauncherItem = (
  results: Accessor<LauncherResult[]>,
  index: number,
) => {
  const result = results((r) => r[index]);
  const visible = results((r) => index < r.length);
  const icon = results((r) => r[index]?.icon ?? "");
  const label = results((r) => r[index]?.label ?? "");
  const description = results((r) => r[index]?.description ?? "");
  const hasDescription = results((r) => !!r[index]?.description);
  const activate = () => results.peek()[index]?.activate();

  return {
    result,
    visible,
    icon,
    label,
    description,
    hasDescription,
    activate,
  };
};
