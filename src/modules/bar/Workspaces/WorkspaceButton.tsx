import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import { CURSORS } from "@/constants";
import { loadWidgetClasses } from "@/lib/styles";
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
      "my-0.5 h-4 w-2.5 rounded-md border-1 border-color-10-light bg-color-10 px-1.5 transition",
      "hover:border-color-13-lighter hover:bg-color-13-light",
      isOccupied && "border-color-13-light bg-color-13",
      isFocused && "mb-0 border-color-13-lighter bg-color-13-light",
    );
  });

  return (
    <button
      $={(self) => loadWidgetClasses(self, "workspace-button")}
      focusable={false}
      class={classNames}
      cursor={CURSORS.pointer}
      onClicked={() => workspace.focus()}
    />
  );
}
