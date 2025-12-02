import type AstalHyprland from "gi://AstalHyprland";

export const isWorkspaceOccupied = (
  hyprland: AstalHyprland.Hyprland,
  workspaceId: number,
): boolean => {
  return hyprland.get_workspace(workspaceId)?.clients.length > 0;
};

export const getWorkspaceClasses = (
  workspaceId: number,
  focusedId: number,
  isOccupied: boolean,
): string[] => {
  const classes = ["workspace-button"];

  if (workspaceId === focusedId) {
    classes.push("active");
  }

  if (isOccupied) {
    classes.push("occupied");
  }

  return classes;
};
