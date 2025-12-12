import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import { CURSORS } from "@/constants";
import { cls, isWorkspaceOccupied } from "@/lib/utils";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const hyprland = AstalHyprland.get_default();
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");
  const clients = createBinding(hyprland, "clients");

  const classNames = createComputed(() => {
    clients();

    const isOccupied = isWorkspaceOccupied(hyprland, workspace.id);
    const isFocused = focusedWorkspace().id === workspace.id;

    return cls(
      "transition bg-color-10 border-1 border-color-10-light px-1.5 my-0.5 w-2.5 h-4 rounded-md",
      "hover:bg-color-13-light hover:border-color-13-lighter",
      isOccupied && "bg-color-13 border-color-13-light",
      isFocused && "bg-color-13-light border-color-13-lighter mb-0",
    );
  });

  return (
    <button
      class={classNames}
      cursor={CURSORS.pointer}
      onClicked={() => workspace.focus()}
    />
  );
}
