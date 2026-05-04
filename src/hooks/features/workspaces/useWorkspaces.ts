import AstalHyprland from "gi://AstalHyprland";
import { range } from "es-toolkit";
import useConfig from "@/hooks/services/useConfig";

export default function useWorkspaces() {
  const [count] = useConfig("bar", "settings.workspaces.count");

  const workspaces = count((c) =>
    range(c).map((i) => AstalHyprland.Workspace.dummy(i + 1, null)),
  );

  return workspaces;
}
