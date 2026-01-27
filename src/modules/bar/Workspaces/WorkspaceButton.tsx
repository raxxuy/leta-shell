import type AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import clsx from "clsx/lite";
import { CURSORS } from "@/constants";
import { loadClasses } from "@/lib/styles";
import ConfigService from "@/services/config";
import HyprlandService from "@/services/hyprland";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const hyprland = HyprlandService.get_default().astalHyprland;
  const variation = ConfigService.bind("bar", "modules.workspaces.variation");
  const clients = createBinding(hyprland, "clients");
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");

  const classNames = createComputed(() => {
    clients();

    const isOccupied = hyprland.get_workspace(workspace.id)?.clients.length > 0;
    const isFocused = focusedWorkspace().id === workspace.id;

    const base =
      "my-0.5 px-1.5 border-1 transition ease-in-out hover:border-color-13-lighter hover:bg-color-13-light shadow-2xs";

    const stateClasses = isFocused
      ? "border-color-13-lighter bg-color-13-light mb-0"
      : isOccupied
        ? "border-color-13-light bg-color-13"
        : "border-color-10-light bg-color-10";

    const variantClasses =
      variation() === "box"
        ? clsx("rounded-md h-3.5", isFocused ? "w-7" : "w-2")
        : clsx("rounded-full h-2 mx-0.5", isFocused ? "w-8.5" : "w-0.5");

    return clsx(base, stateClasses, variantClasses);
  });

  const handleClick = () => workspace.focus();

  return (
    <button
      $={loadClasses(WorkspaceButton)}
      class={classNames}
      cursor={CURSORS.pointer}
      focusable={false}
      onClicked={handleClick}
    />
  );
}
