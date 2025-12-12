import type AstalHyprland from "gi://AstalHyprland";

export const isWorkspaceOccupied = (
  hyprland: AstalHyprland.Hyprland,
  workspaceId: number,
): boolean => {
  return hyprland.get_workspace(workspaceId)?.clients.length > 0;
};
