import Adw from "gi://Adw";
import AstalHyprland from "gi://AstalHyprland";
import { createBinding, createComputed } from "gnim";
import { CURSORS } from "@/constants";
import { Orientation } from "@/enums";
import { configs } from "@/lib/config";

interface WorkspacesProps {
  maxWorkspaces: number;
}

const WorkspaceButton = ({
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
      cursor={CURSORS.pointer}
      onClicked={() => workspace.focus()}
    />
  );
};

export default function Workspaces({ maxWorkspaces }: WorkspacesProps) {
  return (
    <Adw.Clamp maximumSize={16} orientation={Orientation.VERTICAL}>
      <box class="workspaces" spacing={configs.bar.modules.workspaces.spacing}>
        {Array.from({ length: maxWorkspaces }).map((_, i) => (
          <WorkspaceButton
            workspace={AstalHyprland.Workspace.dummy(i + 1, null)}
          />
        ))}
      </box>
    </Adw.Clamp>
  );
}
