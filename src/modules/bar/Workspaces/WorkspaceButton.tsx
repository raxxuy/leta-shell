import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import { CURSORS } from "@/constants";
import { getWorkspaceClasses, isWorkspaceOccupied } from "@/lib/utils/hyprland";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const hyprland = AstalHyprland.get_default();
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");
  const clients = createBinding(hyprland, "clients");

  const classNames = createComputed(() => {
    clients();

    return getWorkspaceClasses(
      workspace.id,
      focusedWorkspace().id,
      isWorkspaceOccupied(hyprland, workspace.id),
    );
  });

  return (
    <button
      cssClasses={classNames}
      cursor={CURSORS.pointer}
      onClicked={() => workspace.focus()}
    />
  );
}
