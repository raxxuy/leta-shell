import { LauncherContext, type LauncherShape } from "@/contexts/Launcher";
import { useLauncherService } from "@/hooks/services/useLauncherService";

export interface LauncherProviderProps {
  children: () => JSX.Element;
}

export default function LauncherProvider({ children }: LauncherProviderProps) {
  const { results, search, clear } = useLauncherService();

  const hasResults = results((r) => r.length > 0);

  const value: LauncherShape = {
    clear: clear,
    hasResults: hasResults,
    results: results,
    search: search,
  };

  return <LauncherContext value={value}>{children}</LauncherContext>;
}
