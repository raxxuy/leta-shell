import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";

export const useWorkspaceState = (workspace: AstalHyprland.Workspace) => {
  const hypr = AstalHyprland.get_default();

  const clients = createBinding(workspace, "clients");
  const focused = createBinding(hypr, "focusedWorkspace");

  return createComputed(() => {
    clients();

    const isOccupied = hypr.get_workspace(workspace.id)?.clients.length > 0;
    const isFocused = focused()?.id === workspace.id;

    if (isFocused) return "focused";
    if (isOccupied) return "occupied";
    return "empty";
  });
};
