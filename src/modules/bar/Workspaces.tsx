import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "gnim";
import { cursors } from "@/constants";

interface WorkspacesProps {
  maxWorkspaces: number;
}

export const WorkspaceButton = ({
  workspace,
}: {
  workspace: AstalHyprland.Workspace;
}) => {
  const hyprland = AstalHyprland.get_default();
  const classNames = createComputed(
    [
      createBinding(hyprland, "focusedWorkspace"),
      createBinding(hyprland, "clients"),
    ],
    (focusedWorkspace, _) => {
      const classes = ["workspace-button"];

      if (focusedWorkspace.id === workspace.id) {
        classes.push("active");
      }

      if (hyprland.get_workspace(workspace.id)?.clients.length > 0) {
        classes.push("occupied");
      }

      return classes;
    },
  );

  return (
    <button
      cssClasses={classNames}
      cursor={cursors.pointer}
      onClicked={() => workspace.focus()}
    />
  );
};

export default function Workspaces({ maxWorkspaces }: WorkspacesProps) {
  return (
    <box class="workspaces">
      {Array.from({ length: maxWorkspaces }).map((_, i) => (
        <WorkspaceButton
          workspace={AstalHyprland.Workspace.dummy(i + 1, null)}
        />
      ))}
    </box>
  );
}
