import {
  LauncherConfigContext,
  type LauncherConfigShape,
} from "@/contexts/LauncherConfig";
import useConfig from "@/hooks/services/useConfig";

interface LauncherConfigProviderProps {
  children: () => JSX.Element;
}

export default function LauncherConfigProvider({
  children,
}: LauncherConfigProviderProps) {
  const value: LauncherConfigShape = {
    maxResults: useConfig("launcher", "maxResults"),
    webSearchEngine: useConfig("launcher", "providers.web.searchEngine"),
    width: useConfig("launcher", "width"),
  };

  return (
    <LauncherConfigContext value={value}>{children}</LauncherConfigContext>
  );
}
