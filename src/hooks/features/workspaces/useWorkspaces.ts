import AstalHyprland from "gi://AstalHyprland";
import { range } from "es-toolkit";
import { BarConfigContext } from "@/contexts/BarConfigContext";

export const useWorkspaces = () => {
  const {
    workspaceCount: [workspaceCount],
  } = BarConfigContext.use();

  const workspaces = workspaceCount((c) =>
    range(c).map((i) => AstalHyprland.Workspace.dummy(i + 1, null)),
  );

  return workspaces;
};
