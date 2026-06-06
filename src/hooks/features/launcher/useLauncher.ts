import { LauncherConfigContext } from "@/contexts/LauncherConfigContext";

export const useLauncher = () => {
  const { maxResults, webSearchEngine } = LauncherConfigContext.use();

  return {
    maxResults,
    webSearchEngine,
  };
};
