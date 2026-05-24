import AstalHyprland from "gi://AstalHyprland";
import { range } from "es-toolkit";
import { BarConfigContext } from "@/contexts/BarConfigContext";

export default function useWorkspaces() {
  const { workspaceCount } = BarConfigContext.use();
  const [count] = workspaceCount;

  const workspaces = count((c) =>
    range(c).map((i) => AstalHyprland.Workspace.dummy(i + 1, null)),
  );

  return workspaces;
}
