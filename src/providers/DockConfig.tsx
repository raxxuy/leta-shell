import { DockConfigContext, type DockConfigShape } from "@/contexts/DockConfig";
import useConfig from "@/hooks/services/useConfig";

interface DockConfigProviderProps {
  children: () => JSX.Element;
}

export default function DockConfigProvider({
  children,
}: DockConfigProviderProps) {
  const value: DockConfigShape = {
    autohide: useConfig("dock", "autohide"),
  };

  return <DockConfigContext value={value}>{children}</DockConfigContext>;
}
