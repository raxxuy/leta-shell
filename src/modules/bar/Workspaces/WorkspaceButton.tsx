import type AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "ags";
import clsx from "clsx/lite";
import { Cursors } from "@/constants";
import { useBarConfig } from "@/hooks/useConfig";
import { useHyprland } from "@/hooks/useHyprland";
import { loadClasses } from "@/lib/styles";

interface WorkspaceButtonProps {
  workspace: AstalHyprland.Workspace;
}

export default function WorkspaceButton({ workspace }: WorkspaceButtonProps) {
  const {
    modules: { workspaces },
  } = useBarConfig();
  const { hyprland } = useHyprland();

  const clients = createBinding(hyprland, "clients");
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");

  const classNames = createComputed(() => {
    clients();

    const isOccupied = hyprland.get_workspace(workspace.id)?.clients.length > 0;
    const isFocused = focusedWorkspace().id === workspace.id;
    const variant = workspaces().variant;

    const base = clsx(
      "my-0.5 px-1.5 border-1 transition ease-in-out",
      "hover:border-tertiary-lighter hover:bg-tertiary",
    );

    const stateClasses = clsx(
      isFocused
        ? "border-tertiary-lighter bg-tertiary mb-0"
        : isOccupied
          ? "border-tertiary-light bg-tertiary-dark"
          : "border-surface-container-high-lighter bg-surface-container-high-light",
    );

    const variantClasses =
      variant === "box"
        ? clsx("rounded-md h-3.5", isFocused ? "w-7" : "w-2")
        : clsx("rounded-full h-2 mx-0.5", isFocused ? "w-8.5" : "w-0.5");

    return clsx(base, stateClasses, variantClasses);
  });

  const handleClick = () => workspace.focus();

  return (
    <button
      $={loadClasses(WorkspaceButton)}
      class={classNames}
      cursor={Cursors.POINTER}
      focusable={false}
      onClicked={handleClick}
    />
  );
}
