import { LauncherContext } from "@/contexts/Launcher";
import { LauncherConfigContext } from "@/contexts/LauncherConfig";

export const useLauncher = () => {
  const { maxResults, webSearchEngine, width } = LauncherConfigContext.use();
  const { results, hasResults, search, clear } = LauncherContext.use();

  const activate = () => results.peek()[0]?.activate();

  return {
    maxResults,
    webSearchEngine,
    width,
    results,
    hasResults,
    search,
    clear,
    activate,
  };
};
