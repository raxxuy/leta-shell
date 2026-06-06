import {
  LauncherConfigContext,
  type LauncherConfigShape,
} from "@/contexts/LauncherConfigContext";
import useConfig from "@/hooks/services/config/useConfig";

interface LauncherConfigProviderProps {
  children: () => JSX.Element;
}

export default function LauncherConfigProvider({
  children,
}: LauncherConfigProviderProps) {
  const value: LauncherConfigShape = {
    maxResults: useConfig("launcher", "maxResults"),
    webSearchEngine: useConfig("launcher", "providers.web.searchEngine"),
  };

  return (
    <LauncherConfigContext value={value}>{children}</LauncherConfigContext>
  );
}
